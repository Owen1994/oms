import React from 'react';
import { Form } from 'antd';
import Search from './Search';
import Tables from './Tables';
import { parseStrToArray } from '../../../../util/StrUtil';
import Functions from '../../../../components/functions';
import SearchModal from './SearchModal';
import { getTimeStamp } from "../../../../compliance/utils";

class Retrieval extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        visible: false,
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
            formData.searchContents= parseStrToArray(formData.searchContents);
            if (formData.searchContents.length >= 100) {
                message.warning('搜索内容不能超过100个');
                return false;
            }
        }
        if (formData.operationTime) {
            formData.operationTime = (formData.operationTime).map(item => (
                getTimeStamp(item)
            ));
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
                />
            </div>
        );
    }
}

export default Form.create()(Retrieval);
