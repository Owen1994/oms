/**
 * 作者: xpw
 * 描述: 邮箱管理模块
 * 时间: 2018/9/13
 * */
import React from 'react';
import { Form, message, Button } from 'antd';
import moment from 'moment';
import Modal2 from '../../../../components/Modal2';
import MainRight from './MainRight';
import MarkOption from './MarkOption';
import MoveToTagModal from '../../../common/components/MoveToTagModal';
import MailDetail from './MailDetail';
import RecordChatBox from '../../../common/components/RecordChatBox';
import SyncModal from '../../../common/components/SyncModal';
import Tabplatform from '../../../common/components/Tabplatflat';
import Treelist from '../../../common/components/Treelist';
import { filterRequest } from '../../../../compliance/utils';
import { getPlatformList, getChatRecord } from '../../../common/request';
import filterParams from '../../../common/components/CombinatorialSearch/filterParams';
import { page } from '../../../../constants';
import { fetchPost } from '../../../../util/fetch';
import {
    MAIL_OPTION, MAIL_MOVE, MAIL_DETAIL, searchType, GET_TAG_LIST, SYNC_EMAIL,
} from '../constants';

class MailList extends React.Component {
    state = {
        modalTitle: '', // 弹框title
        markVisible: false,
        moveVisible: false,
        mailDetailVisible: false,
        // replyVisible: false,
        syncEmailVisible: false,
        mailDetailData: {}, // 邮箱详情数据
        optionType: null,
        emailId: [], // 操作项该项的id
        selectedEmailId: [], // 批量操作项的id
        selectedKey: [], // 移动弹框选中标签树该项的key
        platformId: '',
        platform: [],
        treeData: [],
        emailTime: null,
        emailTitle: null,
        mutipleReceiveTime: null,
        dataSource: [], // 用于控制未读已读状态的数据源
        selectedRowKeys: [], // 用于重新请求列表后对之前批量操作项进行清空
        moveConfirmLoading: false,
        syncConfirmLoading: false,
        sellerEmail: '',
        buyerEmail: '',
        chatPageNumber: 1,
        preserveId: '0',
        recordDataArr: [],
        // 开放标题信息
        openInfo: {
            switch: 0,
        },
    }

    markOptionRef = React.createRef();

    moveOptionRef = React.createRef();

    mailDetailRef = React.createRef();

    syncEmailRef = React.createRef();

    componentDidMount() {
        getPlatformList({ commonStatus: -1 }).then((result) => {
            if (result.length > 0) {
                const platformId = result[0].key;
                this.setState({
                    platform: result,
                    platformId,
                });
                this.taglistFetch(platformId);
                this.isOpen(platformId);
            } else {
                message.error('暂无平台数据');
            }
        });
    }

    // 判断是否可以使用标题搜索
    isOpen = (platformId) => {
        const { isOpenTitleSearch } = this.props;
        isOpenTitleSearch({ platformId })
            .then((data) => {
                data = data || { switch: 0 };
                this.setState({
                    openInfo: data,
                });
            });
    }

    taglistFetch = (key, isInit) => {
        const filter = this.getParams();
        if (!filter) return;
        if (key) {
            filter.platformId = key;
        }
        if (filter.tagId) {
            delete filter.tagId;
        }
        return fetchPost(GET_TAG_LIST, { ...filter, isShowBuyerEmailTag: 0 }, 2).then((result) => {
            if (result && result.state === '000001') {
                const data = result.data;
                this.setState({
                    treeData: data,
                    isInit: isInit || false,
                });
            }
        })
            .then(() => {
                this.listFetch();
            });
    }

    getParams = () => {
        const { openInfo } = this.state;
        const values = this.props.form.getFieldsValue();
        const filter = filterRequest(values);
        // 有组合搜索时的参数过滤
        const params = filterParams(values, searchType);
        if (params) {
            filter[params.field] = params.value;
        }
        // 接受时间参数过滤
        if (values.emailTime === undefined) {
            filter.emailTime = [moment().subtract(6, 'days').startOf('day').unix(), moment().endOf('day').unix()];
        } else {
            let startTime = values.emailTime[0];
            let endTime = values.emailTime[1];
            startTime = Math.floor(startTime / 1000);
            endTime = Math.floor(endTime / 1000);
            filter.emailTime = [startTime, endTime];
        }
        if (openInfo.dayLimit && values.emailTitle) {
            if (values.emailTime[1] - values.emailTime[0] > openInfo.dayLimit * 60 * 60 * 24) {
                message.warning(`邮件标题查询时间限制范围为${openInfo.dayLimit}天`);
                return null;
            }
        }
        return filter;
    }

