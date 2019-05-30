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
            title: '序号',
            dataIndex: 'key',
        },
        {
            title: '平台订单号',
            dataIndex: 'platformOrderNumber',
        },
        {
            title: '渠道名称',
            dataIndex: 'channelName',
        },
        {
            title: '追踪码',
            dataIndex: 'trackingCode',
        },
        {
            title: '生成时间',
            dataIndex: 'generationTime',
        },
        {
            title: '操作',
            render: (value, item) => {
                return (
                    <div>
                        <a href={item.seeUrl}>查看</a>
                        <a href={item.url} download="下载" className="margin-ss-left">下载</a>
                    </div>
                )
            }
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
