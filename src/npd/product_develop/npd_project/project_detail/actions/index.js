import {post,get} from '../../../../../util/axios'

var apiurl = "http://localhost:8282/mockjsdata/18"
export const classifyInfo = "npd-project-create-classify-Info";

const classifyInfoAction = (data) => ({
    type: createInfo,
    payload:data
});

const classifyInfoActionAsync= params => (dispatch)=>{
    // dispatch(receiveDecalarationList({loading: true}))
    get(`http://bbplatform.kokoerp.com/?c=api_sku&a=getCategoryList&key=f0940767c6e96e25905a7180a477139d`, {
        params
    }).then(data=>{
        
        if(data && data.state === "000001"){
        }
        // return dispatch({type: types.RECEIVE_DECALARATION_LIST_FAILED})
    })
}


export default {
    classifyInfoAction,
    classifyInfoActionAsync
}
