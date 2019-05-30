import React from 'react'
import { Form, Select, Input, Checkbox, message, Divider, InputNumber, Button, Modal } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import StandardFormRow from '../../../../common/components/advancedSearchModel/StandardFormRow'
import ItemSelect from '../../../../common/components/itemSelect'
import TransportTempContainer from '../../template/containers/newModalModel'
import ReturnTemp from '../../template/components/return/newModalModel'
import PaymentTemp from '../../template/components/payment/newModalModel'
import {
    GET_PAYMENT_TEMP,
    GET_RETURN_TEMP,
    GET_TRANSPORT_TEMP,
    GET_SHIPPING_PROFILE_DETAIL
} from "../constants/api";
import {
    PUBLISH_PARCEL_TYPE,
    PUBLISH_SELLING_TAX,
    PUBLISH_COUNTRIES,
} from '../../../common/constants/actionTypes'
import * as types from "../constants/reducerTypes";
import { fetchPost } from "../../../../util/fetch";

export default class TemplateInfo extends React.Component {
    state = {
        transportTempVislble: false,
        returnTempVislble: false,
        paymentTempVislble: false,
    }
    // 下拉框同步各个模板的值
    handleEditTemp = (value, option, type) => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        if (type === "transportTemplate") {
            const { site } = this.props.basicData;
            const sellerId = getFieldValue("basicData[saleAccount]");
            this.props.getTemplatiesAction({
                shippingProfileId: option.value,
                shippingProfileName: option.children
            });
            fetchPost(GET_SHIPPING_PROFILE_DETAIL, {
                plsProfileId: option.value,
                profileId: option.value,
                site: site,
                sellerId: sellerId
            }).then(res => {
                if (res && res.state === "000001") {
                    const data = res.data[0];
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
                        "templateInfo[salestax][taxId]": data.salestax && data.salestax.taxId ? data.salestax.taxId : ""
                    })
                }
            })
        }
        if (type === "returnTemplate") {
            this.props.getTemplatiesAction({
                returnProfileId: option.value,
                returnProfileName: option.children
            })
        }
        if (type === "paymentTemplate") {
            this.props.getTemplatiesAction({
                paymentProfileId: option.value,
                paymentProfileName: option.children
            })
        }

    }
    // 下拉框同步reducer/state的值
    handleReduxVal = (value, option, type, key) => {
        // console.log(value, option)
        if (type === -3) {
            let { salestax } = this.props.templateInfo
            let taxObj = {
                id: option.value,
                name: option.children
            }
            salestax = {
                ...salestax,
                taxObj
            }
            this.props.editComponentDataAction(types.ADD_TEMPLATEINFO, key, salestax)
        }
    }
    getPackageType = (value, option) => {
        this.props.editComponentDataAction(types.ANOTHER_DATA, "newPackageType", option.children)
    }
    /**
     * 作者:
     * 描述: 下拉框异步加载数据前的校验函数
     * 时间: 2018/9/3 11:08
     * @param <number> fields 要拦截的字段名集合 "no" 代表不做拦截
     **/
    handleFocusBefore = (fields) => {
        const { getFieldValue } = this.props.form;
        const { site } = this.props.basicData;
        const saleType = getFieldValue("basicData[saleType]");
        const saleAccount = getFieldValue("basicData[saleAccount]");
        const categoryId = getFieldValue("ebayCategoryId1");

        // console.log("this.props.basicData",this.props.basicData)
        // console.log("ebayCategoryId1",categoryId)
        if (fields === "no") {
            return true
        }
        let flag = true;
        if (fields instanceof Array && fields.length > 0) {
            for (let i = 0; i < fields.length; i++) {
                if (fields[i] === "saleAccount") {
                    if (!saleAccount) {
                        message.info("请先选择销售账号");
                        flag = false;
                        break;
                    }
                }
                if (fields[i] === "site") {
                    if (!site) {
                        message.info("请先选择站点");
                        flag = false;
                        break;
                    }
                }
                if (fields[i] === "listingType") {
                    if (!saleType) {
                        message.info("请先选择销售类型")
                        flag = false;
                        break;
                    }
                }
                if (fields[i] === "categoryId") {
                    if (!categoryId) {
                        message.info("请选择eBay分类至最后一级")
                        flag = false;
                        break;
                    }
                }
            }
        } else {
            message.warning("校验字段传入格式有误");
        }
        return flag;
    }
    showTempDetails = (type) => {
        const { transportTemplate, returnTemplate, paymentTemplate } = this.props.templatiesData;
        if (type === 1) {
            if (transportTemplate.tempId && transportTemplate.tempId !== '0') {
                this.setState({
                    transportTempVislble: true,
                })
            } else {
                message.info("当前运输模板为空，请选择运输模板！")
            }
        }
        if (type === 2) {
            if (returnTemplate.tempId) {
                this.setState({
                    returnTempVislble: true,
                })
            } else {
                message.info("请选择退货模板！")
            }
        }
        if (type === 3) {
            if (paymentTemplate.tempId) {
                this.setState({
                    paymentTempVislble: true,
                })
            } else {
                message.info("请选择付款模板！")
            }
        }
    }
    // 用于接收模板信息修改后的返回值
    getReturnValue = (data)=>{
        const {templatiesDataToggleAction} = this.props
        if(data && data.profileId){
            templatiesDataToggleAction({
                transportTemplate:{
                    name:data.profileName,
                    plsProfileId:data.profileId,
                    tempId:data.profileId
                }
            })
        }
    }
    render() {
        const { transportTempVislble, item1, returnTempVislble, paymentTempVislble } = this.state;
        const { site } = this.props.basicData;
        const {
            countryObj, packageType, city, zip, irregularPackage, packageSize, salestax
        } = this.props.templateinfoData;
        const { transportTemplate, returnTemplate, paymentTemplate } = this.props.templatiesData;
        const taxObj = salestax ? salestax.taxObj : { id: "", name: "" }
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const saleAccount = getFieldValue("basicData[saleAccount]");
        return (
            <div className="template-info">
                <StandardFormRow title={"运输模板："} required={true}>
                    <FormItem>
                        <ItemSelect
                            dName={transportTemplate ? [transportTemplate.name] : ""}
                            dValue={transportTemplate ? [transportTemplate.tempId] : ""}
                            disabled={false}
                            name="name"
                            code="tempId"
                            url={GET_TRANSPORT_TEMP}
                            params={{ site: [site], saleAccount: [getFieldValue("basicData[saleAccount]")], pageNumber: 1, pageData: 999 }}
                            value={transportTemplate.tempId}
                            className={'item-select'}
                            apiListType={1}
                            onChange={(value, option) => this.handleEditTemp(value, option, 'transportTemplate')}
                            onFocusBefore={() => this.handleFocusBefore(["saleAccount", "site"])}
                        />
                    </FormItem>
                    <Button
                        type="default"
                        disabled={!transportTemplate.tempId || transportTemplate.tempId === "0"}
                        className="view-details-btn"
                        onClick={() => this.showTempDetails(1)}
                    >查看详情</Button>
                </StandardFormRow>
                <StandardFormRow title={"国家："} required={true}>
                    <FormItem>
                        <ItemSelect
                            dName={countryObj ? [countryObj.name] : ""}
                            dValue={countryObj && countryObj.id ? [countryObj.id] : ""}
                            formName="templateInfo[country]"
                            disabled={false}
                            getFieldDecorator={getFieldDecorator}
                            name="name"
                            code="id"
                            url={PUBLISH_COUNTRIES}
                            rules={{
                                initialValue: countryObj && countryObj.id ? countryObj.id : "",
                                rules: [{
                                    required: true, message: '请选择国家',
                                }]
                            }}
                            className={'item-select'}
                            apiListType={2}
                            // onChange={(value, option)=>this.handleReduxVal(value,option, -2, 'countryObj')}
                            onFocusBefore={() => this.handleFocusBefore("no")}
                        />
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title={"City,State："} required={true}>
                    <FormItem>
                        {
                            getFieldDecorator("templateInfo[city]", {
                                initialValue: city,
                                rules: [{
                                    required: true,
                                    message: "City,State为必填项"
                                }]
                            })(
                                <Input type={"text"} />
                            )
                        }
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title={"邮编："} required={false}>
                    <FormItem>
                        {
                            getFieldDecorator("templateInfo[zip]", {
                                initialValue: zip,
                            })(
                                <Input type={"text"} />
                            )
                        }
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title={"销售税："} required={false}>
                    <div className="sale-tax">
                        <FormItem>
                            <ItemSelect
                                dName={taxObj ? [taxObj.name] : ""}
                                dValue={taxObj && taxObj.id ? [taxObj.id] : ""}
                                allowClear
                                formName='templateInfo[salestax][taxId]'
                                disabled={false}
                                getFieldDecorator={getFieldDecorator}
                                name="name"
                                code="id"
                                url={PUBLISH_SELLING_TAX} //  接口名称
                                params={{ "site": site }}
                                rules={{
                                    initialValue: taxObj && taxObj.id ? taxObj.id : "",
                                    rules: [{
                                        required: false, message: '请选择销售税',
                                    }]
                                }}
                                className={'item-select'}
                                apiListType={2}
                                //onChange={(value,option)=>this.handleReduxVal(value,option, -3, 'salestax')}
                                onFocusBefore={() => this.handleFocusBefore(["site"])}
                            />
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator(`templateInfo[salestax][rate]`, {
                                initialValue: salestax.rate,
                            })(
                                <InputNumber
                                    className="rate"
                                    min={0.01}
                                    max={100}
                                />
                            )}
                        </FormItem>
                        <span className="percent">%</span>
                    </div>
                    <div>
                        <FormItem>
                            {getFieldDecorator(`templateInfo[salestax][shippingIncludedInTax]`, {
                                initialValue: salestax.shippingIncludedInTax
                            })(
                                <Checkbox
                                    checked={getFieldValue(`templateInfo[salestax][shippingIncludedInTax]`)}
                                >Also apply to shipping and handing costs</Checkbox>
                            )}
                        </FormItem>
                    </div>
                </StandardFormRow>
                <Divider />
                <StandardFormRow title={"退货模板："} required={true}>
                    <FormItem>
                        <ItemSelect
                            dName={returnTemplate ? [returnTemplate.name] : ""}
                            dValue={returnTemplate ? [returnTemplate.tempId] : ""}
                            disabled={false}
                            name="name"
                            code="tempId"
                            url={GET_RETURN_TEMP}
                            params={{ site: [site], saleAccount: [saleAccount], pageNumber: 1, pageData: 999 }}
                            value={returnTemplate.tempId}
                            className={'item-select'}
                            apiListType={1}
                            onChange={(value, option) => this.handleEditTemp(value, option, 'returnTemplate')}
                            onFocusBefore={() => this.handleFocusBefore(["saleAccount", "site"])}
                        />
                    </FormItem>
                    <Button
                        type="default"
                        className="view-details-btn"
                        disabled={!returnTemplate.tempId || returnTemplate.tempId === "0"}
                        onClick={() => this.showTempDetails(2)}
                    >查看详情</Button>
                </StandardFormRow>
                <Divider />
                <StandardFormRow title={"付款模板："} required={true}>
                    <FormItem>
                        <ItemSelect
                            dName={paymentTemplate ? [paymentTemplate.name] : ""}
                            dValue={paymentTemplate ? [paymentTemplate.tempId] : ""}
                            disabled={false}
                            name="name"
                            code="tempId"
                            url={GET_PAYMENT_TEMP}
                            params={{ site: [site], saleAccount: [saleAccount], pageNumber: 1, pageData: 999 }}
                            value={paymentTemplate.tempId}
                            className={'item-select'}
                            apiListType={1}
                            onChange={(value, option) => this.handleEditTemp(value, option, 'paymentTemplate')}
                            onFocusBefore={() => this.handleFocusBefore(["saleAccount", "site"])}
                        />
                    </FormItem>
                    <Button
                        type="default"
                        disabled={!paymentTemplate.tempId || paymentTemplate.tempId === "0"}
                        className="view-details-btn"
                        onClick={() => this.showTempDetails(3)}
                    >查看详情</Button>
                </StandardFormRow>
                <Divider />
                <StandardFormRow title={"包裹类型："} required={false}>
                    <FormItem>
                        <ItemSelect
                            allowClear
                            formName='templateInfo[packageType]'
                            disabled={false}
                            getFieldDecorator={getFieldDecorator}
                            name="name"
                            code="id"
                            url={PUBLISH_PARCEL_TYPE}
                            params={{ "site": site }}
                            rules={{
                                initialValue: packageType,
                                rules: [{
                                    required: false, message: '请选择包裹类型',
                                }]
                            }}
                            className={'item-select'}
                            apiListType={2}
                            onChange={(value, option) => this.getPackageType(value, option)}
                            onFocusBefore={() => this.handleFocusBefore(["site"])}
                        />
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title={"不规则包裹："} required={false}>
                    <FormItem>
                        {
                            getFieldDecorator("templateInfo[irregularPackage]", {
                                initialValue: irregularPackage,
                            })(
                                <Select
                                    style={{ width: 330 }}
                                >
                                    <Option value={1} key={"0"} >Yes</Option>
                                    <Option value={0} key={"1"} >No</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title={"包裹尺寸："} required={false}>
                    <div className="package-size">
                        <FormItem>
                            {getFieldDecorator("templateInfo[packageSize][length]", {
                                initialValue: packageSize.length
                            })(
                                <InputNumber
                                    placeholder={"长"}
                                    min={0}
                                    max={999999.99}
                                />
                            )}
                        </FormItem>
                        <span className="connector">X</span>
                        <FormItem>
                            {
                                getFieldDecorator("templateInfo[packageSize][wide]", {
                                    initialValue: packageSize.wide
                                })(
                                    <InputNumber
                                        placeholder={"宽"}
                                        min={0}
                                        max={999999.99}
                                    />
                                )
                            }
                        </FormItem>
                        <span className="connector">X</span>
                        <FormItem>
                            {
                                getFieldDecorator("templateInfo[packageSize][height]", {
                                    initialValue: packageSize.height
                                })(
                                    <InputNumber
                                        placeholder={"高"}
                                        min={0}
                                        max={999999.99}
                                    />
                                )
                            }
                        </FormItem>
                        <span className="connector">CM</span>
                    </div>
                </StandardFormRow>
                <TransportTempContainer
                    visible={transportTempVislble}
                    onCancel={() => this.setState({
                        transportTempVislble: false
                    })}
                    getReturnValue={this.getReturnValue}
                    item={{
                        plsProfileId: transportTemplate.tempId,
                        profileId: transportTemplate.tempId,
                        site: site,
                        sellerId: saleAccount,
                        // 未改变
                        _unchanged: true
                    }}
                />
                <ReturnTemp
                    visible={returnTempVislble}
                    onCancel={() => this.setState({
                        returnTempVislble: false
                    })}
                    item={{
                        plsProfileId: returnTemplate.tempId,
                        profileId: returnTemplate.tempId,
                        site: site,
                        sellerId: saleAccount
                    }}
                />
                <PaymentTemp
                    visible={paymentTempVislble}
                    onCancel={() => this.setState({
                        paymentTempVislble: false
                    })}
                    item={{
                        plsProfileId: paymentTemplate.tempId,
                        profileId: paymentTemplate.tempId,
                        site: site,
                        sellerId: saleAccount,
                        type: 'edit'
                    }}
                />
            </div>
        )
    }
}