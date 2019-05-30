import React from 'react';
import { Form, message } from 'antd';
import Search from './Search';
import Tables from './Tables';
import { parseStrToArray } from '../../../../util/StrUtil';
import { EXPORT_SKU, GET_OVERSEA_SHOW_FILED_LIST } from '../constants/Apis';
import {
    fetchPost,
} from '@/util/fetch';
import ImportModal from './ImportModal';
import DisplayFieldsModal from './DisplayFieldsModal';
import Functions from '../../../../components/functions';
import parseList from '../selectors/DisplayFieldsModal';

class Retrieval extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        exportLoading: false,
        importVisible: false, // 导入弹窗
        displayFieldsVisible: false, // 显示字段弹窗
        filterColumns: [],
    }

    componentDidMount() {
        this.loadFields().then((result) => {
            this.setState({ fields: result, filterColumns: result.filter(item => item.fieldValue) });
            this.handleSearch();
        });
    }

    // 请求
    loadFields = () => {
        let data = {};
        data = { data: { type: 2 } };
        return fetchPost(GET_OVERSEA_SHOW_FILED_LIST, data, 2)
            .then((result) => {
                if (result.state === '000001') {
                    return parseList(result.data.list.filter(x => (x.fieldName !== 'SKU')));
                }
                return Promise.reject();
            });
    }


    handleSearch = (pageNumber = 1, pageData = 20) => {
        this.setState({
            pageData,
            pageNumber,
        });
        const formData = { ...this.props.form.getFieldsValue() };
        if (formData.searchContent) {
            formData.searchContent = formData.searchContent;
            formData.searchType = formData.searchType;
        } else {
            delete formData.searchType;
        }
        if (formData.searchContent) {
            formData.searchContent = parseStrToArray(formData.searchContent);
            if (formData.searchContent.length >= 10) {
                message.warning('搜索内容不能超过10个');
                return false;
            }
        }
        this.props.getDataList({ data: { ...formData, pageNumber, pageData } });
    }


    handleExport = () => {
        const data = { ...this.props.form.getFieldsValue() };
        if (data.searchContent) {
            data.searchContent = data.searchContent;
        }
        if (data.searchContent) {
            formData.searchContent = parseStrToArray(formData.searchContent);
            if (formData.searchContent.length >= 10) {
                message.warning('搜索内容不能超过10个');
                return false;
            }
        }
        data.searchType = data.searchType;
        data.warehouse = data.warehouseType;
        data.exportType = 3;
        delete data.warehouseType;
        this.onConfirm({ data });
    }

    // 确认弹窗
    onConfirm = (params) => {
        this.setState({ exportLoading: true });
        fetchPost(EXPORT_SKU, params, 2).then((result) => {
            this.setState({ exportLoading: false });
            if (result.state === '000001') {
                // this.oldTimestamp = Date.now();
                window.location.href = '/basicdata/syncqueue/syncqueue/';
            }
        });
    }


    onReset = () => {
        this.props.form.resetFields();
    };

    handleFieldsOk = (filterColumns = []) => {
        this.setState({
            filterColumns,
        });
    }

    render() {
        const {
            pageData,
            pageNumber,
            exportLoading,
            importVisible,
            displayFieldsVisible,
            filterColumns,
            fields,
        } = this.state;
        return (
            <Functions {...this.props} isPage functionkey="011-000002-000002-001">
                <div className="yks-erp-search_order newCluenk">
                    <Search
                        {...this.props}
                        onSearch={this.handleSearch}
                        onReset={this.onReset}
                    />
                    <Tables
                        pageData={pageData}
                        pageNumber={pageNumber}
                        onExportSku={this.handleExport}
                        onImportSku={this.handleImport}
                        {...this.props}
                        exportLoading={exportLoading}
                        onSearch={this.handleSearch}
                        {...this.props}
                        showImportModal={() => { this.setState({ importVisible: true }); }}
                        displayFieldsModal={() => { this.setState({ displayFieldsVisible: true }); }}
                        filterColumns={filterColumns}
                    />
                    <ImportModal
                        visible={importVisible}
                        onCancel={() => { this.setState({ importVisible: false }); }}
                        onSubmit={this.handleImport}
                    />
                    <DisplayFieldsModal
                        visible={displayFieldsVisible}
                        handleFieldsOk={this.handleFieldsOk}
                        onSearch={this.handleSearch}
                        onCancel={() => { this.setState({ displayFieldsVisible: false }); }}
                        fields={fields}
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(Retrieval);
