import React from 'react';
import { Form, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import actions from '../actions';
import TabsSearch from './TabsSearch';
import Tablelist from './Tablelist';
import RecordChatBox from '../../../common/components/RecordChatBox';
import Modal2 from '../../../../components/Modal2';
import OrderDetailModal from '../../../common/components/OrderDetailModal';
import SyncModal from '../../../common/components/SyncModal';
import DisputeOperate from '../../../common/components/DisputeOperate';
import ExportChart from './ExportChart';
import AddRefundFormModal from '../../../common/components/AddRefundFormModal';
import { filterPostdata } from '../../../common/components/AddRefundFormModal/filterData';
import DisputeDetailModal from './DisputeDetailModal';
import { filterRequest } from '../../../../utils';
import { getChatRecord } from '../../../common/request';
import {
    SYNC_DISPUTE, DISPUTE_SELLERACCOUNT, TODAY_SHOW_EXCEL
} from '../constants';
import {
    POST_DALAY_RECEIVED, EDIT_OR_ADD_REFUND, GET_MODE_PLATFORM
} from '../../../common/constants';
import { fetchPost, openDownloadFile } from '../../../../util/fetch';
import { GET_VARIAYE_LIST_API } from '../../../intelligentservice/autoreply/autoreply-set/constants/Api';

/**
 * 作者: xupeiwen
 * 功能描述: 客诉组件容器
 * 时间: 2018/8/27 15:55
 */
class App extends React.Component {
    state = {
        operateType: '1', // '1' 纠纷，'2' 评价， '3' 账号表现
        platform: [],
        platformId: '',
        searchAccount: '',
        accountData: {}, // 账号表现数据
        varietyData: {},
        accountLoading: false,
        disputePageNumber: 1,
        commentPageNumber: 1,
        disputePageData: 20,
        commentPageData: 20,
        replyVisible: false,
        disputeVisible: false,
        syncDisputeVisible: false,
        syncAddVisible: false,
        disputeDetailVisible: false,
        refundVisible: false,
        orderVisible: false,
        syncDisputeConfirmLoading: false,
        syncAddConfirmLoading: false,
        delayConfirmLoading: false,
        refundConfirmLoading: false,
        messageData: {
            data: [],
        },
        messageDataArr: [], // 站内信聊天记录
        record: {}, // 表格单条的数据详情数据
        lastId: '',
        lastReceiveTime: '',
        chatPageNumber: 1, // 站内信消息记录页码
    }

    componentDidMount() {
        // 权限过滤
        const pathname = window.location.pathname;
        const { menuInfos } = this.props;
        const keys = menuInfos.functions[pathname] || [];
        if (keys.includes('009-000003-000001-001')) {
            this.getPlatform('dispute');
        } else if (!keys.includes('009-000003-000001-001') && keys.includes('009-000003-000001-010')) {
            this.setState({
                operateType: '2',
            }, () => {
                this.getPlatform('comment');
            });
        } else {
            this.setState({
                operateType: '3',
            }, () => {
                this.getPlatform();
            });
        }
    }

    fetchVariety = () => {
        const { record } = this.state;
        const platformId = this.props.form.getFieldValue('platformId');
        fetchPost(GET_VARIAYE_LIST_API, { platformId, platformOrderId: record.orderNumber, isAnalysis: '1' }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.setState({ varietyData: data.data });
                }
            });
    }

    // 获取和买家的聊天记录
    getMessageRecord = (postData, pageNumber = 1) => {
        getChatRecord('1', postData, pageNumber, (result) => {
            const data = result.data;
            let { messageDataArr } = this.state;
            if (pageNumber === 1) {
                for (let i = data.data.length - 1; i >= 0; i--) {
                    if (data.data[i].senderType === 1) {
                        this.setState({
                            lastId: data.data[i].messageUnid,
                            lastReceiveTime: data.data[i].msgTime,
                        });
                    }
                }
            }
            messageDataArr = data.data.concat(messageDataArr);
            this.setState({
                messageDataArr,
                messageData: result.data,
            });
        });
        this.fetchVariety();
    }

    /**
     * 纠纷列表请求
     * @param <String> visible 弹框的visible变量名
     * @param <Object> record 单条的数据详情
     */
    handleOperate = (visible, record) => {
        if (visible === 'replyVisible') {
            const platformId = this.props.form.getFieldValue('platformId');
            const postData = {
                platformId,
                messageType: 1,
                extendId: record.orderNumber,
                buyerAccount: record.buyerAccount,
                sellerAccount: record.sellerAccount,
                buyerNickname: record.buyerNickname,
            };
            this.setState({
                messageDataArr: [],
                chatPageNumber: 1,
            }, () => {
                this.getMessageRecord(postData);
            });
        }
        this.setState({
            [visible]: true,
            record: record || null,
        });
    }

    // 查看历史消息
    handleGetHistoryInfo = () => {
        const { record } = this.state;
        const platformId = this.props.form.getFieldValue('platformId');
        let { chatPageNumber } = this.state;
        chatPageNumber += 1;
        this.setState({ chatPageNumber });
        const postData = {
            platformId,
            messageType: 1,
            extendId: record.orderNumber,
            buyerAccount: record.buyerAccount,
            sellerAccount: record.sellerAccount,
        };
        this.getMessageRecord(postData, chatPageNumber);
    }

    handleCancel = (visible) => {
        this.setState({
            [visible]: false,
            // 重置loading状态 cwc 2019年1月30日09:33:54
            accountLoading: false,
            syncDisputeConfirmLoading: false,
            syncAddConfirmLoading: false,
            delayConfirmLoading: false,
            refundConfirmLoading: false,
        });
    }

    /**
     * 纠纷列表请求
     * @param <Number> pageNumber 页码
     * @param <Number> pageData 每页条数
     */
    getDisputelist = (pageNumber = 1, pageData = 20) => {
        setTimeout(() => {
            this.props.form.validateFields((err, values) => {
                const { platformId } = this.state;
                const filter = filterRequest(values);
                filter.pageNumber = pageNumber;
                filter.pageData = pageData;
                if (platformId !== undefined) {
                    filter.platformId = platformId;
                }
                this.props.disputelistFetch({ ...filter });
            });
        }, 0);
        this.setState({
            disputePageData: pageData,
            disputePageNumber: pageNumber,
        });
    };

    getPlatform = (mode) => {
        fetchPost(GET_MODE_PLATFORM, { modeUse: 'complain' }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    const result = data.data.data;
                    this.setState({
                        platform: result,
                        platformId: result[0].key,
                    });
                    if (mode === 'dispute') {
                        this.getDisputelist();
                    } else if (mode === 'comment') {
                        this.getCommentlist();
                    }
                } else {
                    this.setState({
                        platform: [],
                    });
                }
            });
    }

    // 平台切换
    handlePlatformChange = (key) => {
        this.setState({ platformId: key });
    }

    /**
     * 评价列表请求
     * @param <Number> pageNumber 页码
     * @param <Number> pageData 每页条数
     */
    getCommentlist = (pageNumber = 1, pageData = 20) => {
        setTimeout(() => {
            this.props.form.validateFields((err, values) => {
                const { platformId } = this.state;
                if (!values.stars) values.stars = '0';
                const filter = filterRequest(values);
                filter.pageNumber = pageNumber;
                filter.pageData = pageData;
                if (platformId !== undefined) {
                    filter.platformId = platformId;
                }
                filter.date = this.dateFormat(values.date, 1);
                filter.sellerReplyTime = this.dateFormat(values.sellerReplyTime, 2);
                this.props.commentlistFetch({ ...filter });
            });
        }, 0);
        this.setState({
            commentPageNumber: pageNumber,
            commentPageData: pageData,
        });
    };

    dateFormat = (date, type) => {
        // 1,买家评价时间 2,卖家回复时间
        if (date) {
            if (type === 1) {
                return [date[0].startOf('day').format('YYYY-MM-DD HH:mm:ss'), date[1].endOf('day').format('YYYY-MM-DD HH:mm:ss')];
            } if (type === 2) {
                return [moment(date[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment(date[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')];
            }
        }
        return undefined;
    }

    // 重置
    onReset = () => {
        this.props.form.resetFields();
    };

    // 纠纷/评价/账号表现切换回调
    handleOperateChange = (key) => {
        this.onReset();
        this.setState({
            operateType: key,
        });
    }

    /**
     * @param <Number> type：1-同步纠纷，2-同步卖家地址
     */
    handleSyncOk = (type) => {
        const refType = type === 1 ? 'syncDisputeRef' : 'syncAddRef';
        this[refType].validateFields((err, values) => {
            if (!err) {
                const { platformId } = this.state;
                const postApi = type === 1 ? SYNC_DISPUTE : DISPUTE_SELLERACCOUNT;
                const visibleType = type === 1 ? 'syncDisputeVisible' : 'syncAddVisible';
                const loading = type === 1 ? 'syncDisputeConfirmLoading' : 'syncAddConfirmLoading';
                this.setState({ [loading]: true });
                fetchPost(postApi, { ...values, platformId }, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.getDisputelist();
                            this.setState({
                                [visibleType]: false,
                                [loading]: false,
                            });
                        }
                        this.setState({
                            [loading]: false,
                        });
                    });
            }
        });
    }

    // 延迟收货
    handleDelayOk = () => {
        this.delayRef.validateFields((err, values) => {
            if (!err) {
                this.setState({ delayConfirmLoading: true });
                fetchPost(POST_DALAY_RECEIVED, values, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.getDisputelist();
                            this.setState({
                                delayVisible: false,
                            });
                        }
                        this.setState({
                            delayConfirmLoading: false,
                        });
                    });
            }
        });
    }

    // 账号表现导出
    handleExportOk = () => {
        this.exportRef.validateFields((err, values) => {
            if (!err) {
                values.date = this.dateFormat(values.date, 1);
                this.setState({ exportLoading: true });
                fetchPost(TODAY_SHOW_EXCEL, values, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            openDownloadFile(data.data);
                            this.setState({
                                exportVisible: false,
                            });
                        }
                        this.setState({
                            exportLoading: false,
                        });
                    });
            }
        });
    }

    // 编辑退款单
    handleRefundOk = () => {
        this.refundRef.validateFields((err, values) => {
            const { record, platformId } = this.state;
            const postData = filterPostdata(values);
            postData.platformId = platformId;
            postData.orderNumber = record.orderNumber;
            postData.group = '1';// 退款登记固定写1 cwc 2019年1月30日09:14:54
            if (!err) {
                this.setState({ refundConfirmLoading: true });
                fetchPost(EDIT_OR_ADD_REFUND, postData, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.getDisputelist();
                            this.setState({
                                refundVisible: false,
                                refundConfirmLoading: false,
                            });
                        }
                    });
            }
        });
    }

    // 取消编辑退款单loading状态
    cancelRefundLoading = () => {
        this.setState({ refundConfirmLoading: false });
    }

    /**
     * @param <boolean> loading-账号表现的Loading
     * @param <String> searchAccount-账号表现搜索的买家账号
     * @param <String> accountData-搜索到的账号信息
     */
    handleSetAccountData = (options) => {
        this.setState({
            searchAccount: options.searchAccount,
            accountData: options.accountData ? options.accountData : [],
            accountLoading: options.loading,
        });
    }

    render() {
        const {
            operateType,
            searchAccount,
            accountData,
            disputePageData,
            commentPageData,
            disputePageNumber,
            commentPageNumber,
            platform,
            platformId,
            messageData,
            messageDataArr,
            record,
            varietyData,
            lastId,
            lastReceiveTime,
            replyVisible,
            syncDisputeVisible,
            syncAddVisible,
            disputeVisible,
            disputeDetailVisible,
            exportVisible,
            refundVisible,
            orderVisible,
            syncDisputeConfirmLoading,
            syncAddConfirmLoading,
            exportLoading,
            refundConfirmLoading,
            accountLoading,
        } = this.state;
        let orderNumber;
        let sellerAccount;
        let buyerAccount;
        let issueId;
        if (record) {
            orderNumber = record.orderNumber;
            sellerAccount = record.sellerAccount;
            buyerAccount = record.buyerAccount;
            issueId = record.disputeId;
        }
        return (
            <div className="complaintlist-main">
                <TabsSearch
                    {...this.props}
                    operateType={operateType}
                    platform={platform}
                    platformId={platformId}
                    accountLoading={accountLoading}
                    onReset={this.onReset}
                    getDisputelist={this.getDisputelist}
                    getCommentlist={this.getCommentlist}
                    handleOperate={this.handleOperate}
                    handleSetAccountData={this.handleSetAccountData}
                    handleOperateChange={this.handleOperateChange}
                    handlePlatformChange={this.handlePlatformChange}
                />
                <Tablelist
                    {...this.props}
                    operateType={operateType}
                    form={this.props.form}
                    platform={platform}
                    platformId={platformId}
                    searchAccount={searchAccount}
                    accountData={accountData}
                    accountLoading={accountLoading}
                    disputePageData={disputePageData}
                    commentPageData={commentPageData}
                    disputePageNumber={disputePageNumber}
                    commentPageNumber={commentPageNumber}
                    handleOperate={this.handleOperate}
                    getDisputelist={this.getDisputelist}
                    getCommentlist={this.getCommentlist}
                />
                {/* 同步纠纷弹窗 */}
                <Modal2
                    component={
                        (
                            <SyncModal
                                platformId={platformId}
                                platform={platform}
                                ref={sync => this.syncDisputeRef = sync}
                                noDatePicker
                            />
                        )
                    }
                    title="同步纠纷"
                    visible={syncDisputeVisible}
                    handleOk={() => this.handleSyncOk(1)}
                    handleCancel={() => this.handleCancel('syncDisputeVisible')}
                    confirmLoading={syncDisputeConfirmLoading}
                />
                {/* 同步卖家地址弹窗 */}
                <Modal2
                    component={
                        (
                            <SyncModal
                                platformId={platformId}
                                platform={platform}
                                ref={sync => this.syncAddRef = sync}
                                noDatePicker
                            />
                        )
                    }
                    title="同步卖家地址"
                    visible={syncAddVisible}
                    handleOk={() => this.handleSyncOk(2)}
                    handleCancel={() => this.handleCancel('syncAddVisible')}
                    confirmLoading={syncAddConfirmLoading}
                />
                {/* 联系买家弹窗 */}
                <Modal2
                    component={
                        (
                            <RecordChatBox
                                {...this.props}
                                operateType="4"
                                issueId={issueId}
                                recordData={messageData}
                                buyerAccount={buyerAccount}
                                sellerAccount={sellerAccount}
                                messageType={1}
                                messageStatus={5}
                                varietyData={varietyData}
                                recordDataArr={messageDataArr}
                                selectedOrderNumber={orderNumber}
                                handleCancel={() => this.handleCancel('replyVisible')}
                                handleGetHistoryInfo={this.handleGetHistoryInfo}
                                getlist={this.getDisputelist}
                                platformId={platformId}
                                lastId={lastId}
                                lastReceiveTime={lastReceiveTime}
                            />
                        )
                    }
                    title="联系买家"
                    visible={replyVisible}
                    width={1100}
                    footer={null}
                    handleCancel={() => this.handleCancel('replyVisible')}
                />
                {/* 纠纷处理 */}
                <Modal2
                    component={
                        (
                            <DisputeOperate
                                issueId={issueId}
                                platformId={platformId}
                                buyerAccount={buyerAccount}
                                sellerAccount={sellerAccount}
                                ref={dispute => this.disputeRef = dispute}
                            />
                        )
                    }
                    title="纠纷处理"
                    visible={disputeVisible}
                    handleCancel={() => this.handleCancel('disputeVisible')}
                    footer={null}
                    width={600}
                />
                {/* 纠纷详情弹窗 */}
                <Modal2
                    component={
                        (
                            <DisputeDetailModal
                                issueId={issueId}
                                platformId={platformId}
                                buyerAccount={buyerAccount}
                                sellerAccount={sellerAccount}
                                orderNumber={orderNumber}
                                ref={detail => this.disputeDetailRef = detail}
                            />
                        )
                    }
                    title="纠纷详情"
                    visible={disputeDetailVisible}
                    handleCancel={() => this.handleCancel('disputeDetailVisible')}
                    footer={null}
                    width={800}
                />
                {/* 延迟收货 */}
                {/* <Modal2
                    component={
                        (
                            <DelayReceived
                                orderNumber={orderNumber}
                                account={sellerAccount}
                                platformId={platformId}
                                ref={delay => this.delayRef = delay}
                            />
                        )
                    }
                    title="延迟收货"
                    visible={delayVisible}
                    handleOk={this.handleDelayOk}
                    handleCancel={() => this.handleCancel('delayVisible')}
                    confirmLoading={delayConfirmLoading}
                /> */}
                {/* 登记退款单 */}
                <Modal2
                    component={
                        (
                            <AddRefundFormModal
                                record={record}
                                platformId={platformId}
                                type="add"
                                ref={refund => this.refundRef = refund}
                                cancelRefundLoading={this.cancelRefundLoading}
                            />
                        )
                    }
                    title="登记退款单"
                    visible={refundVisible}
                    handleOk={this.handleRefundOk}
                    handleCancel={() => this.handleCancel('refundVisible')}
                    confirmLoading={refundConfirmLoading}
                    width={800}
                />
                {/* 订单详情弹窗 */}
                <Modal2
                    component={(
                        <OrderDetailModal
                            orderNumber={orderNumber}
                            platformId={platformId}
                            buyerAccount={buyerAccount}
                            sellerAccount={sellerAccount}
                        />
                    )}
                    title="订单详情"
                    visible={orderVisible}
                    handleCancel={() => this.handleCancel('orderVisible')}
                    footer={null}
                />
                {/* 导出报表 */}
                <Modal2
                    component={(<ExportChart ref={exportChart => this.exportRef = exportChart} platformId={platformId} />)}
                    title="导出报表"
                    okText="导出"
                    visible={exportVisible}
                    confirmLoading={exportLoading}
                    handleCancel={() => this.handleCancel('exportVisible')}
                    handleOk={this.handleExportOk}
                    width={600}
                />
            </div>
        );
    }
}

export default connect(
    state => ({ ...state }),
    dispatch => bindActionCreators(actions, dispatch),
)(
    Form.create()(App),
);
