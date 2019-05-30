/**
 *作者: chenlin
 *功能描述: 导入导出记录列表
 *时间: 2018/10/27 11:55
 */
import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Icon,
} from 'antd';
import { Button } from 'antd/lib/radio';
import { fetchPost } from 'util/fetch';


export default class table extends React.Component {


    columns = [
        {
            title: '文件名称',
            dataIndex: 'taskName',
        }, {
            title: '类型',
            dataIndex: 'taskType',
            render: (record) => (<span>{record === 1 ? "导出" : "导入"}</span>)
        }, {
            title: '数据模块',
            dataIndex: 'moduleName',
            key: 'businessLine',
        }, {
            title: '操作人',
            dataIndex: 'creator',
        }, {
            title: '操作时间',
            dataIndex: 'createdTime',
        }, {
            title: '处理状态',
            dataIndex: 'taskStatusDesc',
        }, {
            title: '操作',
            render: (record) => {
                // taskStatus 0-待处理，1-处理中，2-成功，3-失败
                let taskStatusText;
                if ( record.taskType === 0) {   // 导入
                    taskStatusText = (
                        <div style={{textAlign: 'center'}}>
                            {
                                record.rsltMsg ? record.rsltMsg.map(v => {
                                    return (
                                        <div>
                                            {v}
                                        </div>
                                    )
                                }) : null
                            }
                            {
                                record.rsltFileUrl ? (
                                    <div>
                                        <span style={{paddingLeft: 20}}>失败原因：</span>
                                        <a href={record.rsltFileUrl} download="文件下载">下载</a>
                                    </div>
                                ) : null
                            }
                        </div>
                    );
                } else if (record.taskType === 1) {     // 导出
                    if (record.taskStatus === 2 && record.rsltFileUrl) {   // 导出成功时显示下载链接
                        taskStatusText = (
                            <div className="text-center">
                                <a href={record.rsltFileUrl} download="文件下载">下载</a>
                            </div>
                        );
                    } else if (Number(record.taskStatus) === 3) {
                        taskStatusText = (
                            <div className="text-center">
                                {/* {
                                    record.rsltMsg.map(v => {
                                        return (
                                            <div>
                                                {v}
                                            </div>
                                        )
                                    })
                                } */}
                                <a onClick={() => this.handleRedownload(record.taskId)}>重试</a>
                            </div>
                        );
                    } else {   // 待处理或处理中或其他状态时，显示‘--’
                        taskStatusText = (
                            <div className="text-center">
                                <span>--</span>
                            </div>
                        );
                    }
                }
                return (
                    <div className="logistics_info text-left records-option">
                        {taskStatusText}
                    </div>
                )
            }
        }];

    // 重试
    handleRedownload = (id) => {
        fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/importExportRetry', { data: { id }}, 1)
            .then(res => {
                if(res.state === '000001') {
                    this.props.onSearch();
                }
            })
    }

    render() {
        const {
            data,
            onSearch,
            loadingState,
        } = this.props;
        const totalNum = data.total;
        const { pageNumber, pageSize } = this.props.paginationData;
        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm clear">
                 <div className="overflow-hidden">
                    {/* <div className="pull-left"> */}
                    {/* </div> */}
                    <div className="pull-right">
                        <Button onClick={() => this.props.onSearch()}>
                            <Icon type="reload"  />
                            刷新列表
                        </Button>
                    </div>
                </div>
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={data.data}
                            onChange={this.handleTabChange}
                            pagination={false}
                            size="small"
                            bordered
                        />
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{ goButton: true }}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={onSearch}
                            total={totalNum}
                            pageSize={pageSize}
                            onChange={onSearch}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}
