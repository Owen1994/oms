import React, { Component } from 'react';
import { Form, Radio, Input, Button, message,Select,Tooltip  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
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
    // 清除账号信息
    clearAccountsFn = ()=>{
        this.props.form.setFieldsValue({accounts:undefined})
        this.props.changeSearchOptionAction({accounts:[]})
    }
    // platformOption = {
    //     v:"platformCode",
    //     n:"	物流渠道",
    //     onFocus:()=>{
            // var {searchOptionData} = this.props
            // var { platform,site,accounts} = searchOptionData
            // if(platform && platform.length) return ;
            // this.platformOption.search()
        // },
        // search:debounce(v=>{
            // let {changeSearchOptionAction,searchPlatform} = this.props
            // var params = {
            //     modelName:"platformList",
            //     name:v
            // }
            // return searchPlatform(params)
            //         .then(result=>{
            //             if(result && result.length){
            //                 changeSearchOptionAction({
            //                     platform:result
            //                 })
            //             }else {
            //                 changeSearchOptionAction({
            //                     platform:[]
            //                 })
            //             }
            //         })
    //     },500),
    //     getOption:(value)=>{
    //         return value.map((v,k)=>{
    //             return <Option value={v.code} key={v.code}>{v.name}</Option>
    //         })
    //     }
    // }
    limitSelectedAccounts = {
        value:null,
        length:10,
    }
    accountsOption = {
        v:"accounts",
        n:"销售账号",
        multiple:true,
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
            var { accounts} = searchOptionData
            if(accounts && accounts.length) return ;
            this.accountsOption.search()
        },
        search:debounce((v)=>{
            let {searchAccount,changeSearchOptionAction} = this.props
            var siteCode =this.props.form.getFieldValue("siteCode")
            var params = {
                modelName:"accountList",
                pageData:20,
                pageNumber:1,
                platformCode:"SHOPEE",
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
        // onSelect:(value)=>{
        //     this.clearAccountsFn()
        // },
        search:debounce((v)=>{
            let {searchSite,changeSearchOptionAction} = this.props;
            var params = {
                pageData:20,
                pageNumber:1,
                modelName:"siteList",
                platformCode:"SHOPEE",
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
        // platform && platform.length ? (this.platformOption.list = platform) :(this.platformOption.list = [])
        site && site.length ? (this.siteOption.list = site) :(this.siteOption.list = [])
        accounts && accounts.length ? (this.accountsOption.list = accounts) :(this.accountsOption.list = [])
        return [
            // this.platformOption,
            this.siteOption,
            this.accountsOption
        ]
    }
    reset = ()=>{
        this.props.form.resetFields()
    }
    getDataList = ()=>{
        var {getListActionAsync,paramsData} = this.props
        var params1 = paramsData
        var params2 = this.getParams()
        var params = {
            modelName:params1.modelName,
            platformCode:params1.platformCode,
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
        if(!params.searchContent){
            delete params.searchType
        }
        return params
    }
    render() {
        var {getFieldDecorator} = this.props.form
        var option = this.getOption();
        var date = (
            <div className="publish-batch-advanced">
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
            <div className="margin-ss-top tweb-list-filter-item publish-batch-buttons">
                <Button className="margin-sm-right" onClick={this.getDataList} type="primary">搜索</Button>
                <Button onClick={this.reset}>重置</Button>
            </div>
        )
        return (
            <div className="search breadcrumb padding-sm overflow-hidden publish-batch-list">
                <Form layout="inline">
                    {date}
                    {buttons}
                </Form>
            </div>
        );
    }
}

export default Form.create()(Search)