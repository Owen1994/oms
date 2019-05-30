import React from 'react';
import {
    Form,
    message,
    Row,
    Col
} from 'antd';
import Search from './Searchs';
import Table from './Tables';
import '../css/css.css';
import { filterSearchParams } from '../selectors/FormData';
import { fetchPost } from 'util/fetch';
import { EXPORT_DATA } from '../constants';
import { strTrim } from 'util/baseTool';

class App extends React.Component {

    state = {
        searchParams: {},
        pageNumber: 1,
        pageData: 100,
    }

    componentDidMount() {
        this.handleSearch();
    }

    // 请求列表
    handleSearch = (pageNumber = 1, pageData = 100) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err) {
                filterSearchParams(values);
                if (values.grabTime) {
                    const middleTime = 31 * 24 * 60 * 60 * 1000;
                    if (values.grabTime[1].valueOf() - values.grabTime[0].valueOf() >= middleTime) {
                        message.warning('付款时间不能超过31天');
                        return false;
                    }
                }
        
                if(values.orderIds){
                    values.orderIds = strTrim(values.orderIds).split(/\s/g);
                }

                if(values.dimensionality === 'account') {
                    values.pageNumber = pageNumber;
                    values.pageData = pageData;
                    this.setState({
                        pageNumber,
                        pageData,
                        searchParams: values,
                    });
                }
        
                this.setState({
                    searchParams: values,
                });
                this.props.getTableList({ type: values.dimensionality, params: values, });
            } else if(err.batchOrderIds){
                message.error(`订单号${err.batchOrderIds.errors[0].message}`);
                return;
            }
        })
    };

    /**
     下载数据
     */
    onDownloadData = () => {
        const { searchParams } = this.state;

        // 导出数据
        fetchPost(EXPORT_DATA, searchParams, 2)
            .then((result) => {
                if (result.state === '000001') {
                    window.location.href="/order/basicdata/importexportrecords/";
                }
            });
    };

    render() {
        const { searchParams, pageNumber, pageData } = this.state;
        return (
            <div>
                <Search
                    {...this.props}
                    handleSearch={this.handleSearch}
                />
                <Table
                    {...this.props}
                    handleSearch={this.handleSearch}
                    onDownloadData={this.onDownloadData}
                    searchParams={searchParams}
                    pageNumber={pageNumber}
                    pageData={pageData}
                />
            </div>
        );
    }
}
export default Form.create()(App);
