import React from 'react';
import {
    Dropdown,
    Icon,
    Pagination,
    Spin,
    Table,
    Menu, Button,
} from 'antd';
import { Link } from 'react-router-dom';

/**
 * 作者: ZhengXueNing
 * 功能描述:
 * 时间: 2018/10/22
 */
export default class TableList extends React.Component {
    columns = [
        {
            title: '序号',
            dataIndex: 'orderId',
            render: (text, record, index) => (
                <div>
                    {index + 1}
                </div>
            ),
        },
        {
            title: '单据类型',
            dataIndex: 'billTypeDict',
        },
        {
            title: '单据编号',
            dataIndex: 'billCode',
        },
        {
            title: '描述',
            dataIndex: 'description',
            render: (text, record) => (
                <section
                    className="myupcoming_container_table_section"
                    dangerouslySetInnerHTML={{__html: record.description}}
                />
            ),
        },
        {
            title: '提交人',
            dataIndex: 'submitterName',
        },
        {
            title: '任务到达时间',
            dataIndex: 'arrivalTime',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                const transferData = {
                    transferLogModalVisible: true,
                    item: record,
                    type: '1',
                };

                const fastApprovalData = {
                    fastApprovalLogModalVisible: true,
                    item: record,
                    type: '2',
                };

                const menu = (
                    <Menu>
                        <Menu.Item>
                            <a onClick={this.props.showModal.bind(null, transferData)}>
                                转移
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a onClick={this.props.showModal.bind(null, fastApprovalData)}>
                                快速审批
                            </a>
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <div className="pls-table_btns">
                        <span className="margin-ss-right">
                            <Link
                                to={{
                                    pathname: record.targetUrl,
                                    query: record.todoId,
                                }}
                                target="_blank"
                            >
                            处理
                            </Link>
                        </span>
                        <Dropdown overlay={menu}>
                            <a>
                                更多
                                <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                );
            },
        },
    ];

    render() {
        const {
            orderData,
            loadingOrderObj,
            pageNumber,
            pageSize,
            onReviewOrder,
            refreshData,
        } = this.props;
        const total = orderData.total;

        return (
            <div className="myupcoming-table">
                <div className="top-container">
                    <div className="top-right-wrap">
                        <Button icon="redo" onClick={ () => refreshData() } loading={loadingOrderObj.loadingOrderState}>刷新数据</Button>
                    </div>
                </div>
                <Spin spinning={loadingOrderObj.loadingOrderState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={orderData.list}
                        pagination={false}
                        rowKey={record => record.id}
                    />
                    <Pagination
                        showTotal={() => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        defaultPageSize={20}
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={onReviewOrder}
                        total={total}
                        pageSize={pageSize}
                        onChange={onReviewOrder}
                    />
                </Spin>
            </div>
        );
    }
}
