import React from 'react';
import {
    Form,
} from 'antd';
import Search from './search.js';
import Detial from './detial';
import TableList from './tableList';
import SearchModal from '../../../components/SearchModal';
import { getUrlParams, getLoginmsg } from '../../../../util/baseTool';
import { parseStrToArray } from '@/util/StrUtil';
import { getPageCache } from '../../../../util/PageCache';
import {getTimeStamp} from "../../../../compliance/utils";

class App extends React.Component {
    
    state = {
        pageNumber: 1,
        pageSize: 20,
        visible: false,
        searchData: {}, // 列表传过来的参数
    }

    componentWillMount() {
        const list = {};
        const dic = getUrlParams('').id + "";
        const datailList = getPageCache("unorderedPurchase");
        datailList.then((v) => {
            this.setState({
                searchData: v,
            }, () => {
                let pageNumber = 1;
                let pageSize = 20; 
                const oeEmployee = this.state.searchData.oeEmployee ? this.state.searchData.oeEmployee[0].key : ''; // 订货员
                const purchaseDevelop = this.state.searchData.purchaseDevelop ? this.state.searchData.purchaseDevelop[0].key : ''; // 采购开发
                const times = this.state.searchData.demandTimes ? this.state.searchData.demandTimes.map(t => getTimeStamp(t)) : undefined;
                list.pageNumber = pageNumber;
                list.pageData = pageSize;
                this.setState({
                    pageNumber,
                    pageSize,
                });
                this.props.orderDetailOrderGoodsListAsync({
                    data: {
                        ...list,
                        key: dic,
                        pageData: pageSize,
                        pageNumber: pageNumber,
                        oeEmployee,
                        purchaseDevelop,
                        demandTimes: times,
                        searchType: this.state.searchData.searchType,
                        searchContents: this.state.searchData.searchContents,
                    },
                });
            });
        });
        // this.handleSearch();
    }


     // 请求列表
     handleSearch = (pageNumber = 1, pageSize = 20) => {
        const data = { ...this.props.form.getFieldsValue() };
        const { location } = this.props;
        const params = getUrlParams(location.search);
        if (!params.id) return;
        if (data.oeEmployee) {
           if (Array.isArray(data.oeEmployee)){
             data.oeEmployee = this.state.searchData.oeEmployee ? this.state.searchData.oeEmployee[0].key : '';
           }
        } else {
            data.oeEmployee =  data.oeEmployee;
        }
        
        if (data.purchaseDevelop) {
            if (Array.isArray(data.purchaseDevelop)){
                data.purchaseDevelop = this.state.searchData.purchaseDevelop ? this.state.searchData.purchaseDevelop[0].key : '';
            }
         } else {
            data.purchaseDevelop = data.purchaseDevelop;
         }
       
        if (data.searchContents) {
            data.searchContents = Array.isArray(data.searchContents) ? data.searchContents : parseStrToArray(data.searchContents);
            if (data.searchContents.length >= 10) {
                message.warning('搜索内容不能超过10个');
                return false;
            }
            data.searchType = data.searchType;
        } else {
            delete data.searchType;
            delete data.searchContents;
        }

        if (data.demandTimes) {
            data.demandTimes = (data.demandTimes).map(item => (
                item.valueOf()
            ));
        }
       
        data.pageNumber = pageNumber;
        data.pageData = pageSize;


        this.setState({
            pageNumber,
            pageSize,
        });
       
        this.props.orderDetailOrderGoodsListAsync({
            data: {
                ...data,
                key: params.id,
                pageData: pageSize,
                pageNumber: pageNumber,
            },
        });
    }

    // 搜索取消
    onReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const {
            pageSize,
            pageNumber,
            visible,
            searchData,
        } = this.state;
        return (
            <div className="ordermanage-detail-list yks-erp-search_order">
                <Search 
                    {...this.props} 
                    onSearch={this.handleSearch}
                    onReset={this.onReset}
                    toggleModal={() => this.setState({
                        visible: true,
                    })}
                    urlData={searchData}
                />
                 <SearchModal 
                    visible={visible}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                    onSearch={this.handleSearch}
                    {...this.props} 
                />
                <Detial {...this.props} />
                <TableList 
                    {...this.props} 
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    urlData={searchData}
                />

            </div>
        );
    }
}
export default Form.create()(App);
