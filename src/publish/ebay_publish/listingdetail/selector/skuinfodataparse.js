/**
 * 作者: pzt
 * 描述: 模板信息(skuInfo)数据转换
 * 时间: 2018/8/31 15:57
 * @param <object> skuInfo 后台返回的原始数据
 **/
import { createSelector } from 'reselect'
import { angentPicUrl } from '../../../../util/baseTool'
const getSkuinfoData = state => state.skuinfoData

export const parseSkuInfo = createSelector(
    [getSkuinfoData],
    (skuInfo) => {
        skuInfo.img = handleImgs(skuInfo.img);
        // skuInfo.sellingTimeObj = newSellingTimeObj(skuInfo.sellingTime, skuInfo.sellingTimeObj);

        return skuInfo
    }
)

// SKU图片数据转换
const handleImgs = (imgs)=>{
    if(imgs.length > 0){
        if(!imgs[0].label){
            const images = [];
            const id = (new Date()).valueOf();
            imgs.forEach((v,i)=>{
                images.push({
                    label: `${id}_${i}`,
                    value: `${id}_${i}`,
                    url: angentPicUrl(v)
                })
            });
            return images
        }else{
            return imgs
        }
    }else{
        return imgs
    }
}

// sellingTime 转换成sellingTimeObj
const newSellingTimeObj = (sellingTime, sellingTimeObj) =>{
    let obj = null;
    if(!sellingTime && sellingTimeObj){
        obj = sellingTimeObj
    }
    if(!sellingTime && !sellingTimeObj){
        obj = {id: "", name: ""}
    }
    if(sellingTime && typeof sellingTime === "string"){
        obj = {id: sellingTime, name: ""}
    }
    return obj
}







