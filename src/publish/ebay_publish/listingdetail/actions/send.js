import { fetchPost } from '../../../../util/fetch'
import { post } from '../../../../util/axios';
import { message } from 'antd';
import {
    LISTING_DETAIL_ADD_AND_EDIT,
    LISTING_DETAIL_SKU_ISEXIST
} from '../constants/api'
import {
    SAVE_SENDFORM_DATA,
    SKU_ISEXIST,
} from '../constants/reducerTypes'
import {
    isPublishSave,
    parseParams,
    isSkuExistSend,
} from '../selector/send'

const receiveSkuExistResult = (data, dispatch) => {
    dispatch({
        type: SKU_ISEXIST,
        data
    })
}

export const isSkuExistAction = (listingId, values) => (dispatch, getState) => {
    const result = isSkuExistSend(getState(), values)
    if (result.state !== 1) {
        receiveSkuExistResult({ type: "isSkuExistAction", ...result }, dispatch)
        return Promise.resolve()
    }
    const params = {};
    const state = getState()
    params.saleAccount = values.saleAccount;
    params.site = state.basicData.site;
    params.sellerSku = values.sellerSku || state.skuinfoData.sellerSku;
    params.listingId = listingId;
    return fetchPost(LISTING_DETAIL_SKU_ISEXIST, params).then(res => {
        return receiveSkuExistResult({ type: "isSkuExistAction", ...res }, dispatch);
    })
}
const receiveSendResult = (data, dispatch) => {
    dispatch({
        type: SAVE_SENDFORM_DATA,
        data
    })
}

export const sendFormAction = (type, formObj, pageInfo) => (dispatch, getState) => {
    const store = getState()
    let result = {
        state: 1
    }
    if (type === 2) {  // 2保存刊登
        result = isPublishSave(store, formObj)
    }
    if (result.state !== 1) {
        return receiveSendResult(result, dispatch)
    }
    let params = {};
    let cancatObj = parseParams(getState(), formObj, type, pageInfo);
    if (cancatObj === 'samepropsname') {
        return 'samepropsname';
    }
    params["basicData"] = formObj.basicData;
    params["skuInfo"] = formObj.skuInfo;
    params["productAttr"] = cancatObj.productAttr;
    params["productInfo"] = cancatObj.productInfo;
    params["templateInfo"] = formObj.templateInfo;
    params["buyerPolicy"] = formObj.buyerPolicy;
    params["editType"] = cancatObj.editType;
    params["listingId"] = cancatObj.listingId;
    params["itemId"] = cancatObj.itemId;
    params["basicData"]["publishTime"] = cancatObj.publishTime;
    params["basicData"]["ebayCategoryId1"] = formObj.ebayCategoryId1;
    params["basicData"]["ebayCategoryId2"] = formObj.ebayCategoryId2;
    params["basicData"]["publishTemplId"] = cancatObj.publishTemplId;
    params["templateInfo"]["paymentTemplateId"] = cancatObj.paymentTemplateId;
    params["templateInfo"]["returnTemplateId"] = cancatObj.returnTemplateId;
    params["templateInfo"]["transportTemplateId"] = cancatObj.transportTemplateId;
    params["templateInfo"]["packageType"] = cancatObj.packageType;
    params["skuInfo"]["sellingTimeObj"] = cancatObj.sellingTimeObj;
    params["skuInfo"]["itemConditionObj"] = cancatObj.itemConditionObj;
    params["skuInfo"]["bestOffer"] = cancatObj.bestOffer;
    params["skuInfo"]["variationInfo"] = cancatObj.variationInfo ? cancatObj.variationInfo : null;

    params["skuInfo"]["img"] = cancatObj.img;
    params["skuInfo"]["upcOrEan"] = cancatObj.upcOrEan;
    params["buyerPolicy"]["privacy"] = cancatObj.privacy;
    if (cancatObj.productAttr.length > 25) {
        message.info('产品属性总数超出25项，无法继续保存或刊登！');
        return;
    }
    const initData = store.initData
    const delVlist = store.delVlist
    // 非编辑状态下 不进入
    if (initData) {
        const delFields = params.delFields = {}
        let variationDetailList = [];
        const saleType = initData.basicData.saleType;
        // 非 多属性状态下 不进入
        if (saleType === 2) {
            try {
                const newSpecificName = params.skuInfo.variationInfo.specificName
                const specificName = initData.skuInfo.variationInfo.specificName
                let newMainPic = JSON.parse(params.skuInfo.variationInfo.mainPic)
                let newSpecificSetJson = JSON.parse(params.skuInfo.variationInfo.specificSetJson)
                if (specificName === newSpecificName && delVlist.length) {
                    // const mainPic = JSON.parse(initData.skuInfo.variationInfo.mainPic)
                    // const filterMainPic = mainPic.filter(v => {
                    //     return !newMainPic.find(val => val.specificValue === v.specificValue)
                    // })
                    newMainPic.push(...delVlist.map(v => {
                        return {
                            specificValue: v[specificName],
                            pic: [v._images || v.img]
                        }
                    }))
                    newSpecificSetJson[specificName].push(...delVlist.map(v => v[specificName]))

                }
                params.skuInfo.variationInfo.mainPic = JSON.stringify(newMainPic)
                params.skuInfo.variationInfo.specificSetJson = JSON.stringify(newSpecificSetJson)
                const newVariationDetail = params.skuInfo.variationInfo.variationDetail
                // const variationDetail = initData.skuInfo.variationInfo.variationDetail


                // if (params.basicData.saleType === 1 && saleType === 2) {
                //     variationDetailList = variationDetail.map(v => v.sellerSku)
                // } else 
                if (params.basicData.saleType === 2) {
                    const list = delVlist
                    // variationDetail.filter(v => {
                    //     return !newVariationDetail.find(val => val.sellerSku === v.sellerSku)
                    // })
                    newVariationDetail.push(...list)
                    variationDetailList = list.map(v => v.sellerSku)
                }

            } catch (err) {
                variationDetailList = [];
                console.log(err)
            }
            delFields.variationDetailList = variationDetailList
        }

    }
    // console.log("params", params)
    return fetchPost(LISTING_DETAIL_ADD_AND_EDIT, params, 2).then(res => {
        if (res && res.state === "000001") {
            return receiveSendResult({ type: "sendFormAction", ...res, resultType: type }, dispatch);
        }
    })
}
