import React, { Component } from 'react';
import { Table } from 'antd';
const imgVerticalLine = require('../img/VerticalLine.png');

/**
 * 订单信息
 */
class GoodsInfo extends Component {
    columns = [
        {
            title: '商品图片',
            key: 'img',
            width: 200,
            render: (text, record) => (
                <div>
                    <img
                        src={record.img}
                        width="73px"
                        height="64px"
                    />
                </div>
            ),
        },
        {
            title: '规则',
            key: 'rules',
            width: 200,
            render: (text, record) => (
                <div>
                    <div>
                        <span>SKU编码：</span>
                        <span>{record.sku}</span>
                    </div>
                    <div>
                        <span>在线商品编码：</span>
                        <span>{record.productCode}</span>
                    </div>
                    <div>
                        <span>商品名称：</span>
                        <span>{record.productName}</span>
                    </div>
                    <div>
                        <span>ASIN：</span>
                        <span>{record.asin}</span>
                    </div>
                </div>
            ),
        },
        {
            title: '销售单价',
            dataIndex: 'price',
            width: 200,
            render: (text, record) => (
                <div>
                    <span>{record.currency}&nbsp;&nbsp;</span>
                    <span>{record.price}</span>
                </div>
            ),
        },
        {
            title: '数量',
            dataIndex: 'count',
            width: 200,
        },
        {
            title: '销售金额',
            key: 'sumMoney',
            width: 200,
            render: (text, record) => (
                <div>
                    <span>{record.currency}&nbsp;&nbsp;</span>
                    <span>{record.sumMoney}</span>
                </div>
            ),
        },
    ];

    render() {
        const { amazonListData } = this.props;
        const productData = amazonListData.productInfo ? amazonListData.productInfo : [];
        return (
            <div className="amazon-detail-buyers-info">
                <img
                    className="amazon-detail-head-img"
                    src={imgVerticalLine}
                    alt=""
                    width="3px"
                    height="12px"
                />
                <span className="amazon-detail-head-label">商品信息</span>

                <Table
                    className="amazon-detail-goods-info-table"
                    rowKey={record => record.sku}
                    columns={this.columns}
                    dataSource={productData}
                    size="small"
                    bordered
                    pagination={false}
                />
            </div>
        );
    }
}

export default GoodsInfo;
