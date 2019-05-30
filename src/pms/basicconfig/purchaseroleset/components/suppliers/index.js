import React from 'react';
import {
    Form,
    message,
} from 'antd';
import SupplierSearch from './Searchs';
import SearchModal from '../../../../components/SearchModal'
import SupplierTable from './Tables';
import { parseStrToArray } from '../../../../../util/StrUtil';
import Functions from '../../../../../components/functions';
/**
 *作者: chenlin
 *功能描述: PR首页
 *时间: 2018/10/27 11:55
 */
class App extends React.Component {

    state = {
        pageNumber: 1,
        pageSize: 20,
        visible: false,
    };
    componentDidMount() {
        this.handleSearch();
    }

    // 请求列表
    handleSearch = (pageNumber = 1, pageSize = 20) => {
        const params = {};
        const data = { ...this.props.form.getFieldsValue() };
        data.pageNumber = pageNumber;
        data.pageData = pageSize;
        data.searchContents = parseStrToArray(data.searchContents);
        if (data.searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }
        params.data = data;
        this.setState({
            pageNumber,
            pageSize,
        });
        this.props.getSupplierList(params);
    }

    // 重置
    onReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const {
            pageSize,
            pageNumber,
            visible,
        } = this.state;
        return (
            <Functions
                isPage
                {...this.props}
                functionkey="010-000004-000001-006"
            >
                <div>
                    <SupplierSearch
                        {...this.props}
                        onSearch={this.handleSearch}
                        onReset={this.onReset}
                        toggleModal={() => this.setState({
                            visible: true,
                        })}
                    />
                    <SearchModal
                        visible={visible}
                        onCancel={() => this.setState({
                            visible: false,
                        })}
                        onSearch={this.handleSearch}
                        {...this.props}
                    />
                    <SupplierTable
                        {...this.props}
                        onSearch={this.handleSearch}
                        pageSize={pageSize}
                        pageNumber={pageNumber}
                    />
                </div>
            </Functions>
        );
    }
}
export default Form.create()(App);
