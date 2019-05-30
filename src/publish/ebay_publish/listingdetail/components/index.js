import React from 'react'
import { Link } from 'react-router-dom'
import qs from 'qs'
import {
    Tabs,
    Form,
    Button,
    message,
    Popover
} from 'antd'
const TabPane = Tabs.TabPane;
import Functions from '../../../../components/functions'
import BasicInfo from '../containers/basicinfo'
import ProductAttr from '../containers/productattr'
import SkuInfo from '../containers/skuinfo'
import ProductDesc from '../containers/productinfo'
import TemplateInfo from '../containers/templateinfo'
import BuyersPolicy from '../containers/buyerpolicy'
import '../css/css.css'
import { strTrim, deepCopyobject } from "@/util/baseTool";
import { post } from "../../../../util/axios";
import * as types from "../../../common/constants/actionTypes";

class App extends React.Component {

    state = {
        ebaySiteData: [],        // ebay 站点数据
        listingId: null,          // 页面listingId
        itemId: null,            // 页面itemId
        pageType: null,          // 页面类型 复制/修改/新增
        btnLoading: false,      // 保存草稿箱的按钮loading
        btnLoading1: false,      // 刊登的按钮loading
        loadingSkuClass: {},  // 加载SKU资料获取ebay分类
        PopoverVisible: false,  // 控制气泡框显示隐藏
        popoverTitle: "",       // 气泡框提示内容
    }

    componentDidMount() {
        // 获取浏览器url参数
        const locationArr = window.location.href.split('?');
        let paramsObj = locationArr.length > 1 ? qs.parse(locationArr[1]) : '';
        const listingId = paramsObj['id'] ? paramsObj['id'] : '';
        let itemId = paramsObj['itemid'] ? paramsObj['itemid'] : null;
        const plsState = paramsObj['state'] ? paramsObj['state'] : '';
        const pageType = paramsObj['type'] ? paramsObj['type'] : '';
        if (/^null$/.test(itemId)) {
            itemId = null;
        }
        // 公共接口数据初始化（eBay 站点，账号，分类）
        const sitePromise = post(types.PUBLISH_EBAYSITE, {}).then(res => {
            if (res && res.state === "000001") {
                this.setState({
                    ebaySiteData: res.data
                })
                return res.data
            }
        })
        this.setState({
            listingId: listingId,
            itemId: itemId,
            pageType: pageType,
        })
        let params = {};
        params["listingId"] = listingId;
        params["state"] = plsState;
        if (listingId) {
            const detailPromise = this.props.getListingDetailDataAction(params)
                .then(r => {
                    if (r) {
                        if (pageType === "edit") {
                            this.props.setInitDetail(deepCopyobject(r))
                        }
                        return r
                    }
                })
            Promise.all([sitePromise, detailPromise])
                .then(([siteList = [], detail]) => {
                    let site = detail.basicData.site
                    let upcOrEan = detail.basicData.upcOrEan
                    let upcOrEanVal = detail.basicData.upcOrEanVal
                    if (!upcOrEan || !upcOrEanVal) {
                        const siteData = siteList.find(v => v.id === site)
                        if (siteData) {
                            upcOrEan = siteData.upcOrEan;
                            upcOrEanVal = siteData.upcOrEanVal;
                        }
                    }
                    this.props.initUpcOrEanAction({ site, upcOrEan, upcOrEanVal })
                })
                .catch(err => { })
        }
    }
    componentWillReceiveProps(nextProps) {
        const sendResult = nextProps.sendResult;
        const prevSendResult = this.props.sendResult;
        if (sendResult !== prevSendResult) {
            switch (sendResult.type) {
                case "isSkuExistAction":
                    this.parseSkuExist(sendResult)
                    break;
                case "sendFormAction":
                    this.parseSendResult(sendResult)
                    break;
            }
        }
    }
    componentWillUnmount() {
        this.props.resetDetailDataAction()
    }
    parseSendResult = (res) => {
        if (res.resultType === 1) {
            if (res && res.state === "000001") {
                message.success(res.msg);
                this.setState({
                    btnLoading: false
                });
                setTimeout(() => {
                    location.href = "/publish/listing/list/"
                }, 1200)
            } else {
                this.setState({
                    btnLoading: false
                })
            }
        } else {
            if (res && res.state === "000001") {
                message.success(res.msg);
                this.setState({
                    PopoverVisible: false
                });
                setTimeout(() => {
                    location.href = "/publish/listing/list/?plsStateId=1"
                }, 1500)
            } else {
                message.info(res.msg);
                this.setState({
                    btnLoading1: false,
                })
            }
        }

    }
    parseSkuExist = (res) => {
        if (res && res.state === "000001") {
            if (res.data.exist) {
                let title = this.isRiskSku(res.data.riskLevel);
                if (title === "绝对禁售" || title === "高风险禁售") {
                    title = `Seller SKU为${title}且已经存在，无法继续刊登！`;
                } else if (title === "高风险可售" || title === "低风险可售") {
                    title = `Seller SKU为${title}且已经存在，是否继续刊登？`;
                } else {
                    title = "Seller SKU已经存在，是否继续刊登？";
                }
                this.setState({
                    PopoverVisible: true,
                    popoverTitle: title
                })
            } else {
                let title = this.isRiskSku(res.data.riskLevel);
                if (title === "绝对禁售" || title === "高风险禁售") {
                    return message.info(`Seller SKU为${title}，无法继续刊登！`);
                }
                if (title === "高风险可售" || title === "低风险可售") {
                    message.info(`Seller SKU为${title}，继续刊登中...`);
                }
                this.handleSubmit()
            }
        } else {
            message.error(res.msg);
            this.setState({
                btnLoading1: false,
            })
        }
    }
    // 判断是否敏感SKU
    isRiskSku = (riskLevel) => {
        let title = "";
        if (riskLevel === 1) {
            return title = "绝对禁售"
        } else if (riskLevel === 2) {
            return title = "高风险禁售"
        } else if (riskLevel === 3) {
            return title = "高风险可售"
        } else if (riskLevel === 4) {
            return title = "低风险可售"
        }
        return title
    }

