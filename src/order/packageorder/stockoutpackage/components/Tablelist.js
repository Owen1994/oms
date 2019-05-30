import React, {Component} from 'react'
import {Link} from 'react-router-dom'
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
} from 'antd'
import '@/common/css/css.css';
import { PLATFORM_LINK } from '../constants';

import PopConfirm from '@/common/components/confirm';
const FormItem = Form.Item
const Option = Select.Option
import {timestampFromat, getLoginmsg, functions} from 'util/baseTool';
import {levelOptions} from "util/options";
import {fetchPost} from "util/fetch";
import CSelect from "@/components/cselect";
import AuditModal from './AuditModal';      // 撤单弹窗
import {
    TRIAL_SHIPPING,
    ROLLOVER_PACKAGE,
    GET_CHANNEL_CODES_BYPLAT_FORMAND_WAREHOUSE,
    CANCEL_PACKAGE,
    BATCH_CANCEL_PACKAGE,
    EXPORT_LIST,
    UPDATE_PRIORITY,
    GET_PACKAGE_STOCK_DETAIL,
    EXAMINE_DEFICIT_PACKAGE,
} from '../constants/Api';
import { DELIVERY_PRIORITY } from '../constants';

const RadioGroup = Radio.Group;

class Tablelist extends Component {

    state = {
        visible1: false,// 转仓/渠道修改
        channelData: [],// 渠道
        saveLoading: false, // 转仓/渠道修改弹窗loading
        priorityLoading: false, // 修改发货优先级选择器loading
        visible2: false,    // 库存详情visible
        inventoryDetail: [],    // 库存详情数据
        auditVisible: false,    // 撤单弹窗开关
        keysArr: [],
        auditLoading: false,    // 撤单弹窗确定按钮loading
    }

    formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 18}
    };

    columns2 = [
        {
            title: 'SKU',
            dataIndex: 'skuCode',
            key: 'skuCode',
            align: 'center',
            render: text => <p>{text}</p>
        },
        {
            title: 'SKU数量',
            dataIndex: 'skuCount',
            key: 'skuCount',
            align: 'center',
            render: text => <p>{text}</p>
        },
        {
            title: '仓库',
            key: 'warehouseCode',
            align: 'center',
            render: (text, record) => {
                return(
                    record.lstStock ? record.lstStock.map(v => <p>{v.warehouseCode}</p>) : null
                );
            }
        },
        {
            title: '实际库存',
            key: 'factInventory',
            align: 'center',
            render: (text, record) => {
                return(
                    record.lstStock ? record.lstStock.map(v => <p className={parseInt(v.factInventory) === 0 ? 'stockout-red' : ''}>{v.factInventory}</p>) : null
                );
            }
        },
        {
            title: '可用量',
            key: 'avaliableInventory',
            align: 'center',
            render: (text, record) => {
                return(
                    record.lstStock ? record.lstStock.map(v => <p className={parseInt(v.avaliableInventory) === 0 ? 'stockout-red' : ''}>{v.avaliableInventory}</p>) : null
                );
            }
        },
        {
            title: '订单占用',
            key: 'occupyInventory',
            align: 'center',
            render: (text, record) => {
                return(
                    record.lstStock ? record.lstStock.map(v => <p className={parseInt(v.occupyInventory) === 0 ? 'stockout-red' : ''}>{v.occupyInventory}</p>) : null
                );
            }
        },
    ];
    
    // 表格
    columns = [
        {
            title: '单号',
            render: (text, record) => {
                return (
                    <div className="order-tablelist-div" style={{minWidth: 190}}>
                        <p>
                            <span className="order-tablelist-span1">包裹单号:</span>
                            <span className="order-tablelist-span3">{record.packageCode}</span>
                        </p>
                        <p>
                            <span className="order-tablelist-span1">平台单号:</span> 
                            <span className="order-tablelist-span3">{record.orderSourceId}</span>
                        </p>
                    </div>
                )
            }
        }, {
            title: '平台',
            render: (text, record) => {
                return (
                    <div className="order-tablelist-div order-tablelist-div2 order-tablelist-div3" style={{minWidth: 120}}>
                        <p>
                            <span>销售平台:</span>
                            <span>{record.platformName}</span>
                        </p>
                        <p>
                            <span>销售账号:</span>
                            <span>{record.sellerId}</span>
                        </p>
                    </div>
                );
            }
        },
        {
            title: '时间',
            render: (text, record) => {
                return (
                    <div className="order-tablelist-div" style={{minWidth: 190}}>
                        <p>
                            <span className="order-tablelist-span2">付款时间:</span>
                            <span className="order-tablelist-span3">{timestampFromat(record.paymentTime, 2)}</span>
                        </p>
                        <p>
                            <span className="order-tablelist-span2">最晚发货时间:</span> 
                            <span className="order-tablelist-span3">{timestampFromat(record.deliveryDeadline, 2)}</span>
                        </p>
                    </div>
                )
            }
        },
        {
            title: '物流渠道',
            align: 'center',
            dataIndex: 'channelName',
            key: 'channelName',
            render: (text, record) => {
                return(
                    <div style={{minWidth: 120}}>
                        {text}
                    </div>
                )
            }
        }, {
            title: '状态',
            render: (text, record) => {
                return (
                    <div className="order-tablelist-div order-tablelist-div2 order-tablelist-div3" style={{minWidth: 120}}>
                        <p>
                            <span>平台状态:</span>
                            <span>{record.platformState}</span>
                        </p>
                        <p>
                            <span>库存状态:</span>
                            {
                                record.stockStateName === '无库存' && functions(this, '001-000003-000004-009') ? (
                                    <a
                                        className="stockout-tablelist-state"
                                        onClick={() => this.handleStorckStackClick(record.packageCode)}>
                                        {record.stockStateName}
                                    </a>)
                                    :
                                    <span className="colorRed">{record.stockStateName}</span>
                            }
                        </p>
                    </div>
                );
            }
        },
        {
            title: '发货优先级',
            align: 'center',
            dataIndex: 'deliveryPriority',
            key: 'deliveryPriority',
            width: 80,
            render: (text, record) => {
                const { priorityLoading } = this.state;
                return (
                    functions(this, '001-000003-000004-008') ?
                        <Select
                            defaultValue={record.deliveryPriority}
                            onSelect={(val) => this.handlePrioritySelect(val, record.packageCode)}
                            loading={priorityLoading}
                            className="stockoutpackage-deliveryPriority"
                        >
                            {
                                DELIVERY_PRIORITY.map(v => <Option key={v.key} value={v.key}>{v.value}</Option>)
                            }
                        </Select>
                    : DELIVERY_PRIORITY[Number(record.deliveryPriority) - 1].value
                )
            }
        },
        {
            title: '操作',
            align: 'center',
            width: 100,
            dataIndex: 'Operation',
            key: 'Operation',
            render: (text, record, index) => {
                const url = `/order/deliveryparcellist/deliveryparceldetail/?orderId=${record.packageCode}&exceptionType=1`
                const menu = (
                    <Menu>
                        {
                            functions(this, '001-000003-000004-005') ?
                                <Menu.Item>
                                    <a onClick={()=>this.handleBatchOpen(record.packageCode)}>撤单</a>
                                </Menu.Item>
                            : null
                        }

                        {
                            functions(this, '001-000003-000004-004') ?
                                <Menu.Item>
                                    <a onClick={() => this.toggleRolloverPackage(true, record)}>
                                        转仓
                                    </a>
                                </Menu.Item>
                            : null
                        }

                        {
                            functions(this, '001-000003-000004-004') ?
                                <Menu.Item>
                                    <a onClick={() => this.toggleRolloverPackage(true, record)}>
                                        渠道修改
                                    </a>
                                </Menu.Item>
                            : null
                        }

                        {
                            functions(this, '001-000003-000004-003') ?
                                <Menu.Item>
                                    <Link  to={`${url}&ifConsigneeInfoEditable=true`} target="_blank">修改收货人信息</Link>
                                </Menu.Item>
                            : null
                        }
                    </Menu>);

                return (
                    <div className="actions-btns">
                        {functions(this, '001-000003-000004-002') ? 
                            <Link to={url} target="_blank">查看</Link>
                         : null}
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
     * 撤单/批量撤单 - 打开
     */
    handleBatchOpen = (packageCode) => {
        const { selectedRowKeys } = this.props;
        if (!packageCode && selectedRowKeys.length === 0) {
            message.warning("请至少选择一条数据!");
            return;
        }
        this.setState({
            keysArr: packageCode ? [packageCode] : selectedRowKeys,
            auditVisible: true,
        });
    }

    /**
     * 撤单/批量撤单 - 关闭
     */
    handleBatchCancel = () => {
        this.setState({
            auditVisible: false,
            auditLoading: false,
        });
    }

    /**
     * 撤单/批量撤单 - 确认
     */
    handleBatchOk = () => {
        const { pageNumber, pageData } = this.props;
        const { getFieldsValue } = this.props.form;
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
        this.setState({ auditLoading: true });
        fetchPost(EXAMINE_DEFICIT_PACKAGE, { packageList: listArr }, 1)
            .then(data => {
                if (data.state == '000001') {
                    this.handleBatchCancel();
                    //刷新列表数据
                    this.props.onSearch(pageNumber, pageData);
                    this.props.changeSelectedAction([]);
                }
            })
    }

    /**
     * 撤单/批量撤单 - 停止loading
     */
    handleAuditLoading = () => {
        this.setState({ auditLoading: false });
    }

    /**
     * 修改发货优先级
     */
    handlePrioritySelect = (key, packageCode) => {
        this.setState({ priorityLoading: true });
        const { pageNumber, pageData } = this.props;
        fetchPost(UPDATE_PRIORITY, {data: { packageCode, deliveryPriority: key }}, 1)
            .then(data => {
                if (data.state == '000001') {
                    //刷新列表数据
                    this.props.onSearch(pageNumber, pageData);
                    this.setState({ priorityLoading: false });
                } 
        })
    }
    /**
     * 转仓/渠道修改 - 选择仓库
     **/
    handleWarehouse = (value) => {
        const { setFieldsValue } = this.props.form;
        this.setState({
            channelData: [],
        });
        setFieldsValue({
            forecastFreight: null,
            channelCode: null,
        });

    }

    /**
     * 转仓/渠道修改弹窗 - 选择渠道
     */
    handleTrialShipping = (value) =>{
        const { getFieldValue, setFieldsValue } = this.props.form;
        const params = {};
        params.channel = value;
        params.packageCode = getFieldValue('packageCode');
        params.warehouse = getFieldValue('warehouseCode');
        this.setState({
            saveLoading: true
        })
        fetchPost(TRIAL_SHIPPING, params, 2).then(res => {
            if(res && res.state === '000001'){
                this.setState({
                    freight: res.freight,
                    remoteFee: res.remoteFee,
                    currency: res.currency,
                    saveLoading: false,
                });
                setFieldsValue({
                    forecastFreight: res.result
                });
            }else {
                setFieldsValue({
                    forecastFreight: null
                });
            }
        })
    }

    /**
     * 转仓/渠道修改弹窗 - 打开/关闭
     */
    toggleRolloverPackage = (bol, record) =>{
        const {setFieldsValue} = this.props.form;
        this.setState({ visible1: bol });
        if(record){
            this.setState({
                channelData: [{
                    channel_code: record.channelCode,
                    channel_name: record.channelName,
                }]
            }, () => {
                setFieldsValue({
                    packageCode: record.packageCode,
                    warehouseCode: record.warehouseCode,
                    channelCode: record.channelCode,
                    forecastFreight: `${record.trialFreightCurrency} ${record.trialFreight.toFixed(2)}`
                });
            });
        }
    }

    /**
     * 转仓/渠道修改弹窗 - 确定
     */
    saveRolloverPackage = () =>{
        const { validateFields } = this.props.form;
        const { freight, remoteFee, currency } = this.state;
        const { onSearch, pageNumber, pageData } = this.props;
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
                fetchPost(ROLLOVER_PACKAGE, params, 1)
                    .then(res => {
                        if(res && res.state === '000001'){
                            this.setState({
                                visible1: false,
                                saveLoading: false,
                            });
                            onSearch(pageNumber, pageData);
                        }
                    })
            }
        })
    }

    /**
     * 选中项
     */
    onSelectChange = (selectedRowKeys) => {
        this.props.changeSelectedAction(selectedRowKeys);
    }

    /**
     * 数据导出
     */
    handleExportOk = () => {
        const params = this.props.filterParams();
        delete params.pageNumber;
        delete params.pageData;
        fetchPost(EXPORT_LIST, {data: params}, 1)
            .then(res => {
                if (res.state == '000001') {
                    setTimeout(() => {
                        location.href = '/order/basicdata/importexportrecords/';
                    }, 1000);
                }
            })
    }

    /**
     * 获取缺货包裹库存详情
     */
    handleStorckStackClick = (packageCode) => {
        this.setState({ visible2: true });
        fetchPost(GET_PACKAGE_STOCK_DETAIL, {data: {packageCode}}, 2)
            .then(res => {
                if (res.state == '000001') {
                    this.setState({ inventoryDetail: res.data.list})
                }
            })
    }
  
    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const {
            onSearch, pageNumber, pageData, tabledata, loadingState,
        } = this.props;
        const { total } = tabledata;
        const columns = this.columns;
        const { inventoryDetail, auditVisible, auditLoading } = this.state;
        const { selectedRowKeys } = this.props;

        // 表格打印
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
          
        const menu = (
            <Menu>
                <Menu.Item>
                {functions(this, '001-000003-000004-006') ?
                    <p  onClick={() => this.handleBatchOpen()}>
                        批量撤单
                    </p> 
                : null}
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="breadcrumb">
                <div className="margin-ss-left padding-sm-top rightbtn clear">
                    <div className="pull-left">
                        <Dropdown overlay={menu}>
                            <Button>批量操作<Icon type="down" /></Button>
                        </Dropdown>
                    </div>
                    {functions(this, '001-000003-000004-007') ?
                        <div className="pull-right margin-ss-right">
                            <Button icon="upload"  onClick={() => PopConfirm('数据导出', 
                                        '确定导出当前搜索条件下所有数据吗？', 
                                        ()=>this.handleExportOk())}>数据导出</Button>
                        </div>
                    : null}
                </div>
                <div className="margin-sm padding-sm-bottom">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={tabledata.list}
                            bordered
                            size="small"
                            pagination={false}
                            rowKey={record => record.packageCode}
                        />
                    </Spin>
                    <Pagination showTotal={total => `共 ${total} 条`} showTitle
                                pageSizeOptions={levelOptions('分页显示条数')}
                                showSizeChanger showQuickJumper={{goButton: true}}
                                current={pageNumber}
                                defaultCurrent={1} onShowSizeChange={onSearch}
                                total={total}
                                pageSize={pageData}
                                onChange={onSearch}/>
                </div>
                <div>
                    <Modal
                        title="转仓/渠道修改"
                        visible={this.state.visible1}
                        maskClosable={false}
                        onCancel={() => this.toggleRolloverPackage(false)}
                        footer={null}
                    >
                        <FormItem
                            {...this.formItemLayout}
                            label="分仓订单号"
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
                                <Select
                                    className={'ant-xs-row'}
                                    placeholder="请选择"
                                    onChange = {this.handleWarehouse}
                                >
                                    <Option key={'1'} value={'CCN001'}>国内1号仓</Option>
                                    <Option key={'3'} value={'CCN003'}>国内3号仓</Option>
                                    <Option key={'4'} value={'CFT004'}>国内4号仓（虚拟第三方保宏仓）</Option>
                                </Select>
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
                                    localSearch = {1} // 是否支持前端模糊查询
                                    apiListType={2} // 数组取值名称 0 默认data -> list  1 data -> data 2 data
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
                    <AuditModal
                        {...this.props}
                        visible={auditVisible}
                        auditLoading={auditLoading}
                        closeModal={this.handleBatchCancel}
                        handleAudit={this.handleBatchOk}
                        handleAuditLoading={this.handleAuditLoading}
                    />
                </div>
                <Modal
                    title="库存详情"
                    visible={this.state.visible2}
                    maskClosable={false}
                    onCancel={() => {this.setState({ visible2: false })}}
                    footer={<Button onClick={() => {this.setState({ visible2: false })}}>关闭</Button>}
                >
                    <div className="inventory-detail-modal">
                        <Table
                            columns={this.columns2}
                            dataSource={inventoryDetail}
                            bordered
                            size="small"
                            pagination={false}
                            rowKey={record => record.skuCode}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Tablelist
