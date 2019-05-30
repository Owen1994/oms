/**
*作者: 任贸华
*功能描述: 优先级数据管理
*参数说明:
*时间: 2018/4/16 11:30
*/
import {
    priorityTableactionInfo
} from '../actions/priority'

function prioritytable(state = {
                            data: [],
                            count: 1,
                            loading:true,
                        }
    , action) {
    switch (action.type) {
        case priorityTableactionInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


const rootReducer = {
   prioritytable
}

export default rootReducer
