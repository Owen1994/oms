/**
 * 作者: 陈文春
 * 描述: 批量复制
 * 时间: 2018年9月3日08:33:16
 * */
import React from 'react';
import { Form } from 'antd';
import Search from './search';
import Tablelist from './tablelist';
import '../css/index.css';
import Functions from '../../../../components/functions';

class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
    };

    componentDidMount() {
        this.handleSubmit();
    }

    // 页面数据请求
    handleSubmit = (page = 1, pageSize = 20) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.pageNumber = page;
                values.pageData = pageSize;
                this.setState({
                    pageNumber: page,
                    pageData: pageSize,
                });
                this.props.queryRecordList(values);
            }
        });
    };

    // 重置
    resetFields = () => {
        this.props.form.resetFields();
    };

    render() {
        const {
            pageData,
            pageNumber,
        } = this.state;
        return (
            <Functions {...this.props} isPage functionkey="008-000001-000006-001">
                <div className="yks-erp-search_order">
                    <Search
                        {...this.props}
                        handleSubmit={this.handleSubmit}
                        resetFields={this.resetFields}
                    />
                    <Tablelist
                        {...this.props}
                        pageData={pageData}
                        pageNumber={pageNumber}
                        handleSubmit={this.handleSubmit}
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(App);
