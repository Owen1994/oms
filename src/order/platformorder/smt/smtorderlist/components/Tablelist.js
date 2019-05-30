/**
 * 作者: pzt
 * 描述: 速卖通列表页表格组件
 * 时间: 2018/4/18 18:26
 **/
import React, {Component} from 'react'

import {
    Form,
    Button,
    Select,
    Input,
    Row,
    Col,
    Table,
    Pagination,
    Spin,
    Modal,
    message,
    DatePicker,
    Icon,
    Menu,
    Dropdown,
    Tooltip,
    Tag,
} from 'antd'

const RangePicker = DatePicker.RangePicker;

import '../css/css.css'

const FormItem = Form.Item
const Option = Select.Option
import {
    timestampFromat, getGangeGimes, selectValues, closehandle, objTodata,
    functions, downloadfun, downloadUrl
} from 'util/baseTool';
import {Link} from 'react-router-dom';
import * as config from "util/connectConfig";
import axios from "util/axios";
import {fetchPost} from "util/fetch";
import GrabModal from './Grabmodal';
import BatchOptionModal from '@/components/BatchOptionModal/BatchOptionModal.js';

class Tablelist extends Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14}
    }
    state = {
        visible: false,
        visible1: false,
        visible2: false,
        confirmLoading: false,
        orderId: '',
        orderlistExport: false,
        batchSynchronous: [],
        validating: false,
        fileList: [],
        uploading: false,
    }
    showModal = (record) => {
        this.setState({
            visible: true,
            orderId: record.record.platformNumber,
        });
        const paramsObj = {
            type: 1,
        }
        this.props.form.setFieldsValue({"orderId": record.record.platformNumber});

    }
    handleOk = () => {
        this.setState({
            confirmLoading: true,
            validating: true
        });
        const paramsObj = {
            sendType: this.props.form.getFieldValue('deliveryType') || '',
            serviceName: this.props.form.getFieldValue('deliveryPlaceName') || '',
            logisticsNo: this.props.form.getFieldValue('waybillNumber1') || '',
            orderId: this.state.orderId,
            trackingWebsite: this.props.form.getFieldValue('trackingWebsite') || '',
        }
        for (let i in paramsObj) {
            if (paramsObj[i] == '') {
                message.error('请填写所有必填项！');
                this.setState({
                    confirmLoading: false,
                    visible: true
                });
                return
            }
        }
        axios.post(`${config.api_url}/oms/order/grab/motan/OrderBadgeApi/manualBadge`, paramsObj)
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == "000001") {
                        message.success(response.data.msg);
                        this.props.form.setFieldsValue({
                            waybillNumber1: '',
                            deliveryPlaceName: '',
                            deliveryType: ''
                        });
                        this.setState({
                            validating: false
                        })
                        document.getElementById('tb-orderclick').click();
                    }
                    else {
                        message.error(response.data.msg);
                    }
                }
            }).catch(e => {
            console.log(e)
        })

        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 1000);
    }
    handleCancel = () => {
        this.props.form.setFieldsValue({
            waybillNumber1: '',
            deliveryPlaceName: '',
            deliveryType: ''
        });
        this.setState({
            visible: false,
            validating: false
        });
    }

    // 批量标记相关 start
    showModal2 = () => {
        this.setState({
            visible2: true,
        });
    }
    // 批量标记相关 end

    // 订单抓取相关方法 start
    showModal1 = () => {
        this.setState({
            visible1: true,
        });
    }
    handleCancel1 = (e) => {
        this.setState({
            visible1: false,
        });
    }
    // 订单抓取相关方法 end

    /**
     *作者: pzt
     *时间: 2018/4/8
     *描述: 按逗号截取字符串，并给每一项添加单引号
     *@param: <string> str 一串逗号隔开的字符串
     **/
    addQuotes = (str) => {
        str = str.replace(/，/ig, ',');
        let arr = str.split(','),
            obj = '';
        for (let i = 0; i < arr.length; i++) {
            if (i == arr.length - 1) {
                arr[i] = arr[i].replace(arr[i], "'" + encodeURIComponent(arr[i]) + "'");
            } else {
                arr[i] = arr[i].replace(arr[i], "'" + encodeURIComponent(arr[i]) + "',");
            }
            obj += decodeURIComponent(arr[i])
        }
        return obj;
    }

    /**
     *作者: pzt
     *时间: 2017/4/7
     *描述: 同步订单（orderSynchro）
     *@param: <object> record 表格当前行数据
     **/
    orderSynchro = (record) => {
        // const { pageNumber, pageData } = this.props;
        const requestParams = {platformAccount: record.platformAccount, platformNumber: record.platformNumber};
        if (requestParams) {
            axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabApi/syncSingleOrder`, requestParams)
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.state == '000001') {
                            // this.props.handleSubmit(pageNumber, pageData);  // 刷新列表数据
                            message.success(response.data.msg)
                        }
                        else {
                            message.error(response.data.msg);
                        }

                    }
                }).catch(e => {
                console.log(e)
            })
        } else {
            message.error("请检查传入的参数！");
        }
    }


    confirm = (record) => () => {
        // console.log( record);
        Modal.confirm({
            title: '提示',
            content: '确认要同步订单吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                let value;
                if (this.state.batchSynchronous.length !== 0) {
                    value = {
                        data: this.state.batchSynchronous
                    }
                    console.log(value);
                } else {
                    if (record) {
                        value = {
                            data: [{
                                platformAccount: record.platformAccount,
                                platformNumber: record.platformNumber
                            }]
                        };
                        console.log(value);
                    } else {
                        message.error("请先选择要批量同步的订单！");
                        return
                    }
                }
                const key = '';
                if (value) {
                    axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabApi/syncOrder`, value)
                        .then(response => {
                            if (response.status == 200) {
                                if (response.data.state == '000001') {
                                    message.success(response.data.msg);
                                    this.props.fetchPosts({
                                        key: 'data',
                                        value: {
                                            "pageData": 10,
                                            "pageNumber": 1,
                                            "orderEndDate": 1519973610000,
                                            "orderStartDate": 1514787585000,
                                            "quickdState": 5
                                        }
                                    })
                                    this.props.synchroInfoaction({[key]: response.data.msg});
                                    this.setState({
                                        batchSynchronous: []
                                    });
                                    this.props.tablemodel.selectedRowKeys = [];
                                }
                                else {
                                    message.error(response.data.msg);
                                }

                            }
                        }).catch(e => {
                        console.log(e)
                    })
                } else {
                    message.error("请检查传入的参数！");
                }
            },
        });
    }

    columns = [

        {
            title: '产品信息',
            dataIndex: 'goods',
            key: 'goods',
            width: 390,
            render: (text, record, index) => {
                const pathname = location.pathname
                const url = `${pathname}smtorderdetail/?platformNumber=${record.platformNumber}`
                return (
                    <div>
                        <div>
                            <ul className='goodsInfo'>
                                {record.goods.map((item, index) => {
                                    return (<li key={index}>
                                        <div className='img padding-xm-top'>
                                            <Link to={url}><img width={72} height={68}
                                                                src={item.image ? item.image.replace(/^http[s]?/g, 'https') : require('../css/img/default.png')}/></Link>
                                        </div>
                                        <div className='info'>
                                            <p><Link to={url}>Itim ID:{item.itimID || null}</Link></p>
                                            <p className={'margin-ts-top '}><Link to={url}
                                                                                  className={'name'}>{item.name}</Link>
                                            </p>
                                            <div className={'overflow-hidden'}>
                                                <p className={'pull-left'}><Link to={url}>在线商品编码:{item.number}</Link>
                                                </p>
                                                <p className={'pull-right'}>{item.symbol}{item.unitPrice} * {item.num}</p>
                                            </div>
                                        </div>
                                    </li>)
                                })}
                            </ul>
                        </div>
                    </div>)
            }
        },
        {
            title: '订单信息',
            dataIndex: 'orderInfo',
            key: 'orderInfo',
            render: (text, record, index) => {
                const pathname = location.pathname
                const url = `${pathname}smtorderdetail/?platformNumber=${record.platformNumber}`;
                const url2 = record.isException ?
                `/order/exceptionorderlist/exceptionorderdetail/?orderId=${record.companyOrdersId}`
                : `/order/orderlist/orderdetail/?orderId=${record.companyOrdersId}`;
                
                return (
                    <div className={'order-info'}>
                        <div className={'text-left'}>
                            <p>平台单号：<Link to={url}>{record.platformNumber}</Link></p>
                            <p>YKS单号：<Link to={url2}>{record.companyOrdersId}</Link></p>
                            {record.waybillNumber ?
                                <p className={'margin-ss-top'}>跟踪号：{record.waybillNumber || null}</p> : ''}
                            <p className={'margin-ts-top'}>销售账号：{record.platformAccount}</p>
                            <p className={'margin-ts-top text-md-indent'}>买 家：{record.buyersAccount}</p>
                            {record.message ? (
                                <p className={'margin-ts-top'}>未读留言：{record.message ? record.message : 0}</p>) : null}

                        </div>
                    </div>
                )
            }
        },
        {
            title: '日期',
            dataIndex: 'orderTime',
            key: 'orderTime',
            render: (text, record, index) => {
                const hideDeliveryTime = (record.orderState == "等待您发货" || record.orderState == "紧急发货") ?
                    (<p className={'dead-time-color'}><span className={'time-type'}>截止发货时间：</span><span
                        className={'order-time'}>{timestampFromat(record.deliveryTime, 2)}</span></p>)
                    : null;
                const showTime = !record.paymentTime ?
                    null :
                    (
                        <div>
                            <p className={'margin-ts-bottom'}><span className={'time-type'}>付款时间：</span><span
                                className={'order-time'}>{timestampFromat(record.paymentTime, 2)}</span></p>
                            {hideDeliveryTime}
                        </div>
                    );
                const grabTime = !record.grabTime ?
                    null :
                    (
                        <div>
                            <p className={'margin-ts-bottom'}><span className={'time-type'}>抓单时间：</span><span
                                className={'order-time'}>{timestampFromat(record.grabTime, 2)}</span></p>
                        </div>
                    );
                return (
                    <div>
                        <p className={"margin-ts-bottom"}><span className={'time-type'}>下单时间：</span><span
                            className={'order-time'}>{timestampFromat(record.orderTime, 2)}</span></p>
                        {showTime}
                        {grabTime}
                    </div>
                )
            },
        },
        {
            title: '状态',
            dataIndex: 'isPhoneState',
            key: 'isPhoneState',
            render: (text, record, index) => {
                // const orderSource = record.orderSource == 1 ? (<p className={'margin-ss-top'}><b>{'手工'}</b></p>) : null
                // const isTipOrder = record.isTipOrder == 1 ? (<p className={'margin-ss-top'}><b>{'尖货'}</b></p>) : null
                return (
                    <div>
                        {/*record.cancelReason ?<p className={'order-state'}>{'买家申请取消 '}
                            <Popconfirm placement="bottom" title={<p>买家申请取消订单<br/>原因: {record.cancelReason || ''}</p>} onConfirm={(type,id)=>{this.confirmReason(type=1,record.orderId)}} onCancel={(type,id)=>{this.confirmReason(type=0,record.orderId)}} okText="同意取消" cancelText="拒绝取消" trigger="hover">
                                <Icon type="question-circle-o" className="iconQuestion"/>
                            </Popconfirm>
                        </p>:<p className={'order-state'} title={record.orderState}>{record.orderState}</p>*/}
                        <Tooltip title={record.orderState} className={'order-state'}>
                            <span>{record.orderState}</span>
                        </Tooltip>
                        {/* <p className={'order-state'} title={record.orderState}>{record.orderState}</p> */}
                        <p className={'margin-ts-top'}>{text == '1' ? "手机订单" : "PC订单"}</p>
                        {/* {orderSource}
                        {isTipOrder} */}
                        {record.badgeType == 4 || record.badgeType == 5 ?<p className="order-oms-list-sign margin-ts-top dead-time-color">顶标</p>:null}
                    </div>
                )
            }
        },
        {
            title: '金额',
            dataIndex: 'sum',
            key: 'sum',
            render: (text, record, index) => {
                return <span>{record.orderAmountSymbol}{record.sum}</span>
            }
        },
        {
            title: '操作',
            dataIndex: 'Operation',
            key: 'Operation',
            render: (text, record, index) => {
                const pathname = location.pathname
                const url = `/order/platformorder/smt/smtorderdetail/?platformNumber=${record.platformNumber}`;
                const menu = (
                    <Menu>
                        {functions(this, '001-000001-000001-004') ? <Menu.Item>
                            <a onClick={() => {
                                this.showModal({record})
                            }}>标记跟踪号</a>
                        </Menu.Item> : null}
                        {functions(this, '001-000001-000001-005') ? <Menu.Item>
                            <a id={'tb-orderclick'} onClick={() => {
                                this.orderSynchro(record)
                            }}>同步订单</a>
                        </Menu.Item> : null}

                    </Menu>);
                return (

                    <div className="actions-btns">
                        {functions(this, '001-000001-000001-006') ? <Link to={url} target="_blank">查看</Link> : null}
                        {/* <span className="margin-ss-left margin-ss-right v-line">|</span> */}
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link margin-ss-left">
                                更多 <Icon type="down"/>
                            </a>
                        </Dropdown>
                    </div>
                )
            },
        }];

    componentDidMount() {
    }

    // 验证非空 start
    checkEmpty = (rule, value, callback) => {
        const numreg = /^\d+$/;
        if (!numreg.test(value)) {
            callback('')
        } else {
            callback('')
        }
    }
    // 验证非空 end

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.tablemodelaction({selectedRowKeys, selectedRows});
    }

    Paginatihandle = (page, pageSize) => {
        // console.log(page, pageSize)
        const values = this.props.form.getFieldsValue()
        const newobj = {}
        newobj['pageNumber'] = page;
        newobj['pageData'] = pageSize;
        newobj['quickdState'] = this.props.quickdstateModel.quickdstate;
        for (let i in values) {
            if (i == 'tipOrderType' && values[i] !== '') {
                newobj[i] = values[i];
            }
            if (i == 'orderSource' && values[i] !== '') {
                newobj[i] = values[i];
            }
            if (values[i]) {
                if (i == 'orderDate') {
                    const arr = getGangeGimes(values[i])
                    newobj['orderStartDate'] = arr[0] ? arr[0] : ''
                    newobj['orderEndDate'] = arr[1] ? arr[1] : ''
                } else if (i == 'paymentDate') {
                    const arr = getGangeGimes(values[i])
                    newobj['paymentStartDate'] = arr[0] ? arr[0] : ''
                    newobj['paymentEndDate'] = arr[1] ? arr[1] : ''
                } else if (i == 'goodsNumber') {
                    newobj[i] = this.addQuotes(values[i]);
                } else if (i == 'waybillNumber') {
                    newobj[i] = this.addQuotes(values[i]);
                } else if (i == 'orderId') {
                    continue
                } else {
                    newobj[i] = values[i]
                }
            }
        }

        this.props.fetchPosts({key: 'data', value: newobj});
        this.props.tablemodelaction({selectedRowKeys: []});
    }

    //订单导出
    orderExport = () => {
        const paramsObj = this.props.filterSearchParams();
        delete paramsObj.pageData;
        delete paramsObj.pageNumber;
        fetchPost(`/oms/order/grab/motan/OrderGrabApi/export`, paramsObj, 1)
            .then(res => {
                if(res.state === '000001') {
                    location.href = '/order/basicdata/importexportrecords/'
                }
            })
    }

    //买家申请取消--弹窗
    confirmReason = (type, id) => {
        let data = {"orderId": id, "reviewType": type};
        axios.post(`${config.api_url}/api/grab/smt/order/buyerCancelOrder`, data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        message.success(response.data.msg || type == 1 ? "同意取消成功!" : "拒绝取消成功!");
                    }
                    else {
                        message.error(response.data.msg);
                    }

                }
            }).catch(e => {
            console.log(e);
        })
    }

    // 抓取弹窗下拉事件
    handleSelectChange = (value) => {
        this.setState({
            selectOption: value,
        });

    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue} = this.props.form;
        const {data} = this.props.tablemodel;
        const columns = this.columns;
        const {visible, confirmLoading, orderId} = this.state;
        const rowSelection = {
            selectedRowKeys: this.props.tablemodel.selectedRowKeys,
            onChange: this.onSelectChange,
            fixed: false,
            getCheckboxProps: record => ({
                disabled: false,
            }),
            onSelect: (record, selected, selectedRows) => {
                // console.log(selectedRows);
                this.setState({
                    batchSynchronous: selectedRows,
                })
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                this.setState({
                    batchSynchronous: selectedRows,
                });
            },
        };

        const sendTypelist = this.props.commonSelectData.sendTypelist || [];
        sendTypelist.shift();
        sendTypelist.unshift({value: '', name: '请选择'});
        const sendtypelistselect = sendTypelist.map((v, i) => <Option key={i} value={v.value}>{v.name}</Option>);
        // tab页签数据
        let tabData = this.props.quickdstateModel.data;
        const active = this.props.active;
        tabData = tabData ? tabData.map((v, i) => {
                if (i == 0) {
                    return <Tag onClick={this.props.taglick(v, i)} key={v.id} className={(v.id == active) ? 'active' : ''}>
                        <span>{v.name}</span>
                    </Tag>
                } else {
                    return <Tag onClick={this.props.taglick(v, i)} key={v.id} className={(v.id == active) ? 'active' : ''}>
                        <span>{v.name}({v.num})</span>
                    </Tag>
                }
            }
        ) : [];
        const menu = (
            <Menu>
                <Menu.Item>
                    {functions(this, '001-000001-000001-002') ?
                        <a onClick={this.showModal2}>批量标记</a> : null}
                </Menu.Item>
            </Menu>);
        return (
            <React.Fragment>
                <div className="newCluenk">
                    <div className="content">
                        <Row className={"cut-off-line"}>
                            <Col span={24} className={"scroll-bar"}>
                                <div className={"quiteState"}>
                                    {tabData}
                                </div>
                            </Col>
                        </Row>
                        <div className="title rightbtn">
                            {/*<Button onClick={this.confirm()} >批量同步</Button>*/}
                            {/* {functions(this, '001-000001-000001-002') ?
                                <Button onClick={this.showModal2}>批量标记</Button> : null} */}
                            <Dropdown overlay={menu}>
                                <Button style={{ float: 'left' }}>批量操作<Icon type="down" /></Button>
                            </Dropdown>
                            {functions(this, '001-000001-000001-003') ? <Button
                                className="margin-md-left"
                                icon="laptop"
                                onClick={this.showModal1}>订单抓取</Button> : null}

                            {functions(this, '001-000001-000001-007') ? <Button
                                className={'margin-md-left'}
                                disabled={this.state.orderlistExport}
                                icon="upload"
                                onClick={this.orderExport}>订单导出</Button> : null}
                        </div>
                        <Spin spinning={this.props.tablemodel.loading} delay={500} tip="Loading...">
                            <Table rowSelection={rowSelection}
                                   columns={columns}
                                   dataSource={data}
                                   pagination={false}
                                   className="table-smtlist"
                                   bordered={true}
                            />
                        </Spin>
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{goButton: true}}
                            current={this.props.Paginationmodel.current}
                            defaultCurrent={1} onShowSizeChange={this.props.handleSubmit}

                            total={this.props.Paginationmodel.total}
                            pageSize={this.props.Paginationmodel.pageSize}
                            onChange={this.props.handleSubmit}/>
                    </div>
                    <Modal title="标记追踪号"
                           visible={visible}
                           onOk={this.handleOk}
                           confirmLoading={confirmLoading}
                           onCancel={this.handleCancel}
                           okText='提交'
                    >
                        <div className="edit-trackid">
                            <Row>
                                <Col span={24}>
                                    <FormItem  {...this.formItemLayout}
                                               label="关联平台单号"
                                    >

                                        {getFieldDecorator('orderId', {
                                            rules: [{
                                                required: false,
                                            }],
                                            initialValue: {orderId},
                                        })(
                                            <Input maxLength={100} disabled={true}/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem {...this.formItemLayout}
                                              label="物流渠道名称"
                                    >

                                        {getFieldDecorator('deliveryPlaceName', {
                                                rules: [{required: this.state.validating, message: '请选择物流渠道名称'}],
                                            },
                                        )(
                                            <Input readOnly placeholder={`请选择物流渠道名称`}
                                                   onClick={selectValues({
                                                       obj: this,
                                                       url: '/oms/order/grab/motan/OrderBadgeApi/getListLogisticsService',
                                                       title: '物流渠道名称',
                                                       name: 'deliveryPlaceName',
                                                       id: 'deliveryPlace',
                                                       //    type: "multiple",
                                                       num: 1
                                                   })}
                                            />
                                        )}
                                        {getFieldDecorator('deliveryPlace')(
                                            <Input readOnly maxLength={100} type="hidden"/>
                                        )}
                                        <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                                            closehandle(e, this)
                                        }}/>

                                    </FormItem>

                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem  {...this.formItemLayout}
                                               label="货物跟踪号"
                                    >

                                        {getFieldDecorator('waybillNumber1', {
                                            rules: [{
                                                required: this.state.validating,
                                                message: '请输入货物跟踪号',
                                            }],
                                        })(
                                            <Input maxLength={100} placeholder="请输入"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem {...this.formItemLayout}
                                              label="发货类型"
                                    >

                                        {getFieldDecorator('deliveryType', {
                                            rules: [{required: this.state.validating, message: '请选择发货类型'}],
                                            initialValue: ''
                                        })(
                                            <Select className={'ant-xs-row'} placeholder="请选择">
                                                {sendtypelistselect}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem  {...this.formItemLayout}
                                               label="标记网址"
                                    >
                                        {getFieldDecorator('trackingWebsite')(
                                            <Input maxLength={100} placeholder="请输入"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className={'text-center dead-time-color'}>在第一次填写完发货通知后的10天内有2次修改机会</div>
                                </Col>
                            </Row>
                        </div>
                    </Modal>
                    <GrabModal
                        visible={this.state.visible1}
                        closeModal={this.handleCancel1}
                    />
                    <BatchOptionModal
                        title="批量标记"
                        visible={this.state.visible2}
                        closeModal={() => {
                            this.setState({ visible2: false })
                        }}
                        url="/oms/order/grab/motan/OrderBadgeApi/batchMarkingBadgeChannel"
                        templateUrl={downloadUrl('/download/oms/smt-mark-template.xlsx')}
                        fileSize={2}
                        maxCount={10000}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default Tablelist

