import React from 'react';
import { Form } from 'antd';
import Search from './Search';
import Tables from './Tables';
import { parseStrToArray } from '../../../../util/StrUtil';
import Functions from '../../../../components/functions';
import '../css.css';

class Retrieval extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
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
            formData.searchContent = parseStrToArray(formData.searchContent);
            if (formData.searchContent.length >= 100) {
                message.warning('搜索内容不能超过100个');
                return false;
            }
        }
        if (formData.generationTime) {
            formData.generationTime = (formData.generationTime).map(item => (
                item.valueOf()
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
        } = this.state;
        return (
            <Functions {...this.props} isPage functionkey="002-000003-000002-001">
                <div className="yks-erp-search_order">
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
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(Retrieval);
