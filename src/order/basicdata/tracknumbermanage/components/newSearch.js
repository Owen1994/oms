import React, { Component } from 'react';
import moment from 'moment';
import { Form, Radio, Input, Button, DatePicker, message,Select,Tooltip  } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
import Filter from "./filter/index"
import {
    TYPEJSON
} from '../constants/json';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staticData:{
                1:"targetCountry",
                2:"trackingNumber",
                3:"logisticsType",
                4:"sourceErpOrderId",
                5:"usedPlatformOrderId",
            },
            searchType: 1,        // 搜索类型
            isSearch: 2,        // 是否切换搜索
            isAdvanced:1,      // 是否高级搜索
            filterData:{},     // 过滤搜索条件
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
            this.props.form.resetFields(["createDate","onlineDate","useDate"])
            this.setState({isAdvanced:1})
        }
    }
    timerId = null
    filterChange = (v)=>{
        var obj = {}
        Object.keys(v).forEach(val=>{
            obj[val] = v[val].values
        })
        if(obj.bindState){
            obj.bindState=Number(obj.bindState)
        }
        this.setState({filterData:obj},()=>{
                window.clearTimeout(this.timerId)
                this.timerId =setTimeout(()=>{
                    this.getDataList()
                },1500)
        })
    }
    reset = ()=>{
        var fn = this.refs.filter.clearAllFn;
        fn &&  fn()
        this.props.form.resetFields()
        this.setState({filterData:{}})
    }
    getDataList = ()=>{
        var {tableDataActionAsync,npdProjecListData} = this.props
        var params1 = npdProjecListData.params
        var params2 = this.getParams()
        var params = {
            pageNumber:1,
            pageData:params1.pageData,
            ...params2,
        }
        this.props.changeSearchParams(params2);
        tableDataActionAsync(params)

    }
    getParams = ()=>{
        var params = {}
        var {filterData,staticData} = this.state;
        var {getFieldsValue} = this.props.form
        var data = getFieldsValue()
        data = {...data,...filterData}
        if(!data["createDate"] || data["createDate"].length !== 2){
            delete data["createDate"]
        }
        if(!data["onlineDate"] || data["onlineDate"].length !== 2){
            delete data["onlineDate"]
        }
        if(!data["useDate"] || data["useDate"].length !== 2){
            delete data["useDate"]
        }
        for(var k in data){
            if(data[k] !== undefined){
                params[k] = data[k]
            }
        }
        if(params.searchContent){
            params[staticData[params.searchType]] = params.searchContent.split(/\n/).map(v=>v.trim()).filter(v=>v).join(",")
            
        }
        delete params.searchType
        delete params.searchContent
        if(params.createDate){
            params.createStartDate = params.createDate[0].startOf('day').format("YYYY-MM-DD HH:mm:ss")
            params.createEndDate = params.createDate[1].endOf('day').format("YYYY-MM-DD HH:mm:ss")
            delete params["createDate"]
        }
        if(params.onlineDate){
            params.onlineStartDate = params.onlineDate[0].startOf('day').format("YYYY-MM-DD HH:mm:ss")
            params.onlineEndDate = params.onlineDate[1].endOf('day').format("YYYY-MM-DD HH:mm:ss")
            delete params["onlineDate"]
        }
        if(params.useDate){
            params.useStartDate = params.useDate[0].startOf('day').format("YYYY-MM-DD HH:mm:ss")
            params.useEndDate = params.useDate[1].endOf('day').format("YYYY-MM-DD HH:mm:ss")
            delete params["useDate"]
        }
        if(params.isUsed){
            params.isUsed = Number(params.isUsed) || 0
        }
        if(params.sourceType){
            params.sourceType = Number(params.sourceType) || 0
        }else {
            params.sourceType = 2
        }
        
        return params
    }
    render() {
        var {searchType,isSearch,isAdvanced} = this.state
        var {getFieldDecorator} = this.props.form
        var filters = (
            <div className="tracknumbermanage-list-filter padding-sm-bottom">
                <Filter ref="filter" showroom={false} data={TYPEJSON} onChange={this.filterChange}/>
            </div>
        )
        var searchTypeCom = (
            <div className="tracknumbermanage-list-searchtype">
                <div className="tweb-list-filter-item ">
                    <div className="tweb-list-filter-item-title top7">搜索类型：</div>
                    <FormItem>
                        {getFieldDecorator('searchType',{
                            initialValue:searchType
                        })(
                            <RadioGroup size="small">
                                <RadioButton value={1}>目的国</RadioButton>
                                <RadioButton value={2}>跟踪号</RadioButton>
                                <RadioButton value={3}>运输方式</RadioButton>
                                <RadioButton value={4}>老ERP订单号</RadioButton>
                                <RadioButton value={5}>平台订单号</RadioButton>
                            </RadioGroup>
                        )}
                    </FormItem>
                </div>
                <div className="margin-ss-top tweb-list-filter-item">
                    <div className="tweb-list-filter-item-title top7">搜索内容：</div>
                    <FormItem>
                        {getFieldDecorator('searchContent')(
                            <TextArea placeholder="支持多个同时搜索，多个换行" style={{ width: 344 }} autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </FormItem>
                </div>
            </div>
        )
        var date = (
            <div className="tracknumbermanage-advanced">
                <div className="tweb-list-filter-item margin-ss-bottom">
                    <div className="tweb-list-filter-item-title top7">创建时间：</div>
                    <FormItem>
                        {getFieldDecorator('createDate')(
                            <RangePicker style={{width:344}}/>
                        )}
                    </FormItem>
                </div>
                <div className="tweb-list-filter-item margin-ss-bottom">
                    <div className="tweb-list-filter-item-title top7">上网时间：</div>
                    <FormItem>
                        {getFieldDecorator('onlineDate')(
                            <RangePicker style={{width:344}}/>
                        )}
                    </FormItem>
                </div>
                <div className="tweb-list-filter-item">
                    <div className="tweb-list-filter-item-title top7">使用时间：</div>
                    <FormItem>
                        {getFieldDecorator('useDate')(
                            <RangePicker 
                                showTime={{
                                    hideDisabledOptions: true,
                                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                }}
                                format="YYYY-MM-DD HH:mm:ss"
                                style={{width:344}}
                            />
                        )}
                    </FormItem>
                </div>
            </div>
        )
        
        var buttons = (
            <div className="margin-ss-top list-filter-item tracknumbermanage-buttons">
                <Button className="margin-sm-right" onClick={this.getDataList} type="primary">搜索</Button>
                <Tooltip placement="bottom" title={"清空已选的搜索条件"}>
                    <Button onClick={this.reset} className="margin-sm-right">重置</Button>
                </Tooltip>
                <Button onClick={this.changeAdvanced} >{isAdvanced >1 ?"取消高级搜索" : "高级搜索"}</Button>
            </div>
        )
        return (
            <div className="search breadcrumb padding-sm overflow-hidden tracknumbermanage-list">
                {/*<div className="search-tab">*/}
                    {/*<RadioGroup*/}
                        {/*defaultValue={"select"}*/}
                        {/*onChange={this.onChangeSearch}*/}
                    {/*>*/}
                        {/*<RadioButton value="select">筛选</RadioButton>*/}
                        {/*<RadioButton value="search">搜索</RadioButton>*/}
                    {/*</RadioGroup>*/}
                {/*</div>*/}
                <Form layout="inline" onSubmit={this.onSubmit}>
                    {filters}
                    {isSearch>1?searchTypeCom:null}
                    {isSearch>1?isAdvanced > 1 ? date:null:null}
                    {isSearch>1?buttons:null}
                </Form>
            </div>
        );
    }
}

export default Form.create()(Search)