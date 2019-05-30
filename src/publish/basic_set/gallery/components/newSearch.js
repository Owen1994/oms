/**
     * 作者: 陈林
     * 描述: 图库设置搜索组件
     * 时间: 2018/7/27 0027 下午 8:09
     * @param
 **/
import React,{ Component } from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,message } from 'antd';
import {post} from "../../../../util/axios";
import StandardFormRow from '../../../../common/components/advancedSearchModel/StandardFormRow'
import '../css/newSearch.css'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class newSearch extends Component{
    constructor(props) {
        super(props);
    }
    handleSelect = (value, type)=>{
        if(type === "ebayAccount"){
            if(value.length > 5){
                message.warning("最多只能选择5个销售账号！");
                delete value[value.length-1];
            }
        }
        if(type === "galleryAccount"){
            if(value.length > 5){
                message.warning("最多只能选择5个销售账号！");
                delete value[value.length-1];
            }
        }

    }

    //搜索
    handleSearch = (e) => {
        e.preventDefault();
        this.props.listFetch();
    }

    //重置
    resetFields = () => {
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { ebayAccountData, getGalleryListData, resetFields} = this.props;
        const ebayAccountDataList = ebayAccountData || [];
        const getGalleryListDataList = getGalleryListData || [];
        return (
            <div className="search breadcrumb">
                <Form layout="inline" onSubmit={this.onSubmit}>
                    <div className="height-search">
                        <StandardFormRow title="销售账号：">
                            <FormItem>
                                {getFieldDecorator('saleAccount')(
                                    <Select
                                        showSearch
                                        mode="multiple"
                                        onChange={(value)=>this.handleSelect(value, "ebayAccount")}
                                        style={{ width: 330 }}
                                        placeholder="请选择"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {ebayAccountDataList.map((v,i)=>{
                                            return <Option value={v.id} key={i} >{v.id}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </StandardFormRow>
                        <StandardFormRow title="图库：">
                            <FormItem>
                                {getFieldDecorator('gallery')(
                                    <Select
                                        showSearch
                                        mode="multiple"
                                        onChange={(value)=>this.handleSelect(value, "galleryAccount")}
                                        style={{ width: 330 }}
                                        placeholder="请选择"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {getGalleryListDataList.map((v,i)=>{
                                            return <Option value={v.id} key={i} >{v.name}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </StandardFormRow>
                    </div>
                    <div className="btn-search padding-sm-bottom">
                        <Button type="primary" htmlType="submit" onClick={this.handleSearch}>搜索</Button>
                        <Button onClick={this.resetFields}>重置</Button>
                    </div>
                </Form>
            </div>
        );
    }
}
export default   newSearch