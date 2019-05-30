/**
 * 作者: pzt
 * 描述: 模板管理页
 * 时间: 2018/7/27 15:52
 **/
import React from 'react'
import {Form} from "antd";
import {levelOptions} from "../../../../util/options";
import {PUBLISH_EBAYACCOUNT, PUBLISH_EBAYSITE} from "../../../common/constants/actionTypes";
import {post} from "../../../../util/axios";
import Functions from '../../../../components/functions'
import NewSearch from './newSearch'
import Table from './table'
// import {strTrim} from "../../../../util/baseTool";
import { parseStrToArray } from "util/StrUtil";
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';
import   "../css/css.css"

class App extends React.Component{

    state = {
        params: {
            editType: [0],
            syncState: [0]
        },
        pageNumber: 1,
        pageSize: 20,
        ebayAccountData:[],
        ebaySiteData:[],
        visible: false,
    }
    componentDidMount(){
        // const params = {};
        // params["pageData"] = levelOptions("pageInit").pagedata;
        // params["pageNumber"] = levelOptions("pageInit").pagenum;
        // this.props.getQueueList(params);
        this.listFetch();
        // 公共接口数据初始化（eBay 销售账号）
        // post(PUBLISH_EBAYACCOUNT, {}).then(res=>{
        //     if(res && res.state === "000001"){
        //         this.setState({
        //             ebayAccountData: res.data
        //         })
        //     }
        // });
        // 公共接口数据初始化（站点）
        // post(PUBLISH_EBAYSITE, {}).then(res=>{
        //     if(res && res.state === "000001"){
        //         this.setState({
        //             ebaySiteData: res.data
        //         })
        //     }
        // });
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
    listFetch = (pageNumber = 1, pageSize = 20) => {
        // pageNumber = pageNumber ? pageNumber : 1;
        // pageSize = pageSize ? pageSize : 20;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let  params = values;

                if (params.syncTime) {
                    params.syncTime = (params.syncTime).map(item => (
                        item.valueOf()
                    ));
                }
                if (!params['searchContent']) {
                    delete params['searchType'];
                    delete params['searchContent'];
                } else {
                    params['searchContent'] = parseStrToArray(params['searchContent']);
                }
                if (params.editType || params.editType === 0) {
                    params.editType = [values.editType];
                }

                if (params.syncState || params.syncState === 0) {
                    params.syncState = [values.syncState];
                }

                let saleAccount = params["saleAccount"];
                saleAccount = saleAccount ? saleAccount : [];
                params["saleAccount"] = saleAccount.filter(v=> {
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
                this.props.getQueueList(params);
            }
        });
    }

    // 重置
    resetFields = () => {
        this.setState({
            params: {
                editType: [0],
                syncState: [0]
            },
        })
        this.props.form.resetFields();
    }

    render(){
        const { params,ebayAccountData,ebaySiteData,pageSize,pageNumber,visible} = this.state;
        const paginationData = {
            pageSize: pageSize,
            pageNumber: pageNumber,
        };

        return(
            <div>
                <Functions {...this.props}  isPage={true} functionkey="008-000001-000003-001">
                    <div className="pbh-qee-list_container yks-erp-search_order">
                        <div>
                            <NewSearch
                                {...this.props}
                                listFetch={this.listFetch}
                                resetFields={this.resetFields}
                                ebayAccountData={ebayAccountData}
                                ebaySiteData={ebaySiteData}
                                tagSelectParams = {params}
                                toggleModal={() => this.setState({
                                    visible: true,
                                })}
                            />
                            <OrderCommonSearchModal
                                {...this.props}
                                visible={visible}
                                onCancel={() => this.setState({
                                    visible: false,
                                })}
                                onSearch={this.listFetch}
                                searchContent="searchContent"
                            />
                        </div>
                        <div>
                            <Table {...this.props}
                                   listFetch={this.listFetch}
                                   paginationData={paginationData}
                                   paginationHandle={this.paginationHandle}
                            />
                        </div>
                    </div>
                </Functions>
            </div>
        )
    }
}

export default Form.create()(App)
