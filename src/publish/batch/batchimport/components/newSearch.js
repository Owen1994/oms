import React, { Component } from 'react';
import { Form, Radio, Input, Button, message,Select,Tooltip  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
import Filter from "../../../common/components/filter/index"
import {
    disposeType
} from '../constants/filterJson';
import {
    debounce
} from "../../../../util/baseTool"

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staticData:{
                1:"batchCode",
            },
            hasSite:false,     // 是否显示站点搜索
            searchType: 1,        // 搜索类型
            isSearch: 1,        // 是否切换搜索
            isAdvanced:1,      // 是否高级搜索
            filterData:{},     // 过滤搜索条件
        }
    }
    empty = ()=>{}
    testIsSearchSite = debounce((value)=>{
        var {changeSearchOptionAction} = this.props;
        var params = {
            modelName:"siteList",
            platformCode:value
        }
        return this.props.searchSite(params)
                .then(result=>{
                    if(result&&result.length){
                        changeSearchOptionAction({
                            site:result
                        })
                        this.siteOption.disabled = false ;
                        this.clearAccountsFn()
                    }else {
                        this.clearAccountsFn()
                        this.accountsOption.disabled = false ;
                        this.clearSiteFn()
                    }
                })
        
    },500)
    testIsSearchAccounts = debounce((value)=>{
        this.accountsOption.disabled = false ;
        this.props.changeSearchOptionAction({accounts:[]})
    },500)
    // 清除站点信息
    clearSiteFn = ()=>{
        this.siteOption.disabled = true
        this.props.form.setFieldsValue({siteCode:undefined})
        this.props.changeSearchOptionAction({site:[]})
    }
    // 清除账号信息
    clearAccountsFn = ()=>{
        this.accountsOption.disabled = true
        this.props.form.setFieldsValue({accounts:undefined})
        this.props.changeSearchOptionAction({accounts:[]})
    }
    platformOption = {
        v:"platform",
        n:"	平台",
        onChange:(value)=>{
            if(value){
                this.testIsSearchSite(value)
            }else {
                this.clearSiteFn()
                this.clearAccountsFn()
            }
        },
        onSelect:(value)=>{
            this.testIsSearchSite(value)
        },
        onFocus:()=>{
            var {searchOptionData} = this.props
            var { platform,site,accounts} = searchOptionData
            if(platform && platform.length) return ;
            this.platformOption.search()
        },
        search:debounce(v=>{
            let {changeSearchOptionAction,searchPlatform} = this.props
            var params = {
                modelName:"platformList",
                name:v
            }
            return searchPlatform(params)
                    .then(result=>{
                        if(result && result.length){
                            changeSearchOptionAction({
                                platform:result
                            })
                        }else {
                            changeSearchOptionAction({
                                platform:[]
                            })
                        }
                    })
        },500),
        getOption:(value)=>{
            return value.map((v,k)=>{
                return <Option value={v.code} key={v.code}>{v.name}</Option>
            })
        }
    }
    limitSelectedAccounts = {
        value:null,
        length:10,
        lock:true,
    }
    accountsOption = {
        v:"accounts",
        n:"销售账号",
        multiple:true,
        disabled:true,
        selectedMount:null,
        onChange:(value)=>{
            if(value && (value.length>this.limitSelectedAccounts.length)){
                let index = value.indexOf(this.limitSelectedAccounts.value)
                value.splice(index,1)
                return message.warning("销售账号最多可以选择10个")
            }
        },
        onSelect:(value)=>{
            this.limitSelectedAccounts.value = value
        },
        onFocus:()=>{
            
            var {searchOptionData} = this.props
            var { platform,site,accounts} = searchOptionData
            if(accounts && accounts.length) return ;
            this.accountsOption.search()
        },
        search:debounce((v)=>{
            let {searchAccount,changeSearchOptionAction} = this.props
            var platformCode =this.props.form.getFieldValue("platform")
            var siteCode =this.props.form.getFieldValue("site")
            if(!platformCode ) return ;
            var params = {
                modelName:"accountList",
                pageData:20,
                pageNumber:1,
                platformCode,
                account:v
            }
            if(siteCode){
                params.country = siteCode
            }
            return searchAccount(params)
                .then(result=>{
                    if(result && result.length){
                        changeSearchOptionAction({
                            accounts:result
                        })
                    }else {
                        changeSearchOptionAction({
                            accounts:[]
                        })
                    }
                })
        },500),
        getOption:(value)=>{
            return value.map((v,k)=>{
                return <Option value={v.account} key={v.account}>{v.account}</Option>
            })
        }
    }
    siteOption = {
        v:"site",
        n:"站点",
        disabled:true,
        onFocus:()=>{
            var {searchOptionData} = this.props
            var { platform,site,accounts} = searchOptionData
            if(site && site.length) return ;
            this.siteOption.search()
        },
        onChange:(value)=>{
            if(value){
                this.testIsSearchAccounts(value)
            }else {
                this.clearAccountsFn()
            }
        },
        onSelect:(value)=>{
            this.testIsSearchAccounts(value)
        },
        search:debounce((v)=>{
            let {searchSite,changeSearchOptionAction} = this.props
            var platformCode =this.props.form.getFieldValue("platform")
            if(!platformCode) return ;
            var params = {
                pageData:20,
                pageNumber:1,
                modelName:"siteList",
                platformCode:platformCode,
                name:v
            }
            return searchSite(params)
            .then(result=>{
                if(result && result.length){
                    changeSearchOptionAction({
                        site:result
                    })
                }else {
                    changeSearchOptionAction({
                        site:[]
                    })
                }
            })
        },500),
        getOption:(value)=>{
            return value.map((v,k)=>{
                return <Option value={v.code} key={v.code}>{v.code}</Option>
            })
        }
    }
    getOption =  ()=>{
        var {searchOptionData} = this.props
        var { platform,site,accounts} = searchOptionData
        platform && platform.length ? (this.platformOption.list = platform) :(this.platformOption.list = [])
        site && site.length ? (this.siteOption.list = site) :(this.siteOption.list = [])
        accounts && accounts.length ? (this.accountsOption.list = accounts) :(this.accountsOption.list = [])
        return [
            this.platformOption,
            this.siteOption,
            this.accountsOption
        ]
    }
    onChangeSearch = (e)=>{
        var v = e.target.value
        if(v === "search"){
            this.setState({isSearch:2})
        }else {
            this.props.form.resetFields()
            this.clearSiteFn()
            this.clearAccountsFn()
            this.setState({isSearch:1,isAdvanced:1})
        }
    }
    changeAdvanced = ()=>{
        var {isAdvanced} = this.state;
        if(isAdvanced == 1){
            this.setState({isAdvanced:2})
        }else {
            this.props.form.setFieldsValue({platformCode:undefined})
            this.clearSiteFn()
            this.clearAccountsFn()
            this.setState({isAdvanced:1})
        }
    }
    timerId = null
    filterChange = (v)=>{
        var obj = {}
        Object.keys(v).forEach(val=>{
            obj[val] = v[val].values
        })
        this.setState({filterData:obj},this.getDataList)
    }
    reset = ()=>{
        var fn = this.refs.filter.clearAllFn;
        fn &&  fn()
        this.props.form.resetFields()
        this.setState({filterData:{}})
        this.clearSiteFn()
        this.clearAccountsFn()
    }
    getDataList = ()=>{
        var {getListActionAsync,paramsData} = this.props
        var params1 = paramsData
        var params2 = this.getParams()
        var params = {
            pageNumber:1,
            pageData:params1.pageData,
            modelName:params1.modelName,
            ...params2,
        }
        getListActionAsync(params)
    }
    getParams = ()=>{
        var params = {}
        var {filterData} = this.state;
        var {getFieldsValue} = this.props.form
        var data = getFieldsValue()
        data = {...data,...filterData}
        for(var k in data){
            if(data[k] !== undefined){
                params[k] = data[k]
            }
        }
        if(!params.searchContent ||  !params.searchContent.trim()){
            delete params.searchType
            delete params.searchContent
        }else {
            params.searchContent = params.searchContent.split("\n").filter(v=>!!v).map(v=>v.trim())
        }
        if(params.accounts && !params.accounts.length){
            delete params.accounts
        }
        if(params.searchContent){
        }
        return params
    }
    render() {
        var {searchType,isSearch,isAdvanced} = this.state
        var {getFieldDecorator} = this.props.form
        var option = this.getOption();
        let {platformOption,siteOption,accountsOption} = this
        var filters = (
            <div className="publish-batch-list-filter padding-sm-bottom">
                <Filter ref="filter" showroom={false} data={disposeType} onChange={this.filterChange}/>
            </div>
        )
        var searchTypeCom = (
            <div className="publish-batch-list-searchtype search-bgc">
                <div className="tweb-list-filter-item ">
                    <div className="tweb-list-filter-item-title top7">搜索类型：</div>
                    <FormItem>
                        {getFieldDecorator('searchType',{
                            initialValue:searchType
                        })(
                            <RadioGroup size="small">
                                <RadioButton value={1}>文件名称</RadioButton>
                                <RadioButton value={2}>导入人员</RadioButton>
                            </RadioGroup>
                        )}
                    </FormItem>
                </div>
                <div className="margin-ss-top tweb-list-filter-item">
                    <div className="tweb-list-filter-item-title">搜索内容：</div>
                    <FormItem>
                        {getFieldDecorator('searchContent')(
                            <TextArea placeholder="请输入搜索条件" style={{ width: 344 }} autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </FormItem>
                </div>
            </div>
        )
        var date = (
            <div className="publish-batch-advanced margin-sm-top">
                {
                    option.map((value,k)=>{
                        let {n,v,getOption,search,disabled,placeholder,list,onSelect,onChange,multiple,onFocus} = value
                        return   (<div key={k} className="tweb-choice-select tweb-list-filter-item">
                            <div className="tweb-choice-select-n tweb-list-filter-item-title top7" >
                                {n}：
                            </div>
                            <FormItem>
                                {getFieldDecorator(v)(
                                    <Select 
                                    showSearch
                                    onFocus = {onFocus || this.empty} 
                                    onChange ={onChange || this.empty}
                                    disabled={!!disabled || false}
                                    onSelect={onSelect || this.empty}
                                    mode={multiple?"multiple":null}
                                    placeholder={placeholder||"请输入搜索条件"}
                                    defaultActiveFirstOption={false}
                                    showArrow = {false}
                                    filterOption = {false}
                                    allowClear
                                    onSearch={search || this.empty} 
                                    notFoundContent={null}
                                    className="tweb-choice-select-v">
                                        {getOption(list)}
                                    </Select>
                                )}
                            </FormItem>
                        </div>)
                    })
                }
            </div>
        )
        
        var buttons = (
            <div className="margin-ss-top publish-batch-buttons">
                <Button className="margin-sm-right" onClick={this.getDataList} type="primary">搜索</Button>
                <Tooltip placement="bottom" title={"清空已选的搜索条件"}>
                    <Button onClick={this.reset} className="margin-sm-right">重置</Button>
                </Tooltip>
                <Button onClick={this.changeAdvanced} >{isAdvanced >1 ?"取消高级搜索" : "高级搜索"}</Button>
            </div>
        )
        return (
            <div className="search breadcrumb padding-sm overflow-hidden publish-batch-list">
                <div className="search-tab">
                    <RadioGroup
                        defaultValue={"select"}
                        onChange={this.onChangeSearch}
                    >
                        <RadioButton value="select">筛选</RadioButton>
                        <RadioButton value="search">搜索</RadioButton>
                    </RadioGroup>
                </div>
                <Form layout="inline">
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