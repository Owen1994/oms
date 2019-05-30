import React from 'react';
import {
    Form,
    message,
} from 'antd';
import Search from './Searchs';
import Table from './Tables';
import moment from 'moment';
import SearchModal from './SearchModal';
import { parseStrToArray } from '../../../../util/StrUtil';
import { getTimeStamp } from '../../../../util/moment';



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
            visible: false,
        };
    }

    componentDidMount() {
        this.handleSearch();
        this.setDefaultTime();
    }

    // 设置默认时间
    setDefaultTime = () => {
        let end = moment().endOf('day').valueOf();
        let start = moment().subtract(0, 'day').startOf('day').valueOf();
        let momentData = [moment(start), moment(end)] || [];
    };

    // 请求列表
    handleSearch = (pageNumber = 1, pageSize = 20) => {
        const params = {};
        const data = { ...this.props.form.getFieldsValue() };
        data.prState = Number.parseInt(data.prState, 10);
        data.warehouse = Number.parseInt(data.warehouse, 10);
        data.searchContents = parseStrToArray(data.searchContents);
        if (data.searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }
        data.pageNumber = pageNumber;
        data.pageData = pageSize;
        if (data.demandTimes) {
            data.demandTimes = (data.demandTimes).map(item => (
                getTimeStamp(item)
                // item.valueOf()
            ));
        }
      
       if ( data.planUploadTimes) {
            data.planUploadTimes = (data.planUploadTimes).map(item => (
                getTimeStamp(item)
            ));
       }
        
        params.data = data;
        this.setState({
            pageNumber,
            pageSize,
        });
        this.props.getPrsearchList(params);
    }

    // 重置
    onReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {
            pageSize,
            pageNumber,
            visible,
        } = this.state;
        return (
            <div className="pms-prmanage yks-erp-search_order">
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
                <Table
                    {...this.props}
                    onSearch={this.handleSearch}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                />
            </div>
        );
    }
}
export default Form.create()(App);
