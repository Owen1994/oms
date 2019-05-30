import React from 'react'
import qs from 'qs'
import {
    Form,
    Select,
    DatePicker,
    Input,
    Button,
    Modal,
    Tooltip,
    Row,
    Col,
    message,
    Cascader,

} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker;
import ItemSelect from '../../../../../common/components/itemSelect/index'
import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow/index'
import EbayCategoryContainer from '../../containers/ebaycategory'
import PublishTempContainer from '../../containers/publishtemplate'
import { strTrim } from '../../../../../util/baseTool'
import { post } from '../../../../../util/axios'
import {
    LISTING_DETAIL_LOADING_SKU,
    GET_PUBLISH_TEMP_DROPLIST, GET_PUBLISH_TEMP_DETAIL,
} from "../../constants/api";
import {
    PUBLISH_EBAYCLASS,
    PUBLISH_GETCTGSPEC,
    PUBLISH_STORECLASS,
    PUBLISH_EBAYACCOUNT,
} from '../../../../common/constants/actionTypes';
import * as types from '../../constants/reducerTypes';
import { fetchPost } from "../../../../../util/fetch";
import ShopCategory from './shopcategory';

export default class BasicInfo extends React.Component {
    state = {
        listingId: null,
        pageType: null,
        pageState: null,
        shopclass1: "",
        shopclass2: "",
        ebayCategory1: null,
        ebayCategory2: null,
    };
    componentDidMount() {
        const locationArr = window.location.href.split('?');
        let paramsObj = locationArr.length > 1 ? qs.parse(locationArr[1]) : '';
        const listingId = paramsObj['id'] ? paramsObj['id'] : '';
        const type = paramsObj['type'] ? paramsObj['type'] : '';
        const pageState = paramsObj['state'] ? paramsObj['state'] : '';
        this.setState({
            pageType: type,
            pageState
        });
        if (listingId && type !== "copy") {
            this.setState({
                listingId: listingId
            })
        }
    }
    componentWillReceiveProps(next) {
        const { shopclassArr1, shopclassArr2 } = this.props.basicObj.basicData;
        const nextBasicData = next.basicObj.basicData;
        if (nextBasicData.shopclassArr1 !== shopclassArr1) {
            this.setState({
                shopclass1: this.getDefaultShopclassLabel(nextBasicData.shopclassArr1)
            })
        }
        if (nextBasicData.shopclassArr2 !== shopclassArr2) {
            this.setState({
                shopclass2: this.getDefaultShopclassLabel(nextBasicData.shopclassArr2)
            })
        }
    }

    shopclassChange = (type, vale, option) => {
        const data = (option && option.length && option.map(v => v.label).join(" / ")) || "";
        this.setState({
            [type]: data
        })
    }
    getDefaultShopclassLabel = (data, str = "") => {
        if (data && data[0]) {
            str += data[0].label
            if (data[0].children && data[0].children.length) {
                str += ' / '
                return this.getDefaultShopclassLabel(data[0].children, str)
            }
        }
        return str
    }

