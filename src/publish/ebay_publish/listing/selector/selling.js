import { createSelector } from 'reselect'
import { angentPicUrl, timestampFromat } from '../../../../util/baseTool'
import defaultPng from '../../../common/constants/imgs/default.png'
import { parseSaleType } from './index'

const getSellingData = state => state.tablemodel

/**
 * 转换正在销售数据
 */
export const parseSellingData = createSelector(
    [getSellingData],
    sellingData => {
        sellingData.lst = sellingData.lst.map((item, index) => {
            item.key = item.listingId
            item.isChildren = false
            if(item.img){
                item.img = angentPicUrl(item.img)
            } else {
                item.img = defaultPng
            }
            if(!item.oneClass) {
                item.oneClass = '--'
            }
            item.firstListTime = timestampFromat(item.firstListTime,2)
            item.saleTypeStr = parseSaleType(item.saleType)
            if(item.children&&item.children.length>0){ // 多属性明细
                item.sellerSkuStr = item.children[0].sellerSkuStr
                item.children = parseVariationDetail(item, item.children)
                // item.img =  item.children[0].img
            }
            return item
        })
        return sellingData
    }
)

const parseVariationDetail = (data, variationDetail) => {
    return variationDetail.map((item, index) => {
        item.key = data.listingId + '' + index; 
        item.itemIdStr = data.itemIdStr
        item.saleType  = data.saleType
        if(item.img){
            item.img = angentPicUrl(item.img)
        } else {
            item.img = defaultPng
        }
        item.creates    = '--'
        item.operation  = '--'
        item.basicInfo  = '--'
        item.isChildren = true
        item.currencyCode = data.currencyCode
        return item
    })
}
/**
 * 批量操作校验是否通过
 * @param {*} datas 
 */
export const isPassBatchParams = (datas) => {
    const result = { flag: false, msg: ''}
    if(datas.length < 1){
        result.msg = '请选择批量操作项'
    } else {
        if(datas.some(it => it.saleType==='0')){
            result.msg = '不能操作销售类型为拍卖的数据'
        } else{
            result.flag = true;
        }
    } 
    return result
}

/**
 * 转换批量操作数据
 * @param {*} datas 
 */
export const parseBatchParams = (datas) => {
    const params = { itemId: [], skus: [], type: []}
    datas.forEach(item => {
        if(item.children && item.children.length > 0){
            let arr = [];
            item.children.map(v=>arr.push(v.sellerSkuStr));
            params.skus.push(arr.join(','));
        }else{
            params.skus.push(item.sellerSkuStr);
        }
        params.itemId.push(item.itemIdStr)
        params.type.push(item.saleType)
    })
    return params
}

/**
 * 批量复制合法性校验
 */
export const isPassBatchCopy = (datas) => {
    const result = { flag: false, msg: ''}
    if(datas.length < 1){
        result.msg = '请选择批量操作项'
    }else if(datas.length === 1) {
        result.flag = true
    } else {
        const item1 = datas[0]
        if(datas.some(it => it.site!==item1.site)){
            result.msg = '仅支持相同站点的listing复制'
        } else {
            result.flag = true;
        }
    }
    return result
}
