import React from 'react';
import {
    Button,
    Pagination,
    Spin,
    Table,
} from 'antd';
import DismissalNoticeModal from '../operation/DismissalNoticeModal';
import StationNewsModal from '../operation/StationNewsModal';

/**
 * 我收到的消息列表
 */
export default class TableList extends React.Component {
    /**
     * 列表头标签
     * @type {[]}
     */
    columns = [
        {
            title: '发送人',
            dataIndex: 'senderName',
            render: (text, record) => {
                const viewState = record.viewState;
                return viewState === 0 ? (
                    <span className="pms-msg_table_bold">{text}</span>
                ) : (
                    <span className="pms-msg_table_lighter">{text}</span>
                )
            },
        },
        {
            title: '发送时间',
            dataIndex: 'sendTime',
            render: (text, record) => {
                const viewState = record.viewState;
                return viewState === 0 ? (
                    <div className="pms-msg_table_bold">{text}</div>
                ) : (
                    <div className="pms-msg_table_lighter">{text}</div>
                )
            },
        },
        {
            title: '内容',
            dataIndex: 'content',
            width: 300,
            render: (text, record) => {
                const viewState = record.viewState;
                return viewState === 0 ? (
                    <section
                        className="pms-msg-notification_table_section pms-msg_table_bold"
                        dangerouslySetInnerHTML={{__html: record.content}}
                    />
                ) : (
                    <section
                        className="pms-msg-notification_table_section pms-msg_table_lighter"
                        dangerouslySetInnerHTML={{__html: record.content}}
                    />
                )
            },
        },
        {
            title: '消息类型',
            dataIndex: 'messageType',
            render: (text, record) => {
                const viewState = record.viewState;
                return viewState === 0 ? (
                    <div className="pms-msg_table_bold">{record.messageTypeString}</div>
                ) : (
                    <div className="pms-msg_table_lighter">{record.messageTypeString}</div>
                )
            },
        },
        {
            title: '业务处理状态',
            dataIndex: 'processState',
            render: (text, record) => {
                const viewState = record.viewState;
                return viewState === 0 ? (
                    <div className="pms-msg_table_bold">{record.processStateString}</div>
                ) : (
                    <div className="pms-msg_table_lighter">{record.processStateString}</div>
                )
            },
        },
        {
            title: '处理结果',
            dataIndex: 'processResult',
            render: (text, record) => {
                const viewState = record.viewState;
                return viewState === 0 ? (
                    <div className="pms-msg_table_bold">{record.processResultString}</div>
                ) : (
                    <div className="pms-msg_table_lighter">{record.processResultString}</div>
                )
            },
        },
        {
            title: '处理时间',
            dataIndex: 'handleTime',
            render: (text, record) => {
                const viewState = record.viewState;
                return viewState === 0 ? (
                    <div className="pms-msg_table_bold">{text}</div>
                ) : (
                    <div className="pms-msg_table_lighter">{text}</div>
                )
            },
        },
        {
            title: '操作',
            render: (text, record, index) => (
                <a
                    style={{ display: 'block', textAlign: 'center' }}
                    onClick={() => this.showModal(index, record)}
                >
                    查看
                </a>
            ),
        }];

    state = {
        selectedRowKeys: [],
        selectedRows: [],
        pageNumber: 1,
        pageData: 20,
        showDisMissalNotice: false,
        showStationNewsNotice: false,
        itemData: {}, // 列表条目数据
    };

    /**
     * 第一次初始化视图,加载数据
     */
    componentDidMount() {
        const pageNumber = this.state.pageNumber;
        const pageSize = this.state.pageData;
        this.loadData(pageNumber, pageSize);
    }

    loadData = (pageNumber, pageData) => {
        this.setState({
            pageNumber,
            pageData,
        });
        this.props.loadData(pageNumber, pageData);
    };

    /**
     * 1-站内消息 2-下架申请
     */
    showModal = (index, record) => {
        this.props.updataMyReviewMsgListViewState(index, this.props.myReceiveList);
        if (record.messageType === 1) {
            this.setState({
                itemData: record,
                showStationNewsNotice: true,
            });
        } else {
            this.setState({
                itemData: record,
                showDisMissalNotice: true,
            });
        }
    };

    closeModal = () => {
        this.setState({
            showDisMissalNotice: false,
            showStationNewsNotice: false,
            itemData: {},
        });
    };

    render() {
        const {
            list,
            total,
        } = this.props.myReceiveList;

        const {
            pageNumber,
            pageData,
            showDisMissalNotice,
            showStationNewsNotice,
            itemData,
        } = this.state;

        const { openCreateMsgModal, downloadReceiveData } = this.props;
        /**
         * table选中回调
         */
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            selectedRows: this.state.selectedRows,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows,
                });
            },
        };

        return (
            <div className="yks-erp-table">
                <div className="top-container">
                    <div className="top-right-wrap">
                        <Button className='margin-ss-right' onClick={ () => openCreateMsgModal() }>+ 创建消息</Button>
                        <Button icon="upload" onClick={() => downloadReceiveData()}>导出</Button>
                    </div>
                </div>
                <Spin spinning={this.props.listLoadState} delay={500} tip="Loading...">
                    <Table
                        rowKey={record => record.id}
                        rowSelection={rowSelection}
                        columns={this.columns}
                        dataSource={list}
                        size="small"
                        pagination={false}
                        bordered
                    />
                </Spin>
                <Pagination
                    showTotal={() => `共 ${total} 条`}
                    current={pageNumber}
                    showQuickJumper={{ goButton: true }}
                    total={total}
                    pageSize={pageData}
                    onChange={this.loadData}
                />
                <DismissalNoticeModal
                    loadData={this.loadData}
                    visible={showDisMissalNotice}
                    cancel={this.closeModal}
                    itemData={itemData}
                    type={0} // 用来区分是--我接受的页面的类型
                />
                <StationNewsModal
                    visible={showStationNewsNotice}
                    cancel={this.closeModal}
                    itemData={itemData}
                    type={0} // 用来区分是--我接受的页面的类型
                />
            </div>
        );
    }
}
