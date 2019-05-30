import React from 'react';
import { Form } from 'antd';

import TableList from './TableLists';
import AddOrderTransferModal from './AddOrderTransferModal';
import AddOrderRapidApprovalModal from './AddOrderRapidApprovalModal';

/**
 * 作者: ZhengXueNing
 * 功能描述:
 * 时间: 2018/10/22
 */
class WaitingReviewOrder extends React.Component {
    state = {
        pageNumber: 1,
        pageSize: 20,
        transferLogModalVisible: false,
        fastApprovalLogModalVisible: false,
        item: {},
    };

    componentDidMount() {
        this.handleSubmitReviewOrder();
    }

    /**
     * 显示任务转移或快速审核弹窗
     */
    changeStateInTransferOrFastApproval = (value) => {
        if (value.type === '1') {
            this.setState({
                transferLogModalVisible: value.transferLogModalVisible,
                item: value.item,
            });
        } else {
            this.setState({
                fastApprovalLogModalVisible: value.fastApprovalLogModalVisible,
                item: value.item,
            });
        }
    };

    /**
     * 关闭任务转移框
     */
    changeStateInCloseTransfer = () => {
        this.setState({ transferLogModalVisible: false });
    };

    /**
     * 关闭订单快速审核框
     */
    changeStateInCloseFastApproval = () => {
        this.setState({ fastApprovalLogModalVisible: false });
    };

    /**
     *  HTTP请求 待审核订单列表数据
     */
    handleSubmitReviewOrder = (pageNumber, pageSize) => {
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
                taskType: 1,
            },
        };
        this.props.queryOrderList(data);
    };

    /**
     * 关闭任务转移弹框，并刷新列表
     */
    changeStateInCloseTransferAndRefresh = () => {
        this.changeStateInCloseTransfer();
        this.handleSubmitReviewOrder();
        const { changeMyUpcomingNumber } = this.props;
        changeMyUpcomingNumber();
    };

    /**
     * 关闭快速审批弹框，并刷新列表
     */
    changeStateInCloseFastApprovalAndRefresh = () => {
        this.changeStateInCloseFastApproval();
        this.handleSubmitReviewOrder();
        const { changeMyUpcomingNumber } = this.props;
        changeMyUpcomingNumber();
    };

    /**
     * 刷新待核查任务列表数据，和Tabs数字
     */
    refreshOrderAndTabsData = () => {
        this.handleSubmitReviewOrder();
        const { changeMyUpcomingNumber } = this.props;
        changeMyUpcomingNumber();
    };

    render() {
        const {
            transferLogModalVisible,
            fastApprovalLogModalVisible,
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
                    refreshData={this.refreshOrderAndTabsData}
                    onReviewOrder={this.handleSubmitReviewOrder}
                    showModal={this.changeStateInTransferOrFastApproval}
                />
                <AddOrderTransferModal
                    visible={transferLogModalVisible}
                    item={item}
                    onOrderCancel={this.changeStateInCloseTransfer}
                    onOrderSubmit={this.changeStateInCloseTransferAndRefresh}
                />
                <AddOrderRapidApprovalModal
                    visible={fastApprovalLogModalVisible}
                    item={item}
                    onOrderCancel={this.changeStateInCloseFastApproval}
                    onOrderSubmit={this.changeStateInCloseFastApprovalAndRefresh}
                />
            </div>
        );
    }
}

export default Form.create()(WaitingReviewOrder);
