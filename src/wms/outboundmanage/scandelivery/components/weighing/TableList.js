import React, { Component } from 'react';
import {
    Spin, Table,
} from 'antd';

class TableList extends Component {
    columns = [
        {
            title: '仓库名称',
            dataIndex: 'warehouseName',
            width: 100,
        },
        {
            title: '集货袋号',
            dataIndex: 'collectingBagNumber',
            width: 100,
        },
        {
            title: '交运状态',
            dataIndex: 'deliveryStatus',
            width: 100,
        },
        {
            title: '物流渠道',
            dataIndex: 'logisticsChannel',
            width: 100,
        },
        {
            title: '集货袋毛重(g)',
            dataIndex: 'collectingBagGrossWeight',
            width: 100,
        },
        {
            title: '集货袋净重(g)',
            dataIndex: 'collectingBagNetWeight',
            width: 100,
        },
        {
            title: '包裹数',
            dataIndex: 'packageCount',
            width: 100,
        },
        {
            title: '称重人',
            dataIndex: 'weighingPerson',
            width: 100,
        },
        {
            title: '称重时间',
            dataIndex: 'weighingTime',
            width: 100,
        },
    ];


    render() {
        const {
            partList,
            loadingState,
        } = this.props;
        return (
            <div className="breadcrumb padding-sm margin-ss-top">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={partList.list}
                        pagination={false}
                    />
                </Spin>
            </div>
        );
    }
}

export default TableList;
