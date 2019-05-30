import {post} from '../../../../../util/axios'
import {api_url} from '../../../../../util/connectConfig'
import {datasaddkey} from '../../../../../util/baseTool'

// var api_url = "http://localhost:8282/mockjsdata/18"
export const tableData = "npd-handover-tableData";

const tableDataAction = (data) => ({
    type: tableData,
    payload:data
});

const tableDataActionAsync= params => (dispatch)=>{
    // dispatch(receiveDecalarationList({loading: true}))
    
    post(`${api_url}/pim/motan/service/api/IPimService/getProductDeliveryList`, params).then(data=>{
        if(data && data.state === "000001"){
            dispatch(tableDataAction({
                list:datasaddkey(data.data.data),
                total:data.data.total
            }))
        }
        // return dispatch({type: types.RECEIVE_DECALARATION_LIST_FAILED})
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

export default {
    searchUserList,
    searchProjectFlow,
    tableDataAction,
    tableDataActionAsync
}