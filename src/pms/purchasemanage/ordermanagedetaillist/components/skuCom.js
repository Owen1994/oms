import React from 'react';

import {
    Button,
    Table,
    Modal,
    Tabs,
    Pagination,
} from 'antd';

import { levelOptions } from '../../../../util/options';
import { timestampFromat, datasaddkey } from '../../../../util/baseTool';

const TabPane = Tabs.TabPane;

class logisticsCom extends React.Component {
    columns = [
        {
            title: '采购订单号',
            dataIndex: 'orderNumber',
            width: 100,
            key: 'orderNumber',
        },
        {
            title: '供应商',
            dataIndex: 'supplierName',
            width: 100,
            key: 'supplierName',
        },
        {
            title: '采购数量',
            dataIndex: 'purchaseCount',
            width: 100,
            key: 'purchaseCount',
        },
        {
            title: '采购单价',
            dataIndex: 'purchasePrice',
            width: 100,
            key: 'purchasePrice',
        },
        {
            title: '采购金额',
            dataIndex: 'purchaseAmount',
            width: 100,
            key: 'purchaseAmount',
        },
        {
            title: '采购时间',
            dataIndex: 'purchaseTime',
            width: 100,
            key: 'purchaseTime',
            render: text => timestampFromat(Number.parseInt(text, 10)),
        },
        {
            title: '入库数量',
            dataIndex: 'warehousingCount',
            width: 100,
            key: 'warehousingCount',
        },
        {
            title: '入库时间',
            dataIndex: 'warehousingTime',
            width: 100,
            key: 'warehousingTime',
            render: text => timestampFromat(Number.parseInt(text, 10)),
        },
    ];

