import {comInfo,loadingInfo} from "../action/index"

var defaultProjectInfo =  {
    IPRInof:{},  //知识产权信息
    basicInfo:{},  //产品基础信息
    deliverDetail:{},  //交接主明细
    logisticsInfo:{},  //产品物流信息
    review:[], //审核记录
}
const projectInfo = (state = defaultProjectInfo, action) => {
    switch(action.type) {
        case comInfo:
            return {
                ...state,
                ...action.payload
            }
        case comInfo:
            return defaultProjectInfo
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
    projectInfo,
    loading
}