import React from 'react';
import {Form, message, Tabs} from 'antd';
import ReceiveQueryTable from './tabs/ReceiveQueryTable';
import SendQueryTable from './tabs/SendQueryTable';
import ReceiveSearch from './ReceiveSearch';
import SendSearch from './SendSearch';
import { TAB_TITLES } from '../constants';
import CreateMsgModal from './operation/CreateMsgModal';
import { parseStrToArray } from '../../../../util/StrUtil';
import { getTimeStamp } from '../../../../compliance/utils';
import { downlodFile, fetchPost } from '../../../../util/fetch';
import { My_Send_Msg_Export_API, My_Receive_Msg_Export_API } from '../constants/Api';

/**
 *作者: huangjianfeng
 *功能描述: 消息队列
 *时间: 2018/10/11 15:55
 */
const TabPane = Tabs.TabPane;

class App extends React.Component {
    state = {
        selectKey: '0', // 0 我接收的 1 我发送的
        pageNumber: 1,
        pageData: 20,
        showCreateMsgModal: false,
    };

    tabChange = (selectKey) => {
        this.setState({
            selectKey,
        });
    };

    /**
     * 加载我收到的消息列表数据
     * @param pageNumber 页数
     * @param pageData 每页数量
     */
    loadReceiveData = (pageNumber, pageData) => {
        if (!pageNumber) {
            pageNumber = this.state.pageNumber;
        }
        if (!pageData) {
            pageData = this.state.pageData;
        }

        const data = this.props.form.getFieldsValue();
        const searchContents = parseStrToArray(data.searchContentReceive);
        const times = data.sendTimesReceive ? data.sendTimesReceive.map(t => getTimeStamp(t)) : undefined;
        this.props.getMyReceiveList(
            {
                data: {
                    pageData,
                    pageNumber,
                    messageType: data.messageTypeReceive,
                    processState: data.processStateReceive,
                    searchContent: searchContents.length !== 0 ? searchContents : undefined,
                    searchType: data.searchTypeReceive,
                    sendTimes: times,
                },
            }
        );
    };

    /**
     * 加载我发出的消息列表数据
     * @param pageNumber 页数
     * @param pageData 每页数量
     */
    loadSendData = (pageNumber, pageData) => {
        if (!pageNumber) {
            pageNumber = this.state.pageNumber;
        }
        if (!pageData) {
            pageData = this.state.pageData;
        }

        const data = { ...this.props.form.getFieldsValue() };
        const searchContents = parseStrToArray(data.searchContentSend);
        const times = data.sendTimesSend ? data.sendTimesSend.map(t => getTimeStamp(t)) : undefined;
        this.props.getMySendList(
            {
                data: {
                    pageData,
                    pageNumber,
                    messageType: data.messageTypeSend ? data.messageTypeSend[0] : undefined,
                    processState: data.processStateSend ? data.processStateSend[0] : undefined,
                    searchContent: searchContents.length !== 0 ? searchContents : undefined,
                    searchType: data.searchTypeSend,
                    sendTimes: times,
                },
            }
        );
    };

    /**
     * 导出 我接收的数据
     */
    downloadReceiveData = () => {
        const data = { ...this.props.form.getFieldsValue() };
        const searchContents = parseStrToArray(data.searchContentReceive);
        const times = data.sendTimesReceive ? data.sendTimesReceive.map(t => getTimeStamp(t)) : undefined;
        const parameter = {
            data: {
                messageType: data.messageTypeReceive ? data.messageTypeReceive[0] : undefined,
                processState: data.processStateReceive ? data.processStateReceive[0] : undefined,
                searchContent: searchContents.length !== 0 ? searchContents : undefined,
                searchType: data.searchTypeReceive,
                sendTimes: times,
            },
        };

        fetchPost(My_Receive_Msg_Export_API, parameter, 2)
            .then((result) => {
                if (result.state === '000001') {
                    message.info('请求已发出，请等待下载！');
                    downlodFile(result.data.url);
                }
            });
    };


    /**
     * 导出 我发送的数据
     */
    downloadSendData = () => {
        const data = { ...this.props.form.getFieldsValue() };
        const searchContents = parseStrToArray(data.searchContentSend);
        const times = data.sendTimesSend ? data.sendTimesSend.map(t => getTimeStamp(t)) : undefined;
        const parameter = {
            data: {
                messageType: data.messageTypeSend ? data.messageTypeSend[0] : undefined,
                processState: data.processStateSend ? data.processStateSend[0] : undefined,
                searchContent: searchContents.length !== 0 ? searchContents : undefined,
                searchType: data.searchTypeSend,
                sendTimes: times,
            },
        };

        fetchPost(My_Send_Msg_Export_API, parameter, 2)
            .then((result) => {
                if (result.state === '000001') {
                    message.info('请求已发出，请等待下载！');
                    downlodFile(result.data.url);
                }
            });
    };

    /**
     * 关闭创建消息弹框
     */
    closeCreateMsgModal = () => {
        this.setState({
            showCreateMsgModal: false,
        });
    };

    /**
     * 打开创建消息弹框
     */
    openCreateMsgModal = () => {
        this.setState({
            showCreateMsgModal: true,
        });
    };

    /**
     * 提交创建消息
     */
    sendMsg = () => {
        this.closeCreateMsgModal();
        this.loadSendData();
    };

    render() {
        const {
            selectKey,
            pageData,
            pageNumber,
            showCreateMsgModal,
        } = this.state;
        return (
            <div>
                <div className="yks-erp-tabs">
                    <Tabs defaultActiveKey={selectKey} type="card" onChange={this.tabChange}>
                        <TabPane tab={TAB_TITLES[0]} key="0">
                            <ReceiveSearch
                                {...this.props}
                                onSearchListener={this.loadReceiveData}
                            />
                            <ReceiveQueryTable
                                {...this.props}
                                pageNumber={pageNumber}
                                pageSize={pageData}
                                openCreateMsgModal={this.openCreateMsgModal}
                                loadData={this.loadReceiveData}
                                downloadReceiveData={this.downloadReceiveData}
                            />
                        </TabPane>
                        <TabPane tab={TAB_TITLES[1]} key="1">
                            <SendSearch
                                {...this.props}
                                onSearchListener={this.loadSendData}
                            />
                            <SendQueryTable
                                {...this.props}
                                pageNumber={pageNumber}
                                pageSize={pageData}
                                loadData={this.loadSendData}
                                downloadSendData={this.downloadSendData}
                            />
                        </TabPane>
                    </Tabs>
                    <CreateMsgModal
                        visible={showCreateMsgModal}
                        cancel={this.closeCreateMsgModal}
                        ok={this.sendMsg}
                    />
                </div>
            </div>
        );
    }
}

export default Form.create()(App);
