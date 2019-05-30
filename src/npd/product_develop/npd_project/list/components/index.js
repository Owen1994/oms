import React, { Component } from 'react'
import {
    Modal,
    message
} from 'antd'
import Search from './newSearch'   // 高级搜索组件
import Tablelist from "./tablelist"
import Batchmodal from "./modal"
import Solemodal from "./solemodal"
import '../css/css.css'

class App extends Component {

    state = {
        visible:0,
        solevisible:0,
        soleData:null,
    }
    
    
    rowSelection = {
        columnWidth:30,
        selectedRowKeys:[],
        selectedRows:[],
        onChange : (selectedRowKeys, selectedRows)=>{
            this.rowSelection.selectedRowKeys = selectedRowKeys
            this.rowSelection.selectedRows = selectedRows
            this.setState({})
        }
    }
    componentWillMount(){
        this.getListData()
    }
    // 获取列表数据
    getListData = ()=>{
        var {tableDataActionAsync,npdProjecListData} = this.props
        var params = npdProjecListData.params
        tableDataActionAsync(params)
    }
    // 清除 selectedRowKeys
    clearSelected = ()=>{
        this.rowSelection.selectedRowKeys = []
        this.rowSelection.selectedRows = []
        this.setState({})
    }

    // 移除弹出框
    cancel = ()=>{
        this.setState({
            visible:0 
        })
    }
    // 核实 批量提交
    checkSubmit = (arr)=>{
        var i =0,l = arr.length;
        for(;i<l;i++ ){
            if(arr[i] > 1 && arr[i] < 6){
                return false
            }
        }
        return true
    }
    // 核实 批量生成交接单
    checkDelivery = (arr,bindState)=>{
        var i =0,l = arr.length,len = bindState.length;
        for(;i<l;i++ ){
            if(arr[i] !== 6){
                return false
            }
        }
        for(i = 0 ;i<len;i++ ){
            if(bindState[i] !== 3){
                return false
            }
        }
        return true
    }
    // 核实 批量审核
    checkReview = (arr)=>{
        if(arr.length == 1) return true
        var i =1,l = arr.length,flag = arr[0]
        // 1 为 未提交  走提交 6 及以上 为驳回状态
        if(flag == 1 || flag >=6) return false
        for(;i<l;i++ ){
            if(flag != arr[i]){
                return false
            }
        }
        return true
    }
    // 对话框 确认事件
    handleOk = (value)=>{
        var {visible} =this.state
        var {selectedRows} =this.rowSelection
        var id = selectedRows.map(v=>v.id)
        if(!value){
            if(visible == 1){
                value = {
                    comment:"",
                    bizId:id,
                    auditResult:1,
                    formId:"NpsApprovalProduct",
                }
            }else {
                value = {
                    list:id
                }
            }
        }else {
            value.bizId = id
            value.formId ="NpsApprovalProduct"
        }
        this.finallyHandle(value)
        .then(result =>{
            this.cancel()
            if(result){
                message.success(result.msg)
                this.getListData()
            }
        })
    }
    // 最终 确认事件回调
    finallyHandle = (value)=>{
        var {visible} =this.state
        var {reviewActionAsync,generateDeliverysAsync} = this.props
        if(visible == 1 || visible == 3) return reviewActionAsync(value)
        return generateDeliverysAsync(value)
    }
    // 显示对话框
    showModal = (v)=>{
        var {selectedRows} = this.rowSelection
        if(!selectedRows.length) return message.warning("请先选择项");
        var states = selectedRows.map(v=>v.state)
        var bindState = selectedRows.map(v=>v.bindState)
        // if( (v === 1 && this.checkSubmit(states)) ||
        //     (v === 2 && this.checkDelivery(states,bindState)) ||
        //     (v === 3 && this.checkReview(states)) ){
                this.setState({
                    visible:v
                })
        // }else {
        //     message.warning("请检查所选项")
        // }
    }
    
    showSoleModal = (v)=>{
        this.setState({
        })
    }
    solecancel = ()=>{
        this.setState({
            solevisible:0 ,
            soleData:null
        })
    }
    solehandleOk = (value)=>{
        var {reviewActionAsync,delActionAsync} = this.props;
        var {solevisible,soleData} = this.state;
        if(solevisible == 1){
            reviewActionAsync({
                comment:"",
                formId:"NpsApprovalProduct",
                bizId:[soleData.id],
                auditResult:1
            })
            .then(result=>{
                if(result){
                    message.success(result.msg)
                    this.getListData()
                    this.solecancel()
                }
            })
        }else if(solevisible == 2){
            delActionAsync({
                id:soleData.id
            })
            .then(result=>{
                if(result){
                    message.success(result.msg)
                    this.getListData()
                    this.solecancel()
                }
            })
        }
    }
    changeSoleData = (type,data)=>{
        this.setState({
            soleData:data,
            solevisible:type
        })
    }
    render() {
        var {visible,solevisible,soleData} = this.state
        return (
            <div>
                <div className="">
                    <Search
                        {...this.props}
                        clearSelected= {this.clearSelected}
                    />
                </div>
                <div className="margin-sm-top">
                    <Tablelist
                    {...this.props}
                    showModal= {this.showModal}
                    clearSelected= {this.clearSelected}
                    rowSelection ={this.rowSelection}
                    changeSoleData ={this.changeSoleData}
                    /> 
                </div>
                <Batchmodal 
                {...this.props}
                cancel={this.cancel}
                handleOk={this.handleOk}
                visible={visible}></Batchmodal>
                
                <Solemodal 
                {...this.props}
                cancel={this.solecancel}
                handleOk={this.solehandleOk}
                visible={solevisible}></Solemodal>
            </div>
        )
    }
}

export default App



