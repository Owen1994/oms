/**
 * 作者: pzt
 * 描述: 获取头程费用
 * 时间: 2018/10/26 14:59
 **/
import React from 'react';
import Search from './search';
import Tablist from './tablist';
import { levelOptions } from "../../../../../util/options";
import { fetchPost } from "../../../../../util/fetch";
import {
    GET_OPERATION_LOG,
    GET_TRANSPORT_COST_LIST,
    GET_TRANSPORT_LOG,
} from "../../constants/Api";
import LogModal from '../logmodals';
import Functions from '../../../../../components/functions';

export default class ApportionCost extends React.Component{
    state = {
        pageNumber: levelOptions("pageInit").pagenum,
        pageData: levelOptions("pageInit").pagedata,
        total: 0,
        logModalVisible: false,
        itemId: ""
    }
    componentDidMount(){
        this.getTransportCostList();
    }
    getTransportCostList = (pageNumber, pageData)=>{
        const {getFieldsValue} = this.props.form;
        const values = getFieldsValue();
        pageNumber = pageNumber ? pageNumber : this.state.pageNumber;
        pageData = pageData ? pageData : this.state.pageData;
        const params = {};
        params.data = { pageNumber, pageData, ...values.data};
        fetchPost(GET_TRANSPORT_COST_LIST, params).then(res=>{
            if(res && res.state === "000001"){
                this.setState({
                    total: res.data.total
                });
                this.props.getTransportCostAction(res.data.list);
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
        this.getTransportCostList(pageNumber, pageData);
    }
    handleReset = ()=>{
        this.props.form.resetFields()
    }
    paginationHandle = (pageNumber, pageData)=>{
        this.setState({
            pageNumber,
            pageData
        });
        this.getTransportCostList(pageNumber, pageData);
    }

    render(){
        const {
            pageNumber,
            pageData,
            total,
            logModalVisible,
            itemId
        } = this.state;
        return (
            <Functions {...this.props} isPage={true} functionkey={'008-000005-000002-016'}>
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
                            getTransportCostList = {this.getTransportCostList}
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
                            logUrl = {GET_TRANSPORT_LOG}
                            logTypeId = {"transportId"}
                        />
                    </div>
                </div>
            </Functions>
        )
    }
}