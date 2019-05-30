/**
 * 作者: pzt
 * 描述: ebay分类数据转换
 * 时间: 2018/8/31 15:57
 * @param <object> basicData 后台返回的原始数据
 **/
import { createSelector } from 'reselect'

const getEbayCategoryData = state=> state.ebayCategoryData
export const parseEbayCategoryData = createSelector(
    [getEbayCategoryData],
    (ebayCategoryData) =>{
        ebayCategoryData.defaultEbayCategory1 = getDefaultEbayCategory(ebayCategoryData.ebayCategoryArr3);
        ebayCategoryData.defaultEbayCategory2 = getDefaultEbayCategory(ebayCategoryData.ebayCategoryArr4);
        return ebayCategoryData
    })

// eBay默认分类数据转换
export const getDefaultEbayCategory = (ebayCategory)=>{
    let classArr = []
    if(ebayCategory && ebayCategory.length === 1){
        getClassItem(classArr,ebayCategory);
    }
    return classArr;
}

const getClassItem = (classArr,obj)=>{
    if(obj){
        classArr.push(obj[0].value);
        return getClassItem(classArr,obj[0].children);
    }
}
// eBay默认分类数据转换
