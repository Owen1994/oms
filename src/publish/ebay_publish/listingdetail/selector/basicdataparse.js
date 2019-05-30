/**
 * 作者: pzt
 * 描述: 基本资料数据转换
 * 时间: 2018/8/31 15:57
 * @param <object> basicData 后台返回的原始数据
 **/
import { createSelector } from 'reselect'
import moment from 'moment';
import {timestampFromat} from "../../../../util/baseTool";

const getBasicData = state => state.basicData
const getAnother = state => state.anotherData

export const parseBasicData = createSelector(
    [getBasicData,getAnother],
    (basicData, anotherData) => {
        const publishTime = basicData.publishTimeStr;
        const newSiteTime = siteTime(basicData.site, publishTime);
        //const title = basicData.title ? basicData.title : "";
        //const subtitle = basicData.subtitle ? basicData.subtitle : "";
        basicData.publishTimeStr = publishTime ? moment(publishTime) : null;
        // basicData.publishTime = publishTime ? publishTime : null;
        // basicData.publishTemplObj = stringToObj(basicData.publishTemplId, basicData.publishTemplObj, "id", "name");
        basicData.shopclassObj1 = newObj(basicData.shopclassObj1);
        basicData.shopclassObj2 = newObj(basicData.shopclassObj2);
        // basicData.autoPartsObj = stringToObj(basicData.autoPartsId,basicData.autoPartsObj,"autoPartsId","autoPartsName");
        anotherData.siteTime = newSiteTime ? timestampFromat(newSiteTime,2): null;
        //anotherData.titleLen = 80 - title.length;
        //anotherData.subTitleLen = 55 - subtitle.length;
        anotherData.subTitleFee = getInfosFee(basicData.site).subTitleFee;
        anotherData.largePhotoFee = getInfosFee(basicData.site).largePhotoFee;
        return {basicData, anotherData}
    }
)

/**
 * 作者: pzt
 * 描述: siteTime 站点时间换算
 * 时间: 2018/8/30 16:43
 * @param <string> siteId  当前所选站点Id
 * @param <string> currentTime  当前所选刊登时间(时间戳形式)
 **/
const siteTime = (siteId, currentTime)=>{
    if(siteId && currentTime){
        let time = null;
        if(siteId === "0" || siteId === "100" || siteId === "2"){
            // 0US 100Motors 2CA
            time = currentTime - 12*60*60*1000;
            return time
        }
        if(siteId === "77" || siteId === "71" || siteId === "101" || siteId === "186"){
            // 77DE 71FR 101IT 186ES
            time = currentTime - 6*60*60*1000;
            return time
        }
        if(siteId === "3"){
            // 3UK
            time = currentTime - 7*60*60*1000;
            return time
        }
        if(siteId === "15"){
            // 15AU
            time = currentTime + 2*60*60*1000;
            return time
        }
    }
    return null
}

/**
 * 作者: pzt
 * 描述: 根据站点 展示副标题/大图展示 所需费用
 * 时间: 2018/9/2 16:03
 * @param <string> site 站点id
 **/
const getInfosFee = (siteId)=>{
    let subTitleFee = null;
    let largePhotoFee = null;
    if(siteId){
        if(siteId === "0" || siteId === "2" || siteId === "100"){
            // 0US 2CA 100Motors
            return {
                subTitleFee: "$1.50",
                largePhotoFee: "$1.00"
            }
        }
        if(siteId === "15"){
            // 15AU
            return {
                subTitleFee: "$2.00",
                largePhotoFee: "$0.00"
            }
        }
        if(siteId === "186"){
            //186ES
            return {
                subTitleFee: "$1.52",
                largePhotoFee: "$0.00"
            }
        }
        if(siteId === "3"){
            // 3UK
            return {
                subTitleFee: "￡1.00",
                largePhotoFee: "￡2.50"
            }
        }
        if(siteId === "77"){
            // 77DE
            return {
                subTitleFee: "€1.00",
                largePhotoFee: "€2.50"
            }
        }
        if(siteId === "101" || siteId === "71"){
            // 101IT 71FR
            return {
                subTitleFee: "$€1.20",
                largePhotoFee: "€0.00"
            }
        }
    }
    return {
        subTitleFee, largePhotoFee
    }
}

// 汽配档案数据转换
const editFields = (obj)=>{
    if(obj && !obj.hasOwnProperty("autoPartsId")){
        obj = {
            autoPartsId: obj.id,
            autoPartsName: obj.name
        }
    }
    return obj
}

// 下拉框id值转换成下拉框初始化值的对象
const stringToObj = (str, strObj, id, name) =>{
    let obj = null;
    if((!str && !strObj) || (!str && strObj.id === null)){
        obj = {[id]: "", [name]:""}
    }
    if(str && typeof str === "string" && !strObj){
        obj = {[id]: str, [name]: ""}
    }
    return obj
}

// 下拉框对象里面的null值处理
const newObj = (obj)=>{
    if(obj && !obj.id){
        obj.id = "";
        obj.name = "";
    }
    return obj
}
