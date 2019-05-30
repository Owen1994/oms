/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/7/7 10:55
 */
import { combineReducers } from 'redux'
import {
    RECEIVE_HOT_NPD_APPLY_LIST,
    ADD_AND_EDIT_ITEM,
    GET_HOT_NPD_APPLY_LIST
} from '../constants'

export const datas = (state = { list: [] }, action) => {
    switch(action.type) {
        case RECEIVE_HOT_NPD_APPLY_LIST:
            if(!action.data.list){
                return { list: [] };
            }
            return action.data;
        default:
            return state
    }
};

export const loadState = (state = {loading: false}, action) => {
    switch(action.type) {
        case GET_HOT_NPD_APPLY_LIST:
            return action
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    datas,
    loadState
});
export default rootReducer
