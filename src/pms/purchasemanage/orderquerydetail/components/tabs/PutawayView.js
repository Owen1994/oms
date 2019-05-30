import React, { Component } from 'react';
import { getUrlParams } from '../../../../../util/baseTool';
import {Spin, Table} from "antd";
import {fetchPost} from "../../../../../util/fetch";
import { Purchase_Shelve_List_Api } from "../../constants/Api";
import { parsePutaway } from '../../selectors/index';

/**
 * 上架明细
 */
class PutawayView extends Component {
    state = {
        listData: [],
        loading: false,
    };
    componentDidMount() {
        const parameter = { data: { purchaseNumber: getUrlParams('').orderNumber } };
        this.setState({loading: true});
        fetchPost(Purchase_Shelve_List_Api, parameter, 2).then((result) => {
            this.setState({loading: false});
            if (result.state === '000001') {
                this.setState({
                    listData: parsePutaway(result.data),
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
            title: '入库单号',
            dataIndex: 'no',
        },
        {
            title: '入库仓库',
            dataIndex: 'warehouse',
        },
        {
            title: '入库人',
            dataIndex: 'operator',
        },
        {
            title: '入库时间',
            dataIndex: 'operateTime',
        },
        {
            title: '入库SKU',
            dataIndex: 'sku',
        },
        {
            title: '入库数量',
            dataIndex: 'quantity',
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

export default PutawayView;
