import React, { Component } from 'react';
import { getUrlParams } from '../../../../../util/baseTool';
import {Spin, Table} from "antd";
import {fetchPost} from "../../../../../util/fetch";
import {Purchase_Pay_List_Api} from "../../constants/Api";
import { parseReceiveGoods } from '../../selectors/index';

/**
 * 收货明细
 */
class ReceiveGoodsView extends Component {
    state = {
        listData: [],
        loading: false,
    };
    componentDidMount() {
        const parameter = { data: { purchaseNumber: getUrlParams('').orderNumber } };
        this.setState({loading: true});
        fetchPost(Purchase_Pay_List_Api, parameter, 2).then((result) => {
            this.setState({loading: false});
            if (result.state === '000001') {
                this.setState({
                    listData: parseReceiveGoods(result.data),
                });
            }
        });
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'serialNumber',
        },
        {
            title: '收货单号',
            dataIndex: 'no',
        },
        {
            title: '收货仓库',
            dataIndex: 'warehouse',
        },
        {
            title: '收货人',
            dataIndex: 'operator',
        },
        {
            title: '收货时间',
            dataIndex: 'operateTime',
        },
        {
            title: '收货SKU',
            dataIndex: 'sku',
        },
        {
            title: '到货数量',
            dataIndex: 'quantity',
        },
        {
            title: '备注',
            dataIndex: 'recieveMemo',
            render: (text) => {
                return (
                    <div className="breakwrod">
                        {text}
                    </div>
                )
            }
        }
    ];

    render() {
        const { listData, loading } = this.state;
        return (
            <div className="padding-sm white pms-order-query_LogTable_bottom">
                <Spin spinning={loading} delay={500} tip="Loading...">
                    <Table
                        rowKey={t => t.serialNumber}
                        dataSource={listData.list}
                        pagination={false}
                        bordered
                        size="small"
                        columns={this.columns}
                    />
                </Spin>
            </div>
        );
    }
}

export default ReceiveGoodsView;
