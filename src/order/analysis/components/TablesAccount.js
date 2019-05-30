/**
 *作者: chenlin
 *功能描述: PRtable
 *时间: 2018/10/27 11:55
 */
import React from 'react';
import {
    Table,
    Spin,
    Pagination,
} from 'antd';
import { datasaddkey } from 'util/baseTool';

export default class TablesAccount extends React.Component {

    state = {
        sortedInfo: {},
    }

    handleChange = (pagination, filter, sorter) => {
        this.setState({ sortedInfo: sorter });
    }

    render() {
        const {
            data,
            loadingState,
        } = this.props;
        const { sortedInfo } = this.state;

        const columns = [{
            title: '排名',
            dataIndex: 'rankingIdx',
            key: 'rankingIdx',
            // sorter: (a, b) => a.rankingIdx - b.rankingIdx,
            // sortOrder: sortedInfo.columnKey === 'rankingIdx' && sortedInfo.order,
        }, {
            title: '账号',
            dataIndex: 'sellerId',
            key: 'sellerId',
            sorter: (a, b) => a.sellerId.charCodeAt(0) - b.sellerId.charCodeAt(0),
            sortOrder: sortedInfo.columnKey === 'sellerId' && sortedInfo.order,
        }, {
            title: '订单量',
            dataIndex: 'orderCount',
            key: 'orderCount',
            sorter: (a, b) => a.orderCount - b.orderCount,
            sortOrder: sortedInfo.columnKey === 'orderCount' && sortedInfo.order,
        }, {
            title: '销售额$',
            dataIndex: 'salesAmount',
            key: 'salesAmount',
            sorter: (a, b) => a.salesAmount - b.salesAmount,
            sortOrder: sortedInfo.columnKey === 'salesAmount' && sortedInfo.order,
        }, {
            title: '客单价$',
            dataIndex: 'customerUnitPrice',
            key: 'customerUnitPrice',
            sorter: (a, b) => a.customerUnitPrice - b.customerUnitPrice,
            sortOrder: sortedInfo.columnKey === 'customerUnitPrice' && sortedInfo.order,
        }];
        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={columns}
                            dataSource={datasaddkey(data.sellerIdRanking)}
                            pagination={false}
                            size="small"
                            bordered
                            onChange={this.handleChange}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}
