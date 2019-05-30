import React, { Component } from 'react';
import { Form, Radio, Input, Button, DatePicker, message,Select  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
import Choice from "../../../../common/components/choice/index"
import Filter from "../../common/component/filter/index"
import {
    TYPEJSON
} from '../constants/json';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staticData:{
                1:"deliverCode",
                2:"projectCode",
            },
            searchType: 1,        // 搜索类型
            isSearch: 1,        // 是否切换搜索
            isAdvanced:1,      // 是否高级搜索
            filterData:{},     // 过滤搜索条件
            option:[
                {
                    v:"projectflowCode",
                    n:"项目流名称",
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
    onChangeSearch = (e)=>{
        var v = e.target.value
        if(v === "search"){
            // window.clearTimeout(this.timerId)
            this.setState({isSearch:2})
        }else {
            this.props.form.resetFields()
            this.setState({isSearch:1,isAdvanced:1})
        }
    }
    changeAdvanced = ()=>{
        var {isAdvanced} = this.state;
        if(isAdvanced == 1){
            this.setState({isAdvanced:2})
        }else {
            this.props.form.resetFields(["time","projectflowCode","developer"])
            this.setState({isAdvanced:1})
        }
    }
    timerId = null
    filterChange = (v)=>{
        var obj = {}
        Object.keys(v).forEach(val=>{
            obj[val] = v[val].values
        })
        this.setState({filterData:obj},()=>{
            // if(this.state.isSearch === 1){
                window.clearTimeout(this.timerId)
                this.timerId =setTimeout(()=>{
                    console.log(111111)
                    this.getDataList()
                },1500)
            // }
        })
        
    }
    reset = ()=>{
        var fn = this.refs.filter.clearAllFn;
        fn &&  fn()
        this.props.form.resetFields()
        this.setState({filterData:{}})
    }
    getDataList = ()=>{
        var {tableDataActionAsync,npdProjecListData,clearSelected} = this.props
        clearSelected()
        var params1 = npdProjecListData.params
        var params2 = this.getParams()
        var params = {
            pageNumber:1,
            pageData:params1.pageData,
            ...params2,
        }
        tableDataActionAsync(params)

    }
    getParams = ()=>{
        var params = {}
        var {filterData,staticData} = this.state;
        var {getFieldsValue} = this.props.form
        var data = getFieldsValue()
        data = {...data,...filterData}
        for(var k in data){
            if(data[k] !== undefined){
                params[k] = data[k]
            }
        }
        if(params.searchContent){
            params[staticData[params.searchType]] = params.searchContent.trim()
            delete params.searchType
            delete params.searchContent
        }else {
            delete params.searchType
        }
        if(params.time){
            params.time = [params.time[0].startOf('day').valueOf(),params.time[1].endOf('day').valueOf()]
            
        }
        console.log(params)
        return params
    }
    render() {
        var {searchType,isSearch,option,isAdvanced} = this.state
        var {getFieldDecorator} = this.props.form
        var filters = (
            <div className="npd-handover-list-filter padding-sm-bottom">
                <Filter ref="filter" showroom={false} data={TYPEJSON} onChange={this.filterChange}/>
            </div>
        )
        var searchType = (
            <div className="npd-handover-list-searchtype">
                <div className="list-filter-item ">
                    <div className="list-filter-item-title">搜索类型：</div>
                    <FormItem>
                        {getFieldDecorator('searchType',{
                            initialValue:searchType
                        })(
                            <RadioGroup size="small">
                                <RadioButton value={1}>交接单号</RadioButton>
                                <RadioButton value={2}>立项单号</RadioButton>
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
            <div className="npd-handover-advanced">
                <Choice className="npd-handover-choice" option={option} {...this.props}></Choice>
                <div className="list-filter-item ">
                    <div className="list-filter-item-title">新增时间：</div>
                    <FormItem>
                        {getFieldDecorator('time')(
                            <RangePicker style={{width:344}} />
                        )}
                    </FormItem>
                </div>
            </div>
        )
        
        var buttons = (
            <div className="margin-ss-top list-filter-item npd-handover-buttons">
            <Button onClick={this.getDataList} className="margin-sm-right"  type="primary">搜索</Button>
                <Button onClick={this.reset} className="margin-sm-right">重置</Button>
                <Button onClick={this.changeAdvanced} >{isAdvanced >1 ?"取消高级搜索" : "高级搜索"}</Button>
                
            </div>
        )
        return (
            <div className="search breadcrumb padding-sm overflow-hidden npd-handover-list">
                <div className="search-tab">
                    <RadioGroup
                        defaultValue={"select"}
                        onChange={this.onChangeSearch}
                    >
                        <RadioButton value="select">筛选</RadioButton>
                        <RadioButton value="search">搜索</RadioButton>
                    </RadioGroup>
                </div>
                <Form layout="inline" onSubmit={this.onSubmit}>
                    {filters}
                    {isSearch>1?searchType:null}
                    {isSearch>1?isAdvanced > 1 ? date:null:null}
                    {isSearch>1?buttons:null}
                </Form>
            </div>
        );
    }
}

export default Form.create()(Search)