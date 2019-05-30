/**
 * 作者: pzt
 * 描述: 模板信息(skuInfo)数据转换
 * 时间: 2018/8/31 15:57
 * @param <object> skuInfo 后台返回的原始数据
 **/
import { createSelector } from 'reselect'
import { angentPicUrl } from '../../../../util/baseTool'
const getVlist = state => state.vlist
const getVrelationship = state => state.vrelationship

export const parseVimgs = createSelector(
    [getVlist,getVrelationship],
    (vlist,vrelationship) => {
        let specificName = vrelationship.specificName;
        return getImgList(vlist,specificName)
    }
)



const getImgList = (dataSource,currentProp)=>{
    let propNames = [];
    let imagesObj = [];
    let uniqueArr = [];
    let uniqueObj = {};
    dataSource.forEach(item=>{
        if(item[currentProp]){
            propNames.push({
                prop: item[currentProp],
                images: angentPicUrl(item.images)
            })
        }
    })
    // propNames = Array.from(new Set(propNames));
    propNames.forEach(v=>{ // 数组对象去重
        if(!uniqueObj[v.prop]){
            uniqueArr.push(v)
            uniqueObj[v.prop] = true
        }
    })
    uniqueArr.forEach((v,i)=>{
        imagesObj.push({
            key: i,
            primeAttrVal: v.prop,
            images:  angentPicUrl(v.images)
        })
    });
    return imagesObj
}


