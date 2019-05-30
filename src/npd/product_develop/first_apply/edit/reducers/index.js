import {comInfo} from "../../common/action/index"
const npdProjectCreateDatas = (state = {
    projectDetail:{}, //基础信息
    market:{},
    review:[], //审核记录
    supplier:[] // 供应商
}, action) => {
    switch(action.type) {
        default:
            return state
    }
};
export default {
    npdProjectCreateDatas,
}