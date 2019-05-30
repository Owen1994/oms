/**
 *作者: pzt
 *时间: 2018/6/7
 *描述: 报关单列表
 **/
import React, { Component } from 'react'
import {
    Form,
    Row,
    Col,
    DatePicker,
    message,
} from 'antd'
import Search from './newSearch'   // 高级搜索组件
import Tablelist from './tablelist'   // 表格组件
import '../css/css.css'
import {filterParams} from "../../../../util/baseTool"

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

class App extends Component {

    state = {
        params: {
            declarationType: [0],
            companyId: [0],
            logisticsStatus: [0],
            depotType: [0],
        },
        filterData: [],
        pageNumber: 1,
        pageSize: 20,
        filterName: '',
        filterVal: '',
        sortInfo: {}
    }

    formItemLayout = {
        labelCol: {span: 9},
        wrapperCol: {span: 15}
    }

    componentDidMount(){
        // console.log(this.props)
        this.customsListFetch()
    }
    // 请求列表
    customsListFetch = (pageNumber, pageSize, filterName, filterVal, sorter) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            pageNumber = pageNumber ? pageNumber : this.state.pageNumber;
            pageSize = pageSize ? pageSize: this.state.pageSize;
            filterName = filterName ? filterName : this.state.filterName;
            filterVal = filterVal ? filterVal : this.state.filterVal;
            sorter = sorter ? sorter : this.state.sortInfo;
            if (!err) {
                var  params = filterParams(values);
                params["pageNumber"] = pageNumber;
                params["pageData"] = pageSize;
                this.setState({
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                });
                // 排序字段获取
                if(filterName !== '' && Object.keys(sorter).length !== 0){
                    if(filterName !== sorter.columnKey){
                        params["sort"]={
                            "column": sorter.columnKey,
                            "type": this.sortType(sorter.order)
                        }
                    }else {
                        params["sort"]={
                            "column": filterVal,
                            "type": this.sortType(sorter.order)
                        }
                    }
                }
                if(filterName === '' && Object.keys(sorter).length !== 0){
                    if(sorter.columnKey === "processInfo"){
                        message.warning("请选择排序条件!");
                        return false
                    }else{
                        params["sort"] ={
                            "column": sorter.columnKey,
                            "type": this.sortType(sorter.order)
                        }
                    }
                }
                if(filterName === '' && Object.keys(sorter).length === 0){
                    params["sort"] ={ // 设置默认排序条件
                        "column": "createOrderTime",
                        "type": "desc"
                    }
                }
                const filters = { ...this.state.params, ...params}
                this.setState({
                    params: filters
                })
                this.props.getDecalarationListAciton(params);
            }
        });
    }
    handleReset = () => {
        this.setState({
            params: {
                declarationType: [0],
                companyId: [0],
                logisticsStatus: [0],
                depotType: [0],
            }
        })
        this.props.form.resetFields();
    }
    // 分页
    paginatiHandle = (page, pageSize)=> {
        this.customsListFetch(page, pageSize);
    }
    /**
     * 作者: pzt
     * 描述: 表格排序
     * 时间: 2018/7/9 14:54
     * @params <pagination> 分页
     * @params <filters> 筛选条件
     * @params <sorter>  排序类型
     **/
    sorter = (pagination, filters, sorter) =>{
        var filterName = "",filterVal="";
        if(Object.keys(filters).length !== 0){
            filterName = Object.getOwnPropertyNames(filters)[0];
            filterVal = filters[filterName][0];
            this.setState({
                filterName: filterName,
                filterVal: filterVal
            })
        }
        if(Object.keys(sorter).length !== 0){
            this.setState({
                sortInfo: sorter
            })
        }
        this.customsListFetch(this.state.pageNumber, this.state.pageSize, filterName, filterVal, sorter);
    }

    /**
     * 作者: pzt
     * 描述: 获取排序类型
     * 时间: 2018/7/10 11:48
     * @params <string> str
     **/
    sortType = (str)=>{
        if(str.search('desc') !== -1){
            return "desc";
        }else{
            return "asc";
        }
    }
    render() {
        const {pageNumber, pageSize, params} = this.state;
        const paginationData = {
            pageSize: pageSize,
            pageNumber: pageNumber,
        };
        return (
            <div>
                <div className="lgt-dlt-list_container">
                    <Search
                        { ...this.props }
                        customsListFetch={this.customsListFetch}
                        resetFields={this.handleReset}
                        tagSelectParams = {params}
                    />
                </div>
                <div className="lgt-dlt-list_container margin-sm-top">
                    <Tablelist
                        {...this.props}
                        customsListFetch={this.customsListFetch}
                        paginationHandle = {this.paginatiHandle}
                        paginationData = {paginationData}
                        sorter = {this.sorter}
                    />
                </div>
            </div>
        )
    }
}

export default Form.create()(App)