    // 保存为草稿
    saveAsDraft = () => {
        const { validateFields } = this.props.form;
        const { sellerSku } = this.props.skuInfo;
        const { pageType, listingId, itemId } = this.state;  // 页面信息
        const pageInfo = { pageType, listingId, itemId };
        const saleType = this.props.form.getFieldValue("basicData[saleType]");
        validateFields((errors, values) => {
            if (errors && errors.basicData && errors.basicData.saleAccount) {
                return message.info("请选择销售账号！")
            }
            if (errors && errors.basicData && errors.basicData.site) {
                return message.info("请选择站点！")
            }
            if (sellerSku && sellerSku.length > 50 && saleType !== 2) {
                return message.info("sellerSku 长度不能超过50个字符！");
            }
            if (!errors) {
                this.props.sendFormAction(1, values, pageInfo);
            } else {
                //sku信息 - 多属性关系 中属性名相同时不弹出"必填项信息不完整，保存草稿中..."提示
                let saveResult = this.props.sendFormAction(1, values, pageInfo);
                if (saveResult === 'samepropsname') {
                    return;
                }
                if (saveResult instanceof Promise) {
                    saveResult.finally(() => {
                        this.setState({
                            btnLoading1: false
                        })
                    })
                }
                message.info("必填项信息不完整，保存草稿中...")
            }
        })
    }

    // 保存并刊登
    handleSubmit = () => {
        const { validateFieldsAndScroll } = this.props.form;
        const { pageType, listingId, itemId } = this.state;  // 页面信息
        const pageInfo = { pageType, listingId, itemId }
        validateFieldsAndScroll({ force: true }, (err, values) => {
            // 需要单独处理的必填项（店铺分类、SKU图片、描述内容）
            if (err) {
                this.setState({
                    btnLoading1: false
                })
                if (err && err.templateInfo && err.templateInfo.country) {
                    return message.info("请选择国家！")
                }
            }
            if (!err) {
                //sku信息 - 多属性关系 中属性名相同时
                let saveResult = this.props.sendFormAction(2, values, pageInfo);
                if (saveResult === 'samepropsname') {
                    this.setState({
                        btnLoading1: false
                    })
                    return;
                }
                if (saveResult instanceof Promise) {
                    saveResult.finally(() => {
                        this.setState({
                            btnLoading1: false
                        })
                    })
                }
            } else {
                return message.info("页面必填项内容未填写完整，无法保存刊登")
            }
        })
    }


    handleSelect = (value, type) => {
        if (type === "ebayAccount") {  // 多选情况时生效
            if (value.length > 10) {
                message.warning("最多只能选择10个销售账号！");
                delete value[value.length - 1];
            }
        }
    }

    // 供子组件调用的方法，用于改变最外层状态
    getStateChange = (obj) => {
        this.setState(obj)
    }
    /**
     * 作者: pzt
     * 描述: 动态获取下拉框数据
     * 时间: 2018/8/1 15:01
     * @params <Array> data 后台返回的数据
     * @params <url> 获取数据的API
     **/
    getSelectOpt = (url, data, type) => {
        const { getFieldValue } = this.props.form;
        let params = {};
        let site = getFieldValue("basicData[site]");
        let saleAccount = getFieldValue("basicData[saleAccount]");
        // let ebayCategoryId1 = getFieldValue("ebayCategoryId1") ? getFieldValue("ebayCategoryId1") : "";  // 获取最后一级分类
        site = site ? strTrim(site) : "";
        saleAccount = saleAccount ? strTrim(saleAccount) : "";
        if (type === "saleAccount") {
            site = "无需验证站点";
            saleAccount = "无需验证账号";
        }
        if (saleAccount === "") {
            message.info("请先选择销售账号！");
            return
        }
        if (site === "") {
            message.info("请先选择站点！");
            return
        }
        if (type === "String") {
            params["site"] = site;
            params["saleAccount"] = saleAccount;
        }
        if (type === "Array") {
            params["site"] = [site];
            params["saleAccount"] = [saleAccount];
            params["pageNumber"] = 1;
            params["pageData"] = 9999;
        }

        post(url, params).then(res => {
            if (res && res.state === "000001") {
                if (type === "saleAccount") {
                    let data = [];
                    res.data.map(v => {
                        data.push({
                            id: v.id,
                            name: v.id
                        })
                    });
                }
                if (type === "String") {
                    if (res.data.length > 0) {
                        this.setState({
                            [data]: res.data
                        })
                    } else {
                        this.setState({
                            [data]: [{
                                id: '',
                                name: ''
                            }]
                        })
                    }
                }
                if (type === "Array") {
                    let newData = [];
                    if (res.data.data.length > 0) {
                        res.data.data.map(v => {
                            newData.push({
                                id: v.tempId,
                                name: v.name
                            })
                        })
                    }
                    this.setState({
                        [data]: newData
                    })
                }
            }
        })
    }

