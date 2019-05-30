import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Tooltip,
} from 'antd';

export default class Tables extends React.Component {
    columns =[
        {
            title: '操作类型',
            dataIndex: 'operationType',
            render: (value, record) => (<div><span>{record.operationDescribe}</span></div>
            ),
        },
        {
            title: '操作人',
            dataIndex: 'operator',
        },
        {
            title: '模块',
            dataIndex: 'warehouseType',
            render: (value, record) => (<div><span>{record.warehouseDescribe}</span></div>
            ),
        },
        {
            title: '说明',
            dataIndex: 'remark',
            width: 400,
            render: record => (<div><Tooltip title={record} className="basicdata-log"><span>{record}</span></Tooltip></div>
            ),
        },
        {
            title: '操作时间',
            dataIndex: 'operationTime',
        },
    ];

    render() {
        const {
            loadingState,
            data,
            onSearch,
            pageNumber,
            pageData,
        } = this.props;
        const total = data.total;
        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={data.list}
                            pagination={false}
                            size="small"
                            bordered
                        />
                        <Pagination
                            showTotal={num => `共 ${num} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{ goButton: true }}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={onSearch}
                            total={total}
                            pageSize={pageData}
                            onChange={onSearch}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}
