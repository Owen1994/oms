import {comInfo,loadingInfo} from "../action/index"
const projectInfo = (state = {
    applyDetail:{},  //申请主明细
    productInfo:[], //产品信息
    review:[], //审核记录
}, action) => {
    switch(action.type) {
        case comInfo:
            return action.payload
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