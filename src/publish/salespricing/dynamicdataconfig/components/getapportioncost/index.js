/**
 * 作者: pzt
 * 描述: 获取分摊费用
 * 时间: 2018/10/26 14:59
 **/
import React from 'react';
import Search from './search';
import Tablist from './tablist';
import {levelOptions} from "../../../../../util/options";
import {fetchPost} from "../../../../../util/fetch";
import {
    GET_APPORTION_COST_LIST,
    GET_APPORTION_LOG
} from '../../constants/Api';
import LogModal from '../logmodals';
import Functions from '../../../../../components/functions';

export default class ApportionCost extends React.Component{
    state={
        pageNumber: levelOptions("pageInit").pagenum,
        pageData: levelOptions("pageInit").pagedata,
        total: 0,
        logModalVisible: false,
        itemId: "",
    }
    componentDidMount(){
        this.getApportionCostList();
    }
    getApportionCostList = (pageNumber, pageData)=>{
        const {getFieldsValue} = this.props.form;
        const values = getFieldsValue();
        pageNumber = pageNumber ? pageNumber : this.state.pageNumber;
        pageData = pageData? pageData : this.state.pageData;
        const params = {};
        params.data = { pageNumber, pageData, ...values.data};
        fetchPost(GET_APPORTION_COST_LIST, params).then(res=>{
            if(res && res.state === "000001"){
                this.setState({
                    total: res.data.total,
                });
                this.props.getApportionCostAction(res.data.list);
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
        this.getApportionCostList();
    }
    handleReset = ()=>{
        this.props.form.resetFields()
    }
    paginationHandle = (pageNumber, pageData)=>{
        this.setState({
            pageNumber,
            pageData
        });
        this.getApportionCostList(pageNumber, pageData);
    }

    render(){
        const {
            pageNumber,
            pageData,
            total,
            itemId,
            logModalVisible
        } = this.state;
        return (
            <Functions {...this.props} isPage={true} functionkey={'008-000005-000002-001'}>
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
                            getApportionCostList = {this.getApportionCostList}
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
                            logUrl = {GET_APPORTION_LOG}
                            logTypeId = {"apportionId"}
                        />
                    </div>
                </div>
            </Functions>
        )
    }
}

