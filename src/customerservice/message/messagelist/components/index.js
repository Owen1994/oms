import React from 'react';
import { Form, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import actions from '../actions';
import TabsSearch from './TabsSearch';
import Messagelist from './Messagelist';
import ChatBox from './ChatBox';
import Modal2 from '../../../../components/Modal2';
import SyncModal from '../../../common/components/SyncModal';
import OrderDetailModal from '../../../common/components/OrderDetailModal';
import { filterRequest } from '../../../../utils';
import { fetchPost } from '../../../../util/fetch';
import { getModePlatform, getChatRecord } from '../../../common/request';
import { SYNC_MESSAGE } from '../constants';
import { SYNC_EMAIL } from '../../../email/list/constants';
import { GET_ORDER_ASSOCIATION_INFO } from '../../../common/constants';
import { GET_VARIAYE_LIST_API } from '../../../intelligentservice/autoreply/autoreply-set/constants/Api';

/**
 * 作者: xupeiwen
 * 功能描述: 消息列表组件容器
 * 时间: 2018/9/12 15:55
 */
class App extends React.Component {
    state = {
        defaultActivePlatformId: '',
        platform: [],
        platformId: '',
        operateType: '1', // 站内信/买家邮件类型
        messageStatus: 5,
        emailStatus: 5,
        buyerAccount: '',
        buyerNickname: '',
        sellerAccount: '',
        sellerEmail: '',
        buyerEmail: '',
        varietyData: {},
        recordData: {}, // 沟通记录的返回数据
        recordDataArr: [], // 聊天记录追加的数据集合
        msglistArr: [], // 消息列表追加的数据集合
        orderNumberArr: [],
        selectedOrderNumber: '',
        chatPageNumber: 1, // 聊天记录页码
        msgPageNumber: 1, // 消息列表页码
        lastReceiveTime: '',
        lastId: '',
        loading: true,
        syncVisible: false,
        syncConfirmLoading: false,
        orderDetail: {},
        commentDetail: {},
        issueDetail: {},
        logisticsDetail: {},
    }

    syncEmailRef = React.createRef();

    componentDidMount() {
        // 权限过滤
        const pathname = window.location.pathname;
        const { menuInfos } = this.props;
        const keys = menuInfos.functions[pathname] || [];
        if (!keys.includes('009-000002-000004-002') && keys.includes('009-000002-000004-008')) {
            this.setState({ operateType: '2' }, () => {
                this.getPlatform('buyer_mail');
            });
        } else if (keys.includes('009-000002-000004-002')) {
            this.getPlatform('message');
        }
    }

    getPlatform = (modeUse) => {
        const { operateType } = this.state;
        getModePlatform({ modeUse }).then((result) => {
            if (result && result.length > 0) {
                this.setState({
                    platform: result,
                    platformId: result[0].key,
                    defaultActivePlatformId: result[0].key,
                });
                this.listFetch(operateType);
            } else {
                message.error('暂无任何平台权限');
            }
        });
    }

    /**
     * 请求列表
     * @param <String> operateType 操作类型 1-站内信，2-买家邮件
     * @param <Number> pageNumber 总页数
     */
    listFetch = (operateType, pageNumber = 1) => {
        setTimeout(() => {
            const msglistArr = [...this.state.msglistArr];
            const values = this.props.form.getFieldsValue();
            const postType = operateType === '1' ? 'messageDate' : 'emailDate';
            const postStatus = operateType === '1' ? 'messageStatus' : 'emailStatus';
            if (values[postStatus] && values[postStatus].length) {
                values[postStatus] = values[postStatus][0];
            } else {
                values[postStatus] = 5;
            }
            if (!values[postType] || !values[postType].length) {
                values[postType] = [Math.floor(moment().subtract(1, 'month').startOf('day').valueOf() / 1000), Math.floor(moment().endOf('day').valueOf() / 1000)];
            } else {
                values[postType] = [Math.floor(values[postType][0].startOf('day').valueOf() / 1000), Math.floor(values[postType][1].endOf('day').valueOf() / 1000)];
            }
            const filter = filterRequest(values);
            filter.pageData = 10;
            filter.pageNumber = pageNumber;
            // 不是追加消息的情况,页面信息重置
            if (pageNumber <= 1) {
                this.setState({
                    loading: true,
                    chatPageNumber: 1,
                    recordDataArr: [],
                    msgPageNumber: 1,
                    msglistArr: [],
                });
            }
            if (operateType === '1') {
                filter.messageType = values.messageType;
                this.props.messageListFetch({ name: 'data', value: filter }).then((data) => {
                    // 返回值为空时页面信息清空
                    if (!data.messageList.length) {
                        this.setState({
                            loading: true,
                            chatPageNumber: 1,
                            recordDataArr: [],
                            msgPageNumber: 1,
                            msglistArr: [],
                        });
                        return;
                    }
                    let defaultBuyerAccount;
                    let defaultBuyerNickname;
                    let defaultSellerAccount;
                    let defaultOrderNumberArr;
                    let defaultSelectedOrderNumber;
                    const lastMsg = data.messageList[data.messageList.length-1];
                    if (lastMsg) {
                        this.setState({
                            lastList: {
                                buyerAccount: lastMsg.list[lastMsg.list.length-1].buyerAccount,
                                sellerAccount: lastMsg.list[lastMsg.list.length-1].sellerAccount,
                                orderNumberArr: lastMsg.list[lastMsg.list.length-1].extendId
                            }
                        })
                    }
                    // 查看更多时追加消息列表
                    if (pageNumber > 1) {
                        this.appendMsg(msglistArr, data.messageList, 'messageDate', 'messageNum');
                        this.setState({ msglistArr });
                        return;
                    }
                    if (data.messageList.length > 0) {
                        defaultBuyerAccount = data.messageList[0].list[0].buyerAccount;
                        defaultSellerAccount = data.messageList[0].list[0].sellerAccount;
                        defaultOrderNumberArr = data.messageList[0].list[0].extendId;
                        defaultSelectedOrderNumber = data.messageList[0].list[0].extendId[0];
                    } else {
                        this.setState({
                            msglistArr: [],
                        });
                        return;
                    }
                    this.setState({
                        msglistArr: data.messageList,
                        buyerAccount: defaultBuyerAccount,
                        sellerAccount: defaultSellerAccount,
                        orderNumberArr: defaultOrderNumberArr,
                        selectedOrderNumber: defaultSelectedOrderNumber,
                        firstList: {
                            buyerAccount: defaultBuyerAccount,
                            sellerAccount: defaultSellerAccount,
                            orderNumberArr: defaultOrderNumberArr
                        },
                    });
                    this.getMessageRecord({
                        buyerAccount: defaultBuyerAccount,
                        buyerNickname: defaultBuyerNickname,
                        sellerAccount: defaultSellerAccount,
                        extendId: defaultSelectedOrderNumber,
                        messageType: this.props.form.getFieldValue('messageType'),
                        messageStatus: this.props.form.getFieldValue('messageStatus')[0],
                        platformId: this.props.form.getFieldValue('platformId'),
                    });
                });
            } else {
                filter.tagId = filter.tagId && filter.tagId[0];
                this.props.emailListFetch({ name: 'data', value: filter }).then((data) => {
                    // 返回值为空时页面信息清空
                    if (!data.emailList.length) {
                        this.setState({
                            loading: true,
                            chatPageNumber: 1,
                            recordDataArr: [],
                            msgPageNumber: 1,
                            msglistArr: [],
                        });
                        return;
                    }
                    let defaultBuyerEmail;
                    let defaultSellerEmail;
                    const lastEmail = data.emailList[data.emailList.length-1];
                    if (lastEmail) {
                        this.setState({
                            lastList: {
                                buyerEmail: lastEmail.list[lastEmail.list.length-1].buyerEmail,
                                sellerEmail: lastEmail.list[lastEmail.list.length-1].sellerEmail,
                            }
                        })
                    }
                    // 查看更多时追加消息列表
                    if (pageNumber > 1) {
                        this.appendMsg(msglistArr, data.emailList, 'emailDate', 'emailNum');
                        this.setState({ msglistArr });
                        return;
                    }
                    if (data.emailList.length > 0) {
                        defaultBuyerEmail = data.emailList[0].list[0].buyerEmail;
                        defaultSellerEmail = data.emailList[0].list[0].sellerEmail;
                    } else {
                        this.setState({
                            msglistArr: [],
                        });
                        return;
                    }
                    this.setState({
                        msglistArr: data.emailList,
                        buyerEmail: defaultBuyerEmail,
                        sellerEmail: defaultSellerEmail,
                        firstList: {
                            buyerEmail: defaultBuyerEmail,
                            sellerEmail: defaultSellerEmail,
                        },
                    });
                    this.getEmailRecord({
                        buyerEmail: defaultBuyerEmail,
                        sellerEmail: defaultSellerEmail,
                        emailStatus: this.props.form.getFieldValue('emailStatus')[0],
                        platformId: this.props.form.getFieldValue('platformId'),
                        isBuyerEmail: 1,
                    });
                });
            }
        }, 50);
    };

    /**
     * 消息列表追加
     * @param <Array> msglistArr:消息记录
     * @param <Array> data:消息记录
     * @param <String> dateField:日期字段名称
     * @param <String> numField:显示数目字段名称
     */
    appendMsg = (msglistArr, data, dateField, numField) => {
        data.forEach((ele) => {
            if (ele[dateField] === msglistArr[msglistArr.length - 1][dateField]) {
                msglistArr[msglistArr.length - 1][numField] = ele[numField] + msglistArr[msglistArr.length - 1][numField];
                msglistArr[msglistArr.length - 1].list.push(...ele.list);
            } else {
                msglistArr.push(ele);
            }
        });
    }

    // 获取站内信聊天记录获取站内信聊天记录
    getMessageRecord = (postData, pageNumber = 1) => {
        // this.setState({ loading: true });
        const messageType = this.props.form.getFieldValue('messageType');
        const messageStatus = this.props.form.getFieldValue('messageStatus')[0];
        getChatRecord('1', postData, pageNumber, (result) => {
            const data = result.data;
            let { recordDataArr } = this.state;
            if (pageNumber === 1) {
                for (let i = data.data.length - 1; i >= 0; i--) {
                    if (data.data[i].senderType === 1) {
                        this.setState({
                            lastId: data.data[i].messageUnid,
                            lastReceiveTime: data.data[i].msgTime,
                        });
                        break;
                    }
                }
            }
            // 切换时将输入框内容清空
            if (![2, 6, 8].includes(messageStatus)) {
                this.props.form.setFieldsValue({'content': ''});
            }
            recordDataArr = data.data.concat(recordDataArr);
            this.setState({
                recordDataArr,
                recordData: data,
            });
        }, () => {
            // 切换时将输入框内容清空
            if (![2, 6, 8].includes(messageStatus)) {
                this.props.form.setFieldsValue({'content': ''});
            }
            this.setState({
                loading: false,
            });
        });

        if (this.state.orderNumberArr.length > 0 && pageNumber === 1 && messageType === 1) {
            this.getOrderInfo();
        }
    }

    // 获取买家邮件聊天记录
    getEmailRecord = (postData, pageNumber = 1) => {
        // this.setState({ loading: true });
        const emailStatus = this.props.form.getFieldValue('emailStatus')[0];
        getChatRecord('2', postData, pageNumber, (result) => {
            const data = result.data;
            let { recordDataArr } = this.state;
            if (pageNumber === 1) {
                for (let i = data.data.length - 1; i >= 0; i--) {
                    if (data.data[i].senderType === 1) {
                        this.setState({
                            lastId: data.data[i].emailUnid,
                            lastReceiveTime: data.data[i].emailTime,
                        });
                        break;
                    }
                }
            }
            // 切换时将输入框内容清空
            if (![2, 6, 8].includes(emailStatus)) {
                this.props.form.setFieldsValue({'content': ''});
            }
            recordDataArr = data.data.concat(recordDataArr);
            this.setState({
                recordDataArr,
                recordData: result.data,
            });
        }, () => {
            // 切换时将输入框内容清空
            if (![2, 6, 8].includes(emailStatus)) {
                this.props.form.setFieldsValue({'content': ''});
            }
            this.setState({
                loading: false,
            });
        });
    }

    // 获取订单详情
    getOrderInfo = () => {
        const { selectedOrderNumber, platformId, buyerAccount, sellerAccount } = this.state;
        this.setState({
            orderDetail: {},
            commentDetail: {},
            issueDetail: {},
            logisticsDetail: {},
            varietyData: {},
        });
        fetchPost(GET_ORDER_ASSOCIATION_INFO, {
            platformId,
            buyerAccount,
            sellerAccount,
            orderNumber: selectedOrderNumber,
        }, 2).then((data) => {
            if (data && data.state === '000001') {
                const res = data.data;
                this.setState({
                    issueStatus: res.issueStatus,
                    orderDetail: res.order || {},
                    commentDetail: res.comment || {},
                    issueDetail: res.issue || {},
                    logisticsDetail: res.logistics || {}
                });
                this.fetchVariety();
            }
        });
    }

    // 表单重置
    onReset = () => {
        const { resetFields, getFieldsValue, setFieldsValue } = this.props.form;
        const { platformId } = getFieldsValue(['platformId']);
        resetFields();
        setFieldsValue({
            platformId,
            messageStatus: [5],
            emailStatus: [5],
        });
        this.setState({
            messageStatus: 5,
            emailStatus: 5,
        });
    }

    // 切换搜索类型时回调
    handleTypeChange = () => {
        const { operateType } = this.state;
        this.setState({
            msglistArr: [],
        }, () => {
            this.listFetch(operateType);
        });
    }

    // 表单提交
    onSubmit = (e) => {
        const { operateType } = this.state;

        if (e) {
            e.preventDefault();
        }

        this.setState({
            msglistArr: [],
        }, () => {
            this.listFetch(operateType);
        });
    }

    // 站内信/买家邮件切换
    handleOperateTabs = (operateType) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            searchContent: undefined,
            searchType: 1,
        });
        this.setState({
            operateType,
            chatPageNumber: 1,
            recordDataArr: [],
            msgPageNumber: 1,
            messageStatus: 5,
            platform: [],
            msglistArr: [],
            loading: true,
            recordData: [],
        }, () => {
            this.getPlatform(operateType === '1' ? 'message' : 'buyer_mail');
        });
    }

    /**
     * 平台切换
     * @param <String> activeKey  tab点击激活项的key值
     */
    handleTabChange = (key) => {
        const { operateType } = this.state;
        this.onReset();
        this.setState({
            platformId: key,
            msglistArr: [],
        }, () => {
            this.listFetch(operateType);
        });
    }

    /**
     * 消息列表点击回调
     * @param <Object> options 回调参数
     * @param <String> extendId  编号id
     * @param <String> index  （外）列表的索引
     * @param <String> i  （内）列表的索引
     */
    handleListClick = (options, extendId) => {
        const isLastPage = this.props.listReducer.data.isLastPage;
        const { operateType, platformId, lastList } = this.state;
        const { buyerNickname, buyerAccount, sellerAccount, buyerEmail, sellerEmail } = options;
        const listObj = JSON.stringify(operateType === '1' ? {
            buyerAccount,
            sellerAccount,
            orderNumberArr: extendId,
        } : {
            buyerEmail,
            sellerEmail,
        });
        options.platformId = platformId;
        this.setState({
            chatPageNumber: 1,
        });
        if (operateType === '1') {
            options.extendId = extendId[0];
            options.messageType = this.props.form.getFieldValue('messageType');
            options.messageStatus = this.props.form.getFieldValue('messageStatus')[0];
            this.setState({
                buyerNickname,
                buyerAccount,
                sellerAccount,
                recordDataArr: [],
                orderNumberArr: extendId,
                selectedOrderNumber: extendId[0],
            }, () => {
                if (!isLastPage && (listObj === JSON.stringify(lastList))) {
                    this.handleGetMoreMsg();
                }
                this.getMessageRecord({ ...options });
            });
        } else {
            options.emailStatus = this.props.form.getFieldValue('emailStatus')[0];
            options.isBuyerEmail = 1;
            this.setState({
                recordDataArr: [],
                buyerEmail: buyerEmail,
                sellerEmail: sellerEmail,
            }, () => {
                if (!isLastPage && (listObj === JSON.stringify(lastList))) {
                    this.handleGetMoreMsg();
                }
                this.getEmailRecord({ ...options });
            });
        }
    }

    // 消息列表升降序
    handleSort = (sortType) => {
        const { operateType } = this.state;
        const { setFieldsValue } = this.props.form;
        this.setState({
            msglistArr: [],
            recordDataArr: [],
            loading: true,
            chatPageNumber: 1,
        });
        setFieldsValue({ sortType }, () => {
            this.listFetch(operateType);
        });
    }

    // 订单编号/产品id下拉框回调
    handleChangeOrderNum = (value) => {
        const {
            platformId,
            buyerAccount,
            buyerNickname,
            sellerAccount,
        } = this.state;
        const params = {};
        params.platformId = platformId;
        params.extendId = value;
        params.messageType = this.props.form.getFieldValue('messageType');
        params.messageStatus = this.props.form.getFieldValue('messageStatus')[0];
        params.buyerAccount = buyerAccount;
        params.buyerNickname = buyerNickname;
        params.sellerAccount = sellerAccount;
        this.setState({
            selectedOrderNumber: value,
            chatPageNumber: 1,
            recordDataArr: [],
        });
        this.getMessageRecord({ ...params });
    }

    // 查看历史记录
    handleGetHistoryInfo = () => {
        const {
            operateType, platformId, selectedOrderNumber, buyerEmail, sellerEmail, buyerAccount, sellerAccount,
        } = this.state;
        let { chatPageNumber } = this.state;
        const params = {};
        chatPageNumber += 1;
        this.setState({ chatPageNumber });
        if (operateType === '1') {
            params.platformId = platformId;
            params.extendId = selectedOrderNumber;
            params.messageType = this.props.form.getFieldValue('messageType');
            params.messageStatus = this.props.form.getFieldValue('messageStatus')[0];
            params.buyerAccount = buyerAccount;
            params.sellerAccount = sellerAccount;
            this.getMessageRecord({ ...params }, chatPageNumber);
        } else {
            params.platformId = platformId;
            params.buyerEmail = buyerEmail;
            params.sellerEmail = sellerEmail;
            params.isBuyerEmail = 1;
            params.emailStatus = this.props.form.getFieldValue('emailStatus')[0];
            this.getEmailRecord({ ...params }, chatPageNumber);
        }
    }

    // 查看更多(消息列表)
    handleGetMoreMsg = () => {
        const { operateType } = this.state;
        let { msgPageNumber } = this.state;
        msgPageNumber += 1;
        this.setState({ msgPageNumber });
        this.listFetch(operateType, msgPageNumber);
    }

    // 消息列表日期下拉框回调
    handleDateChange = () => {
        const { operateType } = this.state;
        this.setState({
            msglistArr: [],
        }, () => {
            this.listFetch(operateType);
        });
    }

    // 消息状态下拉框回调
    handleStatusChange = (key) => {
        const { operateType } = this.state;
        this.setState({
            messageStatus: key,
            emailStatus: key,
            msglistArr: [],
        });
        this.listFetch(operateType);
    }

    // 标签类型选择回调
    handleLabelChange = (key) => {
        const { operateType } = this.state;
        this.setState({
            tagId: key,
            msglistArr: [],
        }, () => {
            this.listFetch(operateType);
        });
    }

    fetchVariety = () => {
        const { selectedOrderNumber, platformId } = this.state;
        fetchPost(GET_VARIAYE_LIST_API, { platformId, platformOrderId: selectedOrderNumber, isAnalysis: '1' }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.setState({ varietyData: data.data });
                }
            });
    }

    handleOpenModal = (visibleType) => {
        this.setState({
            [visibleType]: true,
        });
    }

    handleCancel = (visibleType) => {
        this.setState({
            [visibleType]: false,
        });
    }

    // 同步邮件确定回调
    handleSyncEmailOk = () => {
        const { operateType, platformId } = this.state;
        const postApi = operateType === '1' ? SYNC_MESSAGE : SYNC_EMAIL;
        this.syncEmailRef.current.validateFields((err, values) => {
            if (!err) {
                const syncDate = [];
                syncDate[0] = values.date[0].unix();
                syncDate[1] = values.date[1].unix();
                this.setState({ syncConfirmLoading: true });
                fetchPost(postApi, {
                    date: syncDate,
                    account: values.account,
                    platformId: `${platformId}`,
                }, 1).then((data) => {
                    if (data && data.state === '000001') {
                        this.setState({ syncVisible: false });
                        this.listFetch(operateType);
                    }
                    this.setState({ syncConfirmLoading: false });
                });
            }
        });
    }

    /**
     * 点击上一封/下一封
     * @param <Number> type  0,上一封;2,下一封
     */
    stepList = (type) => {
        const activeList = $('.message-li-info.active');
        const field = type ? 'next' : 'prev';
        let nextOrPreEle;
        if (activeList.length && activeList[field]().length) {
            nextOrPreEle = activeList[field]();
            nextOrPreEle.click();
        } else {
            const activeDate = $(activeList.parents('.message-collapse-item')[0]);
            if (activeDate.length && activeDate[field]().length) {
                const msgLis = $(activeDate[field]()).find('li.message-li-info');
                const indexs = type ? 0 : msgLis.length - 1;
                nextOrPreEle = msgLis[indexs];
                nextOrPreEle.click();
            }
        }
        // 点击上一封/下一封消息在可视区域之外的时候自动滚动到可视区域
        const collapse =$('.message-collapse');
        const activeTop = $(nextOrPreEle).offset().top;
        const activeHeight = $(nextOrPreEle).outerHeight();
        const collapseTop = collapse.offset().top;
        const collapseHeight = collapse.outerHeight();
        const collapseScrollTop = collapse.scrollTop();
        const diffValue = activeTop - collapseTop;
        if (diffValue > 720) {
            collapse.scrollTop(collapseScrollTop + activeHeight - collapseHeight + diffValue);
        }
        if (diffValue < 0) {
            collapse.scrollTop(collapseScrollTop + diffValue);
        }
    }

    render() {
        const {
            firstList,
            lastList,
            tagValue,
            platform,
            platformId,
            defaultActivePlatformId,
            operateType,
            orderNumberArr,
            selectedOrderNumber,
            orderDetail,
            commentDetail,
            logisticsDetail,
            issueDetail,
            issueStatus,
            varietyData,
            recordData,
            recordDataArr,
            msglistArr,
            messageStatus,
            emailStatus,
            buyerAccount,
            buyerNickname,
            sellerAccount,
            sellerEmail,
            buyerEmail,
            lastId,
            lastReceiveTime,
            loading,
            syncVisible,
            orderVisible,
            syncConfirmLoading,
        } = this.state;
        const messageType = this.props.form.getFieldValue('messageType');
        const emailDate = this.props.form.getFieldValue('emailDate');
        return (
            <div className="position-relative customer-service-main">
                <TabsSearch
                    {...this.props}
                    operateType={operateType}
                    tagValue={tagValue}
                    platform={platform}
                    defaultActivePlatformId={defaultActivePlatformId}
                    handleTypeChange={this.handleTypeChange}
                    listFetch={this.listFetch}
                    handleOpenModal={this.handleOpenModal}
                    handleOperateTabs={this.handleOperateTabs}
                    onSubmit={this.onSubmit}
                    onReset={this.onReset}
                    handleTabChange={this.handleTabChange}
                    handleStatusChange={this.handleStatusChange}
                    handleLabelChange={this.handleLabelChange}
                />
                <Messagelist
                    {...this.props}
                    buyerAccount={buyerAccount}
                    sellerAccount={sellerAccount}
                    orderNumberArr={orderNumberArr}
                    buyerEmail={buyerEmail}
                    sellerEmail={sellerEmail}
                    platformId={platformId}
                    operateType={operateType}
                    msglistArr={msglistArr}
                    messageStatus={messageStatus}
                    listFetch={this.listFetch}
                    handleSort={this.handleSort}
                    handleListClick={this.handleListClick}
                    handleGetMoreMsg={this.handleGetMoreMsg}
                    handleDateChange={this.handleDateChange}
                />
                <ChatBox
                    {...this.props}
                    firstList={firstList}
                    lastList={lastList}
                    recordData={recordData}
                    recordDataArr={recordDataArr}
                    varietyData={varietyData}
                    orderNumberArr={orderNumberArr}
                    selectedOrderNumber={selectedOrderNumber}
                    messageType={messageType}
                    messageStatus={messageStatus}
                    emailStatus={emailStatus}
                    emailDate={emailDate}
                    buyerAccount={buyerAccount}
                    buyerNickname={buyerNickname}
                    sellerAccount={sellerAccount}
                    sellerEmail={sellerEmail}
                    buyerEmail={buyerEmail}
                    platformId={platformId}
                    operateType={operateType}
                    lastId={lastId}
                    loading={loading}
                    orderDetail={orderDetail}
                    commentDetail={commentDetail}
                    logisticsDetail={logisticsDetail}
                    issueDetail={issueDetail}
                    issueStatus={issueStatus}
                    lastReceiveTime={lastReceiveTime}
                    stepList={this.stepList}
                    listFetch={this.listFetch}
                    getOrderInfo={this.getOrderInfo}
                    handleOpenModal={this.handleOpenModal}
                    handleGetHistoryInfo={this.handleGetHistoryInfo}
                    handleChangeOrderNum={this.handleChangeOrderNum}
                />
                {/* 同步站内信/邮件 */}
                <Modal2
                    component={
                        (
                            <SyncModal
                                platform={platform}
                                platformId={platformId}
                                ref={this.syncEmailRef}
                            />
                        )
                    }
                    title={`同步${operateType !== '1' ? '邮件' : '站内信'}`}
                    visible={syncVisible}
                    handleOk={this.handleSyncEmailOk}
                    handleCancel={() => this.handleCancel('syncVisible')}
                    confirmLoading={syncConfirmLoading}
                />
                {/* 订单详情弹窗 */}
                <Modal2
                    component={
                        (
                            <OrderDetailModal
                                platformId={platformId}
                                buyerAccount={buyerAccount}
                                sellerAccount={sellerAccount}
                                orderNumber={selectedOrderNumber}
                            />
                        )
                    }
                    title="订单详情"
                    visible={orderVisible}
                    handleCancel={() => this.handleCancel('orderVisible')}
                    footer={null}
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
