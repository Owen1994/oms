/**
 *作者: pzt
 *时间: 2018/6/7
 *描述: 搜索组件引用及功能新增
 **/
import React from 'react';

import {
    Input,
    Form,
    Button,
    Row,
    Col,
} from 'antd';
import Filter from "./filter"
import "../css/search.css"
import { levelOptions } from '../../../util/options';
const FormItem = Form.Item;
const { TextArea } = Input;

class ListFilter extends React.Component {
    state = {
        searchType: null,
        isHighGrade: true,
    }

    onChange = (values)=>{
        this.setState({
            searchType: values
        })
    }
    // search = ()=>{
    //     const {search} = this.props;
    //     const {values} = this.state;
    //     const {getFieldValue} = this.props.form;
    //     const content = getFieldValue("content");
    //     search({ values,content })
    // }
    ordinary = ()=>{
        this.setState({
            isHighGrade: !this.state.isHighGrade
        })
    }
    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field])
    handleSubmit = (e) => {
        e.preventDefault();
        let params = {};
        const searchContent = this.props.form.getFieldValue("searchContent");
        const paramsChild = this.props.search();
        const filterData = { ...paramsChild };
        if(this.state.searchType){
            filterData["searchType"] = this.state.searchType[0].values;
        }else{
            filterData["searchType"] = 1; // 搜索类型默认类型type为0， 具体值参照协议
        }
        params["pageNumber"] = levelOptions("pageInit").pagenum;
        params["pageData"] = levelOptions("pageInit").pagedata;
        params = {...filterData, ...params}
        this.props.filterAction(filterData);    
        this.props.getOperationLogList(params);
        this.props.menudataaction({pageCache:{...this.props.menuInfos.pageCache,[`${location.pathname}${location.search}`]:params}})
        // console.log(params);
    }
    handleReset = () => {
        this.props.cancelSearch();
        this.props.form.resetFields();
    }
    render(){
        const {getFieldDecorator, getFieldsError} =this.props.form;
        const { search, highGrade, children} = this.props;
        const {isHighGrade} = this.state;
        return (
            <div className="list-filter-serach">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Filter showroom={false} data={this.props.data || {}} onChange={this.onChange}/>
                    <Row>
                        <Col span={2}><div className="list-filter-search-title">搜索内容：</div></Col>
                        <Col span={22} className="overflow-hidden">
                            <div className="list-filter-search-content">
                                <FormItem>
                                    {getFieldDecorator('searchContent', {
                                        rules: [{ required: false, message: 'Please input the content of collection!' }],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                            </div>
                            {isHighGrade ? null
                                : <div className="list-filter-search-btn">
                                    <Button type="primary"
                                            onClick={search ? () => search() : this.ordinary}>搜索</Button>
                                    <Button onClick={highGrade ? () => highGrade() : this.ordinary}>高级搜索</Button>
                                </div>
                            }
                        </Col>
                    </Row>
                    {isHighGrade ? <div>{children}</div> : null}
                    {isHighGrade ?
                        <div className="list-filter-serach_btns margin-ss-right">
                            <FormItem>
                                <Button type="default" onClick={this.handleReset}>重置</Button>
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={this.hasErrors(getFieldsError())}
                                >
                                    搜索
                                </Button>
                            </FormItem>
                        </div>
                        : null
                    }
                </Form>
            </div>
        )
    }
    

}

export default Form.create()(ListFilter)