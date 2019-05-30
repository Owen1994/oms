import React from 'react';
import {
    Form,
} from 'antd';
import Search from './Search';
import Table from './Tables';
// import Functions from '../../../../../components/functions';
/**
 *作者: chenlin
 *功能描述: 导入
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
    handleSearch = (pageNumber = 1, pageSize = 20) => {
        const params = {};
        const data = { ...this.props.form.getFieldsValue() };
        data.pageNumber = pageNumber;
        data.pageData = pageSize;
        if (data.importState) {
            data.importState = data.importState[0];
        }
        params.data = data;
        if (data.downloadState) {
            delete data.downloadState;
        }
        this.setState({
            pageNumber,
            pageSize,
        });
        this.props.getImportList(params);
    }

    // 重置
    onReset = () => {
        this.props.form.resetFields();
    }

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
            // <Functions
            //     isPage
            //     {...this.props}
            //     functionkey="010-000004-000001-006"
            // >
            <div className="basicdata-syncqueue">
                <Search
                    {...this.props}
                    onSearch={this.handleSearch}
                />
                <Table
                    {...this.props}
                    onSearch={this.handleSearch}
                    paginationData={paginationData}
                />
            </div>
            // </Functions>
        );
    }
}
export default Form.create()(App);