    // Popover气泡卡片确定
    confirm = () => {
        this.setState({
            PopoverVisible: false
        });
    }
    // Popover气泡卡片取消
    cancel = () => {
        this.setState({
            PopoverVisible: false,
            btnLoading1: false
        });
    }

    skuIsExist = () => {
        const { getFieldValue } = this.props.form;
        const { listingId } = this.state;
        const saleAccount = getFieldValue("basicData[saleAccount]");
        const sellerSku = getFieldValue("skuInfo[sellerSku]");
        const values = { saleAccount, sellerSku };
        this.setState({
            btnLoading1: true
        })
        let saleType = getFieldValue('basicData[saleType]')
        if (saleType === 2 || saleType === 0) {
            this.handleSubmit()
            return;
        }
        this.props.isSkuExistAction(listingId, values)
            .finally(() => {
                this.setState({
                    btnLoading1: false
                })
            })
    }

    render() {
        const { ebaySiteData, btnLoading, btnLoading1, loadingSkuClass, itemId } = this.state;
        const locationArr = window.location.href.split('?');
        let paramsObj = locationArr.length > 1 ? qs.parse(locationArr[1]) : '';
        let plsState = paramsObj['state'] ? paramsObj['state'] : '';
        let type = paramsObj['type'] ? paramsObj['type'] : '';

        const PopoverContent = (
            <div className="ebay-listing-detail_pop overflow-hidden">
                <div className="pull-left btn">
                    <Button type="primary" onClick={this.handleSubmit}>确认</Button>
                </div>
                <div className="pull-right btn">
                    <Button type="default" onClick={this.cancel}>取消</Button>
                </div>
            </div>
        );

        return (
            <Functions {...this.props} isPage={true} functionkey="008-000001-000001-000001-001">
                <div className="ebay-listing-detail_container">
                    <Form layout="inline">
                        <div className="ebay-listing-detail_content padding-sm-bottom">
                            <Tabs onChange={this.tabsHandle} type="card" defaultActiveKey="1" >
                                <TabPane tab="基本资料" key="1" forceRender={true}>
                                    <BasicInfo
                                        {...this.props}
                                        ebaySiteData={ebaySiteData}
                                        handleSelect={this.handleSelect}
                                        getSelectOpt={this.getSelectOpt}
                                        loadingSkuClass={loadingSkuClass}
                                    />
                                </TabPane>
                                <TabPane tab="产品属性" key="2" forceRender={true}>
                                    <ProductAttr
                                        {...this.props}
                                        getStateChange={this.getStateChange}
                                    // lastCategoryId={lastCategoryId}
                                    />
                                </TabPane>
                                <TabPane tab="SKU信息" key="3" forceRender={true}>
                                    <SkuInfo
                                        {...this.props}
                                        itemId={itemId}
                                    />
                                </TabPane>
                                <TabPane tab="产品描述" key="4">
                                    <ProductDesc
                                        {...this.props}
                                    />
                                </TabPane>
                                <TabPane tab="模板信息" key="5" forceRender={true}>
                                    <TemplateInfo
                                        {...this.props}
                                    />
                                </TabPane>
                                <TabPane tab="买方政策" key="6" forceRender={true}>
                                    <BuyersPolicy
                                        {...this.props}
                                    />
                                </TabPane>
                            </Tabs>
                        </div>
                        <div className="ebay-listing-detail_btns text-right margin-sm-top">
                            {plsState === "0" || plsState === "" || type === "copy" ?
                                <Button
                                    type="default"
                                    className="margin-ms-right"
                                    loading={btnLoading}
                                    onClick={this.saveAsDraft}
                                >
                                    保存为草稿
                                </Button>
                                : null}
                            <Popover content={PopoverContent}
                                className="ebay-pop"
                                title={this.state.popoverTitle}
                                trigger="click"
                                visible={this.state.PopoverVisible}>
                                <Button
                                    type="primary"
                                    onClick={this.skuIsExist}
                                    loading={btnLoading1}
                                >
                                    保存并刊登
                                </Button>
                            </Popover>
                            <span >
                                <Link className={"ant-btn ant-btn-default"} to={"/publish/listing/list/"}>返回</Link>
                            </span>
                        </div>
                    </Form>
                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)
