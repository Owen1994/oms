/**
 * 作者: pzt
 * 描述: 拍卖信息
 * 时间: 2018/9/5 19:20
 **/
import React from 'react'
import {Form,Select,Input,InputNumber,message} from 'antd'
import {PUBLISH_ITEMCONDITION, PUBLISH_SELLINGTIME} from "../../../../common/constants/actionTypes";
import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow'
import ItemSelect from '../../../../../common/components/itemSelect'
import * as types from "../../constants/reducerTypes";
const FormItem = Form.Item
const Option = Select.Option
//拍卖
export default class AuctionInfo extends React.Component{

    // 下拉框同步reducer/state的值
    handleReduxVal =(value, option, type, key)=>{
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
                    if(saleType !== 0 && !saleType){
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
    render(){
        const {
            upcOrEan,upcOrEanVal,sellerSku,price,stock,
            sellingTimeObj,itemConditionObj, auctionBuyerItNowPrice, reservePrice
        } = this.props.skuinfoData;
        const {site} = this.props.basicData;
        const {isConditionEnabled} = this.props.anotherData;
        const {getFieldDecorator,getFieldValue} = this.props.form;
        const itemId = this.props.itemId;
        return(
            <div className="auctionInfo_container">
                <StandardFormRow title="Seller SKU：" required={true}>
                    <FormItem>
                        {getFieldDecorator('skuInfo[sellerSku]',{
                            initialValue: sellerSku,
                            rules: [{
                                required: true,
                                message: 'Seller SKU 为必填项',
                            }]
                        })(
                            <Input
                                placeholder="请输入Seller SKU(必填项)"
                                onChange={(e,option)=>this.handleReduxVal(e, option, -1, "sellerSku")}
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="起拍价：" required={true}>
                    <FormItem>
                        {getFieldDecorator('skuInfo[price]',{
                            initialValue: price,
                            rules: [{
                                required: true,
                                message: '起拍价为必填项',
                            }],
                        })(
                            <InputNumber
                                placeholder="请输入起拍价（必填项）"
                                style={{width: "330px"}}
                                max={999999.99}
                                min={0.99}
                                precision={2}
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="一口价：" required={false}>
                    <FormItem>
                        {getFieldDecorator('skuInfo[auctionBuyerItNowPrice]',{
                            initialValue: auctionBuyerItNowPrice,
                        })(
                            <InputNumber
                                placeholder="请输入一口价"
                                style={{width: "330px"}}
                                max={999999.99}
                                min={0.99}
                                precision={2}
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="保底价：" >
                    <FormItem>
                        {getFieldDecorator('skuInfo[reservePrice]',{
                            initialValue: reservePrice,
                        })(
                            <InputNumber
                                placeholder="请输入保底价"
                                style={{width: "330px"}}
                                max={999999.99}
                                min={0.99}
                                precision={2}
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="库存：" required={true}>
                    <FormItem>
                        {getFieldDecorator('skuInfo[stock]',{
                            initialValue: stock,
                            rules: [{
                                required: true,
                                message: '库存为必填项',
                            }],
                        })(
                            <InputNumber
                                style={{width: "330px"}}
                                placeholder="请输入库存（必填项）"
                                // min={itemId?0:1}
                                min={0}
                                max={999}
                                precision={0}
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
                <div className={!upcOrEan ? "display-none": "display-block"}>
                    <StandardFormRow title={`${upcOrEan}：`} required={true}>
                        <FormItem>
                            {getFieldDecorator('skuInfo[upcOrEanVal]',{
                                initialValue: upcOrEanVal,
                                rules: [{
                                    required: !upcOrEan ? false : true,
                                    message: `${upcOrEan}为必填项`
                                }],
                            })(
                                <Input placeholder={`请输入${upcOrEan}（必填项）`} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('skuInfo[upcOrEan]',{
                                initialValue: upcOrEan,
                            })(
                                <Input type={"hidden"} />
                            )}
                        </FormItem>
                    </StandardFormRow>
                </div>
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
                                listingType: getFieldValue("basicData[saleType]"),
                                categoryId: getFieldValue("ebayCategoryId1")
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
                                params={{
                                    siteId: site,
                                    sellerId: getFieldValue("basicData[saleAccount]"),
                                    categoryId: getFieldValue("ebayCategoryId1")
                                }}
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
                    :null
                }
            </div>
        )
    }
}