    // 请求列表
    listFetch = (pageNumber, pageData) => {
        const filter = this.getParams();
        if (!filter) return;
        filter.pageNumber = pageNumber || page.defaultCurrent;
        filter.pageData = pageData || page.defaultPageSize;
        this.props.listFetch({ name: 'listData', value: filter });
    }

    // 筛选/搜索重置
    onReset = () => {
        const { resetFields, getFieldsValue, setFieldsValue } = this.props.form;
        const { platformId } = getFieldsValue(['platformId']);
        resetFields();
        setFieldsValue({
            platformId,
        });
    }


    setATagBlank = (temp) => {
        let a = temp.match(/<a.*?href=.*?>.*?<\/a>/);
        while (a) {
            const str = a[0];
            const arr = str.split(' ');
            arr.splice(1, 0, 'target=_blank');
            const newstr = arr.join(' ');
            temp = temp.replace(str, newstr);
            a = temp.match(/<a href=.*?>.*?<\/a>/);
        }
        return temp;
    }

    /**
     * 操作栏点击选项后的回调
     * @param <String> title 弹出框的标题
     * @param <String> visibleType 各弹框的显示参数
     * @param <String> optionType 操作项的类型
     * @param <Object> record 操作项的数据
     */
    handleOperate = (title, visibleType, optionType, record) => {
        const { dataSource } = this.state;
        if (optionType === 'mailDetail') {
            const { platformId } = this.state;
            this.setState({ dataSource: this.props.listReducer.listData });
            fetchPost(MAIL_DETAIL, { emailUnid: record.emailUnid, emailTime: record.emailTime, platformId }, 2).then((data) => {
                if (data && data.state === '000001') {
                    const str = data.data && data.data.emailContent && data.data.emailContent.content;
                    if (str) {
                        data.data.emailContent.content = this.setATagBlank(str);
                    }
                    this.setState({
                        mailDetailData: data.data,
                        ifReply: !!data.data.replyDetail.replyContent,
                    });
                    const target = this.state.dataSource.find(item => item.emailUnid === record.emailUnid);
                    if (target) {
                        target.readState = 2;
                        this.setState({ dataSource });
                    }
                }
            });
        } else if (optionType === 'reply') {
            const { platformId } = this.state;
            const postData = {
                platformId,
                sellerEmail: record.sellerEmail,
                buyerEmail: record.buyerEmail,
                emailStatus: 7,
                isBuyerEmail: 0,
                emailUnid: record.emailUnid,
                emailTime: record.emailTime,
            };
            this.setState({
                recordDataArr: [],
                chatPageNumber: 1,
            }, () => {
                this.getEmailRecord(postData);
            });
        }
        this.setState({
            optionType,
            [visibleType]: true,
            modalTitle: title,
            emailId: record ? [record.emailUnid] : '',
            emailTime: record ? [record.emailTime] : '',
            emailTitle: record ? record.emailTitle : '',
            buyerEmail: record ? record.buyerEmail : '',
            sellerEmail: record ? record.sellerEmail : '',
        });
    }

    getEmailRecord = (postData, pageNumber = 1) => {
        getChatRecord('2', postData, pageNumber, (result) => {
            const data = result.data;
            let { recordDataArr } = this.state;
            recordDataArr = data.data.concat(recordDataArr);
            this.setState({
                recordDataArr,
                // recordData: result.data,
            });
        });
    }

    handleGetHistoryInfo = () => {
        const {
            platformId, sellerEmail, buyerEmail, emailId, emailTime,
        } = this.state;
        let { chatPageNumber } = this.state;
        chatPageNumber += 1;
        this.setState({ chatPageNumber });
        const postData = {
            platformId,
            sellerEmail,
            buyerEmail,
            emailTime: emailTime.toString(),
            emailStatus: 7,
            isBuyerEmail: 0,
            emailUnid: emailId.toString(),
        };
        this.getEmailRecord(postData, chatPageNumber);
    }

