import React from 'react';
import { Form, message } from 'antd';
import Search from './Search';
import Tables from './Tables';
import { parseStrToArray } from '../../../../util/StrUtil';
import AddModal from './AddModal';
import ImportModal from './ImportModal';
import Functions from '../../../../components/functions';

class Retrieval extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        showAddUpdate: false, // 新增弹窗
        importVisible: false, // 导入弹窗
    }

    componentDidMount() {
        this.handleSearch();
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

    onReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {
            pageData,
            pageNumber,
            showAddUpdate,
            importVisible,
        } = this.state;
        return (
            <Functions {...this.props} isPage functionkey="011-000002-000003-001">
                <div className="yks-erp-search_order newCluenk">
                    <Search
                        {...this.props}
                        onSearch={this.handleSearch}
                        onReset={this.onReset}
                    />
                    <Tables
                        pageData={pageData}
                        pageNumber={pageNumber}
                        onSearch={this.handleSearch}
                        {...this.props}
                        showAddUpdateModal={() => this.setState({
                            showAddUpdate: true,
                        })}
                        showImportModal={() => { this.setState({ importVisible: true }); }}
                    />
                    <AddModal
                        visible={showAddUpdate}
                        onSearch={this.handleSearch}
                        onCancel={() => this.setState({
                            showAddUpdate: false,
                        })}
                        {...this.props}
                    />
                    <ImportModal
                        visible={importVisible}
                        onCancel={() => { this.setState({ importVisible: false }); }}
                        onSubmit={this.handleImport}
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(Retrieval);
