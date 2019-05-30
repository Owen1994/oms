import React from 'react'
import {
    Form,Select,Input,message
} from 'antd'
import {PUBLISH_ITEMCONDITION, PUBLISH_SELLINGTIME,IMPORT_FILE_API} from "../../../../common/constants/actionTypes";
import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow'
import ItemSelect from '../../../../../common/components/itemSelect'
import VrelationshipContainer from '../../containers/vrelationship'
import VlistContainer from '../../containers/vlist'
import VimgsContainer from '../../containers/vimgs'
import * as types from "../../constants/reducerTypes";
const FormItem = Form.Item
const Option = Select.Option
//多属性
export default class VariationInfo extends React.Component {
    /**
     * 作者:
     * 描述: 下拉框异步加载数据前的校验函数
     * 时间: 2018/9/3 11:08
     * @param <number> fields 要拦截的字段名集合 "no" 代表不做拦截
     **/
    handleFocusBefore = (fields)=>{
        const {getFieldValue} = this.props.form;
        const {site} = this.props.basicData;
        const saleAccount = getFieldValue("basicData[saleAccount]");
        const saleType = getFieldValue("basicData[saleType]");
        const categoryId = getFieldValue("ebayCategoryId1");
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
                if(fields[i] === "listingType"){
                    if(!saleType){
                        message.info("请先选择销售类型")
                        return false
                    }
                }
                if(fields[i] === "categoryId"){
                    if(!categoryId){
                        message.info("请选择eBay分类至最后一级")
                        return false
                    }
                }
            }
        }else{
            message.warning("校验字段传入格式有误")
        }
        return true
    }
    // 下拉框同步reducer/state的值
    handleReduxVal =(value, option, type, key)=>{
        // console.log(value, option)
        if(type === -1){
            this.props.editComponentDataAction(types.ADD_SKUINFO, key, value.target.value)
        }
        if(type === -2){
            this.props.editComponentDataAction(types.ADD_SKUINFO, key, {
                id: option.value,
                name: option.children
            })
        }
    }
    handleSpuChange = (e) => {
        const val = e.target.value;
        if(val.length > 50){
            e.target.value = val.slice(0, 50);
            message.info("spu字数不能超过50个字符");
        }
    }
    render(){
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const {sellingTimeObj,itemConditionObj} = this.props.skuinfoData;
        let {variationInfo} = this.props.skuinfoData;
        variationInfo = variationInfo ? variationInfo : {
            "mainPic": null,
            "specificName": null,
            "specificSetJson": null,
            "spu": null,
            "variationDetail": []
        };
        const {spu} = variationInfo;
        const {site} = this.props.basicData;
        const {isConditionEnabled} = this.props.anotherData;
        const saleAccount = getFieldValue("basicData[saleAccount]");
        const saleType = getFieldValue("basicData[saleType]");
        const lastCategoryId = getFieldValue("ebayCategoryId1");
        return (
                <div className="auctionInfo_container">
                    <StandardFormRow title="SPU：">
                        <FormItem>
                            {getFieldDecorator('skuInfo[spu]',{
                                initialValue: spu,
                            })(
                                <Input placeholder="请输入SPU" onChange={this.handleSpuChange}/>
                            )}
                        </FormItem>
                    </StandardFormRow>
                    <StandardFormRow title="持续售卖时间："  required={true}>
                        <FormItem>
                            <ItemSelect
                                dName={sellingTimeObj.name}
                                dValue={`${sellingTimeObj.id}`}
                                formName="skuInfo[sellingTime]"   // 表单提交的key
                                disabled={false}
                                getFieldDecorator={getFieldDecorator} // form双向绑定
                                name="name"
                                code="id"
                                url={PUBLISH_SELLINGTIME} //  接口名称
                                params={{
                                    siteId: site,
                                    listingType: saleType,
                                    categoryId: lastCategoryId
                                }}
                                rules={{
                                    initialValue: `${sellingTimeObj.id}`,
                                    rules: [{
                                        required: true, message: '请选择持续售卖时间',
                                    }]
                                }}
                                className={'item-select'}
                                apiListType={2}
                                //onChange={(value, option)=>this.handleReduxVal(value,option, -2, 'sellingTimeObj')}
                                onFocusBefore={()=>this.handleFocusBefore(["site", "listingType", "categoryId"])}
                            />
                        </FormItem>
                    </StandardFormRow>
                    {isConditionEnabled ?
                    <StandardFormRow title={"Item Condition："} required={true}>
                        <FormItem>
                            <ItemSelect
                                dName={itemConditionObj.name}
                                dValue={`${itemConditionObj.id}`}
                                formName="skuInfo[itemConditionObj][id]"
                                disabled={false}
                                getFieldDecorator={getFieldDecorator}
                                name="name"
                                code="id"
                                url={PUBLISH_ITEMCONDITION}
                                params={{siteId: site, sellerId: saleAccount,categoryId: lastCategoryId}}
                                rules={{
                                    initialValue: `${itemConditionObj.id}`,
                                    rules: [{
                                        required: true, message: '请选择Item condition',
                                    }]
                                }}
                                className={'item-select'}
                                apiListType={2}
                                onChange={(value, option)=>this.handleReduxVal(value,option, -2, 'itemConditionObj')}
                                onFocusBefore={()=>this.handleFocusBefore(["saleAccount", "site", "categoryId"])}
                            />
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator("skuInfo[itemConditionObj][name]",{
                                initialValue: itemConditionObj.name
                            })(
                                <Input type={"hidden"} />
                            )}
                        </FormItem>
                    </StandardFormRow>
                        : null}
                    <VrelationshipContainer {...this.props} />
                    <VlistContainer itemId={this.props.itemId}/>
                    <VimgsContainer />
                </div>

        )
    }

}