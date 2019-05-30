/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/7/7 10:55
 */
import { combineReducers } from 'redux'
import {
    RECEIVE_TRACK_LIST,
    ADD_ITEM,
    DELETE_ITEM,
    INIT_ITEM,
} from '../constants'

export const datas = (state = { list: [], total: 0 }, action) => {
    switch(action.type) {
        case RECEIVE_TRACK_LIST:
            return action.data;
        default:
            return state
    }
};

export const applyDatas = (state = [], action) => {
    switch(action.type) {
        case ADD_ITEM:
            return [...state, ...action.data];
        case DELETE_ITEM:
            const newArray = [...state];
            newArray.splice(action.index, 1);
            return newArray;
        case INIT_ITEM:
            if(!Array.isArray(action.data)){
                return [action.data]
            }
            return action.data;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    datas,
    applyDatas
});

export default rootReducer
