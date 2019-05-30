/**
 * 描述: 包裹订单 - 全部包裹 - 列表组件
 * 时间: 2018/4/18 0018 下午 8:38
 **/
import React from 'react';
import PopConfirm from '@/common/components/confirm';
import {
    Form,
    Button,
    Select,
    Table,
    Pagination,
    Spin,
    message,
    Menu,
    Dropdown,
    Icon,
    Modal,
    Input,
} from 'antd';
import {
    timestampFromat,
    getGangeGimes,
    functions,
    downloadUrl
} from 'util/baseTool';
import { Link } from 'react-router-dom';
import {levelOptions} from "util/options";
import {fetchPost} from "util/fetch";
import CSelect from "@/components/cselect";
import {
    CANCEL_PACKAGE,
    RECOVER_PACKAGE,
    TRIAL_SHIPPING,
    ROLLOVER_PACKAGE,
    EXPORT_ORDER,
    GETCHANNEL_CODES_BYPLAT_FORMANDWAREHOUSE,
    BATCH_REVOKE,
    EXAMINE_DEFICIT_PACKAGE,
    REGET_PACKAGE_CHANNEL,
} from '../constants';
import BatchOptionModal from '@/components/BatchOptionModal/BatchOptionModal.js';
import { datasaddkey, getLoginmsg, } from "util/baseTool";
import AuditModal from './AuditModal';

const FormItem = Form.Item;
const Option = Select.Option;

