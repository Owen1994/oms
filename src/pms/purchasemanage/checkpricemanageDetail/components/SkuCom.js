import React from 'react';

import {
    Button,
    Table,
    Modal,
    Pagination,
} from 'antd';

import { levelOptions } from '../../../../util/options';
import { timestampFromat, datasaddkey } from '../../../../util/baseTool';

class logisticsCom extends React.Component {
    columns = [
        {
            title: '供应商',
            dataIndex: 'supplierName',
            width: 100,
            key: 'supplierName',
        },
        {
            title: '采购订单号',
            dataIndex: 'orderNumber',
            width: 100,
            key: 'orderNumber',
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
            title: '入库数量',
            dataIndex: 'warehousingCount',
            width: 100,
            key: 'warehousingCount',
        },
        {
            title: '采购时间',
            dataIndex: 'purchaseTime',
            width: 100,
            key: 'purchaseTime',
            render: text => timestampFromat(Number.parseInt(text, 10)),
        },
        {
            title: '入库时间',
            dataIndex: 'warehousingTime',
            width: 100,
            key: 'warehousingTime',
            render: text => timestampFromat(Number.parseInt(text, 10)),
        },
    ];

    state = {
        orderParams: {
            pageData: 20,
            pageNumber: 1,
            total: 0,
        },
        orderList: [],
    }

    componentWillReceiveProps(next) {
        if (next.visible) {
            this.getSkuHistoricalPurchaseOrderData();
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
                });
            }
        }
        return arr;
    }

    getSkuHistoricalPurchaseOrderData = (page, pageSize) => {
        const { skuHistoricalPurchaseOrderAsync, sku } = this.props;
        const { orderParams } = this.state;
        const params = {};
        params.sku = sku;
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

    modalCancel = () => {
        this.props.onCancel();
        this.setState({
            orderParams: {
                pageData: 20,
                pageNumber: 1,
                total: 0,
            },
            orderList: [],
        });
    }

    render() {
        const { visible } = this.props;
        const {
            orderParams,
            orderList,
        } = this.state;
        const content = (
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
        );

        const footer = (
            <div>
                <Button onClick={this.modalCancel}>关闭</Button>
            </div>
        );

        return (
            <Modal
                title="SKU历史采购订单"
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
