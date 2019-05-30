import {post,get} from '../../../../../util/axios'

var apiurl = ""

var reviewActionAsync = (params)=>(dispatch)=>{
    return post(`${apiurl}/pim/motan/service/api/IPimService/auditConfirmWithComment`,params)
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
    reviewActionAsync
}
