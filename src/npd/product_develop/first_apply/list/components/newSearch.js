import React, { Component } from 'react';
import { Form, Radio, Input, Button, DatePicker, message,Select,Tooltip  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { RangePicker } = DatePicker;


import Choice from "../../../../common/components/choice/index"
import {
    SearchTypeParams
} from '../constants/json';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTypeList:{
                1:"firstOrderNo",
                2:"deliverCode",
                3:"projectCode",
                4:"spu",
                5:"sku",
            },
            searchType: 1,        // 搜索类型
            isSearch: 1,        // 是否切换搜索
            // 配置
            option:[
                {
                    v:"supplierCode",
                    n:"供应商名称",
                    placeholder:"请输入供应商名称",
                    search:(v)=>{
                        var params = {
                            pageData:20,
                            pageNumber:1,
                            vendorsName:v
                        }
                        return this.props.searchSupplierCode(params)
                        .then(result=>{
                            if(result&&result.length){
                                return result.map((item,k)=>{
                                    return <Option value={item.vendorsCode} key={k}>{item.vendorsName}</Option>
                                })
                            }
                            return []
                        })
                    }
                },
                {
                    v:"projectflowCode",
                    n:"项目流名称",
                    placeholder:"请输入项目流名称",
                    search:(v)=>{
                        var params = {
                            pageData:20,
                            pageNumber:1,
                            projectName	:v
                        }
                        return this.props.searchProjectFlow(params)
                        .then(result=>{
                            if(result&&result.length){
                                return result.map((item,k)=>{
                                    return <Option value={item.code} key={k}>{item.name}</Option>
                                })
                            }
                            return []
                        })
                    }
                },
                {
                    v:"developer",
                    n:"开发员",
                    placeholder:"请输入开发员名称",
                    search:(v)=>{
                        var params = {
                            pageData:20,
                            pageNumber:1,
                            name:v
                        }
                        return this.props.searchUserList(params)
                        .then(result=>{
                            if(result&&result.length){
                                return result.map((item,k)=>{
                                    return <Option value={item.userName} key={k}>{item.name + "(" + item.userName + ")"}</Option>
                                })
                            }
                            return []
                        })
                    }
                },
            ],
        };
    }
    
    // 搜索类型
    onChangeSearchType = (e)=>{
        var params = e.target.value
        if(params === this.state.searchType) return
        this.clearSearchType()
        this.setState({
            searchType:params
        })
    }
    clearSearchType = ()=>{
        var {setFieldsValue} = this.props.form
        setFieldsValue({searchContent:""})
    }
    changeSearch = ()=>{
        var {isSearch} = this.state ;
        if(isSearch == 1) {
            this.setState({
                isSearch:2
            })
        }else {
            this.setState({
                isSearch:1
            })
        }
    }
    clearAll = ()=>{
        var {setFieldsValue} = this.props.form; 
        setFieldsValue({
            createTime:null,
            developer:undefined,
            searchContent:"",
            searchType:1,
            supplierCode:undefined,
            projectflowCode:undefined,
        })
    }
    getData = ()=>{
        var {tableDataActionAsync,npdListData,clearSelected} = this.props
        clearSelected()
        var params1 = npdListData.params
        var params2 = this.getParams()
        var params = {
            pageNumber:1,
            pageData:params1.pageData,
            ...params2,
        }
        tableDataActionAsync(params)
    }
    getParams= (data)=>{
        var {getFieldsValue} = this.props.form; 
        var {searchTypeList} = this.state
        var obj = getFieldsValue()
        var params = {}
        for(var k in obj){
            if(obj[k]){
                if(k === "createTime" ){
                    if(obj[k].length){
                        params[k] =  [obj[k][0].startOf('day').valueOf(),obj[k][1].endOf('day').valueOf()]
                    }
                }else {
                    params[k] = obj[k]
                }
            }
        }
        if(params.searchContent){
            params[searchTypeList[params.searchType]] = params.searchContent.trim()
            delete params.searchContent
            delete params.searchType
        }
        return params
    }
    render() {
        var {searchType,isSearch,option} = this.state
        var {getFieldDecorator} = this.props.form
        var searchTypeCom = (
            <div className="npd-fapply-list-searchtype" style={{padding:"10px 0"}}>
                <div className="list-filter-item ">
                    <div className="list-filter-item-title">搜索类型：</div>
                    <FormItem>
                        {getFieldDecorator('searchType',{
                            initialValue:searchType
                        })(
                            <RadioGroup size="small" onChange={this.onChangeSearchType}>
                                <RadioButton value={1}>首单申请号</RadioButton>
                                <RadioButton value={2}>交接单号</RadioButton>
                                <RadioButton value={3}>立项单号</RadioButton>
                                <RadioButton value={4}>spu</RadioButton>
                                <RadioButton value={5}>sku</RadioButton>
                            </RadioGroup>
                        )}
                    </FormItem>
                </div>
                <div className="margin-ss-top list-filter-item">
                    <div className="list-filter-item-title">搜索内容：</div>
                    <FormItem>
                        {getFieldDecorator('searchContent')(
                            <TextArea placeholder="请输入搜索条件" style={{ width: 344 }} autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </FormItem>
                </div>
            </div>
        )
        var date = (
            <div className="npd-fapply-advanced">
                <Choice className="npd-fapply-choice" option={option} {...this.props}></Choice>
                <div className="list-filter-item">
                    <div className="list-filter-item-title">提交时间：</div>
                    <FormItem>
                        {getFieldDecorator('createTime', this.rangeConfig)(
                            <RangePicker style={{width:344}}/>
                        )}
                    </FormItem>
                </div>
            </div>

        )
        
        var buttons = (
            <div className="margin-ss-top list-filter-item npd-first-apply-buttons">
                <Button className="margin-sm-right" onClick={this.getData} type="primary">搜索</Button>
                <Tooltip placement="bottom" title={"清空已选的搜索条件"}>
                    <Button onClick={this.clearAll} className="margin-sm-right">重置</Button>
                </Tooltip>
                <Button onClick={this.changeSearch} >{isSearch==1?"高级搜索":"取消高级搜索"}</Button>
            </div>
        )
        return (
            <div className="search breadcrumb padding-sm overflow-hidden npd-fapply-list">
                <Form layout="inline" onSubmit={this.onSubmit}>
                    {searchTypeCom}
                    {   isSearch == 1 ?
                        null
                        :date
                    }
                    {buttons}
                </Form>
            </div>
        );
    }
}

export default Search;