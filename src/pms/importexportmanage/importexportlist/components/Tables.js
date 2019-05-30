import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Tooltip,
    Button,
    message
} from 'antd';
import Row from 'antd/lib/grid/row';



export default class Tables extends React.Component {
    state = {
        exportLoading: false,
    }
    columns =[
        {
            title: 'ID',
            dataIndex: 'key',
        },
        {
            title: '文件名称',
            dataIndex: 'fileName',
            render: (text, row) => {
                if (row.dataHandleType === '导出') {
                    return (
                        <div>
                            {row.fileName}
                        </div>
                    )
                } else {
                    return (
                        <a href={row.sourceFileURL} download="下载">{row.fileName}</a>
                    )
                }
            },
        },
        {
            title: '数据处理模块',
            dataIndex: 'dataHandleModule',
        },
        {
            title: '数据处理类型',
            dataIndex: 'dataHandleType',
        },
        {
            title: '操作人',
            dataIndex: 'operationPeople',
        },
        {
            title: '操作时间',
            dataIndex: 'operationTime',
        },
        {
            title: '完成时间',
            dataIndex: 'completeTime',
        },
        {
            title: '处理状态',
            dataIndex: 'handleState',
            render: (text, row) => {
                if (text === '已完成') {
                    return (
                        <div style={{
                                padding: '2px 5px',
                                color: '#52C41A',
                                border: '1px solid #52C41A',
                                borderRadius:'4px',
                            }}>
                            已完成
                        </div>
                    )
                } else if (text === '待处理') {
                    return (
                        <div style={{
                            padding: '2px 5px',
                            color: '#FF3747',
                            border: '1px solid #FF3747',
                            borderRadius:'4px',
                        }}>
                            {text}
                        </div>
                    )
                } else if (text === '处理中') {
                    return (
                        <div style={{
                            padding: '2px 5px',
                            color: '#F9BD44',
                            border: '1px solid #F9BD44',
                            borderRadius:'4px',
                        }}>
                            {text}
                        </div>
                    )
                } else {
                    return (
                        <div style={{
                            padding: '2px 5px',
                            color: '#52C41A',
                            border: '1px solid #52C41A',
                            borderRadius:'4px',
                        }}>
                            {text}
                        </div>
                    )
                }

            },
        },
        {
            title: '处理结果',
            dataIndex: 'handleresults',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, row) => {
                if (row.handleState === '已完成') {
                    if (row.handleresults === '全部成功') {
                        if (row.dataHandleType === '导入') {
                            return (
                                null
                            )
                        } else {
                            return (
                                <a href={row.fileURL} download="下载">下载结果</a>
                            )
                        }
                    } else {
                        return (
                            <a href={row.fileURL} download="下载">失败原因</a>
                        )
                    }
                } else {
                    return (
                        null
                    )
                }

            },
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
