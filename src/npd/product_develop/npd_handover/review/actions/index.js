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

// 带产权保存接口
var reviewIPRActionAsync = (params)=>(dispatch)=>{
    return post(`${apiurl}/pim/motan/service/api/IPimService/updateProductDelivery`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            return true
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

export default {
    reviewActionAsync,
    reviewIPRActionAsync
}
