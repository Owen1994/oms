/**
*作者: 任贸华
*功能描述: 管理过滤器数据
*参数说明:
*时间: 2018/4/16 11:30
*/
import {
    filterTableactionInfo
} from '../actions/filter'

function filtertable(state = {
                            data: [],
                            count: 1,
                            loading:true,
                        }
    , action) {
    switch (action.type) {
        case filterTableactionInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


const rootReducer = {
   filtertable
}

export default rootReducer
