import React, { Component } from 'react';
import {
    Table,
} from 'antd';

const imgVerticalLine = require('../img/VerticalLine.png');


/**
 * 采购单基本信息
 */
class ProductInfoView extends Component {

    columns = [
        {
            title: '序号',
            dataIndex: 'key',
        },
        {
            title: '阿里订单skuID',
            dataIndex: 'alOrderSkuID',
        },
        {
            title: '阿里订单产品ID',
            dataIndex: 'alOrderProductID',
        },
        {
            title: '阿里订单商品名称',
            dataIndex: 'alOrderProductName',
        },
        {
            title: '价格',
            dataIndex: 'price',
        },
        {
            title: '单位',
            dataIndex: 'unit',
        },
        {
            title: '数量',
            dataIndex: 'number',
        },
        {
            title: '状态',
            dataIndex: 'state',
        }];

    render() {
        const { mainDataList } = this.props;
        const data = mainDataList.productInfo;
        return (
            <div className='al-Order-Info'>
                <img
                    className="al-group-img"
                    src={imgVerticalLine}
                    alt=""
                    width="3px"
                    height="12px"
                />
                <span className="al-group-label">采购产品信息</span>
                <div className="padding-sm-top">
                    <Table
                        rowKey={t => t.key}
                        dataSource={data}
                        pagination={false}
                        bordered
                        size="small"
                        columns={this.columns}
                    />
                </div>
            </div>
        );
    }
}

export default ProductInfoView;
