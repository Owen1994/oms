import React, { Component } from 'react';
import {
    Pagination, Spin, Table,
} from 'antd';

const renderContent = (text, record) => {
    const obj = {
        children: text,
        props: {},
    };
    obj.props.rowSpan = record.isFirst ? record.groupSize : 0;
    return obj;
};

class TableList extends Component {
    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            render: renderContent,
        },
        {
            title: '仓库名称',
            dataIndex: 'warehouse',
            render: renderContent,
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            render: renderContent,
        },
        {
            title: '中文名称',
            dataIndex: 'cnName',
            render: renderContent,
        },
        {
            title: '采购在途',
            dataIndex: 'purchasingTransit',
            render: renderContent,
        },
        {
            title: '调拨在途',
            dataIndex: 'transferTransit',
            render: renderContent,
        },
        {
            title: '可拣货库存',
            dataIndex: 'pickableStock',
            render: renderContent,
        },
        {
            title: '所在储位',
            dataIndex: 'storageLocation',
        },
        {
            title: '储位库存',
            dataIndex: 'storageStock',
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