    /**
     * 批量处理点击后的回调
     * @param <String> clickData 返回的点击项数据
     */
    handleMultipleOperate = (clickData) => {
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys.length <= 0) {
            message.warning('请选择需要处理的邮件');
            return;
        }
        if (clickData.item.props.children === '标记已处理') {
            this.setState({ markVisible: true, modalTitle: '处理说明', optionType: 'markMultiple' });
        } else {
            this.setState({ moveVisible: true, modalTitle: '移动至标签', optionType: 'moveMultiple' });
        }
    }

    // 对话框点击取消回调
    handleCancel = (name) => {
        this.setState({
            [name]: false,
        });
    }

    // 同步邮件确定回调
    handleSyncEmailOk = () => {
        this.syncEmailRef.current.validateFields((err, values) => {
            if (!err) {
                const syncDate = [];
                syncDate[0] = values.date[0].unix();
                syncDate[1] = values.date[1].unix();
                this.setState({ syncConfirmLoading: true });
                fetchPost(SYNC_EMAIL, {
                    date: syncDate,
                    account: values.account,
                    platformId: `${this.state.platformId}`,
                }, 1).then((data) => {
                    if (data && data.state === '000001') {
                        this.setState({ syncEmailVisible: false });
                        this.taglistFetch(undefined, true);
                    }
                    this.setState({ syncConfirmLoading: false });
                });
            }
        });
    }

    // 标记弹框确定回调
    handleMarkOk = () => {
        const {
            emailId, optionType, selectedEmailId, platformId, emailTime, mutipleReceiveTime,
        } = this.state;
        this.markOptionRef.current.validateFields((err, values) => {
            if (!err) {
                this.setState({ markConfirmLoading: true });
                fetchPost(MAIL_OPTION, {
                    ...values,
                    emailUnid: optionType === 'mark' ? emailId : selectedEmailId,
                    platformId,
                    emailTime: optionType === 'mark' ? emailTime : mutipleReceiveTime,
                }, 1).then((data) => {
                    if (data && data.state === '000001') {
                        this.setState({ markVisible: false, selectedRowKeys: [] });
                        this.listFetch();
                        this.markOptionRef.current.resetFields();
                    }
                    this.setState({ markConfirmLoading: false });
                });
            }
        });
    }

    // 移动弹框确定回调
    handleMoveOk = () => {
        const {
            optionType, selectedKey, emailId, selectedEmailId, platformId, emailTime, mutipleReceiveTime,
        } = this.state;
        if (selectedKey.length === 0) {
            message.warning('请选择标签');
            return;
        }
        this.setState({ moveConfirmLoading: true });
        fetchPost(MAIL_MOVE, {
            emailUnid: optionType === 'move' ? emailId : selectedEmailId,
            tagId: selectedKey.toString(),
            platformId,
            emailTime: optionType === 'move' ? emailTime : mutipleReceiveTime,
        }, 1).then((data) => {
            if (data && data.state === '000001') {
                this.setState({ moveVisible: false, selectedKey: [], selectedRowKeys: [] });
                this.taglistFetch(undefined, true);
            }
            this.setState({ moveConfirmLoading: false });
        });
    }

    // 移动弹框标签树点击回调
    handleTreeSelect = (selectedKey) => {
        this.setState({ selectedKey });
    }

    handleTreeClick = (selectedTreeKey) => {
        this.setState({ preserveId: selectedTreeKey.toString() });
    }

    tabChange = (key) => {
        this.isOpen(key);
        this.setState({ platformId: key, preserveId: '0' });
        this.onReset();
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
        this.setState({ selectedEmailId: selectedRowKeys, mutipleReceiveTime: selectedRows.map(item => item.emailTime) });
    }

    render() {
        const {
            sellerEmail,
            buyerEmail,
            treeData,
            platform,
            platformId,
            mailDetailData,
            ifReply,
            // recordData,
            recordDataArr,
            modalTitle,
            markVisible,
            moveVisible,
            mailDetailVisible,
            // replyVisible,
            syncEmailVisible,
            selectedRowKeys,
            markConfirmLoading,
            moveConfirmLoading,
            emailId,
            emailTime,
            emailTitle,
            syncConfirmLoading,
            openInfo,
            ifSendMsg,
            isInit,
            preserveId,
        } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let mailDetailFooter = null;
        if (ifReply) {
            mailDetailFooter = (
                <div className="detail-footer">
                    <Button onClick={() => this.handleCancel('mailDetailVisible')}>取消</Button>
                    <Button type="primary" style={{ marginLeft: 8 }} onClick={() => this.handleCancel('mailDetailVisible')}>确定</Button>
                </div>
            );
        } else {
            mailDetailFooter = (
                <RecordChatBox
                    {...this.props}
                    notShowInfo
                    ifReply={ifReply}
                    ifSendMsg={ifSendMsg}
                    operateType="3"
                    recordData={{ emailTitle }}
                    recordDataArr={recordDataArr}
                    buyerEmail={buyerEmail}
                    sellerEmail={sellerEmail}
                    getlist={this.listFetch}
                    handleCancel={() => this.handleCancel('mailDetailVisible')}
                    platformId={platformId}
                    lastId={emailId ? emailId.toString() : undefined}
                    lastReceiveTime={emailTime ? emailTime.toString() : undefined}
                    handleGetHistoryInfo={this.handleGetHistoryInfo}
                />
            );
        }
        return (
            <div className="mail-list position-relative">
                {platform.length > 0
                    ? (
                        <Tabplatform
                            {...this.props}
                            platform={platform}
                            loading={this.props.listReducer}
                            listFetch={this.listFetch}
                            taglistFetch={this.taglistFetch}
                            handleTabChange={this.tabChange}
                            activeKey={platformId}
                        />
                    )
                    : (
                        <div className="mail-detail">
                            <div className="breadcrumb customer-service-tab-platform">
                                <p style={{ lineHeight: '43px', paddingLeft: 15 }}>暂无数据</p>
                            </div>
                        </div>
                    )
                }
                <Treelist
                    {...this.props}
                    name="tagId"
                    isInit={isInit}
                    treeData={treeData}
                    preserveId={preserveId}
                    onSelect={this.handleTreeClick}
                    handleListFetch={this.listFetch}
                />
                {/* Search和Table */}
                <MainRight
                    {...this.props}
                    openInfo={openInfo}
                    onReset={this.onReset}
                    onSubmit={this.taglistFetch}
                    listFetch={this.listFetch}
                    rowSelection={rowSelection}
                    handleOperate={this.handleOperate}
                    handleMultipleOperate={this.handleMultipleOperate}
                    syncEmail={this.syncEmail}
                    taglistFetch={this.taglistFetch}
                />
                {/* 标记弹窗 */}
                <Modal2
                    component={(<MarkOption ref={this.markOptionRef} />)}
                    title={modalTitle}
                    visible={markVisible}
                    handleOk={this.handleMarkOk}
                    handleCancel={() => this.handleCancel('markVisible')}
                    confirmLoading={markConfirmLoading}
                />
                {/* 移动弹窗 */}
                <Modal2
                    component={
                        (
                            <MoveToTagModal
                                form={this.props.form}
                                platformId={platformId}
                                onSelect={this.handleTreeSelect}
                                ref={this.moveOptionRef}
                            />
                        )
                    }
                    title={modalTitle}
                    visible={moveVisible}
                    handleOk={this.handleMoveOk}
                    handleCancel={() => this.handleCancel('moveVisible')}
                    confirmLoading={moveConfirmLoading}
                />
                {/* 邮件详情弹窗 */}
                <Modal2
                    component={(
                        <div className="mail-detail-wrap">
                            <MailDetail mailDetailData={mailDetailData} ifReply={ifReply} ref={this.mailDetailRef} />
                            {mailDetailFooter}
                        </div>
                    )}
                    title={modalTitle}
                    visible={mailDetailVisible}
                    footer={null}
                    width={1100}
                    handleCancel={() => this.handleCancel('mailDetailVisible')}
                    className="mail-detail-modal"
                />
                {/* 同步邮件弹窗 */}
                <Modal2
                    component={(<SyncModal platformId={platformId} platform={platform} ref={this.syncEmailRef} />)}
                    title={modalTitle}
                    visible={syncEmailVisible}
                    handleOk={this.handleSyncEmailOk}
                    handleCancel={() => this.handleCancel('syncEmailVisible')}
                    confirmLoading={syncConfirmLoading}
                />
            </div>

        );
    }
}
export default Form.create()(MailList);
