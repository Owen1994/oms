/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/7/7 10:55
 */
import { combineReducers } from 'redux'
import {
    RECEIVE_SPECIMEN_LIST
} from '../constants'
export const datas = (state = { list: []}, action) => {
    switch(action.type) {
        case RECEIVE_SPECIMEN_LIST:
            return action.data
        default:
            return state
    }
};



const rootReducer = combineReducers({
    datas
});
export default rootReducer
