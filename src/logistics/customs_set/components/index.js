import React, { Component } from 'react'

import {
    Tabs,
    Row,
    Col,
    DatePicker,
    Form,
} from 'antd'
const TabPane = Tabs.TabPane
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item

import Search from './newSearch'   // 高级搜索组件
import '../css/css.css'
import {searchJson} from "../constants/search"
import {levelOptions} from "../../../util/options"
import SkuTableList from "./tablelist"
import RateTableList from "./exchangeRate"
import {filterParams} from "../../../util/baseTool";
import {getSkuRateList} from "../actions";

class App extends Component {

    state = {
        filterData: [],
        pageNumber: 1,
        pageSize: 20,
    }

    componentDidMount(){
        const params = {};
        params["pageData"] = levelOptions("pageInit").pagedata;
        params["pageNumber"] = levelOptions("pageInit").pagenum;
        this.props.getSkuRateList(params);
        this.props.getRateList(params);
    }

    rangeConfig = {
        rules: [{type: 'array', required: false,  message: '请选择'}],
    }
    formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 18}
    }
    /**
     *作者: pzt
     *时间: 2018/6/12
     *描述: tab切换回调函数
     *@param: <key> number 索引
     **/
    callback = (key) => {
        console.log(key);
    }

    /**
     *作者: pzt
     *时间: 2018/6/8
     *描述: getSerachData 获取普通搜索及高级搜索的字段内容
     *@param: <values> object 搜索内容
     **/
    getSerachData = (values, objs, aa)=>{
        console.log(values);
        const newobj={};
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let i in values) {
                    if (values[i]) {
                        if (i == 'createTime') {
                            const arr = values[i].map(v => v.valueOf())
                            newobj['createTimeStart'] = arr[0] ? arr[0] : ''
                            newobj['createTimeEnd'] = arr[1] ? arr[1] : ''
                        } else{
                            newobj[i] = values[i]
                        }
                    }
                }
            }
        })
        return newobj;
    }
    cancelSearch = () => this.props.form.resetFields()
    // 请求列表
    customSetListFetch = (pageNumber, pageSize) => {
        pageNumber = pageNumber ? pageNumber : 1;
        pageSize = pageSize ? pageSize : 20;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let  params = filterParams(values);
                params["pageNumber"] = pageNumber;
                params["pageData"] = pageSize;
                const filters = { ...this.state.params, ...params}
                this.setState({
                    params: filters
                })
                this.props.getSkuRateList(params);
            }
        });
    }
    handleReset = () => {
        this.props.form.resetFields();
    }
    render() {
        const {params} = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="lgt-customs_set_tablelist">
                    <div className="tweb-tabs">
                        <Tabs onChange={this.callback} type="card">
                            <TabPane tab="sku税率设置" key="1">
                                <div className="lgt-customs_set_container">
                                    <Search
                                        {...this.props}
                                        customSetListFetch={this.customSetListFetch}
                                        resetFields={this.handleReset}
                                        tagSelectParams = {params}
                                    />
                                </div>
                                <div className="lgt-customs_set_container margin-ms-top">
                                    <SkuTableList
                                        {...this.props}
                                        customSetListFetch = {this.customSetListFetch}
                                    />
                                </div>
                            </TabPane>
                            <TabPane tab="汇率设置" key="2">
                                <div className="lgt-customs_set_container">
                                    <RateTableList {...this.props} />
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}
export default Form.create()(App)