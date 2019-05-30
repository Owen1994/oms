import {post,get} from '../../../../../util/axios'
import {api_url} from '../../../../../util/connectConfig'
// import {GET_PRODUCT_CATEGORY_API} from "../../../../constants/Api"
import {message} from "antd"
export const classifyInfo1 = "npd-project-create-classify-Info-1";
export const classifyInfo2 = "npd-project-create-classify-Info-2";
export const classifyInfo3 = "npd-project-create-classify-Info-3";
export const imgInfo = "npd-project-create-img-Info";
const classifyInfoAction = (data) => ({
    type: classifyInfo1,
    payload:data
});
const classifyInfoAction2 = (data) => ({
    type: classifyInfo2,
    payload:data
});
const classifyInfoAction3 = (data) => ({
    type: classifyInfo3,
    payload:data
});
// const classifyInfoActionAsync= params => (dispatch)=>{
//     fetch(GET_PRODUCT_CATEGORY_API).then(data=>{
//         return data.json()
//     })
//     .then(result=>{
//         dispatch(classifyInfoAction(result))
//     })
//     .catch(err=>console.log(err))
// }
const classifyInfoActionAsync= params => (dispatch)=>{
    return post(`${api_url}/pim/motan/service/api/IPimService/getCategoryList`, params)
    .then(data=>{
        if(data && data.state === "000001"){
            dispatch(classifyInfoAction(data.data))
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
const searchProjectFlow = (params) =>dispatch=>{
    return post(`${api_url}/pim/motan/service/api/IPimService/getNpsProjectFlowList`, params)
    .then(data=>{
        if(data && data.state === "000001"){
            return data.data.list
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
const save = (params) =>dispatch=>{
    return post(`${api_url}/pim/motan/service/api/IPimService/addOrUpdateProductApproval`, params)
    .then(data=>{
        if(data.state === "000001"){
            message.success(data.msg)
            return true
        }
        message.error(data.msg)
    })
    .catch(err=>{
        console.log(err)
    })
}
const imgInfoAction =  (data) => ({
    type: imgInfo,
    payload:data
});
export default {
    save,
    classifyInfoAction,
    classifyInfoAction2,
    classifyInfoAction3,
    classifyInfoActionAsync,
    searchProjectFlow,
    imgInfoAction
}
