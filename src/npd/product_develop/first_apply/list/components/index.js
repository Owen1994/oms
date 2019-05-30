/**
 *作者: pzt
 *时间: 2018/6/7
 *描述: 报关单列表
 **/
import React, { Component } from 'react'
import {
    Form,
    message,
} from 'antd'
import Search from './newSearch'   // 高级搜索组件
import Tablelist from "./tablelist"
import Modal from "./modal"
import '../css/css.css'
import { EXPORT_FIRST_APPLY } from '../../../../constants/Api'
import { downlodFile } from '../../../../../util/fetch';
import {
    parseNetErrorToMsg,
    getLoginmsg,
} from "../../../../../util/baseTool"
import { post } from '../../../../../util/axios';

class App extends Component {

    state = {
        visible:false,
        status:["详情","提交","修改","删除","审核"],
        selectedRows:[],
        username: "",
    }
    rowSelection = {
        selectedRowKeys:[],
        selectedRows:[],
        onChange : (selectedRowKeys, selectedRows)=>{
            this.rowSelection.selectedRowKeys = selectedRowKeys
            this.rowSelection.selectedRows = selectedRows
            this.setState({
                selectedRowKeys,
                selectedRows
            })
        }
    }
    componentWillMount(){
        this.getData()
    }
    componentDidMount(){
        this.setState({username: getLoginmsg().userName});
    }
    getData = ()=>{
        var {tableDataActionAsync,npdListData} = this.props
        var params = npdListData.params
        tableDataActionAsync(params)
    }
    review = ()=>{
        var {reviewActionAsync} = this.props
        var {selectedRows} = this.rowSelection
        if(!selectedRows.length) return message.warning("请先选择")
        this.setState({
            visible:true
        })
    }
    clearSelected = ()=>{
        this.rowSelection.selectedRowKeys = []
        this.rowSelection.selectedRows = []
        this.setState({})
    }
    
    cancel = ()=>{
        this.setState({
            visible:false
        })
    }
    handleOk = (value)=>{
        var {reviewActionAsync} = this.props
        var {selectedRows} = this.rowSelection
        var bizId = selectedRows.map(v=>v.id)
        value.bizId = bizId
        value.formId = "firstOrderApplyProcess"
        reviewActionAsync(value)
        .then(result=>{
            this.cancel()
            if(result){
                message.success(result.msg)
                this.clearSelected()
                this.getData()
            }
        })
    }
    handleExportFirstApply = () => {
        var {selectedRows, username} = this.state
        if(!username){
            username = getLoginmsg().userName;
            this.setState({username});
        }
        if(selectedRows.length<1) {
            return message.warning('请选择导出项')
        }
        if(selectedRows.some(v => v.state !== 7001)){
            return message.warning('只允许导出状态为[已完成]的数据');
        }
        if(selectedRows.some(v => v.developer !== username)){
            return message.warning(`只允许导出开发员为${username}的数据`);
        }
        var ids = Array.from(new Set(selectedRows.map(v=>v.id))) 
        post(EXPORT_FIRST_APPLY, { ids }).then(data => {
            if (data.state === '000001') {
                downlodFile(data.data.path)
            } else {
                parseNetErrorToMsg(data)
            }
        })
    }
    render() {
        var {visible} = this.state
        var {projectInfo} = this.props
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
                        review ={this.review}  
                        rowSelection ={this.rowSelection}
                        clearSelected= {this.clearSelected}
                        customsListFetch={this.customsListFetch}
                        paginationHandle = {this.paginatiHandle}
                        handleExportFirstApply = {this.handleExportFirstApply}
                    /> 
                </div>
                <Modal 
                    projectInfo = {projectInfo}
                    cancel={this.cancel}
                    handleOk={this.handleOk}
                    visible={visible}>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(App)
