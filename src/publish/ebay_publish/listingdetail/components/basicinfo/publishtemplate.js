import React from 'react'
import {
    Form,
    Select,
    message,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import ItemSelect from '../../../../../common/components/itemSelect/index'
import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow/index'
import { PUBLISH_TEMPLATES} from '../../../../common/constants/actionTypes'
import {GET_PUBLISH_TEMP_DETAIL} from '../../constants/api'
import {fetchPost} from "../../../../../util/fetch";
import * as types from "../../constants/reducerTypes";

export default class PublishTemp extends React.Component{

    handleChange = (value)=>{
        const {setFieldsValue} = this.props.form;
        fetchPost(GET_PUBLISH_TEMP_DETAIL, {publishTemplId: value}).then(res=>{
            if(res && res.state === "000001"){
                const data = res.data;
                this.props.setTemplatiesAction({...res.data});
                const salestax = data.salestax;
                salestax.taxObj = {
                    id: salestax.taxId,
                    name: salestax.taxName
                }
                this.props.editComponentDataAction(types.ADD_TEMPLATEINFO, "countryObj", data.country)
                this.props.editComponentDataAction(types.ADD_TEMPLATEINFO, "salestax", salestax)
                setFieldsValue({
                    "templateInfo[country]": data.country.id,
                    "templateInfo[city]": data.city,
                    "templateInfo[zip]": data.zip,
                    "templateInfo[salestax][rate]": data.salestax && data.salestax.rate ? data.salestax.rate : "",
                    "templateInfo[salestax][shippingIncludedInTax]": data.salestax && data.salestax.shippingIncludedInTax ? true : false,
                    "templateInfo[salestax][taxId]":data.salestax && data.salestax.taxId ? data.salestax.taxId : ""
                })
            }else{
                setFieldsValue({
                    "templateInfo[country]": null,
                    "templateInfo[city]": null,
                    "templateInfo[zip]": null,
                    "templateInfo[salestax][rate]": null,
                    "templateInfo[salestax][shippingIncludedInTax]": false,
                    "templateInfo[salestax][taxId]": null
                })
            }
        })
    }
    /**
     * 作者:
     * 描述: 下拉框异步加载数据前的校验函数
     * 时间: 2018/9/3 11:08
     * @param <number> fields 要拦截的字段名集合 "no" 代表不做拦截
     **/
    handleFocusBefore = (fields)=>{
        const {site} = this.props.basicObj.basicData;
        const saleAccount = this.props.form.getFieldValue("basicData[saleAccount]")
        if(fields === "no"){
            return true
        }
        if(fields instanceof Array && fields.length > 0){
            for(let i =0; i < fields.length; i++){
                if(fields[i] === "saleAccount"){
                    if(!saleAccount){
                        message.info("请先选择销售账号")
                        return false
                    }
                }
                if(fields[i] === "site"){
                    if(!site){
                        message.info("请先选择站点")
                        return false
                    }
                }
            }
        }else{
            message.warning("校验字段传入格式有误")
        }
        return true
    }
    render(){
        const {saleAccount,site} = this.props.basicData;
        const {publishTemplObj} = this.props.templatiesData
        const {getFieldDecorator, getFieldValue} = this.props.form;
        return(
                <StandardFormRow title={"刊登模板："} required={false}>
                    <FormItem>
                        <ItemSelect
                            dName={publishTemplObj? [publishTemplObj.name] : ""}
                            dValue={publishTemplObj?[publishTemplObj.id]: ""}
                            formName="basicData[publishTemplId]"   // 表单提交的key
                            disabled={false}
                            getFieldDecorator={getFieldDecorator} // form双向绑定
                            name="name"
                            code="id"
                            url={PUBLISH_TEMPLATES}
                            params={{
                                site: site,
                                saleAccount: getFieldValue("basicData[saleAccount]"),
                                pageNumber: 1,
                                pageData: 999}}
                            rules={{
                                initialValue: publishTemplObj?publishTemplObj.id:"",
                            }}
                            className={'item-select'}
                            apiListType={2}
                            onFocusBefore={()=>this.handleFocusBefore(["saleAccount","site"])}
                            onChange={this.handleChange}
                        />
                    </FormItem>
                </StandardFormRow>
        )
    }
}