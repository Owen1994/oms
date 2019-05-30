import React, { Component } from 'react';
import {
    Pagination, Spin, Table,
} from 'antd';

class TableList extends Component {
    columns = [
        {
            title: '序号',
            render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
        },
        {
            title: '运单号',
            dataIndex: 'waybillNo',
        },
        {
            title: '订单号',
            dataIndex: 'orderNumber',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
        },
        {
            title: '中文名称',
            dataIndex: 'chineseName',
        },
        {
            title: '数量',
            dataIndex: 'quantity',
        },
        {
            title: '收货员',
            dataIndex: 'receipt',
        },
        {
            title: '收货日期',
            dataIndex: 'receiptDate',
        },
    ];


    render() {
        const {
            partList,
            loadingState,
            pageNumber,
            pageData,
            onChangeListener,
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
                    <Pagination
                        pageSizeOptions={['100']}
                        showTotal={t => `共${t}条`}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        total={partList.total}
                        current={pageNumber}
                        pageSize={pageData}
                        onChange={onChangeListener}
                    />
                </Spin>
            </div>
        );
    }
}

export default TableList;
