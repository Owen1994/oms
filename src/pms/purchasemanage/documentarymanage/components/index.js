import React from 'react';
import { Form, message } from 'antd';
import SearchView from './SearchView';
import TableList from './TableList';
import AddModal from './AddModal';
import SearchModal from '../../../components/SearchModal';
import ImportModal from './ImportModal';
import { fetchPost } from '../../../../util/fetch';
import AddExpeditingTemplateModal from './AddExpeditingTemplateModal';
import {
    REVIEW_MERCHANDISER_A_KEY_EXPEDITE_ORDER_API,
    REVIEW_MERCHANDISER_GET_EXPEDITING_TEMPLATE_API,
    REVIEW_MERCHANDISER_SET_EXPEDITING_TEMPLATE_API,
    Import_Results_Api,
    Export_Api,
} from '../constants/Api';
import { getTimeStamp } from '../../../../compliance/utils';
import { parseStrToArray } from '../../../../util/StrUtil';
import PopConfirm from "../../../../common/components/confirm";
import { fetchUpload } from '../../../../util/fetch';
import { UPLOAD_URL } from '../constants/Api';

/**
 *作者: huangjianfeng
 *功能描述: 跟单管理
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageSize: 20,
        aKeyExpediteOrderLogModalVisible: false,
        aKeyExpediteOrderExpeditingTemplateData: '',
        expeditingTemplateLogModalVisible: false,
        expeditingTemplateType: 1,
        searchModalControl: false,
        importVisible: false,
    };

    componentDidMount() {
        this.handleSearchDocumentary();
    }

    /**
     * Http请求 跟单管理页面列表查询
     * @param pageNumber
     * @param pageSize
     */
    handleSearchDocumentary = (pageNumber, pageSize) => {
        const formParams = [
            'salleState',
            'searchType',
            'searchContents',
            'opEmployee',
            'merchandiser',
            'wareHouseTimes',
            'supplier'
        ];
        const params = { ...this.props.form.getFieldsValue(formParams) };
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

        const merchandiser = Array.isArray(params.merchandiser) ? params.merchandiser[0].key : params.merchandiser;
        const opEmployee = Array.isArray(params.opEmployee) ? params.opEmployee[0].key : params.opEmployee;
        const times = params.wareHouseTimes ? params.wareHouseTimes.map(t => getTimeStamp(t)) : undefined;
        const searchContents = parseStrToArray(params.searchContents);
        if (searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }
        const data = {
            data: {
                ...params,
                merchandiser,
                opEmployee,
                wareHouseTimes: times,
                searchContents,
            },
        };
        this.props.queryMerchandiserList(data);
    };

    /**
     * Http请求 一键跟催
     * @param valus
     */
    handleAKeyExpediteOrder = (valus) => {
        const data = {
            data: { key: valus.items.key },
        };
        fetchPost(REVIEW_MERCHANDISER_A_KEY_EXPEDITE_ORDER_API, data, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        aKeyExpediteOrderLogModalVisible: true,
                        aKeyExpediteOrderExpeditingTemplateData: result.data.followtext,
                    });
                } else {
                    message.error('一键催跟失败');
                }
            });
    };

    /**
     * 导出
     */
    showExport = () => {
        PopConfirm('导出', '确认导出文件到导入导出管理列表？', this.httpExport);
    };

    /**
     * Http请求 导出
     */
    httpExport = () => {
        const formParams = [
            'salleState',
            'searchType',
            'searchContents',
            'opEmployee',
            'merchandiser',
            'wareHouseTimes',
        ];
        const params = { ...this.props.form.getFieldsValue(formParams) };
        const merchandiser = Array.isArray(params.merchandiser) ? params.merchandiser[0].key : params.merchandiser;
        const opEmployee = params.opEmployee ? params.opEmployee[0].key : '';
        const times = params.wareHouseTimes ? params.wareHouseTimes.map(t => getTimeStamp(t)) : undefined;
        const searchContents = parseStrToArray(params.searchContents);
        if (searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }
        const data = {
            data: {
                ...params,
                merchandiser,
                opEmployee,
                wareHouseTimes: times,
                searchContents,
            },
        };

        fetchPost(Export_Api, data, 1).then((result) => {
            if (result.state === '000001') {
                window.open('/pms/importexportmanage/importexportlist/', '_blank');
            }
        });
    };

    /**
     * http请求 导入跟进结果
     */
    httpImportResults = (fileList) => {
        if (!fileList) {
            message.warning('请添加文件后再继续操作!');
            return;
        }
        fetchUpload(UPLOAD_URL, fileList).then(result => {
            if (result.state === '000001' && result.data && result.data.length) {
                const data = result.data[0];
                const parameter = {
                    data: {
                        fileName: data.filename,
                        fileURL: data.path
                    }
                };

                fetchPost(Import_Results_Api, parameter, 1).then((result1) => {
                    if (result1.state === '000001') {
                        this.setState({
                            importVisible: false,
                        });
                        window.open('/pms/importexportmanage/importexportlist/', '_blank');
                    }
                });
            } else {
                message.error(result.msg);
            }
        }).catch(error => console.log(error))
    }

    /**
     * Http请求 获取催货模板
     * @param type
     */
    handleGetExpeditingTemplate = (type) => {
        const data = {
            data: { type },
        };
        fetchPost(REVIEW_MERCHANDISER_GET_EXPEDITING_TEMPLATE_API, data, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        expeditingTemplateLogModalVisible: true,
                        expeditingTemplateType: type,
                    });
                    this.props.form.setFieldsValue({
                        followtext: result.data.followtext,
                    });
                } else {
                    message.error('获取催货模板失败');
                }
            });
    };

    /**
     * Http请求 保存催货模板
     */
    handleSetExpeditingTemplate = () => {
        const params = { ...this.props.form.getFieldsValue(['followtext']) };
        if (!params.followtext) {
            message.info('催货模板不能为空');
            return;
        }
        if (!params.followtext.length) {
            message.info('催货模板不能为空');
            return;
        }
        const iType = this.state.expeditingTemplateType;
        const sFollowtext = params.followtext;

        const data = {
            data: {
                type: iType,
                followtext: sFollowtext,
            },
        };
        fetchPost(REVIEW_MERCHANDISER_SET_EXPEDITING_TEMPLATE_API, data, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        expeditingTemplateLogModalVisible: false,
                    });
                } else {
                    message.error('保存催货模板失败');
                }
            });
    };

    /**
     * 处理复制文本到粘贴板
     */
    handleCopyText = () => {
        this.setState({
            aKeyExpediteOrderLogModalVisible: false,
        });
        const oInput = document.createElement('input');
        oInput.value = this.state.aKeyExpediteOrderExpeditingTemplateData;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        message.success('复制成功');
    };

    resetFields = () => {
        this.props.form.resetFields();
    };

    render() {
        const {
            pageNumber,
            pageSize,
            aKeyExpediteOrderLogModalVisible,
            aKeyExpediteOrderExpeditingTemplateData,
            expeditingTemplateLogModalVisible,
            searchModalControl,
            importVisible,
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
                />

                <TableList
                    {...this.props}
                    onSearch={this.handleSearchDocumentary}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    showAKeyExpediteOrderModal={this.handleAKeyExpediteOrder}
                    showExpeditingTemplateModal={this.handleGetExpeditingTemplate}
                    showImport={() => {
                        this.setState({
                            importVisible: true,
                        });
                    }}
                    showExport={() => this.showExport()}
                />

                <AddModal
                    visible={aKeyExpediteOrderLogModalVisible}
                    expeditingTemplateData={aKeyExpediteOrderExpeditingTemplateData}
                    onTaskCancel={() => this.setState({ aKeyExpediteOrderLogModalVisible: false })}
                    onTaskSubmit={this.handleCopyText}
                />

                <AddExpeditingTemplateModal
                    {...this.props}
                    visible={expeditingTemplateLogModalVisible}
                    onTaskCancel={() => this.setState({ expeditingTemplateLogModalVisible: false })}
                    onTaskSubmit={this.handleSetExpeditingTemplate}
                    onSwitchTemplate={this.handleGetExpeditingTemplate}
                />

                <ImportModal
                    visible={importVisible}
                    onCancel={() => this.setState({
                        importVisible: false,
                    })}
                    onOK={this.httpImportResults}
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
