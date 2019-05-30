import {post,get} from '../../../../../util/axios'

// var apiurl = "http://localhost:8282/mockjsdata/18"
var apiurl = ""

export const classifyInfo = "npd-fapply-create-classify-Info";

export const searchWarehouse= params => (dispatch)=>{
    return post(`${apiurl}/pim/motan/service/api/IPimService/getNpsWarehouseList`,params)
    .then(data=>{
        if(data && data.state === "000001"){
            return data.data.list
        }
    })
}


const saveProductInfo= params => (dispatch)=>{
    // dispatch(receiveDecalarationList({loading: true}))
    return post(`${apiurl}/pim/motan/service/api/IPimService/editFirstOrderApply`,params)
    .then(data=>{
        if(data && data.state === "000001"){
            return data
        }
        // return dispatch({type: types.RECEIVE_DECALARATION_LIST_FAILED})
    })
}


export default {
    searchWarehouse,
    saveProductInfo,
}
