import React, { Component } from 'react';
import { Form, Radio, Input, Button } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
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
            filterData:{},     // 过滤搜索条件
        };
    }


    timerId = null;
    filterChange = (v)=>{
        var obj = {};
        Object.keys(v).forEach(val=>{
            obj[val] = v[val].values
        });
        if(obj.bindState){
            obj.bindState=Number(obj.bindState)
        }
        this.setState({filterData:obj},()=>{
                window.clearTimeout(this.timerId);
                this.timerId =setTimeout(()=>{
                    this.getDataList()
                },1000)
        })
    };

    reset = ()=>{
        var fn = this.refs.filter.clearAllFn;
        fn && fn();
        this.props.form.resetFields();
        this.setState({filterData:{}})
    };

    getDataList = ()=>{
        var {tableDataActionAsync,npdProjecListData} = this.props;
        var params1 = npdProjecListData.params;
        var params2 = this.getParams();
        var params = {
            pageNumber:1,
            pageData:params1.pageData,
            ...params2,
        };
        tableDataActionAsync(params)

    };

    getParams = ()=>{
        var params = {};
        var {filterData} = this.state;
        if(filterData.ruleState){
            filterData.ruleState = Number(filterData.ruleState)
        }
        var {getFieldsValue} = this.props.form;
        var data = getFieldsValue();
        data = {...data,...filterData};
        for(var k in data){
            if(data[k] !== undefined){
                params[k] = data[k]
            }
        }
        return params
    };

    render() {
        var { getFieldDecorator } = this.props.form;
        var filters = (
            <div className="markrules-list-filter padding-sm-bottom">
                <Filter ref="filter" showroom={false} data={TYPEJSON} onChange={this.filterChange}/>
            </div>
        );

        var searchTypeCom = (
            <div className="markrules-list-searchtype">
                <div className="tweb-list-filter-item ">
                    <div className="tweb-list-filter-item-title top7">规则名称：</div>
                    <FormItem>
                        {getFieldDecorator('ruleName')(
                            <Input style={{width:"344px"}}/>
                        )}
                    </FormItem>
                </div>
            </div>
        );

        var buttons = (
            <div className="margin-ss-top list-filter-item markrules-buttons">
                <Button className="margin-sm-right" onClick={this.getDataList} type="primary">搜索</Button>
                <Button onClick={this.reset}>重置</Button>
            </div>
        );

        return (
            <div className="search breadcrumb padding-sm overflow-hidden markrules-list">
                <Form layout="inline" onSubmit={this.onSubmit}>
                    {filters}
                    {searchTypeCom}
                    {buttons}
                </Form>
            </div>
        );
    }
}

export default Form.create()(Search)
