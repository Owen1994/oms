import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Button,
    message,
    Tooltip,
} from 'antd';
import { Link } from 'react-router-dom';
import { levelOptions } from '../../../../../util/options';
import { getLoginmsg,popUpImage, } from '../../../../../util/baseTool';
import Functions from '../../../../../components/functions';
import imgQQ from '../../../documentarymanage/img/qq.png';
import imgWangWang from '../../../documentarymanage/img/wangwan.png';
import { parseStrToArray } from '@/util/StrUtil';
import { setPageCache } from '../../../../../util/PageCache';
import {getTimeStamp} from "../../../../../compliance/utils";
import LogisticsCom from './logisticsCom';
import PopConfirm from "../../../../../common/components/confirm";
import { fetchPost } from "../../../../../util/fetch";
import { CHANGE_ERROR_ORDER } from '../../constants';
import ModelCom from './modelCom';


export default class Tablelist extends React.Component {
    state = {
        selectedRowKeys: [],
        logisticsVisible: false,
        editVisible: false,
        data: {}
    }

    list = [{key: getLoginmsg().userName, label: getLoginmsg().personName}];
    listOeEmployee = [{key: '0', label: '全部'}];
    columns = [
        {
            title: 'PR单号',
            width: 100,
            dataIndex: 'prNumber',
            key: 'prNumber',
        },
        {
            title: '图片',
            dataIndex: 'imgUrl',
            width: 40,
            key: 'imgUrl',
            render: text => (
                <div className="table-img" onClick={() => popUpImage(text, true)}>
                    <img src={text} alt="图片" />
                </div>
            ),
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            width: 140,
            key: 'sku',
            render: (text, record) => {
                return(<div>
                    <p className="text-left">{record.sku}</p>
                    <p className="text-left">{record.productDesc}</p>
                    <p className="text-right"><span className={record.selllState === "正常销售" ? "green" : "red"}>{record.selllState}</span></p>
                </div>)
            }
        },
        {
            title: '下单信息',
            dataIndex: 'orderInformation',
            width: 140,
            key: 'orderInformation',
            render: (text, record) => {
                return (
                    <div className="orderException">
                        <div className="text-left">
                            <p>
                                <span className="span-4">
                                采购数量:
                                </span>
                                <span className="span-content">
                                    {record.purchaseCount}
                                </span>
                            </p>
                            <p>
                                <span className="span-4">
                                    下单仓库:
                                </span>
                                <span className="span-content">
                                    {record.wareHouse}
                                    </span>
                            </p>
                            <p>
                                <span className="span-4">
                                    网拍链接:
                                </span>
                                <span className="span-content text-success" onClick={() => this.copy(record)}>
                                    打开链接
                                </span>
                            </p>
                            <p>
                                <span className="span-4">
                                    日均销量:
                                </span>
                                <span className="span-content">
                                    {record.averageSales}
                                </span>
                            </p>
                        </div>
                    </div>
                )
            }
        },
        {
            title: '供应商',
            dataIndex: 'supplier',
            width: 120,
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p>
                            <span className="span-4">
                               供应商:
                            </span>
                            <span className="span-content">
                                {record.supplier}
                            </span>
                        </p>
                        <p>
                            <span className="span-4">
                                付款方式:
                            </span>
                            <span className="span-content">
                                {record.payType}
                                </span>
                        </p>
                        <p>
                            <span className="span-4">
                                 交期:
                            </span>
                            <span className="span-content">
                                {record.deliveryDay}
                            </span>
                        </p>
                    </div>
                )
            }
        },
        {
            title: '金额',
            dataIndex: 'amountofmoney',
            width: 140,
            key: 'amountofmoney',
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p>
                            <span className="span-4">
                               参考价:
                            </span>
                            <span className="span-content">
                                {record.referencePrice}
                            </span>
                        </p>
                        <p>
                            <span className="span-4">
                                供应商报价:
                            </span>
                            <span className="span-content">
                                {record.supplierPrice}
                                </span>
                        </p>
                        <p>
                            <span className="span-4">
                                 采购单价:
                            </span>
                            <span className="span-content">
                                {record.purchasingPrice}
                            </span>
                        </p>
                        <p>
                            <span className="span-4">
                                 采购金额:
                            </span>
                            <span className="span-content">
                                {record.purchasePrice}
                            </span>
                        </p>
                    </div>
                )
            }
        },
        {
            title: '角色',
            dataIndex: 'role',
            width: 100,
            key: 'role',
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p>
                            <span className="span-4">
                               计划员:
                            </span>
                            <span className="span-content">
                                {record.planRole}
                            </span>
                        </p>
                        <p>
                            <span className="span-4">
                                订货员:
                            </span>
                            <span className="span-content">
                                {record.opEmployee}
                                </span>
                        </p>
                        <p>
                            <span className="span-4">
                                 跟单员:
                            </span>
                            <span className="span-content">
                                {record.merchandiser}
                            </span>
                        </p>
                        <p>
                            <span className="span-4">
                                 开发员:
                            </span>
                            <span className="span-content">
                                {record.developer}
                            </span>
                        </p>
                    </div>
                )
            }
        },
        {
            title: '时间',
            dataIndex: 'time',
            width: 140,
            key: 'time',
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p>
                            <span className="span-4">
                               上传时间:
                            </span>
                            <span className="span-content">
                                {record.uploadTime}
                            </span>
                        </p>
                        <p>
                            <span className="span-4">
                                需求时间:
                            </span>
                            <span className="span-content">
                                {record.demandTime}
                                </span>
                        </p>
                        <p>
                            <span className="span-4">
                                 交货/取货:
                            </span>
                            <span className="span-content">
                                {record.deliveryTime}
                            </span>
                        </p>
                        <p>
                            <span className="span-4">
                                 转异常时间:
                            </span>
                            <span className="span-content">
                                {record.turnaroundTime}
                            </span>
                        </p>
                    </div>
                )
            }
        },
        {
            title: '采购备注',
            dataIndex: 'remark',
            width: 30,
            key: 'remark',
            render: (value) => (<Tooltip  title={value}>
                <div className="pms-prmanage-remark one-ellipsis" style={{width: "30px"}}>{value}</div>
            </Tooltip>),
        },
        {
            title: '异常原因',
            dataIndex: 'abnormalReason',
            width: 30,
            key: 'abnormalReason',
            render: (value) => (<Tooltip  title={value}>
                <div className="pms-prmanage-remark one-ellipsis" style={{width: "30px"}}>{value}</div>
            </Tooltip>),
        },
        {
            title: '操作',
            dataIndex: 'handle',
            width: 60,
            key: 'handle',
            render: (text, record) => (
                record.isEdit ? (
                    <Functions
                        {...this.props}
                        functionkey="010-000003-000001-014"
                    >
                        <a href=" javascript:;" onClick={() => this.editHandle(record)}>编辑</a>
                    </Functions>
                ) : (
                    <Functions
                        {...this.props}
                        functionkey="010-000003-000001-014"
                    >
                        <a href=" javascript:;" style={{ color: '#bfbfbf' }}>编辑</a>
                    </Functions>
                )
            ),
        },
    ];

     // 复制链接
     copy = (text) => {
        window.open(text.link, '_blank');
    };


    // 更新最低价供应商
    updata = () => {
        this.props.onSearch()
    }

    //  生成PO
    createPo = () => {
        if (!this.state.selectedRowKeys.length) return message.warning('请先选择项');
        this.setState({
            logisticsVisible: true,
            logisticsData: this.state.selectedRowKeys,
        });
    }

    // 关闭弹窗
    poCancel = (flag) => {
        this.setState({
            logisticsVisible: false,
            logisticsData: [],
            selectedRowKeys: []
        });
        if (flag) {
            this.props.onSearch();
        }
    }

    // 转为待处理
    toBeProcessed = () => {
        if (this.state.selectedRowKeys.length === 0) {
            message.warning("请勾选订单后再进行转为待处理！");
            return;
        }
        PopConfirm('提示', '是否确认将选中项转为待处理？', this.toBeProcessedSubmission);
    }

    toBeProcessedSubmission = () => {
        const parameter = { data: { keys: this.state.selectedRowKeys } };
        fetchPost(CHANGE_ERROR_ORDER, parameter, 2).then((result) => {
            if (result.state === '000001') {
                this.setState({
                    selectedRowKeys: []
                })
                this.props.onSearch();
            }
        });
    };


    editHandle = (record) => {
        const {
            supplierId,
            supplierName,
        } = this.props.getOrderExceptionList;
        const data = {
            supplierCode: supplierId,
            supplier: supplierName,
            sku: record.sku,
            key: record.key,
            productDesc: record.productDesc,
            purchaseCount: record.purchaseCount,
            purchaseAmount: record.supplierPrice,
            deliveryTime: record.deliveryTime,
            deliveryDay: record.deliveryDay,
            remark: record.remark,
            abnormalReason: record.abnormalReason,
            isSplit: record.isSplit,
            pendingQuantity: record.pendingQuantity,
        };
        this.setState({ data, editVisible: true });
    }

    // 弹窗取消
    modelComCancle = () => {
        this.setState({
            editVisible: false
        })
    }

    render() {
        const {
            getOrderExceptionList,
            onSearch,
            showExport,
            showImport,
            orderDetailSupplierListtAsync,
            orderDetailEditAsync,
         } = this.props;
        const {
            total,
            list,
            params,
            loading,
        } = getOrderExceptionList;

        const pageNumber = this.props.pageNumber;
        const pageData = this.props.pageSize;
        const { selectedRowKeys, importFileVisible, logisticsVisible,logisticsData,editVisible,data  } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: (rowKeys) => {
                this.setState({
                    selectedRowKeys: rowKeys,
                });
            },
        };

        const table = (
            <Spin spinning={loading} delay={500} tip="Loading...">
                <div className="padding-sm">
                    <div className="padding-lg-bottom">
                    <Functions
                            {...this.props}
                            functionkey="010-000003-000001-012"
                        >
                    <Button
                        className="margin-sm-bottom pull-left"
                        onClick={this.toBeProcessed}
                    >
                        转为待处理
                    </Button>
                   </Functions>
                         <Functions
                            {...this.props}
                            functionkey="010-000003-000001-013"
                        >
                        <Button
                            icon="upload"
                            className="margin-sm-right margin-sm-bottom pull-right"
                            onClick={showExport}
                        >
                            数据导出
                            </Button>
                        </Functions>
                    </div>
                    <Table
                        bordered
                        size="small"
                        dataSource={list}
                        pagination={false}
                        columns={this.columns}
                        rowSelection={rowSelection}
                    />
                    <Pagination
                        showTotal={t => `共 ${t} 条`}
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={onSearch}
                        total={total}
                        pageSize={pageData}
                        onChange={onSearch}
                    />
                </div>
            </Spin>
        );
        return (
            <div>
                {table}
                <ModelCom
                    onCancel={this.modelComCancle}
                    visible={editVisible}
                    data={data}
                    orderDetailSupplierListtAsync={orderDetailSupplierListtAsync}
                    orderDetailEditAsync={orderDetailEditAsync}
                    // paginatihandle={this.Paginatihandle}
                    onSearch={this.handleSearch}
                />
                <LogisticsCom
                    visible={logisticsVisible}
                    data={logisticsData}
                    // supplierId={supplierId}
                    onCancel={this.poCancel}
                    // logisticsAsync={logisticsAsync}
                    onSearch={this.handleSearch}
                    selectedRowKeys={selectedRowKeys}
                    {...this.props}
                    // orderDetailGeneratePoAsync={orderDetailGeneratePoAsync}
                />
            </div>
        );
    }
}
