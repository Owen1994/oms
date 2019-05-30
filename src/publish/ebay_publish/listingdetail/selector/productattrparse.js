/**
 * 作者: pzt
 * 描述: 产品属性(productAttr)数据转换
 * 时间: 2018/8/31 15:57
 * @param <object> productAttr 后台返回的原始数据
 **/
import { createSelector } from 'reselect'
const getProductAttr = state => state.productattrData

export const parseProductAttr = createSelector(
    [getProductAttr],
    (productAttr) =>{
        return productAttr
    }
)
