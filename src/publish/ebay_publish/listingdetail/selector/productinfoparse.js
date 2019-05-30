import { createSelector } from 'reselect'

/**
 * 作者: pzt
 * 描述: 产品描述(productInfo)数据转换
 * 时间: 2018/8/31 15:57
 * @param <object> productInfo 后台返回的原始数据
 **/
const getProductinfoData = state => state.productinfoData

export const parseProductInfo = createSelector(
    [getProductinfoData],
    (productInfo) => {
        productInfo.defaultDescriptionContent = productInfo.defaultDescriptionContent
        productInfo.descriptionContent = productInfo.descriptionContent;
        productInfo.descriptionTemplateObj = editFields(productInfo.descriptionTemplateObj);
        return productInfo
    }
)

// 修改字段名称
const editFields = (obj)=>{
    if(obj && !obj.hasOwnProperty("tempId")){
        obj = {
            tempId: obj.id,
            name: obj.name
        }
    }
    return obj
}
