import {post,get} from '../../../../../util/axios'
import {message} from "antd"
var apiurl = ""
export const submit = "npd-project-create-check_specimen-submit";

var checkSpecimenSubmitActionAsync = (value)=>(dispatch)=>{
    return post(`${apiurl}/pim/motan/service/api/IPimService/generationSamples`,value)
    .then(result=>{
        if(result && result.state === "000001" ){
            message.success(result.msg)
            return result
        }
    })
}

export default {
    checkSpecimenSubmitActionAsync
}
