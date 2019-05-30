import React from 'react';
import {
    Table,
    Spin,
} from 'antd';

export default class table extends React.Component {

    state = {
        sortedInfo: {},
    }

    handleChange = (pagination, filter, sorter) => {
        this.setState({ sortedInfo: sorter });
    }

    render() {
        const {
            dataList,
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
            title: 'Item ID',
            dataIndex: 'itemId',
            key: 'itemId',
            sorter: (a, b) => a.itemId - b.itemId,
            sortOrder: sortedInfo.columnKey === 'itemId' && sortedInfo.order,
        }, {
            title: '账号',
            dataIndex: 'sellerId',
            key: 'sellerId',
            sorter: (a, b) => a.sellerId.charCodeAt(0) - b.sellerId.charCodeAt(0),
            sortOrder: sortedInfo.columnKey === 'sellerId' && sortedInfo.order,
        }, {
            title: '订单数量',
            dataIndex: 'orderCount',
            key: 'orderCount',
            sorter: (a, b) => a.orderCount - b.orderCount,
            sortOrder: sortedInfo.columnKey === 'orderCount' && sortedInfo.order,
        }, {
            title: '销售金额(USD)',
            dataIndex: 'salesAmount',
            key: 'salesAmount',
            sorter: (a, b) => a.salesAmount - b.salesAmount,
            sortOrder: sortedInfo.columnKey === 'salesAmount' && sortedInfo.order,
        }];
        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm margin-ss-bottom">
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={columns}
                            dataSource={dataList}
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
