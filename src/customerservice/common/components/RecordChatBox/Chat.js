import React from 'react';
import {
    Form, Upload, Button, message, Dropdown, Menu, Icon, Modal, Tooltip,
} from 'antd';
import Modal2 from '../../../../components/Modal2';
import CountWordsArea from '../CountWordsArea';
import SelectTemp from '../SelectTemp';
import ChatBox from './ChatBox';
import ChatTitle from './ChatTitle';
import MoveToTagModal from '../MoveToTagModal';
import Emotion from '../Emotion';
import emotionData from '../Emotion/emotionData';
import { fetchPost, fetchUpload } from '../../../../util/fetch';
import {
    REPLY_MESSAGE, REPLY_EMAIL, SAVE_DRAFT, SET_NO_NEED_DEAL, EMAIL_MARK_OPERATE, MARK_OPERATE, LOCK_DELAY_SEND, CANCEL_SEND,
} from '../../constants';
import { MAIL_MOVE } from '../../../email/list/constants';
import { strTrim } from '../../../../util/baseTool';
import Functions from '../../../../components/functions';
import { popUpImage, angentPicUrl, randNum } from '@/util/baseTool';

const MenuItem = Menu.Item;
const confirm = Modal.confirm;

class Chat extends React.Component {
    // 图片后缀名
    extensionsImg = ['JPG', 'JPEG', 'PNG', 'BMP', 'GIF']

    //  PDF
    extensionsPdf = ['PDF']

    borderAdd = {
        border: '1px solid #ddd'
    }

    state = {
        submitBtnText: '发送',
        textAreaIsDiabled: false,
        uploadFileList: [
            // {
            //     extension: 'jpg',
            //     name: '22130341E4A8EC79A2E92988A72AE39F',
            //     size: 181767,
            //     uid: 'rc-upload-1550306314728-2',
            //     uniqueId: '7a10761e40e1a0d706a5d84e74919b86',
            //     url: 'https://soter-test.youkeshu.com/yks/file/server/image/22130341E4A8EC79A2E92988A72AE39F_1550306391643.jpg',
            // },
        ],
        totalFileSize: 0,
        draftId: '',
        selectTempVisible: false,
        moveVisible: false,
        sendContent: '',
        tagFieldsData: {},
        selectedKey: [],
        moveConfirmLoading: false,
        noNeedLoading: false,
        saveDraftLoading: false,
        sendLoading: false,
        btnShow: true,
    }

