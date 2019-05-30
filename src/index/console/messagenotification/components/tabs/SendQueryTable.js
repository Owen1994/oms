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
 * 我发送的消息列表
 */
export default class TableList extends React.Component {
    /**
     * 列表头标签
     * @type {[]}
     */
    columns = [
        {
            title: '接收人',
            dataIndex: 'receiverName',
        },
        {
            title: '发送时间',
            dataIndex: 'sendTime',
        },
        {
            title: '内容',
            dataIndex: 'content',
            width: 300,
            render: (text, record) => (
                <section
                    className="pms-msg-notification_table_section"
                    dangerouslySetInnerHTML={{__html: record.content}}
                />
            ),
        },
        {
            title: '消息类型',
            dataIndex: 'messageType',
            render: (text, record) => (
                <div>{record.messageTypeString}</div>
            ),
        },
        {
            title: '业务处理状态',
            dataIndex: 'processState',
            render: (text, record) => (
                <div>{record.processStateString}</div>
            ),
        },
        {
            title: '处理结果',
            dataIndex: 'processResult',
            render: (text, record) => (
                <div>{record.processResultString}</div>
            ),
        },
        {
            title: '处理时间',
            dataIndex: 'handleTime',
        },
        {
            title: '操作',
            render: (text, record, index) => (
                <a
                    style={{ display: 'block', textAlign: 'center' }}
                    onClick={() => this.showModal(index, record)}
                >
                    详情
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
        const pageData = this.state.pageData;
        this.loadData(pageNumber, pageData);
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
        });
    };

    render() {
        const {
            list,
            total,
        } = this.props.mySendList;

        const { downloadSendData } = this.props;
        const {
            pageNumber,
            pageData,
            itemData,
            showDisMissalNotice,
            showStationNewsNotice,
        } = this.state;
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
                        <Button icon="upload" onClick={() => downloadSendData()}>导出</Button>
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
                    {...this.props}
                    visible={showDisMissalNotice}
                    cancel={this.closeModal}
                    itemData={itemData}
                    type={1} // 用来区分是--我发送的页面的类型
                />
                <StationNewsModal
                    {...this.props}
                    visible={showStationNewsNotice}
                    cancel={this.closeModal}
                    itemData={itemData}
                    type={1} // 用来区分是--我发送的页面的类型
                />
            </div>
        );
    }
}
