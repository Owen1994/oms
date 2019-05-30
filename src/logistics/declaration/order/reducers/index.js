/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import { combineReducers } from 'redux'
import {
    RECEIVE_CHECK_LIST,
    RECEIVE_CUSTOMS_DOCUMENT,
    RECEIVE_EDIT_DOCUMENT_COLUMNS,
    EDIT_DOCUMENT_COLUMN,
    GET_SELECT_LIST,
} from '../constants'
import { LOADING_STATE, LOADED_STATE } from "../../../constant";
import countryObj from '../../../common/selectListModal/reducers'

export const customsDocument = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_CUSTOMS_DOCUMENT:
            return action.data.data;
        case EDIT_DOCUMENT_COLUMN:
            const obj = state[action.key];
            obj[action.name] = action.value;
            return state;
        default:
            return state;
    }
};

export const editColumnsState = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_EDIT_DOCUMENT_COLUMNS:
            return action.data;
        default:
            return state;
    }
};

export const checkList = (state = [], action) => {
    switch(action.type) {
        case RECEIVE_CHECK_LIST:
            return action.data.data;
        default:
            return state
    }
};

export const loadState = (state={}, action) => {
    switch (action.type){
        case LOADED_STATE:{
            const rType = action.rType;
            state[rType] = LOADED_STATE;
            return state;
        }
        case LOADING_STATE:{
            const rType = action.rType;
            state[rType] = LOADING_STATE;
            return state;
        }
        default:
            return state;
    }
};

export const selectData = (state={}, action) => {
    switch (action.type) {
        case GET_SELECT_LIST:
            state[action.data.sType] = action.data.list;
            return {...state};
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    customsDocument,
    editColumnsState,
    checkList,
    loadState,
    selectData,
    ...countryObj
});

export default rootReducer