    componentDidMount() {
        const typeArr = ['1', '2'];
        const { operateType, recordData, messageStatus } = this.props;
        if (typeArr.includes(operateType)) {
            let total = 0;
            if (Object.keys(recordData).length > 0) {
                recordData.draft.attach.forEach((item) => {
                    const size = Number(item.size) || 0;
                    total += size;
                });
                this.setState({
                    uploadFileList: JSON.parse(JSON.stringify(recordData.draft.attach)),
                    totalFileSize: total,
                    draftId: recordData.draft.draftId,
                });
            }
            if (messageStatus === 6) {
                this.setState({
                    submitBtnText: '再次编辑',
                    textAreaIsDiabled: true,
                    btnShow: false,
                });
            } else {
                this.setState({
                    submitBtnText: '发送',
                    textAreaIsDiabled: false,
                    btnShow: true,
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const { recordData } = nextProps;
        const attach = recordData.draft && JSON.parse(JSON.stringify(recordData.draft.attach));
        const oldRecordData = this.props;
        const oldAttach = oldRecordData.draft && oldRecordData.draft.attach;
        if (attach && attach.length && attach !== oldAttach) {
            this.setState({
                uploadFileList: attach,
            });
        }
    }

    // 处理选择模板后的回调
    handleSelectTemp = (languagesContent) => {
        const { varietyData } = this.props;
        let messageContent = languagesContent.messageContent;
        if (varietyData && varietyData.list && varietyData.list.length) {
            const reg = /\{[a-zA-Z]+\}/g;
            messageContent = messageContent.replace(reg, (res) => {
                const replaceVar = res.slice(1, -1);
                const tagetItem = varietyData.list.find(item => item.name === replaceVar);
                if (tagetItem && tagetItem.analysisContent) {
                    return tagetItem.analysisContent;
                }
                return res;
            });
        }
        this.setState({
            sendContent: messageContent,
        });
    }

    // 文件上传
    beforeUpload = (file, fileList) => {
        const { operateType, lastId } = this.props;
        const msgTypeArr = ['1', '4'];
        const reg = msgTypeArr.includes(operateType) ? /\.(jpg|jpeg|gif|png|bmp)$/i : /\.(jpg|jpeg|gif|png|bmp|pdf)$/i;
        if (reg.test(file.name)) {
            const { uploadFileList, totalFileSize } = this.state;
            if (msgTypeArr.includes(operateType) && uploadFileList.length >= 1) {
                message.error('附件不能超过1个');
                return false;
            } if (!msgTypeArr.includes(operateType) && uploadFileList.length >= 2) {
                message.error('附件不能超过2个');
                return false;
            }
            const newTotalFileSize = totalFileSize + file.size;
            if (msgTypeArr.includes(operateType) && newTotalFileSize > 5242880) {
                message.error('文件大小不得超过5MB！');
                return false;
            } if (!msgTypeArr.includes(operateType) && newTotalFileSize > 10485760) {
                message.error('上传文件总大小不得超过10MB！');
                return false;
            }
            message.info('文件正在上传，请稍候');
            fetchUpload('/yks/file/server/', fileList).then((data) => {
                if (data.state === '000001') {
                    const cfile = data.data[0];
                    const {
                        extension, filename, path, size,
                    } = cfile;
                    // {
                    //     awsPath: 'https://s3-ap-southeast-1.amazonaws.com/public.photo138.com/gateway/test/image/5021319E8257EFC0C1069966EC2B912A_1550302792582.png',
                    //     contentType: 'image/png',
                    //     extension: 'png',
                    //     filename: 'spinner.png',
                    //     path: 'https://soter-test.youkeshu.com/yks/file/server/image/5021319E8257EFC0C1069966EC2B912A_1550302792582.png',
                    //     size: 6131,
                    // },
                    const fileObj = {};
                    const arr = filename.split('.');
                    fileObj.url = path;
                    fileObj.name = arr[0];
                    fileObj.size = size;
                    fileObj.uid = file.uid;
                    fileObj.uniqueId = lastId;
                    fileObj.extension = extension;
                    uploadFileList.push(fileObj);
                    this.setState({
                        uploadFileList,
                        totalFileSize: newTotalFileSize,
                    });
                    message.success('文件上传成功');
                }
            });
        } else {
            const fileFormat = !msgTypeArr.includes(operateType) ? '、PDF' : '';
            message.error(`请上传JPG、JPEG、GIF、PNG、BMP${fileFormat}格式文件！`);
        }
        return false;
    }

    // 文件预览
    preview = (v) => {
        const { extension, url } = v;
        const e = extension.toUpperCase();
        if (this.extensionsImg.includes(e)) {
            popUpImage(url, true);
        } else if (this.extensionsPdf.includes(e)) {
            window.open(url, '_blank');
        }
    }

    // 文件移除
    removeUpload = (file) => {
        let { totalFileSize } = this.state;
        totalFileSize -= file.size;
        this.setState(({ uploadFileList }) => {
            const index = uploadFileList.indexOf(file);
            const newFileList = uploadFileList.slice();
            newFileList.splice(index, 1);
            return {
                uploadFileList: newFileList,
                totalFileSize,
            };
        });
    };

    // 存草稿
    handleSaveDraft = () => {
        const { uploadFileList, draftId } = this.state;
        const { messageType } = this.props;
        const { content } = this.props.form.getFieldsValue();
        if (!content || !strTrim(content)) {
            message.warning('请输入内容');
            return;
        }
        const {
            operateType, platformId, buyerAccount, sellerAccount, buyerEmail, sellerEmail, selectedOrderNumber,
        } = this.props;
        const params = {
            operateType,
            draftId,
            platformId,
            type: messageType || undefined,
            typeId: selectedOrderNumber || '',
            shopId: operateType === '1' ? sellerAccount : sellerEmail,
            attach: uploadFileList,
            draftContent: content,
            unid: operateType === '1' ? buyerAccount : buyerEmail,
        };
        this.setState({ saveDraftLoading: true });
        fetchPost(SAVE_DRAFT, params, 1)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.props.listFetch(operateType);
                }
                this.setState({ saveDraftLoading: false });
            });
    }

    // 发送/编辑按钮点击
    onSubmit = (e) => {
        e.preventDefault();
        const { submitBtnText } = this.state;
        const { messageStatus, recordData, platformId } = this.props;
        if (messageStatus === 6 && submitBtnText === '再次编辑') {
            this.setState({
                sendLoading: true,
            });
            fetchPost(LOCK_DELAY_SEND, {
                platformId,
                delayId: recordData.draft.delayId,
            }, 1)
                .then((data) => {
                    if (data && data.state === '000001') {
                        this.setState({
                            submitBtnText: '发送',
                            textAreaIsDiabled: false,
                            btnShow: true,
                        });
                    }
                    this.setState({
                        sendLoading: false,
                    });
                });
        } else {
            this.replyPost();
        }
    }

    // 取消发送
    handleCancelSend = () => {
        const {
            recordData, platformId, operateType, listFetch,
        } = this.props;
        this.setState({
            cancelSendLoading: true,
        });
        fetchPost(CANCEL_SEND, {
            platformId,
            delayId: recordData.draft.delayId,
        }, 1)
            .then((data) => {
                if (data && data.state === '000001') {
                    listFetch(operateType);
                }
                this.setState({
                    cancelSendLoading: false,
                });
            });
    }

    // 回复
    replyPost = () => {
        const { uploadFileList } = this.state;
        const { messageStatus } = this.props;
        const { emailStatus } = this.props;
        const {
            operateType,
            platformId,
            lastId,
            messageType,
            lastReceiveTime,
            buyerAccount,
            sellerAccount,
            issueId,
            buyerEmail,
            sellerEmail,
            recordData,
            selectedOrderNumber,
            buyerNickname,
        } = this.props;
        const msgTypeArr = ['1', '4'];
        const postData = {};
        let postApi;
        if (msgTypeArr.includes(operateType)) {
            postApi = REPLY_MESSAGE;
            postData.isDelay = '1';
            postData.msgTime = lastReceiveTime;
            postData.extendId = selectedOrderNumber;
            postData.sellerAccount = sellerAccount;
            postData.buyerAccount = buyerAccount;
            postData.buyerNickname = buyerNickname;
            postData.messageStatus = messageStatus;
            if (operateType === '4') {
                postData.issueId = issueId;
            }
            if (messageType === 2) {
                postData.extendId = '';
            }
        } else {
            postApi = REPLY_EMAIL;
            postData.isDelay = `${emailStatus}` === '8' ? '0' : '1';
            postData.isException = `${emailStatus}` === '8' ? 1 : 0;
            postData.emailUnid = lastId;
            postData.emailTime = lastReceiveTime;
            postData.buyerEmail = buyerEmail;
            postData.sellerEmail = sellerEmail;
            postData.emailTitle = recordData.emailTitle;
            postData.emailStatus = emailStatus;
            if (operateType === '3') {
                postData.isDelay = '0';
                postData.issueId = issueId;
            }
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                postData.platformId = platformId;
                postData.attach = uploadFileList;
                values.content = this.filterContent(values.content);
                if (messageType !== undefined) {
                    values.messageType = messageType;
                }
                if (msgTypeArr.includes(operateType)) {
                    values.messageStatus = messageStatus;
                } else {
                    values.emailStatus = emailStatus;
                }
                if (/\{[a-zA-Z]?\}/.test(values.content)) {
                    confirm({
                        title: '提示！',
                        content: '发送文本存在未解析的动态变量值，确定是否发送？',
                        onOk: () => this.handleSendingPost({ ...postData, ...values }),
                    });
                    return;
                }
                this.handleSendingPost(postApi, { ...postData, ...values });
            }
        });
    }

    // 发送按钮请求
    handleSendingPost = (postApi, postObj) => {
        const {
            operateType, handleCancel, getlist, listFetch,
        } = this.props;
        this.setState({
            sendLoading: true,
        });
        fetchPost(postApi, postObj, 1).then((result) => {
            if (result && result.state === '000001') {
                if (handleCancel) {
                    handleCancel();
                }
                if (getlist) {
                    getlist();
                    return;
                }
                if (listFetch) {
                    listFetch(operateType);
                }
            }
            if (listFetch && postObj.isException) {
                listFetch(operateType);
            }
            this.setState({
                sendLoading: false,
                mailSubmitLoading: false,
            });
        });
    }

    handleMailSubmit = () => {
        this.setState({ mailSubmitLoading: true });
        this.replyPost();
    }

    // 发送内容表情的处理
    filterContent = (content) => {
        const reg = /\[([a-zA-Z]+[\s]?)+?[a-zA-Z]?\]/g;
        content = content.replace(reg, (res) => {
            let replaceEmotion = emotionData.find(item => item.meaning === res);
            replaceEmotion = replaceEmotion ? replaceEmotion.entity : res;
            return replaceEmotion;
        });
        return content;
    }

    handleSelectTempClick = () => {
        this.setState({ selectTempVisible: true });
    }

    handleCancel = (visibleType) => {
        this.setState({ [visibleType]: false });
    }

    handleMoveTagClick = (tagData) => {
        const { platformId } = this.props;
        this.setState({ moveVisible: true });
        this.setState({
            tagFieldsData: { ...tagData, platformId },
        });
    }

    // 无需处理按钮回调
    handleNoNeedDeal = () => {
        const {
            platformId, buyerEmail, sellerEmail, operateType,
        } = this.props;
        this.setState({ noNeedLoading: true });
        fetchPost(SET_NO_NEED_DEAL, { platformId, buyerEmail, sellerEmail }, 1).then((result) => {
            if (result && result.state === '000001') {
                this.props.listFetch(operateType);
            }
            this.setState({ noNeedLoading: false });
        });
    }

    // 标记已处理
    handleMarkOperate = () => {
        const {
            platformId,
            buyerAccount,
            sellerAccount,
            operateType,
            selectedOrderNumber,
            messageType,
            buyerEmail,
            sellerEmail,
        } = this.props;
        this.setState({ markOperateLoading: true });
        let postObj = {};
        let postApi;
        if (operateType === '1') {
            postApi = MARK_OPERATE;
            postObj = {
                platformId,
                buyerAccount,
                sellerAccount,
                extendId: selectedOrderNumber,
                type: messageType,
            };
        } else {
            postApi = EMAIL_MARK_OPERATE;
            postObj = {
                platformId,
                buyerEmail,
                shopEmail: sellerEmail,
            };
        }
        fetchPost(postApi, postObj, 1).then((result) => {
            if (result && result.state === '000001') {
                this.props.listFetch(operateType);
            }
            this.setState({ markOperateLoading: false });
        });
    }

    // 选择表情
    handleSelectEmotion = (selectEmotion) => {
        const { sendContentTextArea } = this.state;
        const value = sendContentTextArea.value;
        const index = sendContentTextArea.selectionEnd;
        const pre = value.slice(0, index);
        const next = value.slice(index);
        const string1 = `${pre}${selectEmotion}${next}`;
        this.setState({
            sendContent: string1,
        });
        sendContentTextArea.focus();
    }

    // 移动至标签回调
    handleMoveOk = () => {
        const {
            selectedKey, tagFieldsData,
        } = this.state;
        const { operateType } = this.props;
        if (selectedKey.length <= 0) {
            message.warning('请选择标签');
            return;
        }
        this.setState({ moveConfirmLoading: true });
        fetchPost(MAIL_MOVE, { ...tagFieldsData, tagId: selectedKey.toString() }, 1).then((data) => {
            if (data && data.state === '000001') {
                this.setState({ moveVisible: false, selectedKey: [] });
                this.props.listFetch(operateType);
            }
            this.setState({ moveConfirmLoading: false });
        });
    }

    // 移动弹框标签树点击回调
    handleTreeSelect = (selectedKey) => {
        this.setState({ selectedKey });
    }

    // 发送回复按钮权限控制
    getSubmitFunctionKey = (operateType) => {
        if (operateType === '1') {
            return '009-000002-000004-004';
        } if (operateType === '2') {
            return '009-000002-000004-010';
        }
        return '';
    }

    // 获取textarea
    getTextArea = (dom) => {
        if (!dom) return;
        this.setState({
            sendContentTextArea: dom.textAreaRef,
        });
    }

    // 依据光标位置设置值
    selectVariety = (analysisContent, title) => {
        if (!analysisContent) {
            message.error(`没有${title}值，不能插入`);
            return;
        }
        const { sendContentTextArea } = this.state;
        const value = sendContentTextArea.value;
        const index = sendContentTextArea.selectionEnd;
        const pre = value.slice(0, index);
        const next = value.slice(index);
        const string = `${pre}${analysisContent}${next}`;
        this.setState({
            sendContent: string,
        });
        sendContentTextArea.focus();
    }

    render() {
        const {
            btnShow,
            submitBtnText,
            textAreaIsDiabled,
            uploadFileList,
            selectTempVisible,
            sendContent,
            moveVisible,
            moveConfirmLoading,
            noNeedLoading,
            markOperateLoading,
            saveDraftLoading,
            sendLoading,
            mailSubmitLoading,
            cancelSendLoading,
        } = this.state;
        const {
            operateType, recordData, messageStatus, notShowInfo, handleCancel, messageType, varietyData, listReducer,
            firstList, lastList, stepList, buyerAccount, sellerAccount, orderNumberArr, buyerEmail, sellerEmail
        } = this.props;
        let submitBtn;
        let dropDown;
        let isLastPage;
        const msgTypeArr = ['1', '4'];
        if (listReducer && listReducer.data) {
            isLastPage = listReducer.data.isLastPage;;
        }
        const isMessage = msgTypeArr.includes(operateType);
        const isList = ['1', '2'].includes(operateType);
        const listObj = JSON.stringify(operateType === '1' ? {
            buyerAccount,
            sellerAccount,
            orderNumberArr,
        } : {
            buyerEmail,
            sellerEmail,
        });
        if (!notShowInfo) {
            submitBtn = this.getSubmitFunctionKey(operateType)
                ? (
                    <Functions {...this.props} functionkey={this.getSubmitFunctionKey(operateType)}>
                        <Button htmlType="submit" type="primary" style={{ marginLeft: 10 }} loading={sendLoading}>{submitBtnText}</Button>
                    </Functions>
                )
                : <Button htmlType="submit" type="primary" style={{ marginLeft: 10 }} loading={sendLoading}>{submitBtnText}</Button>;
        }
        if (varietyData && varietyData.isOpen === 1 && isMessage && btnShow && messageType === 1) {
            const varietyList = varietyData.list || [];
            const targetVariety = varietyList.find(item => item.name === 'OrderID');
            if (targetVariety && targetVariety.analysisContent === '') {
                dropDown = null;
            } else {
                const menu = (
                    <Menu>
                        {
                            varietyList && varietyList.map(v => <MenuItem key={randNum()} onClick={() => this.selectVariety(v.analysisContent, v.title)}>{`${v.name}[${v.title}]`}</MenuItem>)
                        }
                    </Menu>
                );
                dropDown = (
                    <Dropdown overlay={menu}>
                        <Tooltip placement="right" title="插入动态变量">
                            <Button className="message-inset-var-container">
                                <div className="message-insert-icon" />
                                <Icon type="down" />
                            </Button>
                        </Tooltip>
                    </Dropdown>
                );
            }
        }
        const stepListCom = (
            <div className='step-list-button-container'>
                {isList
                    ? (
                        <div className='step-list-button'>
                            <Button className='pre-list-btn' ghost={true} onClick={() => stepList(0)} disabled={listObj === JSON.stringify(firstList)}>上一封</Button>
                            <div className='step-seperate'></div>
                            <Button ghost={true} onClick={() => stepList(1)} disabled={isLastPage && listObj === JSON.stringify(lastList)}>下一封</Button>
                        </div>
                    )
                    : null
                }
            </div>
        )
        return (
            <div className={["chatbox-reply", operateType === '3' ? 'not-show-info' : ''].join(' ')} style={{ width: operateType === '1' ? 'calc(100% - 300px)' : '100%' }}>
                {isList ? stepListCom : null}
                <div className="chatbox-container">
                    {/* notShowInfo 存在时， 仅仅只是展示回复框 */}
                    {
                        notShowInfo ? null : (
                            <div>
                                {/* 沟通信息 */}
                                <ChatTitle
                                    msgTypeArr={msgTypeArr}
                                    {...this.props}
                                />
                                {/* 沟通聊天框 */}
                                <ChatBox
                                    {...this.props}
                                    handleMoveTagClick={this.handleMoveTagClick}
                                />
                            </div>
                        )
                    }
                    {/* 回复框 */}
                    <div className="reply-input">
                        <p className="red-tip" style={{ paddingBottom: 10 }}>
                            {!isMessage
                                ? '附件可上传2个文件，总大小不超过10MB，支持JPG、JPEG、GIF、PNG、BMP、PDF格式'
                                : '附件最多上传1个文件，单个不超过5MB，支持JPG,JPEG,PNG,BMP格式'
                            }
                        </p>
                        <Form onSubmit={this.onSubmit}>
                            <div className="message-operate-icons">
                                <div className="pull-left">
                                    <Upload
                                        // defaultFileList={recordData.draft ? recordData.draft.attach : null}
                                        beforeUpload={this.beforeUpload}
                                        onRemove={this.removeUpload}
                                        fileList={[]}
                                    >
                                        <Tooltip placement="bottom" title="添加附件">
                                            <Button icon="link" style={{ fontSize: 18 }} />
                                        </Tooltip>
                                    </Upload>
                                </div>
                                {
                                    btnShow
                                        ? (
                                            <Tooltip placement="bottom" title="选择模板">
                                                <Button onClick={this.handleSelectTempClick} className="message-icon-item" icon="layout" />
                                            </Tooltip>
                                        )
                                    : null
                                }
                                {isMessage && btnShow
                                    ? <Emotion handleSelectEmotion={this.handleSelectEmotion} />
                                    : null
                                }
                                {dropDown}
                            </div>
                            <CountWordsArea
                                {...this.props}
                                disabled={textAreaIsDiabled}
                                sendContent={sendContent}
                                recordData={recordData}
                                maxLength={isMessage ? 1000 : 3000}
                                field="content"
                                getTextArea={this.getTextArea}
                                textAreaIsDiabled={textAreaIsDiabled}
                            />
                            <div className="reply-other-info">
                                <div className="message-operate-btns">
                                    {isList && ![2, 6, 8].includes(messageStatus) && btnShow
                                        ? (
                                            <Functions {...this.props} functionkey={operateType === '1' ? "009-000002-000004-099" : "009-000002-000004-012"}>
                                                <Button onClick={this.handleMarkOperate} loading={markOperateLoading} className="chat-mark-operate">标记已处理</Button>
                                            </Functions>
                                        )
                                        : null
                                    }
                                    {operateType === '2' && ![1, 7].includes(messageStatus) && btnShow
                                        ? (
                                            <Functions {...this.props} functionkey="009-000002-000004-011">
                                                <Button onClick={this.handleNoNeedDeal} loading={noNeedLoading} style={{ marginLeft: 10 }}>无需处理</Button>
                                            </Functions>
                                        )
                                        : null
                                    }
                                    {(isList && btnShow && messageStatus !== 2)
                                        ? (
                                            <Functions {...this.props} functionkey="009-000002-000004-001">
                                                <Button onClick={this.handleSaveDraft} style={{ marginLeft: 10 }} loading={saveDraftLoading}>存草稿</Button>
                                            </Functions>
                                        )
                                        : null
                                    }
                                    {submitBtn}
                                    {isList && !btnShow && messageStatus === 6
                                        ? (
                                            <Functions {...this.props} functionkey="009-000002-000004-013">
                                                <Button onClick={this.handleCancelSend} style={{ marginLeft: 10 }} loading={cancelSendLoading}>取消发送</Button>
                                            </Functions>
                                        )
                                        : null
                                    }
                                </div>
                            </div>
                            <div className={uploadFileList.length > 0 ? 'margin-sm-top' : ''}>
                                {
                                    uploadFileList.map((v) => {
                                        const {
                                            name, extension,
                                        } = v;
                                        return (
                                            <div className="chat-selected-file" key={v.uid}>
                                                {name}.{extension}
                                                <span className="margin-sm-left" onClick={() => this.removeUpload(v)}> 删除</span>
                                                <i className="margin-sm">|</i>
                                                <span onClick={() => this.preview(angentPicUrl(v))}>预览</span>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </Form>
                    </div>
                    {
                        notShowInfo
                            ? (
                                <div className="chat-mail-footer">
                                    <Button onClick={() => handleCancel('mailDetailVisible')}>取消</Button>
                                    <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleMailSubmit} loading={mailSubmitLoading}>发送</Button>
                                </div>
                            )
                            : null
                    }
                    {/* 选择模板弹窗 */}
                    <Modal2
                        component={
                            (
                                <SelectTemp
                                    handleSelectTemp={this.handleSelectTemp}
                                    platformId={this.props.platformId}
                                    handleCancel={this.handleCancel}
                                />
                            )
                        }
                        title="选择模板"
                        visible={selectTempVisible}
                        handleCancel={() => this.handleCancel('selectTempVisible')}
                        width={800}
                    />
                    {/* 移动至标签弹窗 */}
                    <Modal2
                        component={
                            (
                                <MoveToTagModal
                                    emailDate={this.props.emailDate}
                                    onSelect={this.handleTreeSelect}
                                    platformId={this.props.platformId}
                                />
                            )
                        }
                        title="移动至标签"
                        visible={moveVisible}
                        confirmLoading={moveConfirmLoading}
                        handleOk={this.handleMoveOk}
                        handleCancel={() => this.handleCancel('moveVisible')}
                        width={600}
                    />
                </div>
                {isList ? stepListCom : null}
            </div>
        );
    }
}
export default Form.create()(Chat);