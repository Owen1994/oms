import React from 'react';
import { Form } from 'antd';
import Search from './Search';
import Tables from './Tables';
import { parseStrToArray } from '../../../../util/StrUtil';
import Functions from '../../../../components/functions';
import SearchModal from './SearchModal';
import AddUpdateModal from './AddModal'
import ImportModal from './ImportModal';

class Retrieval extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        visible: false,
        addUpdateVisible: false,
        item: undefined,
        importVisible: false,
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
        if (formData.searchContents) {
            formData.searchContents = formData.searchContents;
            formData.searchType = formData.searchType;
        } else {
            delete formData.searchType;
        }
        if (formData.searchContents) {
            formData.searchContents = parseStrToArray(formData.searchContents);
            if (formData.searchContents.length >= 10) {
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
            visible,
            addUpdateVisible,
            item,
            importVisible
        } = this.state;
        return (
            <div className="yks-erp-search_order">
                <Search
                    {...this.props}
                    onSearch={this.handleSearch}
                    onReset={this.onReset}
                    toggleModal={() => this.setState({
                        visible: true,
                    })}
                />
                <SearchModal
                    {...this.props}
                    visible={visible}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                    onSearch={this.handleSearch}
                />
                <Tables
                    pageData={pageData}
                    pageNumber={pageNumber}
                    onSearch={this.handleSearch}
                    {...this.props}
                    showAddUpdateModal={(item) => {
                        this.setState({
                            item,
                            addUpdateVisible: true
                        })}
                    }
                    showImportModal={() => { this.setState({ importVisible: true }); }}
                />
                <ImportModal
                    visible={importVisible}
                    onCancel={() => { this.setState({ importVisible: false }); }}
                    onSubmit={this.handleImport}
                />
                <AddUpdateModal
                    visible={addUpdateVisible}
                    onCancel={()=>this.setState({addUpdateVisible: false})}
                    item={item}
                    onSearch={this.handleSearch}
                />
            </div>
        );
    }
}

export default Form.create()(Retrieval);
