import React, {Component} from 'react';
import Modalmodel from '../../../components/modalmodel';
import {Link} from 'react-router-dom';
import {
    Form,
    Button,
    Select,
    Radio,
    Table,
    Pagination,
    Spin,
    Modal,
    Input,
    message,
    Row,
    Menu,
    Dropdown,
    Icon,
    Col,
} from 'antd';
import '@/common/css/css.css';
import { PLATFORM_LINK } from '../constants';
import {timestampFromat, getLoginmsg, functions, downloadUrl, datasaddkey} from 'util/baseTool';
import {levelOptions} from "util/options";
import {fetchPost} from "util/fetch";
import CSelect from "@/components/cselect";
import {
    EXAMINE_DEFICIT_PACKAGE,
    TRIAL_SHIPPING,
    ROLLOVER_PACKAGE,
    GET_CHANNEL_CODES_BYPLAT_FORMAND_WAREHOUSE,
    EXPORT_ORDER,
} from '../constants';
import BatchOptionModal from '@/components/BatchOptionModal/BatchOptionModal.js';
import { revokeTypeArr } from '../constants';
import TrialFreightModal from './TrialFreightModal';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

class Tablelist extends Component {

    state = {
        visible: false, //审单/撤单
        visible1: false,// 转仓/渠道修改
        channelData: [],// 渠道
        saveLoading: false, // 转仓/渠道修改弹窗loading
        activeOkLoading: false, // 审单撤单弹窗loading
        exportVisible: false,// 订单导出
        exportType: 1, // 数据导出类型：1-按选中项，2-按搜索条件
        batchRolloverVisible: false,    // 批量转仓/修改渠道visible
        warehouseData: [],
        keysArr: [],    
        trialFreightVisible: false, // 运费试算弹窗visible
        record: {},   // 数据
    };

    formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 18}
    };

    componentDidMount() {
        const params = {
            pageNumber:1,
            pageData:999
        };
        fetchPost('/oms/order/manage/motan/IPackageApi/getPackageWarehouse', params, 2)
            .then(data => {
                if (data.state === '000001') {
                    this.setState({
                        warehouseData: data.data,
                    });
                }
            })
    }

    // 审核/批量审核 - 打开
    handleBatchOpen = (warehouseOrderNumber) => {
        const { selectedRowKeys } = this.props.tablemodel;
        if (!warehouseOrderNumber && selectedRowKeys.length == 0) {
            message.warning("无选中订单");
            return;
        } else{
            this.setState({
                keysArr: warehouseOrderNumber ? [warehouseOrderNumber] : selectedRowKeys,
                visible: true,
            });
        }
    }

    // 审核/批量审核 - 确认
    handleBatchOk = () => {
        const { pageNumber, pageData } = this.props;
        const { getFieldsValue } = this.props.form;
        this.setState({
            activeOkLoading: true,
        });
        const { keysArr } = this.state;
        const { auditStatus, auditRemark, revokeType } = getFieldsValue();
        let listArr = []
        for (let i = 0; i < keysArr.length; i++) {
            let objectName = {};
            objectName["packageCode"] = keysArr[i];
            objectName["auditPerson"] = getLoginmsg().personName;
            objectName["auditStatus"] = auditStatus;
            objectName["auditRemark"] = auditRemark;
            objectName["revokeType"] = revokeType;
            listArr.push(objectName);
        }
        fetchPost(EXAMINE_DEFICIT_PACKAGE, { packageList: listArr }, 1)
            .then(data => {
                if (data.state == '000001') {
                    this.handleBatchCancel();
                    //刷新负利润包裹列表数据
                    this.props.onSearch(pageNumber, pageData);
                    this.props.tablemodelaction({ selectedRowKeys: [] });
                }
            })
    }

    // 审核/批量审核 - 关闭
    handleBatchCancel = () => {
        this.setState({
            activeOkLoading: false,
            visible: false,
        });
        this.props.form.resetFields(['auditStatus', 'auditRemark', 'revokeType']);
    }

    // 表格
    columns = [
        {
            title: '序号',
            className: 'textalign',
            dataIndex: 'sid',
            key: 'sid',
            width: 60,
            render: (text, record, index) => ++index + (this.props.Paginationmodel.current - 1) * this.props.Paginationmodel.pageSize
        },
        {
            title: '单号',
            render: (text, record, index) => {
                const pathname = location.pathname
                const url = `${pathname}negativeprofitauditdetailfail/?orderId=${record.warehouseOrderNumber}`
                return (
                    <div className="order-tablelist-div" style={{minWidth: 190}}>
                        <p>
                            <span className="order-tablelist-span1">包裹单号:</span>
                            <Link className="colorBlue order-tablelist-span3" to={url} target="_blank">{record.warehouseOrderNumber}</Link>
                        </p>
                        <p>
                            <span className="order-tablelist-span1">YKS单号:</span>
                            <span className="order-tablelist-span3">{record.yksOrderNumber}</span>
                        </p>
                        <p>
                            <span className="order-tablelist-span1">平台单号:</span>
                            {
                                PLATFORM_LINK[record.platformName]
                                ? <Link className="colorBlue order-tablelist-span3" to={`${PLATFORM_LINK[record.platformName]}${record.platformOrderNumber}`} target="_blank"> {record.platformOrderNumber}</Link>
                                : <span className="order-tablelist-span3">{record.platformOrderNumber}</span>
                            }
                        </p>
                    </div>
                )
            }
        }, {
            title: '平台',
            render: (text, record, index) => {
                return (
                    <div className="order-tablelist-div order-tablelist-div2 order-tablelist-div3" style={{minWidth: 120}}>
                        <p><span>销售平台:</span><span>{record.platformName}</span></p>
                        <p><span>国家全称:</span><span>{record.country}</span></p>
                        <p><span>销售账号:</span><span>{record.saleAccount}</span></p>
                    </div>
                );
            }
        },
        {
            title: '物流渠道',
            className: 'textalign',
            dataIndex: 'logisticsChannel',
            key: 'logisticsChannel',
        }, {
            title: '时间',
            render: (text, record, index) => {
                return (
                    <div className="order-tablelist-div order-tablelist-div2" style={{minWidth: 140}}>
                        <p><span>抓单时间:</span><span>{timestampFromat(record.grabTime, 2)}</span></p>
                        <p><span>付款时间:</span><span>{timestampFromat(record.paymentTime, 2)}</span></p>
                    </div>
                );
            }
        }, {
            title: '费用',
            render: (text, record, index) => {
                return (
                    <div className="order-tablelist-div" style={{minWidth: 155}}>
                        <p><span className="order-tablelist-span2">试算运费成本:</span><span className={parseFloat(record.trialFreight) < 0 ? 'colorRed' : ''}>{`${record.trialFreightCurrency} ${parseFloat(record.trialFreight).toFixed(2)}`}</span></p>
                        <p><span className="order-tablelist-span2">附加费:</span><span>{`${record.trialFreightCurrency} ${record.remoteFee}`}</span></p>
                        <p><span className="order-tablelist-span2">试算包裹利润:</span><span className='colorRed'>{`${record.trialFreightCurrency} ${parseFloat(record.profit).toFixed(2)}`}</span></p>
                    </div>
                );
            }
        },
        {
            title: '待审类型',
            dataIndex: 'exceptionType',
            key: 'exceptionType',
            align: 'center',
        },
        {
            title: '操作',
            className: 'textalign',
            width: 90,
            dataIndex: 'Operation',
            key: 'Operation',
            render: (text, record, index) => {
                const rolloverPackageFlag = record.rolloverPackageFlag
                const warehouseOrderNumber = record.warehouseOrderNumber;
                const exceptionType = record.exceptionType;
                // let url = `/order/negativeprofitauditlist/negativeprofitauditdetailfail/?orderId=${record.warehouseOrderNumber}`
                const url = `/order/deliveryparcellist/deliveryparceldetail/?orderId=${warehouseOrderNumber}&exceptionType=${exceptionType}`;
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <a onClick={() => this.handleTrialFreightModal(record)}>运费试算</a>
                        </Menu.Item>
                        {
                            functions(this, '001-000003-000002-005') ?
                                <Menu.Item>
                                    <a onClick={() => this.handleBatchOpen(record.warehouseOrderNumber)}>审核</a>
                                </Menu.Item>
                            : null
                        }
                        {
                            rolloverPackageFlag === 1 ?
                                <Menu.Item>
                                    <a onClick={this.toggleRolloverPackage.bind(this,{visible1: true}, record)}>
                                        转仓
                                    </a>
                                </Menu.Item>
                            : null
                        }
                        {
                            rolloverPackageFlag === 1 ?
                                <Menu.Item>
                                    <a onClick={this.toggleRolloverPackage.bind(this,{visible1: true}, record)}>
                                        渠道修改
                                    </a>
                                </Menu.Item>
                            : null
                        }
                        <Menu.Item>
                            <Link  to={`${url}&ifConsigneeInfoEditable=true`} target="_blank">修改收货人信息</Link>
                        </Menu.Item>
                    </Menu>);

                return (
                    <div className="actions-btns">
                        {
                            functions(this, '001-000003-000002-002') ?
                                <Link to={url} target="_blank">查看</Link>
                            : null
                        }
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link margin-ss-left">
                                更多 <Icon type="down"/>
                            </a>
                        </Dropdown>
                    </div>
                )
            },
        }];

    /**
     * 作者: pzt
     * 描述: 转仓/渠道修改弹窗功能
     * 时间: 2018/12/4 16:04
     * @param <Object> stateObj
     * @param <Object> record
     **/
    handleWarehouse = (value) => {  // 选择仓库
        const { setFieldsValue } = this.props.form;
        this.setState({
            channelData: [],
        });
        setFieldsValue({
            forecastFreight: null,
            channelCode: null,
        });

    }

    // 转仓/渠道修改弹窗 - 选择渠道
    handleTrialShipping = (value) =>{
        this.setState({ saveLoading: true });
        const { getFieldValue, setFieldsValue } = this.props.form;
        const params = {};
        params.channel = value;
        params.packageCode = getFieldValue('packageCode');
        params.warehouse = getFieldValue('warehouseCode');
        fetchPost(TRIAL_SHIPPING, params, 2).then(res => {
            if(res && res.state === '000001'){
                setFieldsValue({
                    forecastFreight: `${res.currency} ${parseFloat(res.freight).toFixed(2)}`
                });
                this.setState({
                    freight: res.freight,
                    remoteFee: res.remoteFee,
                    currency: res.currency,
                    saveLoading: false,
                });
            }else {
                setFieldsValue({
                    forecastFreight: null
                });
            }
        })
    }

    //  转仓/渠道修改弹窗 - 打开/关闭
    toggleRolloverPackage = (stateObj, record) =>{
        const {setFieldsValue} = this.props.form;
        this.setState(stateObj);
        if(record){
            const code = record.warehouseCode;
            switch (code){
                case '国内1号仓':
                    warehouseCode = 'CCN001';
                    break;
                case '国内3号仓':
                    warehouseCode = 'CCN003';
                    break;
                case '国内4号仓':
                    warehouseCode = 'CFT004';
                    break;
                default:
                    break;
            }
            this.setState({
                channelData: [{
                    channel_code: record.channelCode,
                    channel_name: record.logisticsChannel,
                }]
            })
            setFieldsValue({
                packageCode: record.warehouseOrderNumber,
                warehouseCode: record.warehouseCode,
                channelCode: record.channelCode,
            });
            if(record.channelCode) {
                this.handleTrialShipping(record.channelCode);
            }
        }
    }

    // 转仓/渠道修改弹窗 - 确定
    saveRolloverPackage = () =>{
        const { validateFields } = this.props.form;
        const { freight, remoteFee, currency } = this.state;
        const { pageNumber, pageData } = this.props;
        this.setState({
            saveLoading: true
        })
        validateFields(['warehouseCode', 'channelCode', 'packageCode'], (errors, values) => {
            if(!errors){
                const params = {};
                params.freight = freight;
                params.remoteFee = remoteFee;
                params.currency = currency;
                params.warehouseCode = values.warehouseCode;
                params.channelCode = values.channelCode;
                params.packageCode = values.packageCode;
                fetchPost(ROLLOVER_PACKAGE, params, 2)
                    .then(res => {
                        if(res && res.state === '000001'){
                            setTimeout(()=>{
                                message.success(res.msg);
                                this.setState({
                                    visible1: false,
                                    saveLoading: false,
                                    trialFreightVisible: false,
                                });
                                this.props.onSearch(pageNumber, pageData);
                            }, 3000);
                        }
                    })
            }
        })
    }

    // 列表选择
    onSelectChange = (selectedRowKeys, selectedRows, selected) => {
        this.props.tablemodelaction({selectedRowKeys, selectedRows});
        this.setState({ keysArr: selectedRowKeys });
    }

    // 导出数据
    handleExportOk = () => {
        const { exportType } = this.state;
        const params = this.props.filterParams();
        delete params.pageNumber;
        delete params.pageData;
        if (exportType === 1){
            const selectedRows = this.props.tablemodel.selectedRowKeys;
            if(selectedRows && selectedRows.length > 0){
                params.packageCodeList = selectedRows;
            } else {
                return message.info('请至少选择一条数据！');
            }
        }
        fetchPost(EXPORT_ORDER, params, 1)
            .then(data => {
                if (data.state == '000001') {
                    location.href = '/order/basicdata/importexportrecords/';
                }
            })
    }

    // 运费试算弹窗 - 开关
    handleTrialFreightModal = (record) => {
        this.setState({
            record,
            trialFreightVisible: true,
        });
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const {data} = this.props.tablemodel;
        const newdata = datasaddkey(data.data)
        const { pageSize } = this.props.Paginationmodel;
        const {  onSearch, tablemodel } = this.props;
        const columns = this.columns;
        const {
            trialFreightVisible,
            record,
        } = this.state;

        // 审核/批量审核 - 弹窗内容
        const content = <div className="text-left">
            <Row className="auditmodal-p">
                <p>请注意：</p>
                <p>审核通过之后，订单将继续执行后续流程，审核不通过，订单将置为撤单状态！</p>
            </Row>
            <Row>
                <FormItem 
                    {...this.formItemLayout}
                    label="审核结论" 
                    className="padding-right auditmodal-result">
                    {
                        getFieldDecorator('auditStatus', {
                            rules: [{
                                required: false,
                                message: `请选择`
                            }], initialValue: 2
                        })(
                            <RadioGroup>
                                <Radio value={2}>通过</Radio>
                                <Radio value={0}>不通过</Radio>
                            </RadioGroup>
                        )
                    }
                    
                    {
                        getFieldValue('auditStatus') === 0 ?
                            <div className="auditmodal-div">
                                <span className="auditmodal-span"></span>
                                {
                                    getFieldDecorator('revokeType', {
                                        initialValue: '6',
                                        rules: [{ require: true, message: '请选择撤单类型'}],
                                    })(
                                        <Select
                                            onChange={() => {this.setState({ loading: false })}}
                                        >
                                            {
                                                revokeTypeArr.map(v => <Option key={v.value} value={v.value}>{v.name}</Option>)
                                            }
                                        </Select>
                                    )
                                }
                            </div>
                        : null
                    }
                </FormItem>
            </Row>
            <Row>
                <FormItem
                    label="审核意见"  {...this.formItemLayout} className="width-100">
                    {getFieldDecorator('auditRemark', {
                        rules: [{required: false, message: '请输入审核意见'}],
                    })(
                        <TextArea rows={4} className="width-100" placeholder="请输入审核意见"/>
                    )}
                </FormItem>
            </Row>
        </div>

        // 列表数据选中
        const rowSelection = {
            selectedRowKeys: this.props.tablemodel.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: false,
            }),
        };

        const menu = (
            <Menu>
                {functions(this, '001-000003-000002-003') ?
                    <Menu.Item>
                        <p onClick={() => this.handleBatchOpen()}>
                            批量审核
                        </p>
                    </Menu.Item>
                    : null}
                {/* {functions(this, '001-000003-000002-004') ?
                    <Menu.Item>
                        <p  onClick={this.RevokePop}>
                            批量撤单
                        </p>
                    </Menu.Item>
                    : null} */}
                {functions(this, '001-000003-000002-006') ?
                    <Menu.Item>
                        <p onClick={() => {this.setState({batchRolloverVisible: true})}}>
                            转仓/修改渠道
                        </p>
                    </Menu.Item>
                    : null}
            </Menu>
        );


        return (
            <div className="newCluenk">
                <div className="margin-ss-left padding-sm-top rightbtn clear">
                    <div className="pull-left">
                        <Dropdown overlay={menu}>
                            <Button>批量操作<Icon type="down" /></Button>
                        </Dropdown>
                    </div>
                    <div className="pull-right padding-sm-right">
                        <Button icon="upload" style={{ marginRight: 10 }} onClick={() => {this.setState({exportVisible: true})}}>订单导出</Button>
                        <Button onClick={() => this.handleTrialFreightModal()}>运费试算</Button>
                    </div>

                    {/* 审核/批量审核 - 弹窗 */}
                    <Modalmodel
                        {...{
                            ...this.props.modalmodel,
                            visible: this.state.visible,
                            ModalText: content,
                            title: '审核/批量审核'
                        }}
                        confirmLoading={this.state.activeOkLoading}
                        onCancel={this.handleBatchCancel}
                        footer={
                            <div>
                                <Button key="cancel" onClick={this.handleBatchCancel}>
                                    取消
                                </Button>
                                <Button key="submit" type="primary" onClick={this.handleBatchOk} loading={this.state.activeOkLoading}>确认</Button>
                            </div>
                        }
                        maskClosable={false}
                    />

                    {/* 数据导出弹窗 */}
                    <Modal
                        title="订单导出"
                        visible={this.state.exportVisible}
                        onOk={this.handleExportOk}
                        onCancel={() => {this.setState({ exportVisible: false})}}
                        okText="确认"
                        maskClosable={false}
                        cancelText="取消"
                    >
                        <Row>
                            <Col span={6} style={{textAlign: 'right', paddingRight: 10}}>导出类型：</Col>
                            <Col span={18} style={{textAlign: 'left'}}>
                                <RadioGroup
                                    onChange={(e) => {this.setState({exportType: e.target.value});}}
                                    defaultValue={1}
                                >
                                    <Radio value={1}>按选中订单导出</Radio>
                                    <Radio value={2}>按查询条件导出</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                    </Modal>

                </div>
                <div className="content">

                    <Spin spinning={this.props.tablemodel.loading} delay={500} tip="Loading...">
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={newdata}
                            bordered
                            pagination={false}
                            rowKey={record => record.warehouseOrderNumber}
                        />
                    </Spin>
                    <Pagination showTotal={total => `共 ${total} 条`} showTitle
                                pageSizeOptions={levelOptions('分页显示条数')}
                                showSizeChanger showQuickJumper={{goButton: true}}
                                current={this.props.Paginationmodel.current}
                                defaultCurrent={1} onShowSizeChange={onSearch}
                                total={this.props.Paginationmodel.total}
                                pageSize={pageSize}
                                onChange={onSearch}/>
                </div>

                {/* 转仓/渠道修改弹窗 */}
                <div>
                    <Modal
                        title="转仓/渠道修改"
                        visible={this.state.visible1}
                        maskClosable={false}
                        onCancel={this.toggleRolloverPackage.bind(this,{visible1: false},null)}
                        footer={null}
                    >
                        <FormItem
                            {...this.formItemLayout}
                            label="包裹单号"
                            className=""
                        >
                            {getFieldDecorator('packageCode')(
                                <Input disabled />
                            )}
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="仓库"
                            className= "margin-ss-top"
                        >
                            {getFieldDecorator('warehouseCode', {
                                rules: [{
                                    required: false,
                                    message: '请选择仓库'
                                }],
                                initialValue: ''
                            })(
                                <CSelect
                                    list={this.state.warehouseData}
                                    isNotCache
                                    code='id' // 列表编码字段
                                    name='name' // 列表名称字段
                                    url={'/oms/order/manage/motan/IPackageApi/getPackageWarehouse'}
                                    params={{searchColumn: 'name',pageNumber:1, pageData:999}}
                                    apiListType={2}
                                    localSearch={1}
                                    onChange={this.handleWarehouse}
                                />
                            )}
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="渠道"
                            className= "margin-ss-top"
                        >
                            {getFieldDecorator('channelCode', {
                                    rules: [{required: false, message: '渠道'}],
                                },
                            )(
                                <CSelect
                                    list={this.state.channelData}
                                    code='channel_code' // 列表编码字段
                                    name='channel_name' // 列表名称字段
                                    url={GET_CHANNEL_CODES_BYPLAT_FORMAND_WAREHOUSE}
                                    params={{packageCode: getFieldValue('packageCode'),warehouseCode: getFieldValue('warehouseCode'), pageNumber:1, pageData:20}} // 搜索参数
                                    localSearch = {1}
                                    apiListType={2}
                                    onChange={this.handleTrialShipping}
                                />
                            )}
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="试算运费成本"
                            className= "margin-ss-top"
                        >
                            {getFieldDecorator('forecastFreight')(
                                <Input disabled />
                            )}
                        </FormItem>
                        <FormItem
                            className= "text-right"
                            style={{marginLeft: -20,marginRight: -20, marginTop: 20, paddingTop: 10, paddingRight: 60, borderTop: '1px solid #e8e8e8'}}
                        >
                            <Button
                                type='default'
                                className='margin-sm-right'
                                onClick={() => this.setState({visible1: false})}
                            >取消</Button>
                            <Button
                                type='primary'
                                onClick={this.saveRolloverPackage}
                                loading={this.state.saveLoading}
                                disabled={!getFieldValue('forecastFreight') ? true : false}
                            >
                                {this.state.saveLoading ? 'waiting...' : '确定'}
                            </Button>
                        </FormItem>
                    </Modal>

                    {/* 批量转仓/修改渠道弹窗 */}
                    <BatchOptionModal
                        title="批量转仓/修改渠道"
                        visible={this.state.batchRolloverVisible}
                        closeModal={() => {
                            this.setState({ batchRolloverVisible: false })
                        }}
                        url="/oms/order/manage/motan/IPackageApi/batchRooloverPackage"
                        templateUrl={downloadUrl('/download/oms/batch-rollover-template.xlsx')}
                        fileSize={2}
                        maxCount={2000}
                    />

                    {/* 运费试算弹窗 */}
                    <TrialFreightModal
                        trialFreightVisible={trialFreightVisible}
                        tablemodel={tablemodel}
                        onCancel={() => this.setState({
                            trialFreightVisible: false,
                            record: {},
                        })}
                        record={record}
                        toggleRolloverPackage={this.toggleRolloverPackage}
                    />
                </div>
            </div>
        );
    }
}

export default Tablelist
