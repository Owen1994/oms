/**
 * 作者: chenlin
 * 描述: 图库设置页
 * 时间: 2018/7/27 15:52
 **/
import React from 'react'
import { Form } from 'antd'
import * as types from "../../../common/constants/actionTypes";
import {levelOptions} from "../../../../util/options";
import {post} from "../../../../util/axios";
import Functions from '../../../../components/functions'
import NewSearch from "./newSearch"
import Table from './table'
import '../css/css.css'
import {filterParams} from "../../../../util/baseTool";
class App extends React.Component{

    state = {
        pageNumber: 1,
        pageSize: 20,
        ebayAccountData: [],     // ebay 销售账号数据
        getGalleryListData:[],   //图库数据
    }

    componentDidMount(){
        const params = {};
        params["pageData"] = levelOptions("pageInit").pagedata;
        params["pageNumber"] = levelOptions("pageInit").pagenum;
        this.props.getGalleryRateList(params);
        // 公共接口数据初始化（eBay 销售账号）
        post(types.PUBLISH_EBAYACCOUNT, {}).then(res=>{
            if(res && res.state === "000001"){
                this.setState({
                    ebayAccountData: res.data
                })
            }
        });
        // 公共接口数据初始化（图库）
        post(types.PUBLISH_GETGALLERYLIST, {}).then(res=>{
            if(res && res.state === "000001"){
                this.setState({
                    getGalleryListData: res.data
                })
            }
        });
    }

    // 分页回调
    paginationHandle = (pageNumber, pageSize)=> {
        this.setState({
            pageNumber: pageNumber,
            pageSize: pageSize
        });
        this.listFetch (pageNumber, pageSize)
    }
    //列表获取
    listFetch = (pageNumber, pageSize) => {
        pageNumber = pageNumber ? pageNumber : 1;
        pageSize = pageSize ? pageSize : 20;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let  params = filterParams(values);
                //过滤销售账号
                let saleAccount = params["saleAccount"];
                saleAccount = saleAccount ? saleAccount : [];
                params["saleAccount"] = saleAccount.filter(v=> {
                    return v !== undefined
                })

                //图库
                let gallery = params["gallery"];
                gallery = gallery ? gallery : [];
                params["gallery"] = gallery.filter(v=> {
                    return v !== undefined
                })

                params["pageNumber"] = pageNumber;
                params["pageData"] = pageSize;
                const filters = { ...this.state.params, ...params}
                this.setState({
                    params: filters,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                })
                this.props.getGalleryRateList(params);
            }
        });
    }


    render(){
        const { ebayAccountData,getGalleryListData,pageSize,pageNumber, } = this.state;
        const paginationData = {
            pageSize: pageSize,
            pageNumber: pageNumber,
        };

        return(
            <Functions {...this.props}  isPage={true} functionkey="008-000002-000001-001">
                <div className="gallery-listing_container">
                        <NewSearch {...this.props}
                                   ebayAccountData={ebayAccountData}
                                   getGalleryListData={getGalleryListData}
                                   listFetch={this.listFetch}
                        />
                        <Table {...this.props}
                               ebayAccountData={ebayAccountData}
                               getGalleryListData={getGalleryListData}
                               listFetch={this.listFetch}
                               paginationData={paginationData}
                               paginationHandle={this.paginationHandle}
                        />
                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)