export default class Tablelist extends React.Component {
    state = {
        export: false,
        visible: false,     // 转仓/渠道修改visible
        channelData: [],
        freight: null,
        remoteFee: null,
        currency: null,
        saveLoading: false,
        batchRolloverVisible: false,    // 批量转仓/修改渠道弹窗visible
        warehouseData: [],
        auditVisible: false,    // 审核弹窗visible
        auditLoading: false,    // 审核弹窗loading
        keysArr: [],
        isNeedAudit: false,   // 是否是待审核记录
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

    columns = [
        {
            title: '单号',
            render: (text, record, index) => {
                // 包裹单号
                const pathname = location.pathname;
                const warehouseOrderNumber = record.warehouseOrderNumber;
                let url = `${pathname}deliveryparceldetail/?orderId=${warehouseOrderNumber}&exceptionType=${record.exceptionType}`;
                // YKS单号
                let url2 = `/order/orderlist/orderdetail/?orderId=${record.yksOrderNumber}`
                if (record.isException == 1) {
                    url2 = `/order/exceptionorderlist/exceptionorderdetail/?orderId=${record.yksOrderNumber}`
                }
                // 平台单号： 速卖通平台的展示超链接，其他平台暂时先屏蔽
                let url3 = `/order/platformorder/smt/smtorderdetail/?platformNumber=${record.platformOrderNumber}`;
                return (
                    <div className="order-tablelist-div" style={{minWidth: 190}}>
                        <p>
                            <span className="order-tablelist-span1">包裹单号:</span>
                            {
                                functions(this, '001-000003-000001-002')?<Link className="colorBlue breakwrod order-tablelist-span3" to={url} target="_blank">{record.warehouseOrderNumber}</Link>:null
                            }
                        </p>
                        <p>
                            <span className="order-tablelist-span1">YKS单号:</span>
                            {
                                functions(this, '001-000003-000001-002')?<Link className="colorBlue breakwrod order-tablelist-span3" to={url2} target="_blank">{record.yksOrderNumber}</Link>:null
                            }
                        </p>
                        <p>
                            <span className="order-tablelist-span1">平台单号:</span> 
                            {
                                record.platformName === '速卖通' ? (
                                    functions(this, '001-000003-000001-002')?
                                    <Link  className="colorBlue breakwrod order-tablelist-span3" to={url3} target="_blank">{record.platformOrderNumber}</Link>
                                    :null
                                ) : <span className="order-tablelist-span3">{record.platformOrderNumber}</span>
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
                        <p><span>销售账号:</span><span>{record.ordersBelongAccount}</span></p>
                        <p><span>国家全称:</span><span>{record.country}</span></p>
                    </div>
                );
            }
        }, {
            title: '物流',
            render: (text, record, index) => {
                return (
                    <div className="order-tablelist-div order-tablelist-div2" style={{minWidth: 140}}>
                        <p><span>物流渠道:</span><span>{record.logisticsBusiness}</span></p>
                        <p><span>发货仓库:</span><span>{record.deliver}</span></p>
                    </div>
                );
            }
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
        },
        {
            title: '试算运费成本',
            className: 'textalign',
            dataIndex: 'trialFreight',
            key:'trialFreight',
            width: 120,
            render: (text, record) => {
                const trialFreight = record.trialFreight;
                return <div>{record.trialFreightCurrency} {trialFreight ? trialFreight.toFixed(2) : null}</div>
            },
        }, {
            title: '是/否',
            render: (text, record, index) => {
                return (
                    <div className="order-tablelist-div" style={{minWidth: 80}}>
                        <p><span className="order-tablelist-span1" style={{width: 56}}>偏远地区:</span><span className={record.isFaraway === '是' ? "colorRed" : ''}>{record.isFaraway}</span></p>
                        <p><span className="order-tablelist-span1" style={{width: 56}}>负利润:</span><span className={record.isProfit === '是' ? "colorRed" : ''}>{record.isProfit}</span></p>
                    </div>
                );
            }
        }, {
            title: '状态',
            render: (text, record, index) => {
                const arr = ['待审核', '待推送', '推送失败'];
                return (
                    <div className="order-tablelist-div" style={{minWidth: 140}}>
                        <p><span className="order-tablelist-span2">平台订单状态:</span><span>{record.orderStatus}</span></p>
                        <p><span className="order-tablelist-span2">分仓订单状态:</span><span className={arr.includes(record.warehouseState) ? "colorRed" : ""}>{record.warehouseState}</span></p>
                        <p><span className="order-tablelist-span2">老ERP状态:</span><span className={record.erpStatus == "亏本撤单" ? "colorRed" : ""}>{record.erpStatus ? record.erpStatus : '--'}</span></p>
                    </div>
                );
            }
        },
        {
            title: '操作',
            className: 'textalign',
            width: 120,
            dataIndex: 'Operation',
            key:'Operation',
            render: (text, record, index) => {
                const cancelRecoverOptFlag = Number(record.cancelRecoverOptFlag) || 0;  // 是否可撤单
                const rolloverPackageFlag = Number(record.rolloverPackageFlag) || 0;     // 是否可转仓或修改渠道
                const ifAllowRecover = Number(record.ifAllowRecover);       // 是否可恢复订单
                const isPlatRevoke = record.isPlatRevoke || '';     // 是否平台撤单
                const warehouseState = record.warehouseState;
                const pathname = location.pathname;
                const warehouseOrderNumber = record.warehouseOrderNumber;
                let url = `${pathname}deliveryparceldetail/?orderId=${warehouseOrderNumber}&exceptionType=${record.exceptionType}`;
                const menu = (
                    <Menu>
                        {
                            cancelRecoverOptFlag === 1 ?
                                <Menu.Item>
                                    <a onClick={() => this.handleAuditOpen(record)}>
                                        撤单
                                    </a>
                                </Menu.Item>
                            : null
                        }

                        {
                            warehouseState === '待审核' || warehouseState === '待确认' ?
                                <Menu.Item>
                                    <a onClick={() => this.handleAuditOpen(record)}>
                                        审核
                                    </a>
                                </Menu.Item>
                            : null
                        }

                        {
                            ifAllowRecover === 1 ?
                                <Menu.Item>
                                    <a onClick={() => PopConfirm('是否需要恢复订单？', '', () => this.changePackage(record.warehouseOrderNumber))}
                                        style={{display:"inline-block" }}>
                                        恢复订单
                                    </a>
                                </Menu.Item>
                            : null
                        }

                        {
                            rolloverPackageFlag === 1 ?
                                <Menu.Item>
                                    <a onClick={this.toggleRolloverPackage.bind(this,{visible: true}, record)}>
                                        转仓
                                    </a>
                                </Menu.Item>
                            : null
                        }

                        {
                            rolloverPackageFlag === 1 ?
                                <Menu.Item>
                                    <a onClick={this.toggleRolloverPackage.bind(this,{visible: true}, record)}>
                                        渠道修改
                                    </a>
                                </Menu.Item>
                            : null
                        }

                        {
                            warehouseState === '渠道异常' ?
                                <Menu.Item>
                                    <a onClick={() => PopConfirm('重新创建', 
                                        '确定重新创建吗？', 
                                        ()=>this.recreate(record.warehouseOrderNumber))}>
                                        重新创建
                                    </a>
                                </Menu.Item>
                            : null
                        }

                        {
                            // warehouseState === '推送失败' || warehouseState === '待审核' || warehouseState === '已撤单' && !isPlatRevoke ?
                            warehouseState === '已推送' || warehouseState === '已发货' || warehouseState === '已撤单' || warehouseState === '平台撤单' ? null :
                                <Menu.Item>
                                    <Link  to={`${url}&ifConsigneeInfoEditable=true`} target="_blank">修改收货人信息</Link>
                                </Menu.Item>
                            // : null
                        }

                    </Menu>);
                return (
                    <div style={{display:"flex","justifyContent":"center"}}>
                        {
                            functions(this, '001-000003-000001-002')?<Link  to={url} target="_blank">查看</Link>:null
                        }
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link margin-ss-left">
                                更多 <Icon type="down"/>
                            </a>
                        </Dropdown>
                    </div>
                )
            },
        }
    ];

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

    /**
     * 修改渠道
     * value 渠道ID
     */
    handleTrialShipping = (value) =>{
        const { getFieldValue, setFieldsValue } = this.props.form;
        const params = {};
        params.channel = value;
        params.packageCode = getFieldValue('packageCode');
        params.warehouse = getFieldValue('warehouseCode');
        this.setState({
            saveLoading: true
        });
        fetchPost(TRIAL_SHIPPING, params).then(res => {
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
                if(!res.result){
                    message.error(res.msg)
                }else{
                    message.error(res.result)
                }

            }
        })
    }

    /**
     * 打开或关闭转仓或修改渠道弹窗
     * stateObj     {visible: false}
     * record       列表数据
     */
    toggleRolloverPackage = (stateObj, record) =>{
        const {setFieldsValue} = this.props.form;
        this.setState(stateObj);
        if(record){
            let warehouseCode = null;
            const code = record.distribution;
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
            setFieldsValue({
                packageCode: record.warehouseOrderNumber,
                warehouseCode: warehouseCode,
                channelCode: record.channelCode,
                forecastFreight: `${record.trialFreightCurrency} ${record.trialFreight.toFixed(2)}`
            });
            this.setState({
                channelData: [{
                    channel_code: record.channelCode,
                    channel_name: record.logisticsBusiness,
                }]
            })
        }
    }

    /**
     * 转仓或修改渠道 - 确定
     */
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
                fetchPost(ROLLOVER_PACKAGE, params, 2).then(res => {
                    if(res && res.state === '000001'){
                        setTimeout(()=>{
                            message.success(res.msg);
                            this.setState({
                                visible: false,
                                saveLoading: false,
                            });
                            // this.props.fetchPosts({key: 'data', value})
                            this.props.onSearch(pageNumber, pageData);
                        }, 3000);
                    }
                })
            }
        })
    }

    /**
     * 订单导出
     */
    export = () => {
        const filter = this.props.filterParams();
        delete filter.pageNumber;
        delete filter.pageData;
        fetchPost(EXPORT_ORDER, filter, 2)
            .then(result => {
                if(result.state === '000001'){
                    this.setState({export: true})
                    window.location.href="/order/basicdata/importexportrecords/"
                }
            })
    }

    /**
     * 选择数据
     */
    onSelectChange = (selectedRowKeys, selectedRow) => {
        this.props.tablemodelaction({ selectedRowKeys, selectedRow });
    }

    /**
     * 恢复订单
     **/
    changePackage = (code)=>{
        const params = {packageCode: code};
        const { pageNumber, pageData } = this.props;
        fetchPost(RECOVER_PACKAGE, params, 2)
            .then(res=>{
                if(res && res.state === "000001"){
                    message.success(res.msg);
                    this.props.onSearch( pageNumber, pageData );
                }
            })
    }

    /**
     * 批量恢复
     */
    batchRevokeOrRecover = () => {
        const { selectedRowKeys } = this.props.tablemodel;
        const { onSearch, pageNumber, pageData } = this.props;
        if (selectedRowKeys.length === 0) {
            message.info('请至少选择一条数据!');
            return;
        }
        fetchPost('/oms/order/manage/motan/IPackageApi/batchRecoverPackage', {packageCodes: selectedRowKeys}, 1)
            .then(result => {
                if(result.state === '000001'){
                    this.props.tablemodelaction({ selectedRowKeys: [] });
                    onSearch(pageNumber, pageData);
                }
            })
    }

    /**
     * 审核 - 打开
     */
    handleAuditOpen = (record) => {
        const { warehouseOrderNumber, warehouseState } = record;
        this.setState({
            keysArr: [warehouseOrderNumber],
            auditVisible: true,
            isNeedAudit: warehouseState === '待审核' || warehouseState === '待确认' ? true : false,
        });
    }

    /**
     * 批量审核 - 打开
     */
    handleBatchAuditOpen = () => {
        const { selectedRowKeys, selectedRow } = this.props.tablemodel;
        let ifHavingNeedAudit = false;
        let ifHavingOthers = false;
        if(selectedRow.length === 0) {
            message.warning("无选中订单");
            return;
        } else if (selectedRow.length > 0) {
            const stateArr = Array.from(new Set(selectedRow.map(v => v.warehouseState)));
            for (let i in stateArr) {
                if(stateArr[i] === '待审核') {
                    ifHavingNeedAudit = true;
                } else {
                    ifHavingOthers = true;
                }
            }
            if(ifHavingNeedAudit && ifHavingOthers){
                message.warning("请单独对分仓状态为 “待审核” 的数据进行批量操作！");
                return;
            } else {
                this.setState({
                    keysArr: selectedRowKeys,
                    auditVisible: true,
                    isNeedAudit: ifHavingNeedAudit && !ifHavingOthers,
                });
            }
        }
    }

    /**
     * 审核/批量审核 - 确认
     */
    handleAuditOk = () => {
        const { onSearch, tablemodelaction } = this.props;
        const { pageNumber, pageData } = this.props;
        const { getFieldsValue } = this.props.form;
        this.setState({
            auditLoading: true,
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
        fetchPost( EXAMINE_DEFICIT_PACKAGE, { packageList: listArr }, 1)
            .then(data => {
                if (data.state == '000001') {
                    this.handleAuditCancel();
                    onSearch(pageNumber, pageData);
                    tablemodelaction({ selectedRowKeys: [] });
                }
            })
    }

    /**
     * 审核/批量审核 - 关闭
     */
    handleAuditCancel = () => {
        this.setState({
            auditLoading: false,
            auditVisible: false,
            isNeedAudit: false,
            keysArr: [],
        });
        this.props.form.resetFields(['auditStatus', 'auditRemark', 'revokeType']);
    }

    /**
     * 审核/批量审核 - 停止loading
     */
    handleStopLoading = () => {
        this.setState({ auditLoading: false });
    }

    /**
     * 重新创建
     */
    recreate = (packageCode) => {
        const { pageNumber, pageData } = this.props;
        fetchPost(REGET_PACKAGE_CHANNEL, {data: {packageCodes: [packageCode]}}, 1)
            .then(res => {
                if (res.state == '000001') {
                    //刷新列表数据
                    this.props.onSearch(pageNumber, pageData);
                    this.props.tablemodelaction({ selectedRowKeys: [] });
                } 
        })
    }

    /**
     * 批量重新创建
     */
    batchRecreate = () => {
        const { pageNumber, pageData } = this.props;
        const { selectedRowKeys } = this.props.tablemodel;
        if (selectedRowKeys.length === 0) {
            message.error("请至少选择一条数据!");
            return;
        }
        PopConfirm('批量重新创建', '确定重新创建所有选中订单吗？', () => {
            fetchPost(REGET_PACKAGE_CHANNEL, {data: {packageCodes: selectedRowKeys}}, 1)
                .then(data => {
                    if (data.state == '000001') {
                        //刷新列表数据
                        this.props.onSearch(pageNumber, pageData);
                        this.props.tablemodelaction({ selectedRowKeys: [] });
                    } 
            })
        })
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { data, selectedRowKeys } = this.props.tablemodel;
        const newdata = datasaddkey(data.data)
        const {  onSearch } = this.props;
        const columns = this.columns;
        const { pageNumber, pageSize } = this.props.Paginationmodel;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const { auditVisible, auditLoading, isNeedAudit } = this.state;
        const warehouseState = getFieldValue('warehouseState')[0];

        const menu = (
            <Menu>
                {
                    functions(this, '001-000003-000001-004') ?
                        <Menu.Item>
                            <p onClick={() => this.handleBatchAuditOpen()}>
                                {
                                    warehouseState === '6' ? '批量审核' : '批量撤单'
                                }
                            </p>
                        </Menu.Item>
                    : null
                }

                {
                    functions(this, '001-000003-000001-005') ?
                        <Menu.Item>
                            <p onClick={() => PopConfirm('是否进行批量恢复？', '', () => this.batchRevokeOrRecover())}>
                                批量恢复
                            </p>
                        </Menu.Item>
                    : null
                }
                {
                    functions(this, '001-000003-000001-006') ?
                        <Menu.Item>
                            <p onClick={() => {this.setState({batchRolloverVisible: true})}}>
                                转仓/修改渠道
                            </p>
                        </Menu.Item>
                    : null
                }

                {
                    warehouseState === '10' ?
                        <Menu.Item>
                            <p onClick={this.batchRecreate}>
                                重新创建
                            </p> 
                        </Menu.Item>
                    : null
                }
            </Menu>
        );


        return (
            <div className="newCluenk margin-ms-top rightbtn clear">
                <div className="padding-sm-top deliveryparcelist-optionBtn">
                    <div className="pull-left margin-ss-left ">
                        <Dropdown overlay={menu}>
                            <Button>批量操作<Icon type="down" /></Button>
                        </Dropdown>
                    </div>
                    <div className="pull-right padding-ss-right">
                        {functions(this, '001-000003-000001-003')?<Button icon="upload" onClick={this.export} disabled={this.state.export}>
                            订单导出
                        </Button>:null}

                    </div>
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
                    <Pagination
                        showTotal={total => `共 ${total} 条`} showTitle
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger showQuickJumper={{goButton:true}}
                        current={this.props.Paginationmodel.current}
                        defaultCurrent={1} onShowSizeChange={onSearch}
                        total={this.props.Paginationmodel.total}
                        pageSize={pageSize}
                        onChange={onSearch}/>
                </div>
                <div>
                    <Modal
                        title="转仓/渠道修改"
                        visible={this.state.visible}
                        // onOk={this.saveRolloverPackage}
                        onCancel={this.toggleRolloverPackage.bind(this,{visible: false},null)}
                        footer={null}
                        maskClosable={false}
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
                                    isNotCache={true}
                                    code='channel_code' // 列表编码字段
                                    name='channel_name' // 列表名称字段
                                    url={GETCHANNEL_CODES_BYPLAT_FORMANDWAREHOUSE}
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
                                onClick={this.toggleRolloverPackage.bind(this,{visible: false},null)}
                            >
                                取消
                            </Button>
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
                    <AuditModal
                        {...this.props}
                        visible={auditVisible}
                        loading={auditLoading}
                        isNeedAudit={isNeedAudit}
                        closeModal={this.handleAuditCancel}
                        handleAudit={this.handleAuditOk}
                        handleStopLoading={this.handleStopLoading}
                    />
                </div>
            </div>
        );
    }
}

// export default Tablelist
