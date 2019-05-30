import React from 'react';
import { Form } from 'antd';
import TableList from './TableLists';
import AddTaskTransferModal from './AddTaskTransferModal';

/**
 * 作者: ZhengXueNing
 * 功能描述:
 * 时间: 2018/10/22
 */
class WaitingReviewTask extends React.Component {
    state = {
        pageNumber: 1,
        pageSize: 20,
        transferLogModalVisible: false,
        item: {},
    };

    componentDidMount() {
        this.handleSubmitReviewTask();
    }

    /**
     * 显示任务转移或快速审核弹窗
     */
    changeStateInTransfer = (value) => {
        this.setState({
            transferLogModalVisible: value.transferLogModalVisible,
            item: value.item,
        });
    };

    /**
     * 关闭任务转移框
     */
    changeStateInCloseTransfer = () => {
        this.setState({
            transferLogModalVisible: false,
            item: {},
        });
    };

    /**
     * HTTP请求 待核查任务列表数据
     */
    handleSubmitReviewTask = (pageNumber, pageSize) => {
        const params = { ...this.props.form.getFieldsValue };
        if (pageNumber) {
            params.pageNumber = pageNumber;
        } else {
            pageNumber = this.state.pageNumber;
            params.pageNumber = this.state.pageNumber;
        }
        if (pageSize) {
            params.pageData = pageSize;
        } else {
            pageSize = this.state.pageSize;
            params.pageData = this.state.pageSize;
        }
        this.setState({
            pageNumber,
            pageSize,
        });

        const data = {
            data: {
                ...params,
                taskType: 2,
            },
        };
        this.props.queryTaskList(data);
    };

    /**
     * 关闭任务转移弹框，并刷新列表
     */
    changeStateInCloseTransferAndRefresh = () => {
        this.changeStateInCloseTransfer();
        this.handleSubmitReviewTask();
        const { changeMyUpcomingNumber } = this.props;
        changeMyUpcomingNumber();
    };

    /**
     * 刷新待核查任务列表数据，和Tabs数字
     */
    refreshTaskAndTabsData = () => {
        this.handleSubmitReviewTask();
        const { changeMyUpcomingNumber } = this.props;
        changeMyUpcomingNumber();
    };

    render() {
        const {
            transferLogModalVisible,
            pageNumber,
            pageSize,
            item,
        } = this.state;
        return (
            <div>
                <TableList
                    {...this.props}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    refreshData={this.refreshTaskAndTabsData}
                    onReviewTask={this.handleSubmitReviewTask}
                    showModal={this.changeStateInTransfer}
                />

                <AddTaskTransferModal
                    visible={transferLogModalVisible}
                    item={item}
                    onTaskCancel={this.changeStateInCloseTransfer}
                    onTaskSubmit={this.changeStateInCloseTransferAndRefresh}
                />
            </div>
        );
    }
}

export default Form.create()(WaitingReviewTask);
