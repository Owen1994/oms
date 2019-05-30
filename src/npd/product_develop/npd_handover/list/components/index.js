/**
 *作者: pzt
 *时间: 2018/6/7
 *描述: 报关单列表
 **/
import React, { Component } from 'react'
import {
    Form,
    Row,
    Col,
    message,
    DatePicker,
} from 'antd'
import Search from './newSearch'   // 高级搜索组件
import Tablelist from "./tablelist"
import Modal from "./modal"
import '../css/css.css'
import {levelOptions} from "../../../../../util/options"
import {filterParams} from "../../../../../util/baseTool"


class App extends Component {

    state = {
        visible:0
    }
    
    rowSelection = {
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
    getListData = ()=>{
        
        var {tableDataActionAsync,npdProjecListData} = this.props
        var params = npdProjecListData.params
        tableDataActionAsync(params)
    }
    clearSelected = ()=>{
        this.rowSelection.selectedRowKeys = []
        this.rowSelection.selectedRows = []
        this.setState({})
    }
    
    reviewHandle = (params)=>{
        var {comReviewActionAsync} = this.props
        return comReviewActionAsync(params)
    }
    // 移除弹出框
    cancel = ()=>{
        this.setState({
            visible:0 
        })
    }
    // 显示对话框显示对话框
    showModal = (v)=>{
        var {selectedRows} = this.rowSelection
        if(!selectedRows.length){
            return message.warning("请先选择项");
        } 
        //chenwenchun 2018-8-20修改批量审核待提交数据bug
        if(v===2){
            let states = selectedRows.every( v => v.state==="301"||v.state==="401"||v.state==="701");
            if(!states){
                return message.warning("只能批量审核交接状态为待审核的数据");
            }
        }
        
        // var states = selectedRows.map(v=>v.state)
        // var bindState = selectedRows.map(v=>v.bindState)
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

    // 对话框 确认事件
    handleOk = (value)=>{
        var {visible} =this.state
        var {selectedRows} =this.rowSelection
        var id = selectedRows.map(v=>v.id)
        if(visible == 1){
            value = {
                comment:"",
                bizId:id,
                auditResult:1,
                formId:"NpsProductDelivery",
            }
        }else {
            value.bizId = id
            value.formId ="NpsProductDelivery"
        }
        this.reviewHandle(value)
        .then(result =>{
            this.cancel()
            if(result){
                this.clearSelected()
                message.success(result.msg)
                this.getListData()
            }
        })
    }
  render() {
      
    var {visible} = this.state
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
                clearSelected= {this.clearSelected}
                rowSelection ={this.rowSelection}
                showModal = {this.showModal}
                /> 
            </div>
            
            <Modal 
            {...this.props}
            cancel={this.cancel}
            handleOk={this.handleOk}
            visible={visible}></Modal>
        </div>
    )
  }
}

export default App
