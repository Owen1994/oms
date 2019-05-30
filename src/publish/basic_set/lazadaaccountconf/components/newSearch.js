import React, { Component } from 'react';
import { Form, Button, message,Select  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import {
    debounce
} from "../../../../util/baseTool"

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterData:{},     // 过滤搜索条件
            platform:[
                {code:"LAZADA",name:"Lazada"},
                {code:"AMAZON",name:"Amazon"},
                {code: "SHOPEE", name: "Shopee"},
                {code: "EBAY", name: "eBay"},
            ],
        }
    }
    empty = ()=>{}
    // 清除站点信息
    clearSiteFn = ()=>{
        this.props.form.setFieldsValue({siteCode:undefined})
        this.props.changeSearchOptionAction({site:[]})
    }
    // 清除账号信息
    clearAccountsFn = ()=>{
        this.props.form.setFieldsValue({account:undefined})
        this.props.changeSearchOptionAction({accounts:[]})
    }
    limitSelectedAccounts = {
        value:null,
        length:10,
    }
    
    onPlatformSelect = ()=>{
        this.clearSiteFn()
        this.clearAccountsFn()
        this.siteOption.search()
    }

    accountsOption = {
        v:"account",
        n:"销售账号",
        selectedMount:null,
        onFocus:()=>{
            var {searchOptionData} = this.props
            var { accounts} = searchOptionData
            // if(accounts && accounts.length) return ;
            this.accountsOption.search()
        },
        search:debounce((v)=>{
            let {searchAccount,changeSearchOptionAction} = this.props
            var siteCode =this.props.form.getFieldValue("siteCode")
            var platformCode =this.props.form.getFieldValue("platformCode")
            if(!platformCode) return ;
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
        v:"siteCode",
        n:"站点",
        onFocus:()=>{
            var {searchOptionData} = this.props
            var { site} = searchOptionData
            if(site && site.length) return ;
            this.siteOption.search()
        },
        onChange:(value)=>{
            this.clearAccountsFn()
        },
        search:debounce((v)=>{
            let {searchSite,changeSearchOptionAction} = this.props;
            var platformCode =this.props.form.getFieldValue("platformCode")
            var params = {
                pageData:20,
                pageNumber:1,
                modelName:"siteList",
                platformCode,
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
        site && site.length ? (this.siteOption.list = site) :(this.siteOption.list = [])
        accounts && accounts.length ? (this.accountsOption.list = accounts) :(this.accountsOption.list = [])
        return [
            this.siteOption,
            this.accountsOption
        ]
    }
    reset = ()=>{
        this.props.form.resetFields()
    }
    getDataList = ()=>{
        var {getListActionAsync,paramsData} = this.props
        // var params1 = paramsData
        var params2 = this.getParams()
        var params = {
            pageData:20,
            pageNumber:1,
            modelName:paramsData.modelName,
            ...params2,
        }
        getListActionAsync(params)
    }
    getParams = ()=>{
        var params = {}
        var {getFieldsValue} = this.props.form
        var data = getFieldsValue()
        for(var k in data){
            if(data[k] !== undefined){
                params[k] = data[k]
            }
        }
        return params
    }
    render() {
        var {getFieldDecorator} = this.props.form
        var option = this.getOption();
        var date = (
            <div className="lazadaaccountconf-advanced">
                <div className="tweb-choice-select tweb-list-filter-item">
                    <div className="tweb-choice-select-n tweb-list-filter-item-title top7" >
                        <span>平台</span>：
                    </div>
                    <FormItem>
                        {getFieldDecorator("platformCode",{
                            initialValue:undefined
                        })(
                            <Select 
                            style={{width:"344px"}}
                            onChange={this.onPlatformSelect}
                            defaultActiveFirstOption={false}
                            // showArrow = {false}
                            filterOption = {false}
                            placeholder={"请输入搜索条件"}
                            allowClear
                            notFoundContent={null}
                            className="tweb-choice-select-v">
                                {this.state.platform.map((v,k)=>{
                                    return (<Option value={v.code} key={v.code}>{v.name}</Option>)
                                })}
                            </Select>
                        )}
                    </FormItem>
                </div>
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
                                    style={{width:344}}
                                    onFocus = {onFocus || this.empty} 
                                    onChange ={onChange || this.empty}
                                    disabled={!!disabled || false}
                                    onSelect={onSelect || this.empty}
                                    mode={multiple?"multiple":null}
                                    placeholder={placeholder||"请输入搜索条件"}
                                    defaultActiveFirstOption={false}
                                    // showArrow = {false}
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
            <div className="margin-ss-top tweb-list-filter-item lazadaaccountconf-buttons">
                <Button className="margin-sm-right" onClick={this.getDataList} type="primary">搜索</Button>
                <Button onClick={this.reset}>重置</Button>
            </div>
        )
        return (
            <div className="search breadcrumb padding-sm overflow-hidden lazadaaccountconf-list">
                <Form layout="inline">
                    {date}
                    {buttons}
                </Form>
            </div>
        );
    }
}

export default Form.create()(Search)