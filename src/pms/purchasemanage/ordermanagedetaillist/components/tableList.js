import React from 'react';

import {
    Table,
    Spin,
    Button,
    message,
    Pagination,
    Tooltip,
    Icon,
} from 'antd';
import ModelCom from './modelCom';
import LogisticsCom from './logisticsCom';
import PriceVerificationCom from './priceVerificationCom';
import AnomalyModel from './anomalyModel';
import SkuCom from './skuCom';

import sellWellImg from '../img/sell_well.png';

import { levelOptions } from '../../../../util/options';
import { timestampFromat, popUpImage, datasaddkey,closeCurrentPage } from '../../../../util/baseTool';
import Functions from '../../../../components/functions';
import { parseStrToArray } from '@/util/StrUtil';

export default class Tablelist extends React.Component {
    state = {
        data: {},
        editVisible: false,
        logisticsData: [],
        logisticsVisible: false,
        priceVisible: false,
        priceData: [],
        skuVisible: false,
        skuData: '',
        averageSalesVisible: false,
        anomalyVisible: false,
    }

    rowSelection = {
        columnWidth: 20,
        selectedRowKeys: [],
        selectedRows: [],
        onChange: (selectedRowKeys, selectedRows) => {
            this.rowSelection.selectedRowKeys = selectedRowKeys;
            this.rowSelection.selectedRows = selectedRows;
            this.setState({});
        },
    }

    handleEye = () => {
        this.setState((prevState)=>({
            averageSalesVisible: !prevState.averageSalesVisible
        }))
    }
    columns = [
        {
            title: 'PR单号',
            width: 100,
            dataIndex: 'prNumber',
            key: 'prNumber',
        },
        {
            title: '图片',
            width: 100,
            dataIndex: 'imgUrl',
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
            width: 150,
            key: 'sku',
            render: (text, record) => (
                <div>
                    <p className="dm-sku-style">
                        <a href=" javascript:; " onClick={() => this.skuHandle(record.sku)}>{record.sku}</a>
                        {
                            record.isCore ? <img src={sellWellImg} width="36" height="17" alt="swllWELL" /> : null
                        }
                    </p>
                    <p className="text-left">{record.productDesc}</p>
                    {/* <p>{record.isEdit ? null : <p className="red text-right">核价中</p>}</p> */}
                    <p className="red text-right">{record.skuState}</p>
                    {/* <p>{record.isEdit ? <p className="red text-right">{record.skuState}</p> : null }</p> */}
                </div>
            ),
        },
        {
            title: '在售状态',
            dataIndex: 'selllState',
            width: 80,
            key: 'selllState',
        },
        {
            title: <div onClick={this.handleEye} style={{cursor:"pointer"}}>日均销量   <Icon type="eye" /></div>,
            dataIndex: 'averageSales',
            width: 80,
            key: 'averageSales',
            render: text => (
                <div>{this.state.averageSalesVisible ? text : "..." }</div>
            ),
        },
        {
            title: '仓库',
            dataIndex: 'wareHouse',
            width: 60,
            key: 'wareHouse',
        },
        // {
        //     title: 'SKU备注',
        //     dataIndex: 'skuRemark',
        //     width: 100,
        //     key: 'skuRemark',
        // },
        {
            title: '采购数量',
            dataIndex: 'purchaseCount',
            width: 80,
            key: 'purchaseCount',
        },
        {
            title: '参考价/供应商报价',
            dataIndex: 'referencePrice-supplierPrice',
            width: 100,
            key: 'referencePrice-supplierPrice',
            render: (text, record) => (`${record.referencePrice} / ${record.supplierPrice}`),
        },
        {
            title: '采购单价/采购金额',
            dataIndex: 'singlePrice-purchasePrice',
            width: 100,
            key: 'singlePrice-purchasePrice',
            render: (text, record) => (`${record.singlePrice} / ${record.purchasePrice}`),
        },
        // {
        //     title: '采购金额',
        //     dataIndex: 'purchasePrice',
        //     width: 100,
        //     key: 'purchasePrice',
        // },
        {
            title: '角色',
            dataIndex: 'role',
            width: 150,
            key: 'role',
            render: (text, record) => (
                <div className="text-left">
                    <p key="1"><span>计划员：</span>{record.planRole}</p>
                    <p key="2"><span>订货员：</span>{record.opEmployee}</p>
                    <p key="3"><span>跟单员：</span>{record.merchandiser}</p>
                    <p key="4"><span>开发员：</span>{record.developer}</p>
                </div>
            ),
        },
        {
            title: '交期',
            dataIndex: 'deliveryDay',
            width: 100,
            key: 'deliveryDay',
            render: (text, record) => {
                const isShowRed = Number.parseInt(record.deliveryTime, 10) > Number.parseInt(record.demandTime, 10);

                return (
                    <div className="text-left time">
                        {isShowRed ? (
                            <span
                                className="documentarymanage-detail-span-red"
                            >
                                {text}
                            </span>
                        ) : (
                            <span>
                                {text}
                            </span>
                        )}
                    </div>
                );
            },
        },
        {
            title: '时间',
            dataIndex: 'time',
            width: 150,
            key: 'time',
            render: (text, record) => {
                const isShowRed = Number.parseInt(record.deliveryTime, 10) > Number.parseInt(record.demandTime, 10);

                return (
                    <div className="text-left time">
                        <p key="1">
                            <span>上传时间：</span>
                            {timestampFromat(Number.parseInt(record.uploadTime, 10))}
                        </p>
                        <p key="2">
                            <span>需求时间：</span>
                            {timestampFromat(Number.parseInt(record.demandTime, 10))}
                        </p>
                        <p key="3">
                            {isShowRed ? (
                                <span
                                    className="documentarymanage-detail-span-red"
                                >
                                    交货/取货：{timestampFromat(Number.parseInt(record.deliveryTime, 10))}
                                </span>
                            ) : (
                                <span>
                                    交货/取货：{timestampFromat(Number.parseInt(record.deliveryTime, 10))}
                                </span>
                            )}
                        </p>
                    </div>
                );
            },
        },
        {
            title: '采购备注',
            dataIndex: 'remark',
            width: 100,
            key: 'remark',
            render: (value) => (<Tooltip  title={value}>
                <div className="pms-prmanage-remark one-ellipsis" style={{width: "100px"}}>{value}</div>
            </Tooltip>),
        },
        {
            title: '网拍链接',
            dataIndex: 'link',
            width: 100,
            key: 'link',
            render: text => (
                <a onClick={() => this.copy(text)}>复制链接</a>
            ),
        },
        {
            title: '操作',
            dataIndex: 'handle',
            width: 100,
            key: 'handle',
            render: (text, record) => (
                record.isEdit ? (
                    <Functions
                        {...this.props}
                        functionkey="010-000003-000001-000001-002"
                    >
                        <a href=" javascript:;" onClick={() => this.editHandle(record)}>编辑</a>
                    </Functions>
                ) : (
                    <Functions
                        {...this.props}
                        functionkey="010-000003-000001-000001-002"
                    >
                        <a href=" javascript:;" style={{ color: '#bfbfbf' }}>编辑</a>
                    </Functions>
                )
            ),
        },
    ];
    // 复制链接
    copy = (text) => {
        const oInput = document.createElement('input');
        oInput.value = text;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
        message.success('复制成功');
    };

