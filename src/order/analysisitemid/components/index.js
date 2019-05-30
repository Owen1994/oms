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
import { downlodFile, fetchPost } from 'util/fetch';
import { EXPORT_DATA } from '../constants';

class App extends React.Component {

    state = {
        searchParams: {},
    }

    // 请求列表
    handleSearch = () => {
        const data = this.props.form.getFieldsValue();
        const params = {};
        filterSearchParams(data);
        if (!data.platformCode) {
            message.warning("平台不能为空");
            return false;
        }
        if (data.payDt) {
            const middleTime = 30 * 24 * 60 * 60 * 1000;
            if (data.payDt[1].valueOf() - data.payDt[0].valueOf() >= middleTime) {
                message.warning('付款时间不能超过30天');
                return false;
            }
        } else {
            message.warning("付款时间不能为空");
        }

        if(data.itemIds && data.itemIds.length > 0){
            data.itemIds = data.itemIds.split(/,|，/g);
        }

        params.data = data;
        this.setState({
            searchParams: params,
        });
        this.props.getItemIDList(params);
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
        return (
            <div>
                <Search
                    {...this.props}
                    onSearch={this.handleSearch}
                    onDownloadData={this.onDownloadData}
                />
                <Table
                    {...this.props}
                    onSearch={this.handleSearch}
                />
            </div>
        );
    }
}
export default Form.create()(App);
