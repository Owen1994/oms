/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'

export const visibilityFilter = (state = {}, action) => {
    switch(action.type) {
        case 'SHOW_ALL':
            return action.type;
        default:
            return state
    }
};
export const decalarationListModel = (state={
    data: [],
}, action) =>{
    switch (action.type){
        case types.RECEIVE_DECALARATION_LIST:
            return{
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

// 分页数据
const paginationModel = (state = {
                             pageNumber: 1,
                             total: 0,
                             pageSize: 20,
                         }
    , action) => {
    switch (action.type) {
        case "PAGINATION_TYPE":
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
};



const rootReducer = combineReducers({
    visibilityFilter,
    decalarationListModel,
});
export default rootReducer
