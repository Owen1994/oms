/**
 *作者: pzt
 *功能描述:  模板管理 reducers
 *参数说明:
 *时间: 2018/7/27 15:48
 */
import * as ActionType from "../constants/index"

import { combineReducers } from 'redux'


export const matchListData = (state = {
    total: 0,
    data: [],
    loading: true,
}, action) => {
    switch (action.type) {
        case ActionType.RECEIVE_MATCH_LIST:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state
    }
};
const rootReducer = combineReducers({
    matchListData,
});

export default rootReducer