    toggleModal = (obj, type) => {
        if (type === "search") {
            const { getFieldValue } = this.props.form;
            let site = getFieldValue("basicData[site]");
            site = site ? strTrim(site) : "";
            if (site === "") {
                message.info("请先选择站点");
                return
            }
        }
        this.setState(obj);
    }
    // 标题首字母大写转换
    capitalize = (id) => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        const reg = /[a-zA-Z]/;
        let str = getFieldValue(id);
        let newArr = str.split(" ");
        for (let i = 0; i < newArr.length; i++) {
            if (reg.test(newArr[i][0]) && newArr[i][0] !== undefined) {
                newArr[i] = newArr[i][0].toUpperCase() + newArr[i].substring(1, newArr[i].length);
            }
        }
        setFieldsValue({
            [id]: newArr.join(' ')
        });
    }

    // 切换站点、销售账号获取默认模板
    getDefaultTemp = (saleAccount, site) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            'basicData[shopclass1]': [],
            'basicData[shopclass2]': []
        })
        if (site && saleAccount) {
            fetchPost(GET_PUBLISH_TEMP_DROPLIST, { site, saleAccount }).then(res => {
                if (res && res.state === "000001") {
                    let data = {};
                    res.data.forEach(v => {
                        if (v.isDefault === 1) {
                            data = v;
                        }
                    });
                    if (data && data.id) {
                        fetchPost(GET_PUBLISH_TEMP_DETAIL, { publishTemplId: data.id }).then(res => {
                            if (res && res.state === "000001") {
                                this.props.setTemplatiesAction({ ...res.data });
                                const salestax = res.data.salestax;
                                salestax.taxObj = {
                                    id: salestax.taxId,
                                    name: salestax.taxName
                                }
                                this.props.editComponentDataAction(types.ADD_TEMPLATEINFO, "countryObj", res.data.country)
                                this.props.editComponentDataAction(types.ADD_TEMPLATEINFO, "salestax", salestax)
                                setFieldsValue({
                                    "basicData[publishTemplId]": res.data.publishTemplId,
                                    "templateInfo[country]": res.data.country.id,
                                    "templateInfo[city]": res.data.city,
                                    "templateInfo[zip]": res.data.zip,
                                    "templateInfo[salestax][rate]": res.data.salestax && res.data.salestax.rate ? res.data.salestax.rate : "",
                                    "templateInfo[salestax][shippingIncludedInTax]": res.data.salestax && res.data.salestax.shippingIncludedInTax ? true : false,
                                    "templateInfo[salestax][taxId]": res.data.salestax && res.data.salestax.taxId ? res.data.salestax.taxId : ""
                                });
                            }
                        });
                    } else {
                        this.resetTemplaties()
                    }
                } else {
                    this.resetTemplaties()
                }
            })
        }
    }

    // 清空默认刊登模板为空时的关联数据
    resetTemplaties = () => {
        const { setFieldsValue } = this.props.form;
        this.props.resetTemplatiesAction();
        setFieldsValue({
            "basicData[publishTemplId]": null,
            "templateInfo[country]": null,
            "templateInfo[city]": null,
            "templateInfo[zip]": null,
            "templateInfo[salestax][rate]": null,
            "templateInfo[salestax][shippingIncludedInTax]": false,
            "templateInfo[salestax][taxId]": null
        })
    }


    // 根据站点切换改变页面状态
    ebaySiteSelect = (value) => {
        const { setFieldsValue, getFieldValue } = this.props.form;
        let oldSite = getFieldValue("basicData[site]");
        let setValue = {
            'basicData[shopclass1]': [],
            'basicData[shopclass2]': []
        }
        if (value === "186") {
            setValue['buyerPolicy[privacy]'] = true
        } else if (oldSite === "186") {
            setValue['buyerPolicy[privacy]'] = false
        }
        setFieldsValue(setValue)

        let saleAccount = getFieldValue("basicData[saleAccount]");
        let ebayCategory = this.props.ebaySiteData.filter(v => {
            return v.id === value
        })
        let site = ebayCategory[0].id;
        let upcOrEan = ebayCategory[0].upcOrEan;
        let upcOrEanVal = ebayCategory[0].upcOrEanVal;
        this.props.switchSiteAction({ site, upcOrEan, upcOrEanVal })
        this.getDefaultTemp(saleAccount, value);
    }

    // 切换销售类型改变页面数据
    saleTypeSelect = (value) => {
        const { setFieldsValue } = this.props.form;
        if (value === 0) {
            this.props.switchSaleTypeAction({
                stock: 1,
                sellingTimeObj: { id: "7", name: "7 Day" },
                itemConditionObj: { id: '1000', name: 'New' }
            });
            setFieldsValue({
                "skuInfo[stock]": 1,
                "skuInfo[itemConditionObj][id]": '1000',
                "skuInfo[sellingTime]": "7"
            })
        } else {
            this.props.switchSaleTypeAction({
                stock: null,
                sellingTimeObj: { id: "-1", name: "Good till cancel" },
                itemConditionObj: { id: '1000', name: 'New' }
            });
            setFieldsValue({
                "skuInfo[stock]": null,
                "skuInfo[itemConditionObj][id]": '1000',
                "skuInfo[sellingTime]": "-1"
            })
        }
    }

    // 标题长度监听
    textAreaStrLength = (e, type) => {
        if (type === "title") {
            this.props.editAnotherDataAction(types.ANOTHER_DATA, "titleLen", 80 - e.target.value.length)
        }
        if (type === "subtitle") {
            this.props.editAnotherDataAction(types.ANOTHER_DATA, "subTitleLen", 55 - e.target.value.length)
        }
    }

    // 加载SKU资料
    loadingSkuInfo = () => {
        const { ebayCategoryArr3 } = this.props.ebayCategoryData;
        const { getFieldsValue, getFieldValue, setFieldsValue } = this.props.form;
        const formObj = getFieldsValue();
        const params = {};
        let sku = getFieldValue("loadingSkuInfo");
        let saleType = getFieldValue("basicData[saleType]");
        let site = getFieldValue("basicData[site]");
        let saleAccount = getFieldValue("basicData[saleAccount]");
        let categoryId = getFieldValue("ebayCategoryId1");
        sku = sku ? strTrim(sku) : "";
        saleType = saleType ? saleType : -1;
        site = site ? strTrim(site) : "";
        saleAccount = saleAccount ? strTrim(saleAccount) : "";
        params["saleType"] = saleType;
        params["site"] = site;
        params["sku"] = sku.replace(/\s+/g, "");
        params["saleAccount"] = saleAccount;
        params["categoryId"] = categoryId;
        if (saleAccount === "") {
            message.info("请选择销售账号！");
            return
        }
        if (saleType === "") {
            message.info("请选择销售类型！");
            return
        }
        if (site === "") {
            message.info("请选择站点！");
            return
        }
        if (sku !== "") {
            post(LISTING_DETAIL_LOADING_SKU, params).then(res => {
                if (res && res.state === "000001") {
                    let data = res.data;
                    let images = [];
                    let newImg = data.img ? data.img : [];
                    if (newImg.length > 0) {
                        newImg.forEach((v, i) => {
                            images.push({
                                label: `${i}`,
                                value: `${i}`,
                                url: v
                            })
                        })
                    }
                    data.img = images;
                    this.props.loadingSkuInfoAction({ formObj, data, oldEbayClass: ebayCategoryArr3 });
                    setFieldsValue({
                        "basicData[title]": data.title
                    })
                    message.success("SKU资料加载成功");

                    const { isConditionEnabled, isItemCompatibilityEnabled, isItemSpecificsEnabled, isVariationsEnabled } = data;
                    this.props.getCategorySpecificsAction({ isConditionEnabled, isItemCompatibilityEnabled, isItemSpecificsEnabled, isVariationsEnabled })
                    this.setState({
                        ebayCategory1: data.ebayCategory1,
                        ebayCategory2: data.ebayCategory2
                    })
                }
            })
        } else {
            message.info("SKU不能为空！");
        }
    }

    // 获取当前时间
    handlePlsTime = (date) => {
        if (date) {
            let dateValue = date.locale('zh-cn').valueOf();
            // console.log(dateValue)
            this.props.editComponentDataAction(types.ADD_BASICDATA, 'publishTimeStr', dateValue)
        } else {
            this.props.editComponentDataAction(types.ADD_BASICDATA, 'publishTimeStr', null)
        }

    }

    /**
     * 作者:
     * 描述: 下拉框异步加载数据前的校验函数
     * 时间: 2018/9/3 11:08
     * @param <number> fields 要拦截的字段名集合 "no" 代表不做拦截
     **/
    handleFocusBefore = (fields) => {
        const { site } = this.props.basicObj.basicData;
        const saleAccount = this.props.form.getFieldValue("basicData[saleAccount]")
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
            }
        } else {
            message.warning("校验字段传入格式有误")
        }
        return true
    }
    render() {
        const { listingId, pageType, pageState, ebayCategory1, ebayCategory2 } = this.state;
        const { ebaySiteData } = this.props;
        const { siteTime, subTitleFee, isVariationsEnabled } = this.props.basicObj.anotherData;
        const { saleAccount, site, saleType, title, subtitle, publishTimeStr,
            // shopclassObj1, shopclassObj2
            shopclassArr1, shopclassArr2
        } = this.props.basicObj.basicData;
        const { titleLen, subTitleLen } = this.props.anotherData;
        const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
        return (
            <div className="basic-info">
                <StandardFormRow title="销售账号：" required={true}>
                    <ItemSelect
                        formName="basicData[saleAccount]"   // 表单提交的key
                        disabled={listingId ? true : false}
                        getFieldDecorator={getFieldDecorator} // form双向绑定
                        name="id"   // 显示的名称  默认为name
                        code="id"   // 显示的编码  默认为code
                        url={PUBLISH_EBAYACCOUNT} //  接口名称
                        rules={{
                            initialValue: saleAccount,
                            rules: [{
                                required: true, message: '请选择销售账号',
                            }]
                        }}
                        className={'item-select'}
                        apiListType={2}
                        onChange={(value) => this.getDefaultTemp(value, this.props.basicObj.basicData.site)}
                        onFocusBefore={() => this.handleFocusBefore("no")}
                    />
                </StandardFormRow>
                <StandardFormRow title="站点：" required={true}>
                    <FormItem>
                        {getFieldDecorator('basicData[site]', {
                            initialValue: site,
                            rules: [{
                                required: true,
                                message: '站点为必填项！',
                            }],
                        })(
                            <Select
                                disabled={listingId ? true : false}
                                showSearch
                                style={{ width: 330 }}
                                onChange={this.ebaySiteSelect}
                                placeholder="请选择站点（必填项）"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                notFoundContent={"数据为空"}
                            >
                                {ebaySiteData.map((v, i) => {
                                    return <Option value={v.id} key={i} >{v.name}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                </StandardFormRow>
                <PublishTempContainer
                    {...this.props}
                />
                <StandardFormRow title="销售类型：" required={true}>
                    <FormItem>
                        {getFieldDecorator('basicData[saleType]', {
                            initialValue: saleType,
                            rules: [{
                                required: true,
                                message: '销售类型为必填项！',
                            }],
                        })(
                            <Select
                                showSearch
                                style={{ width: 330 }}
                                onChange={this.saleTypeSelect}
                            >
                                <Option value={1} key={1} >一口价</Option>
                                <Option value={2} key={2} disabled={!isVariationsEnabled}>多属性</Option>
                                <Option value={0} key={3} >拍卖</Option>
                            </Select>
                        )}
                    </FormItem>
                </StandardFormRow>
                {!pageType || pageState === '0' ?
                    <StandardFormRow title="刊登时间：" required={false}>
                        <FormItem>
                            {getFieldDecorator('basicData[publishTime]', {
                                initialValue: publishTimeStr,
                                rules: [{ type: 'object', required: false, message: '刊登时间为必填项!' }],
                            })(
                                <DatePicker
                                    format="YYYY-MM-DD HH:mm:ss"
                                    onChange={this.handlePlsTime}
                                    showTime={true}
                                    style={{ width: 330 }}
                                />
                            )}
                        </FormItem>
                    </StandardFormRow>
                    : null}
                {siteTime && (!pageType || pageState === '0') ?
                    <StandardFormRow title="站点时间：" required={false}>
                        <FormItem>
                            {getFieldDecorator('siteTime', {
                                initialValue: siteTime
                            })(
                                <Input disabled={true} />
                            )}
                        </FormItem>
                    </StandardFormRow>
                    : null}
                <StandardFormRow title="SKU：">
                    <div>
                        <FormItem>
                            {getFieldDecorator('loadingSkuInfo')(
                                <Input
                                    // onChange={(value,option)=>this.handleReduxVal(value,option, -1, 'sku')}
                                    placeholder="请输入公司SKU" />
                            )}
                        </FormItem>
                        <span
                            className="loading-sku-info ebay-font_style"
                            onClick={this.loadingSkuInfo}
                        >加载SKU</span>
                    </div>
                </StandardFormRow>
                <EbayCategoryContainer
                    ebayCategory1={ebayCategory1}
                    ebayCategory2={ebayCategory2}
                    {...this.props}
                />

                <StandardFormRow title="店铺分类：" required={false}>
                    <Tooltip placement="bottom" title={this.state.shopclass1}>
                        <div>
                            <FormItem>
                                <ShopCategory
                                    formName='basicData[shopclass1]'
                                    getFieldDecorator={getFieldDecorator}
                                    url={PUBLISH_STORECLASS} //  接口名称
                                    params={{
                                        "saleAccount": saleAccount ? saleAccount : getFieldValue("basicData[saleAccount]"),
                                        "site": site ? site : getFieldValue("basicData[site]")
                                    }}
                                    rules={{
                                        // initialValue: shopclassObj1 ? [shopclassObj1.id] : "",
                                        rules: [{
                                            required: false, message: '请选择店铺分类',
                                        }]
                                    }}
                                    lst={shopclassArr1}
                                    setFieldsValue={setFieldsValue}
                                    handleFocusBefore={this.handleFocusBefore}
                                    onChange={(value, option) => this.shopclassChange("shopclass1", value, option)}
                                />
                            </FormItem>
                        </div>
                    </Tooltip>
                </StandardFormRow>
                <StandardFormRow title="店铺分类(2)：" required={false}>
                    <Tooltip placement="bottom" title={this.state.shopclass2}>
                        <div>
                            <FormItem>
                                <ShopCategory
                                    formName='basicData[shopclass2]'
                                    getFieldDecorator={getFieldDecorator}
                                    url={PUBLISH_STORECLASS} //  接口名称
                                    params={{
                                        "saleAccount": saleAccount ? saleAccount : getFieldValue("basicData[saleAccount]"),
                                        "site": site ? site : getFieldValue("basicData[site]")
                                    }}
                                    rules={{
                                        // initialValue: shopclassObj2 ? [shopclassObj2.id] : null,
                                        rules: [{
                                            required: false, message: '请选择店铺分类',
                                        }]
                                    }}
                                    lst={shopclassArr2}
                                    setFieldsValue={setFieldsValue}
                                    handleFocusBefore={this.handleFocusBefore}
                                    onChange={(value, option) => this.shopclassChange("shopclass2", value, option)}
                                />
                            </FormItem>
                        </div>
                    </Tooltip>
                </StandardFormRow>
                <StandardFormRow title="标题：" required={true} className="text-area">
                    <div>
                        <div>
                            <FormItem>
                                {getFieldDecorator('basicData[title]', {
                                    initialValue: title,
                                    rules: [{
                                        required: true,
                                        message: "标题为必填项"
                                    }],
                                })(
                                    <TextArea
                                        placeholder="首字母大写，您还可以输入 80 个字符（必填项）"
                                        style={{ width: 330 }}
                                        autosize={{ minRows: 2, maxRows: 6 }}
                                        onChange={(e) => this.textAreaStrLength(e, "title")}
                                    />
                                )}
                            </FormItem>
                            <Button
                                type="default"
                                className="sku-title"
                                onClick={() => this.capitalize("basicData[title]")}
                            >首字母大写</Button>
                        </div>
                        <div>
                            <p className="input-tips">首字母大写，您还可以输入<strong className="text-danger"> {titleLen} </strong>个字符</p>
                        </div>
                    </div>
                </StandardFormRow>
                <StandardFormRow title="副标题：" required={false} className="text-area">
                    <div>
                        <div>
                            <Tooltip
                                overlayClassName="tooltip-style"
                                placement="topLeft"
                                title={subTitleFee ? `使用副标题将花费${subTitleFee}` : ""}
                            >
                                <FormItem>
                                    {getFieldDecorator('basicData[subtitle]', {
                                        initialValue: subtitle,
                                    })(
                                        <TextArea
                                            placeholder="首字母大写，您还可以输入 55 个字符。"
                                            style={{ width: 330 }}
                                            autosize={{ minRows: 2, maxRows: 6 }}
                                            onChange={(e) => this.textAreaStrLength(e, "subtitle")}
                                        />

                                    )}
                                </FormItem>
                                <Button
                                    type="default"
                                    className="sku-title"
                                    onClick={() => this.capitalize("basicData[subtitle]")}
                                >首字母大写</Button>
                            </Tooltip>
                            <p className="input-tips">
                                {subTitleFee ?
                                    <span>收费金额：<strong className="text-danger">{subTitleFee}</strong>，</span>
                                    : null}
                                首字母大写，您还可以输入<strong className="text-danger"> {subTitleLen} </strong>个字符。
                            </p>
                        </div>
                    </div>
                </StandardFormRow>
            </div>
        )
    }
}
