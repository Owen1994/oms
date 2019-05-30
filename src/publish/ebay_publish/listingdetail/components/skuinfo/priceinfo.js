/**
 * 作者: pzt
 * 描述: 一口价信息
 * 时间: 2018/9/5 19:20
 **/
import React from 'react'
import { Form, Select, Input, InputNumber, Checkbox, message } from 'antd'
import { PUBLISH_ITEMCONDITION, PUBLISH_SELLINGTIME } from "../../../../common/constants/actionTypes";
import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow'
import ItemSelect from '../../../../../common/components/itemSelect'
import * as types from "../../constants/reducerTypes";
const FormItem = Form.Item
const Option = Select.Option
//一口价
export default class PriceInfo extends React.Component {

    handleCheck = (e, resetObj) => {
        const { resetFields } = this.props.form
        if (!e.target.checked) {
            resetFields(resetObj)
        }
    }
    // 下拉框同步reducer/state的值
    handleReduxVal = (value, option, type, key) => {
        // console.log(value, option)
        if (type === -1) {
            this.props.editComponentDataAction(types.ADD_SKUINFO, key, value.target.value)
        }
        if (type === -2) {
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
    handleFocusBefore = (fields) => {
        const { getFieldValue } = this.props.form;
        const { site } = this.props.basicData;
        const saleAccount = getFieldValue("basicData[saleAccount]");
        const saleType = getFieldValue("basicData[saleType]");
        const categoryId = getFieldValue("ebayCategoryId1");
        if (fields === "no") {
            return true
        }
        if (fields instanceof Array && fields.length > 0) {
            for (let i = 0; i < fields.length; i++) {
                if (fields[i] === "saleAccount") {
                    if (!saleAccount) {
                        message.info("请先选择销售账号")
                        return false
                    }
                }
                if (fields[i] === "site") {
                    if (!site) {
                        message.info("请先选择站点")
                        return false
                    }
                }
                if (fields[i] === "listingType") {
                    if (!saleType) {
                        message.info("请先选择销售类型")
                        return false
                    }
                }
                if (fields[i] === "categoryId") {
                    if (!categoryId) {
                        message.info("请选择eBay分类至最后一级")
                        return false
                    }
                }
            }
        } else {
            message.warning("校验字段传入格式有误")
        }
        return true
    }
    render() {
        const { showPriceModel } = this.props
        const {
            upcOrEan, upcOrEanVal, sellerSku, price, stock,
            sellingTimeObj, itemConditionObj, bestOffer
        } = this.props.skuinfoData;
        const { site } = this.props.basicData;
        const { isConditionEnabled } = this.props.anotherData;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const itemId = this.props.itemId;
        return (
            <div className="auctionInfo_container">
                <StandardFormRow title="Seller SKU：" required={true}>
                    <FormItem>
                        {getFieldDecorator('skuInfo[sellerSku]', {
                            initialValue: sellerSku,
                            rules: [{
                                required: true,
                                message: 'Seller SKU 为必填项',
                            }]
                        })(
                            <Input
                                placeholder="请输入Seller SKU(必填项)"
                                onChange={(e, option) => this.handleReduxVal(e, option, -1, "sellerSku")}
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="一口价：" required={true}>
                    <FormItem>
                        {getFieldDecorator('skuInfo[price]', {
                            initialValue: price,
                            rules: [{
                                required: true,
                                message: '一口价为必填项',
                            }],
                        })(
                            <InputNumber
                                placeholder="请输入一口价（必填项）"
                                style={{ width: "330px" }}
                                max={999999.99}
                                min={0.99}
                                precision={2}
                            />
                        )}
                        <span onClick={showPriceModel} className="blue display-inline-block margin-ss-left pointer">售价计算</span>
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="库存：" required={true}>
                    <FormItem>
                        {getFieldDecorator('skuInfo[stock]', {
                            initialValue: stock,
                            rules: [{
                                required: true,
                                message: '库存为必填项',
                            }],
                        })(
                            <InputNumber
                                style={{ width: "330px" }}
                                placeholder="请输入库存（必填项）"
                                // min={itemId?0:1}
                                min={0}
                                max={999}
                                precision={0}
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
                <div className={!upcOrEan ? "display-none" : "display-block"}>
                    <StandardFormRow title={`${upcOrEan}：`} required={true}>
                        <FormItem>
                            {getFieldDecorator('skuInfo[upcOrEanVal]', {
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
                            {getFieldDecorator('skuInfo[upcOrEan]', {
                                initialValue: upcOrEan,
                            })(
                                <Input type={"hidden"} />
                            )}
                        </FormItem>
                    </StandardFormRow>
                </div>
                <StandardFormRow title="持续售卖时间：" required={true}>
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
                            onChange={(value, option) => this.handleReduxVal(value, option, -2, 'sellingTimeObj')}
                            onFocusBefore={() => this.handleFocusBefore(["site", "listingType", "categoryId"])}
                        />
                    </FormItem>
                </StandardFormRow>
                {isConditionEnabled ?
                    <StandardFormRow title={"Item Condition："} required={true}>
                        <FormItem>
                            <ItemSelect
                                dName={itemConditionObj.name ? itemConditionObj.name : ""}
                                dValue={itemConditionObj.id ? `${itemConditionObj.id}` : ""}
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
                                    initialValue: itemConditionObj.id ? `${itemConditionObj.id}` : "",
                                    rules: [{
                                        required: true, message: '请选择Item condition',
                                    }]
                                }}
                                className={'item-select'}
                                apiListType={2}
                                onChange={(value, option) => this.handleReduxVal(value, option, -2, 'itemConditionObj')}
                                onFocusBefore={() => this.handleFocusBefore(["saleAccount", "site", "categoryId"])}
                            />
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator("skuInfo[itemConditionObj][name]", {
                                initialValue: itemConditionObj.name
                            })(
                                <Input type={"hidden"} />
                            )}
                        </FormItem>
                    </StandardFormRow>
                    : null
                }

                <StandardFormRow title="最佳报价：" required={false} className={"best-quotation"}>
                    <FormItem>
                        {getFieldDecorator(`skuInfo[bestOffer][isAccept]`, {
                            initialValue: bestOffer.isAccept
                        })(
                            <Checkbox
                                checked={getFieldValue('skuInfo[bestOffer][isAccept]')}
                                onChange={(e) => this.handleCheck(e, "skuInfo[bestOffer]")}
                            >
                                让买家向您发送他们的议价
                            </Checkbox>
                        )}
                    </FormItem>
                </StandardFormRow>
                <div className={getFieldValue("skuInfo[bestOffer][isAccept]") ? "display-block" : "display-none"}>
                    <div className="best-price">
                        <FormItem>
                            {getFieldDecorator(`skuInfo[bestOffer][isMax]`, {
                                initialValue: bestOffer.isMax
                            })(
                                <Checkbox
                                    onChange={(e) => this.handleCheck(e, "skuInfo[bestOffer][maxPrice]")}
                                    checked={getFieldValue('skuInfo[bestOffer][isMax]')}
                                >
                                    自动接受最高价
                                </Checkbox>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator(`skuInfo[bestOffer][maxPrice]`, {
                                initialValue: bestOffer.maxPrice,
                                rules: [{
                                    required: getFieldValue('skuInfo[bestOffer][isMax]'),
                                    message: '请填写最高价'
                                }],
                            })(
                                <InputNumber
                                    type="text"
                                    disabled={!getFieldValue("skuInfo[bestOffer][isMax]")}
                                    min={0}
                                />
                            )}
                        </FormItem>
                    </div>
                    <div className="best-price">
                        <FormItem>
                            {getFieldDecorator('skuInfo[bestOffer][isMin]', {
                                initialValue: bestOffer.isMin
                            })(
                                <Checkbox
                                    onChange={(e) => this.handleCheck(e, "skuInfo[bestOffer][minPrice]")}
                                    checked={getFieldValue('skuInfo[bestOffer][isMin]')}
                                >
                                    自动谢绝最低价
                                </Checkbox>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('skuInfo[bestOffer][minPrice]', {
                                initialValue: bestOffer.minPrice,
                                rules: [{
                                    required: getFieldValue('skuInfo[bestOffer][isMin]'),
                                    message: '请填写最低价'
                                }],
                            })(
                                <InputNumber
                                    type="text"
                                    disabled={!getFieldValue("skuInfo[bestOffer][isMin]")}
                                    min={0}
                                />
                            )}
                        </FormItem>
                    </div>
                </div>
            </div>
        )
    }
}