    columns1 = [
        {
            title: '核查任务编号',
            dataIndex: 'checkTaskNumber',
            width: 100,
            key: 'checkTaskNumber',
            render: (value, row) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.rowSpan) {
                    obj.props.rowSpan = row.rowSpan;
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: '核价员',
            dataIndex: 'priceAuditor',
            width: 100,
            key: 'priceAuditor',
            render: (value, row) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.rowSpan) {
                    obj.props.rowSpan = row.rowSpan;
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: '核查时间',
            dataIndex: 'checkTime',
            width: 100,
            key: 'checkTime',
            render: (value, row) => {
                const obj = {
                    children: timestampFromat(Number.parseInt(value, 10), 2),
                    props: {},
                };
                if (row.rowSpan) {
                    obj.props.rowSpan = row.rowSpan;
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: '核价类型',
            dataIndex: 'pricingType',
            width: 100,
            key: 'pricingType',
            render: (value, row) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.rowSpan) {
                    obj.props.rowSpan = row.rowSpan;
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: '供应商',
            dataIndex: 'supplierName',
            width: 100,
            key: 'supplierName',
        },
        {
            title: '付款方式',
            dataIndex: 'payType',
            width: 100,
            key: 'payType',
        },
        {
            title: '核查价格',
            dataIndex: 'checkPrice',
            width: 100,
            key: 'checkPrice',
        },
        {
            title: '核查数量',
            dataIndex: 'checkCount',
            width: 100,
            key: 'checkCount',
        },
        {
            title: '货期',
            dataIndex: 'deliveryDay',
            width: 100,
            key: 'deliveryDay',
        },
        {
            title: '核查类型',
            dataIndex: 'checkType',
            width: 100,
            key: 'checkType',
        },
        {
            title: '核查备注',
            dataIndex: 'checkRemark',
            width: 100,
            key: 'checkRemark',
        },
    ];

    state = {
        activeKey: '0',
        orderParams: {
            pageData: 20,
            pageNumber: 1,
            total: 0,
        },
        orderList: [],
        checkParams: {
            pageData: 20,
            pageNumber: 1,
            total: 0,
        },
        checkList: [],
    }

    componentWillReceiveProps(next) {
        if (next.visible) {
            const { orderParams } = this.state;
            this.getSkuHistoricalPurchaseOrderData(
                orderParams.pageNumber,
                orderParams.pageData,
                next.sku,
            );
        }
    }

    formatData = (list = []) => {
        const arr = [];
        for (let k = 0; k < list.length; k++) {
            if (list[k].infoList && list[k].infoList.length) {
                for (let i = 0; i < list[k].infoList.length; i++) {
                    const data = {
                        checkTaskNumber: list[k].checkTaskNumber,
                        checkTime: list[k].checkTime,
                        priceAuditor: list[k].priceAuditor,
                        pricingType: list[k].pricingType,
                        ...list[k].infoList[i],
                    };
                    if (i === 0) {
                        data.rowSpan = list[k].infoList.length;
                    }
                    arr.push(data);
                }
            } else {
                arr.push({
                    checkTaskNumber: list[k].checkTaskNumber,
                    checkTime: list[k].checkTime,
                    priceAuditor: list[k].priceAuditor,
                    pricingType: list[k].pricingType,
                });
            }
        }
        return arr;
    }

    getSkuHistoricalPurchaseOrderData = (page, pageSize, sku) => {
        const { skuHistoricalPurchaseOrderAsync } = this.props;
        const { orderParams } = this.state;
        const params = {};
        params.sku = sku || this.props.sku;
        params.pageData = pageSize || orderParams.pageData;
        params.pageNumber = page || orderParams.pageNumber;
        skuHistoricalPurchaseOrderAsync({ data: params })
            .then((result) => {
                if (result) {
                    const neworderParams = {};
                    neworderParams.total = result.total;
                    neworderParams.pageData = params.pageData;
                    neworderParams.pageNumber = params.pageNumber;
                    this.setState({
                        orderParams: neworderParams,
                        orderList: datasaddkey(result.list),
                    });
                }
            });
    }

    getSkuHistoricalCheckData = (page, pageSize) => {
        const { skuHistoricalCheckAsync, sku } = this.props;
        const { checkParams } = this.state;
        const params = {};
        params.sku = sku;
        params.pageData = pageSize || checkParams.pageData;
        params.pageNumber = page || checkParams.pageNumber;
        skuHistoricalCheckAsync({ data: params })
            .then((result) => {
                if (result) {
                    const newcheckParams = {};
                    newcheckParams.total = result.total;
                    newcheckParams.pageData = params.pageData;
                    newcheckParams.pageNumber = params.pageNumber;
                    this.setState({
                        checkParams: newcheckParams,
                        checkList: datasaddkey(this.formatData(result.list)),
                    });
                }
            });
    }

    handleTabChange = (activeKey) => {
        if (activeKey === '1' && !this.state.checkList.length) {
            this.getSkuHistoricalCheckData();
        }
        this.setState({
            activeKey,
        });
    }

    modalCancel = () => {
        this.props.onCancel();
        this.setState({
            activeKey: '0',
            orderParams: {
                pageData: 20,
                pageNumber: 1,
                total: 0,
            },
            orderList: [],
            checkParams: {
                pageData: 20,
                pageNumber: 1,
                total: 0,
            },
            checkList: [],
        });
    }

    render() {
        const { visible } = this.props;
        const {
            activeKey,
            orderParams,
            orderList,
            checkParams,
            checkList,
        } = this.state;
        const content = (
            <div className="documentarymanage tweb-tab">
                <Tabs defaultActiveKey={activeKey} type="card" onChange={this.handleTabChange}>
                    <TabPane tab="SKU历史采购订单" key="0">
                        <div className="padding-sm">
                            <Table
                                bordered
                                size="small"
                                dataSource={orderList}
                                pagination={false}
                                columns={this.columns}
                            />
                            <Pagination
                                showTotal={t => `共 ${t} 条`}
                                pageSizeOptions={levelOptions('分页显示条数')}
                                showSizeChanger
                                showQuickJumper={{ goButton: true }}
                                current={orderParams.pageNumber}
                                defaultCurrent={1}
                                onShowSizeChange={this.getSkuHistoricalPurchaseOrderData}
                                total={orderParams.total}
                                pageSize={orderParams.pageData}
                                onChange={this.getSkuHistoricalPurchaseOrderData}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="SKU核查历史" key="1">
                        <div className="padding-sm">
                            <Table
                                bordered
                                size="small"
                                dataSource={checkList}
                                pagination={false}
                                columns={this.columns1}
                            />
                            <Pagination
                                showTotal={t => `共 ${t} 条`}
                                pageSizeOptions={levelOptions('分页显示条数')}
                                showSizeChanger
                                showQuickJumper={{ goButton: true }}
                                current={checkParams.pageNumber}
                                defaultCurrent={1}
                                onShowSizeChange={this.getSkuHistoricalCheckData}
                                total={checkParams.total}
                                pageSize={checkParams.pageData}
                                onChange={this.getSkuHistoricalCheckData}
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );

        const footer = (
            <div>
                <Button onClick={this.modalCancel}>关闭</Button>
            </div>
        );

        return (
            <Modal
                title=""
                width={1000}
                destroyOnClose
                // centered
                visible={visible}
                footer={footer}
                maskClosable={false}
                onCancel={this.modalCancel}
                className="documentarymanage-detail-sku-info"
            >
                {content}
            </Modal>
        );
    }
}

export default logisticsCom;
