import {post} from '../../../../../util/axios'
import {api_url} from '../../../../../util/connectConfig'
import {changeLoading} from "../../common/action/index"
import {datasaddkey} from '../../../../../util/baseTool'
// var api_url = "http://localhost:8282/mockjsdata/18"
export const tableData = "npd-project-tableData";

const tableDataAction = (data) => ({
    type: tableData,
    payload:data
});

const tableDataActionAsync= params => (dispatch)=>{
    dispatch(changeLoading( true))

    post(`${api_url}/pim/motan/service/api/IPimService/getProductApprovalList`, params).then(data=>{
        if(data && data.state === "000001"){
            dispatch(tableDataAction({
                list:datasaddkey(data.data.list),
                total:data.data.total
            }))
            dispatch(tableDataAction({params}))
        }
        dispatch(changeLoading( false))
    })
    .catch(err=>{
        dispatch(changeLoading( false))
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

const searchUserList = (params) =>dispatch=>{
    return post(`${api_url}/pim/motan/service/api/IPimService/getNpsUserList`, params)
    .then(data=>{
        if(data && data.state === "000001"){
            return data.data.list
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

var reviewActionAsync = (params)=>(dispatch)=>{
    return post(`${api_url}/pim/motan/service/api/IPimService/auditConfirmWithComment`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            return result
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
var generateDeliverysAsync = (params)=>(dispatch)=>{
    return post(`${api_url}/pim/motan/service/api/IPimService/generateDeliverys`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            return result
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
var delActionAsync = (params)=>(dispatch)=>{
    return post(`${api_url}/pim/motan/service/api/IPimService/deleteProductApproval`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            return result
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
export default {
    delActionAsync,
    searchUserList,
    searchProjectFlow,
    tableDataAction,
    tableDataActionAsync,
    reviewActionAsync,
    generateDeliverysAsync
}
