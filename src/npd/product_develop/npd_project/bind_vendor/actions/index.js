import {post,get} from '../../../../../util/axios'
import {message} from "antd"

// var apiurl = "http://localhost:8282/mockjsdata/18"
var apiurl = ""
export const search = "npd-project-create-bindvendor-search";
export const data = "npd-project-create-bindvendor-changeData";
export const add = "npd-project-create-bindvendor-add";
export const defualtData = "npd-project-create-bindvendor-defualtData";
export const remove = "npd-project-create-bindvendor-remove";
export const clear = "npd-project-create-bindvendor-clear";

//  变化时的数据
var bindvendorChangeAction = (...value)=>{
    return {
        type:data,
        payload:value
    }
}
//  变化时的数据
var bindvendordefualtDataAction = (value)=>{
    return {
        type:defualtData,
        payload:value
    }
}
//  添加
var bindvendorAddAction = ()=>{
    return {
        type:add,
    }
}
//  删除
var bindvendorRemoveAction = (value)=>{
    return {
        type:remove,
        payload:value
    }
}
var bindvendorParamsAction = (value)=>{
    return {
        type:search,
        payload:value
    }
}
// 清空
var bindvendorClearAction = (value)=>{
    return {
        type:clear,
        payload:value
    }
}
var bindvendorParamsActionAsync = (value,i)=>(dispatch)=>{
    var params = {
        vendorsCode:value,
        pageData:20,
        pageNumber:1
    }
    return post(`${apiurl}/pim/motan/service/api/IPimService/getNpsIntentionSupplierList`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            if(result.data && result.data.list && result.data.list.length){
                var d = result.data.list[0]
                dispatch(bindvendorParamsAction({data:d,i}))
            }else {
                var d = {
                    vendorsName:"",
                    contactName:"",
                    contactTel:"",
                    contactQQ:"",
                    address:"",
                }
                dispatch(bindvendorParamsAction({data:d,i}))
            }
        }
    })
}
// 已绑定的供应商 删除接口
var delDindvendorActionAsync = (params,i)=>(dispatch)=>{
    return post(`${apiurl}/pim/motan/service/api/IPimService/getNpsIntentionSupplierList`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            return result
        }
    })
}

const bindvendorSubmitActionAsync = (params)=>(dispatch)=>{
    return post(`${apiurl}/pim/motan/service/api/IPimService/bindingSuppliers`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            message.success(result.msg)
            return true
        }
    })
}
export default {
    bindvendorSubmitActionAsync,
    bindvendorRemoveAction,
    bindvendorAddAction,
    bindvendorChangeAction,
    bindvendorParamsAction,
    bindvendorParamsActionAsync,
    bindvendordefualtDataAction,
    bindvendorClearAction,
    delDindvendorActionAsync
}
