import React from 'react';
import { Form } from 'antd';
import Search from './Searchs';
import Table from './Tables';
import '../css/css.css';

/**
 *作者: chenlin
 *功能描述: 其他设置
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
    handleSearch = (pageNumber, pageSize) => {
        pageNumber = pageNumber !== undefined ? pageNumber : 1;
        pageSize = pageSize !== undefined ? pageSize : 20;
        const params = { };
        const data = {};
        data.pageNumber = pageNumber;
        data.pageData = pageSize;
        params.data = data;
        this.setState({
            pageNumber,
            pageSize,
        });
        this.props.getOthersetList(params);
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
            <div className="pms-prmanage pms-otherset">
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
        );
    }
}
export default Form.create()(App);