    // 清除 selectedRowKeys
    clearSelected = () => {
        this.rowSelection.selectedRowKeys = [];
        this.rowSelection.selectedRows = [];
        this.setState({});
    }

    editHandle = (record) => {
        const {
            // logisticsType,
            supplierId,
            supplierName,
        } = this.props.orderDetailOrderGoodsList;
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
            isSplit: record.isSplit,
            pendingQuantity: record.pendingQuantity,
        };
        this.setState({ data, editVisible: true });
    }

    Paginatihandle = (page, pageSize) => {
        const data = { ...this.props.form.getFieldsValue() };
        const { orderDetailOrderGoodsListAsync, orderDetailOrderGoodsList } = this.props;

        if (data.oeEmployee) {
            if (Array.isArray(data.oeEmployee)){
              data.oeEmployee = this.props.urlData.oeEmployee ? this.props.urlData.oeEmployee[0].key : '';;
            }
         } else {
             data.oeEmployee =  data.oeEmployee;
         }

         if (data.purchaseDevelop) {
            if (Array.isArray(data.purchaseDevelop)){
                data.purchaseDevelop = this.props.urlData.purchaseDevelop ? this.props.urlData.purchaseDevelop[0].key : '';
            }
         } else {
            data.purchaseDevelop = data.purchaseDevelop;
         }

        if (data.searchContents) {
            if (!Array.isArray(data.searchContents)) {
                data.searchContents = parseStrToArray(data.searchContents);
            }
            if (data.searchContents.length >= 10) {
                message.warning('搜索内容不能超过10个');
                return false;
            }
            data.searchType = data.searchType;
        } else {
            delete data.searchType;
            delete data.searchContents;
        }

        if (data.demandTimes) {
            data.demandTimes = (data.demandTimes).map(item => (
                item.valueOf()
            ));
        }

        let params = Object.assign(orderDetailOrderGoodsList.params, data);
        if (page) {
            params.pageNumber = page;
            params.pageData = pageSize;
        }

        orderDetailOrderGoodsListAsync({ data: params })
            .then((result) => {
                if (result) {
                    this.clearSelected();
                }
            });
    }

    modelComCancle = () => {
        this.setState({
            editVisible: false,
            data: {},
        });
    }



    goBack = () => {
        const { history } = this.props;
        history.go(-1);
    }

    createPo = () => {
        // 核实
        if (!this.rowSelection.selectedRowKeys.length) return message.warning('请先选择项');
        this.setState({
            logisticsVisible: true,
            logisticsData: this.rowSelection.selectedRowKeys,
        });
    }

    poCancel = (flag) => {
        this.setState({
            logisticsVisible: false,
            logisticsData: [],
        });
        if (flag) {
            this.Paginatihandle();
        }
    }

    priceHandle = () => {
        // 核实
        if (!this.rowSelection.selectedRowKeys.length) return message.warning('请先选择需要核实项');
        this.setState({
            priceVisible: true,
            priceData: this.rowSelection.selectedRowKeys,
        });
    }

    // 转为异常
    turnToAnomaly = () => {
        if (!this.rowSelection.selectedRowKeys.length) return message.warning('请先选择项');
        this.setState({
            anomalyVisible: true,
            priceData: this.rowSelection.selectedRowKeys,
        });
    }

    turnToAnomalyCancle = () => {
        this.setState({
            anomalyVisible: false,
            data: {},
        });
    }
    priceCancel = (flag) => {
        this.setState({
            priceVisible: false,
            priceData: [],
        });
        if (flag) {
            this.Paginatihandle();
        }
    }

    skuHandle = (sku) => {
        this.setState({
            skuVisible: true,
            skuData: sku,
        });
    }

    skuCancel = () => {
        this.setState({
            skuVisible: false,
            skuData: '',
        });
    }
    returnprev = () => {
        closeCurrentPage();
    }

    render() {
        const {
            data,
            editVisible,
            logisticsVisible,
            logisticsData,
            priceVisible,
            priceData,
            skuVisible,
            skuData,
            anomalyVisible,
        } = this.state;
        const {
            orderDetailOrderGoodsList,
            orderDetailSupplierListtAsync,
            orderDetailEditAsync,
            logisticsAsync,
            orderDetailGeneratePoAsync,
            orderDetailPriceVerificationAsync,
            skuHistoricalPurchaseOrderAsync,
            skuHistoricalCheckAsync,
        } = this.props;

        const {
            supplierId,
        } = orderDetailOrderGoodsList;
        const {
            total,
            list,
            params,
            loading,
        } = orderDetailOrderGoodsList;
        const datalist = datasaddkey(list);
        const { pageNumber, pageData } = params;
        const footer = (
            <div className="table-footer-fixed">
                <Functions
                    {...this.props}
                    functionkey="010-000003-000001-000001-006"
                >
                <Button onClick={this.turnToAnomaly} className="margin-sm-right">转为异常</Button>
                </Functions>
                <Functions
                    {...this.props}
                    functionkey="010-000003-000001-000001-003"
                >
                    <Button onClick={this.priceHandle} className="margin-sm-right">推送价格核查</Button>
                </Functions>

                <Functions
                    {...this.props}
                    functionkey="010-000003-000001-000001-004"
                >
                    <Button onClick={this.createPo} className="margin-sm-right">生成PO</Button>
                </Functions>

                <Button onClick={this.returnprev}>返回</Button>
            </div>
        );
        const table = (
            <Spin spinning={loading} delay={500} tip="Loading...">
                <div className="padding-sm">
                    <Table
                        bordered
                        size="small"
                        dataSource={datalist}
                        pagination={false}
                        columns={this.columns}
                        rowSelection={this.rowSelection}
                        // onHeaderRow={(column) => {
                        //     return {
                        //       onClick: () => {
                        //           console.log(column, 'column', column[5].dataIndex === "averageSales");
                        //           if (column[5].dataIndex === "averageSales") {
                        //             this.setState((prevState)=>({
                        //                 averageSalesVisible: !prevState.averageSalesVisible
                        //             }))
                        //           }
                        //         },
                        //     };
                        //   }}
                    />
                    <Pagination
                        showTotal={t => `共 ${t} 条`}
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={this.Paginatihandle}
                        total={total}
                        pageSize={pageData}
                        onChange={this.Paginatihandle}
                    />
                </div>
            </Spin>
        );
        return (
            <div className="unordered-purchase-tablewrap">
                {table}
                {footer}
                <AnomalyModel
                    onCancel={this.turnToAnomalyCancle}
                    visible={anomalyVisible}
                    data={priceData}
                    paginatihandle={this.Paginatihandle}
                />
                <ModelCom
                    onCancel={this.modelComCancle}
                    visible={editVisible}
                    data={data}
                    orderDetailSupplierListtAsync={orderDetailSupplierListtAsync}
                    orderDetailEditAsync={orderDetailEditAsync}
                    paginatihandle={this.Paginatihandle}
                />
                <LogisticsCom
                    visible={logisticsVisible}
                    data={logisticsData}
                    supplierId={supplierId}
                    onCancel={this.poCancel}
                    logisticsAsync={logisticsAsync}
                    orderDetailGeneratePoAsync={orderDetailGeneratePoAsync}

                />
                <PriceVerificationCom
                    visible={priceVisible}
                    data={priceData}
                    supplierId={supplierId}
                    onCancel={this.priceCancel}
                    orderDetailPriceVerificationAsync={orderDetailPriceVerificationAsync}

                />
                <SkuCom
                    visible={skuVisible}
                    sku={skuData}
                    onCancel={this.skuCancel}
                    skuHistoricalPurchaseOrderAsync={skuHistoricalPurchaseOrderAsync}
                    skuHistoricalCheckAsync={skuHistoricalCheckAsync}

                />
            </div>
        );
    }
}
