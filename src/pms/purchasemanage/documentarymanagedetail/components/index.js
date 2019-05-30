import React from 'react';
import {Form, message} from 'antd';

import Search from './Search';
import TableList from './TableList';
import SearchView from './SearchView';
import SearchModal from '../../../components/SearchModal';

import AddAKeyExpediteOrderModal from './AddAKeyExpediteOrderModal';
import AddEditorFollowUpModal from './AddEditorFollowUpModal';
import { fetchPost } from '../../../../util/fetch';
import {
    REVIEW_MERCHANDISER_A_KEY_EXPEDITE_ORDER_API,
    REVIEW_MERCHANDISER_EDIT_FOLLOW_API,
} from '../constants/Api';

import {getUrlParams} from '../../../../util/baseTool';
import {getTimeStamp} from "../../../../compliance/utils";
import {parseStrToArray} from "../../../../util/StrUtil";
import { getPageCache } from '../../../../util/PageCache';

/**
 *作者: huangjianfeng
 *功能描述: 供应商跟单明细
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    state = {
        AKeyExpediteOrderLogModalVisible: false,
        AKeyExpediteOrderExpeditingTemplateData: '',
        EditorFollowUpLogModalVisible: false,
        EditorKeys: [],
        searchModalControl: false,
        searchData: {},
        item: {},
    };

    componentDidMount() {
        const dic = getUrlParams('');
        // const urlData = JSON.parse(dic.data);
        const a = getPageCache("kDocumentaryManageSearch");
        a.then((v) => {
            this.setState({
                searchData: v,
            }, () => {
                const merchandiser = Array.isArray(this.state.searchData.merchandiser) ? this.state.searchData.merchandiser[0].key : this.state.searchData.merchandiser;
                const opEmployee = this.state.searchData.opEmployee ? this.state.searchData.opEmployee[0].key : '';
                const times = this.state.searchData.wareHouseTimes ? this.state.searchData.wareHouseTimes.map(t => getTimeStamp(t)) : undefined;

                const data = {
                    data: {
                        ...this.state.searchData,
                        key: [dic.id],
                        merchandiser,
                        opEmployee,
                        wareHouseTimes: times,
                        searchContents: this.state.searchData.searchContents,
                    },
                };

                this.props.queryMerchandiserDetailList(data);
            });
        });

    }

    resetFields = () => {
        this.props.form.resetFields();
    };

    handleSearchDocumentary = () => {
        const formParams = [
            'salleState',
            'searchType',
            'searchContents',
            'opEmployee',
            'merchandiser',
            'wareHouseTimes',
        ];
        const dic = getUrlParams('');
        const params = { ...this.props.form.getFieldsValue(formParams) };
        const merchandiser = Array.isArray(params.merchandiser) ? params.merchandiser[0].key : params.merchandiser;
        const opEmployee = Array.isArray(params.opEmployee) ? params.opEmployee[0].key : params.opEmployee;
        const times = params.wareHouseTimes ? params.wareHouseTimes.map(t => getTimeStamp(t)) : undefined;
        const searchContents = Array.isArray(params.searchContents) ? params.searchContents : parseStrToArray(params.searchContents);
        if (searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }
        const data = {
            data: {
                ...params,
                key: [dic.id],
                merchandiser,
                opEmployee,
                wareHouseTimes: times,
                searchContents,
            },
        };
        this.props.queryMerchandiserDetailList(data);
    };

    /**
     * Http请求 一键跟催
     */
    handleAKeyExpediteOrder = () => {
        fetchPost(REVIEW_MERCHANDISER_A_KEY_EXPEDITE_ORDER_API, { data: { key: getUrlParams('').id } }, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        AKeyExpediteOrderLogModalVisible: true,
                        AKeyExpediteOrderExpeditingTemplateData: result.data.followtext,
                    });
                }
            });
    };

    /**
     * 处理复制文本到粘贴板
     */
    handleCopyText = () => {
        this.setState({
            AKeyExpediteOrderLogModalVisible: false,
        });
        const oInput = document.createElement('input');
        oInput.value = this.state.AKeyExpediteOrderExpeditingTemplateData;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
    };

    /**
     * 编辑跟进
     */
    handleEditorFollowUp = () => {
        const params = { ...this.props.form.getFieldsValue() };
        const sResult = params.followUpResultContent ? params.followUpResultContent : '';
        const sLogisticsNumber = params.logisticsNumberContent ? params.logisticsNumberContent : '';
        const sRemark = params.remark ? params.remark : '';
        const data = {
            data: {
                keys: this.state.EditorKeys,
                result: sResult,
                logisticsNumber: sLogisticsNumber,
                remark: sRemark
            },
        };
        fetchPost(REVIEW_MERCHANDISER_EDIT_FOLLOW_API, data, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        EditorFollowUpLogModalVisible: false,
                    });
                    this.handleSearchDocumentary();
                }
            });
    };

    render() {
        const {
            AKeyExpediteOrderLogModalVisible,
            AKeyExpediteOrderExpeditingTemplateData,
            EditorFollowUpLogModalVisible,
            searchModalControl,
            searchData,
            item,
        } = this.state;
        return (
            <div className="yks-erp-search_order">
                <SearchView
                    {...this.props}
                    onSearch={this.handleSearchDocumentary}
                    resetFields={this.resetFields}
                    showModal={() => this.setState({
                        searchModalControl: true,
                    })}
                    urlData={searchData}
                />

                <Search {...this.props} />

                <TableList
                    {...this.props}
                    showAKeyExpediteOrderModal={this.handleAKeyExpediteOrder}
                    showEditorFollowUpModal={
                        (item, data) => {
                            this.setState({
                                EditorFollowUpLogModalVisible: true,
                                EditorKeys: [item],
                                item: data,
                            });
                        }
                    }
                />

                <AddAKeyExpediteOrderModal
                    visible={AKeyExpediteOrderLogModalVisible}
                    ExpeditingTemplateData={AKeyExpediteOrderExpeditingTemplateData}
                    onTaskCancel={() => this.setState({AKeyExpediteOrderLogModalVisible: false})}
                    onTaskSubmit={this.handleCopyText}
                />

                <AddEditorFollowUpModal
                    {...this.props}
                    visible={EditorFollowUpLogModalVisible}
                    onTaskCancel={() => this.setState({
                        EditorFollowUpLogModalVisible: false,
                        EditorKeys: [],
                        item: {},
                    })}
                    item={item}
                    onTaskSubmit={this.handleEditorFollowUp}
                />

                <SearchModal
                    {...this.props}
                    visible={searchModalControl}
                    onCancel={() => this.setState({
                        searchModalControl: false,
                    })}
                    onSearch={this.handleSearchDocumentary}
                />
            </div>
        );
    }
}
export default Form.create()(App);
