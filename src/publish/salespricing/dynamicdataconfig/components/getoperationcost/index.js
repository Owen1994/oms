/**
 * 作者: pzt
 * 描述: 获取刊登费用
 * 时间: 2018/10/26 14:59
 **/
import React from 'react';
import Search from './search';
import Tablist from './tablist';
import { levelOptions } from "../../../../../util/options";
import { fetchPost } from "../../../../../util/fetch";
import {GET_OPERATION_LOG, GET_OPERATION_COST_LIST} from "../../constants/Api";
import LogModal from '../logmodals';
import Functions from '../../../../../components/functions';

export default class ApportionCost extends React.Component{
    state={
        pageNumber: levelOptions("pageInit").pagenum,
        pageData: levelOptions("pageInit").pagedata,
        total: 0,
        logModalVisible: false,
        itemId: ""
    }

    componentDidMount(){
        this.getOperationCostList();
    }
    getOperationCostList = (pageNumber, pageData)=>{
        const {getFieldsValue} = this.props.form;
        const values = getFieldsValue();
        pageNumber = pageNumber ? pageNumber : this.state.pageNumber;
        pageData = pageData? pageData : this.state.pageData;
        const params = {};
        params.data = { pageNumber, pageData, ...values.data};
        let skus = params.data.skus;
        if(skus){
            skus = skus.split('\n');
            params.data.skus = skus.filter(v => v);
        }
        fetchPost(GET_OPERATION_COST_LIST, params).then(res=>{
            if(res && res.state === "000001"){
                this.setState({
                    total: res.data.total
                });
                this.props.getOperationCostAction(res.data.list);
            }
        })
    }
    handleSubmit = (e)=>{
        typeof e === "object" && e.preventDefault ? e.preventDefault() : false;
        const pageNumber = levelOptions("pageInit").pagenum;
        const pageData = levelOptions("pageInit").pagedata;
        this.setState({
            pageNumber,
            pageData
        });
        this.getOperationCostList();
    }
    handleReset = ()=>{
        this.props.form.resetFields()
    }
    paginationHandle = (pageNumber, pageData)=>{
        this.setState({
            pageNumber,
            pageData
        });
        this.getOperationCostList(pageNumber, pageData);
    };

    render(){
        const {
            pageNumber,
            pageData,
            total,
            logModalVisible,
            itemId
        } = this.state;
        return (
            <Functions {...this.props} isPage={true} functionkey={'008-000005-000002-006'}>
                <div className={"dynamic-data-config_container"}>
                    <div className={"search_conditions"}>
                        <Search
                            {...this.props}
                            handleSubmit={this.handleSubmit}
                            handleReset={this.handleReset}
                        />
                    </div>
                    <div className={"table_list margin-ms-top"}>
                        <Tablist
                            {...this.props}
                            getOperationCostList = {this.getOperationCostList}
                            paginationHandle = {this.paginationHandle}
                            pageNumber = {pageNumber}
                            pageData = {pageData}
                            total={total}
                            showLogModal={(itemId) => {
                                this.setState({
                                    logModalVisible: true,
                                    itemId
                                })
                            }}
                        />
                        <LogModal
                            itemId={itemId}
                            visible={logModalVisible}
                            onCancel={() => this.setState({logModalVisible: false})}
                            logUrl = {GET_OPERATION_LOG}
                            logTypeId = {"operationId"}
                        />
                    </div>
                </div>
            </Functions>
        )
    }
}