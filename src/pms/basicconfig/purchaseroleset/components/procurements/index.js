import React from 'react';
import {
    Form,
    message,
} from 'antd';
import ProcurementSearch from './Searchs';
import SearchModal from '../../../../components/SearchModal'
import ProcurementTable from './Tables';
import { parseStrToArray } from '../../../../../util/StrUtil';
import ModelModel from './ModalModel';
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
        newVisible: false,
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
        data.roleType = Number.parseInt(data.roleType, 10);
        data.searchType = Number.parseInt(data.searchType, 10);
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
        this.props.getProcurementList(params);
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
            newVisible
        } = this.state;
        return (
            <Functions
            isPage
            {...this.props}
            functionkey="010-000004-000001-001"
        >
            <div>
                <ProcurementSearch
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
                <ProcurementTable
                    {...this.props}
                    onSearch={this.handleSearch}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    toggleModal={() => this.setState({
                        newVisible: true,
                    })}
                />
                <ModelModel
                    newVisible={newVisible}
                    onSearch={this.handleSearch}
                    handleAddItem={this.handleAddItem}
                    onCancel={() => this.setState({
                        newVisible: false,
                    })}
                />
            </div>
          </Functions>  
        );
    }
}
export default Form.create()(App);
