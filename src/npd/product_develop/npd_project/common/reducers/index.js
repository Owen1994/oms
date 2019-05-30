import {comInfo,loadingInfo,clearDetail} from "../action/index"

var infoDefault = {
    projectDetail:{}, //基础信息
    market:{},
    review:[], //审核记录
    supplier:[] // 供应商
}
const projectInfo = (state = infoDefault, action) => {
    switch(action.type) {
        case comInfo:
            return {
                ...state,
                ...action.payload
            }
        case clearDetail:
            return infoDefault
        default:
            return state
    }
};
const loading = (state=false,action)=>{
    switch(action.type) {
        case loadingInfo:
            return action.payload
        default:
            return state
    }
}
export default {
    loading,
    projectInfo,
}