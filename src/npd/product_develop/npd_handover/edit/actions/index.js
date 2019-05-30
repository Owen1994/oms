import {post,get} from '../../../../../util/axios'

// var apiurl = "http://localhost:8282/mockjsdata/18"
var apiurl = ""

export const classifyInfo = "npd-handover-create-classify-Info";

const classifyInfoAction = (data) => ({
    type: createInfo,
    payload:data
});

const saveProductInfo= params => (dispatch)=>{
    // dispatch(receiveDecalarationList({loading: true}))
    return post(`${apiurl}/pim/motan/service/api/IPimService/saveProductDelivery`,params)
    .then(data=>{
        if(data && data.state === "000001"){
            return data
        }
        // return dispatch({type: types.RECEIVE_DECALARATION_LIST_FAILED})
    })
}


export default {
    saveProductInfo,
}
