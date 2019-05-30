/**
 * 作者: pzt
 * 描述: 模板信息(templateInfo)数据转换
 * 时间: 2018/8/31 15:57
 * @param <object> templateInfo 后台返回的原始数据
 **/
import { createSelector } from 'reselect'
const getTemplateinfoData = state => state.templateinfoData

export const parseTemplateInfo = createSelector(
    [getTemplateinfoData],
    (templateInfo) => {
        // templateInfo.transportTemplate = editFields(templateInfo.transportTemplate);
        // templateInfo.countryObj = stringToObj(templateInfo.country, templateInfo.countryObj, "id", "name");
        // templateInfo.transportTemplate = stringToObj(templateInfo.transportTemplateId, templateInfo.transportTemplate, "tempId", "name");
        // templateInfo.returnTemplate = stringToObj(templateInfo.returnTemplateId, templateInfo.returnTemplate, "tempId", "name");
        // templateInfo.paymentTemplate = stringToObj(templateInfo.paymentTemplateId, templateInfo.paymentTemplate, "tempId", "name");
        // templateInfo.salestax.taxObj = stringToObj(templateInfo.salestax.taxId, templateInfo.salestax.taxObj, "id", "name");
        // templateInfo.returnTemplate = editFields(templateInfo.returnTemplate);
        // templateInfo.paymentTemplate = editFields(templateInfo.paymentTemplate);
        // templateInfo.packageType = packageTypeObj(templateInfo.packageType);
        templateInfo.irregularPackage = isIrregularPackage(templateInfo.irregularPackage);
        return templateInfo
    }
)

// 各模板数据转换
const editFields = (obj)=>{
    if(obj && !obj.hasOwnProperty("tempId")){
        obj = {
            tempId: obj.id,
            name: obj.name
        }
    }
    return obj
}

// 包裹类型数据转换
const packageTypeObj = (s)=>{
    let obj = null;
    if(s === null || typeof s === "string"){
        obj = {
            id: "",
            name: ""
        }
    }else{
        obj = s
    }
    return obj
}

// 不规则包裹类型转换
const isIrregularPackage = (irregularPackage)=>{
    if(irregularPackage === null){
        return null
    }
    if(irregularPackage){
        return 1
    }else{
        return 0
    }
}
// 下拉框id值转换成下拉框初始化值的对象
const stringToObj = (str, strObj, id, name) =>{
    let obj = null;
    if((!str && !strObj) || (!str && strObj[id] === null)){
        obj = {[id]: "", [name]:""}
    }
    if(str && typeof str.toString() === "string" && !strObj){
        obj = {[id]: str, [name]: ""}
    }
    return obj
}


