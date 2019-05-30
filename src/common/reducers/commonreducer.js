/**
*作者: 任贸华
*功能描述: 全局菜单数据
*参数说明:
*时间: 2018/4/16 10:52
*/
import {commonSelectDatas} from '../actions/commonactions';

function commonSelectData(state = {
                          data: [],
                      }
    , action) {
    switch (action.type) {
        case commonSelectDatas:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

const rootReducer = {
    commonSelectData,
}

export default rootReducer
