import React from 'react';
import {
    Form,
} from 'antd';
import Search from './Searchs';
import Table from './Tables';


/**
 *作者: chenlin
 *功能描述: PR首页
 *时间: 2018/10/27 11:55
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 20,
        };
    }

    componentDidMount() {
        this.handleSearch();
    }

    // 请求列表
    handleSearch = (pageNumber=1, pageSize=20) => {
        this.setState({
            pageNumber,
            pageSize
        });
        const data = { ...this.props.form.getFieldsValue() }
        const params = {};
        // 类型
        data.taskType = data.taskType[0];

        // 处理状态
        data.taskStatus = data.taskStatus[0];
        // 操作时间
        if (data.createdTime) {
            data.createdTime = (data.createdTime).map(item => (
                item.valueOf()
            ));
        }
        params.data = data;
        data.pageNumber = pageNumber;
        data.pageData = pageSize;
        this.props.getImportExportList(params);
    }

    // 重置
    onReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {
            pageSize,
            pageNumber,
        } = this.state;
        const paginationData = {
            pageSize,
            pageNumber,
        };
        return (
            <div className="basicdata-importexportrecords yks-erp-search_order">
                <Search
                    {...this.props}
                    onSearch={this.handleSearch}
                    onReset={this.onReset}
                />
                <Table
                    {...this.props}
                    onSearch={this.handleSearch}
                    paginationData={paginationData}
                />
            </div>
        );
    }
}
export default Form.create()(App);
