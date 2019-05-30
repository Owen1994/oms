/**
 *作者: pzt
 *功能描述:  操作日志
 *时间: 2018/6/13 10:55
 */
import React, { Component } from 'react'

import {
    Row,
    Col,
    DatePicker,
    Form,
} from 'antd'
import Search from './newSearch'   // 高级搜索组件
import TableList from './tablelist'   // 表格组件
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
import '../css/css.css'
import {filterParams} from "../../../util/baseTool";

class App extends Component {

    state = {
        params: {
            optionType: [0],
        },
        filterData: [],
        pageNumber: 1,
        pageSize: 20,
    }

    componentDidMount(){}

    rangeConfig = {
        rules: [{type: 'array', required: false,  message: '请选择'}],
    }
    formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 18}
    }
    /**
     *作者: pzt
     *时间: 2018/6/8
     *描述: getFilterData 获取筛选条件的值
     *@param: <values> object 筛选结果
     **/
    getFilterData = (values, objs, aa)=>{
        this.setState({
            filterData: [...values]
        });
    }
    /**
     *作者: pzt
     *时间: 2018/6/8
     *描述: getSerachData 获取普通搜索及高级搜索的字段内容
     *@param: <values> object 搜索内容
     **/
    getSerachData = (values, objs, aa)=>{
        const newObj = {};
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let i in values) {
                    if (values[i]) {
                        if (i == 'createTime') {
                            const arr = values[i].map(v => v.valueOf())
                            newObj['createTimeStart'] = arr[0] ? arr[0] : ''
                            newObj['createTimeEnd'] = arr[1] ? arr[1] : ''
                        } else{
                            newObj[i] = values[i]
                        }
                    }
                }
            }
        })
        if (this.state.filterData !== null){
            let obj = this.state.filterData;
            if (JSON.stringify(obj[0]) === "{}"){
                newObj["optionType"] = [0];
            }else{
                newObj["optionType"] = obj[0].optionType.values;
            }
        }else{
            newObj["optionType"] = [0];   // 筛选项默认选中全部 type为0， 具体值参照协议
        }
        return newObj
    }
    cancelSearch = () => this.props.form.resetFields()
    // 请求列表
    operateLogListFetch = (pageNumber, pageSize) => {
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
                this.props.getOperationLogList(params);
            }
        });
    }
    handleReset = () => {
        this.setState({
            params: {
                optionType: [0]
            }
        })
        this.props.form.resetFields();
    }
    render() {
        const {params} = this.state;
        return (
            <div className="lgt-operation_log">
                <div className="lgt-operation_log_container">
                    <Search
                        {...this.props}
                        customsListFetch={this.operateLogListFetch}
                        resetFields={this.handleReset}
                        tagSelectParams = {params}
                    />
                </div>
                <div className="lgt-operation_log_container margin-ms-top">
                    <TableList {...this.props}
                           operateLogListFetch={this.operateLogListFetch}
                    />
                </div>
            </div>
        )
    }
}

export default Form.create()(App)