/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import { combineReducers } from 'redux'
import {tableData,loading,platform,markup, selectPlat } from "../actions/index"
import {levelOptions} from "../../../util/options"
import commonReducer from '../../../common/reducers/commonreducer';
import filter from "./filter"

var initPrams = {
    pageNumber:levelOptions('pageInit').pagenum,
    pageData:levelOptions('pageInit').pagedata
}

const npdProjecListData = (state = { params:initPrams,list:[],total:1},action)=>{
    switch(action.type) {
        case tableData:
            return {
                ...state,
                ...action.payload
            };
        default :
            return state
    }
}
const platformData = (state = [] , action)=>{
    switch(action.type) {
        case platform:
            return action.payload
        default :
            return state
    }
}

const loadingData = (state = false , action)=>{
    switch(action.type) {
        case loading:
            return action.payload
        default :
            return state
    }
}

const markupData = (state = {} , action)=>{
    switch(action.type) {
        case markup:
            return action.payload
        default :
            return state
    }
}

const platformSelected = (state = '', action) => {
    switch(action.type) {
        case selectPlat:
            return action.payload
        default :
            return state
    }
}

export default combineReducers({
    ...commonReducer,
    ...filter,
    npdProjecListData,
    loadingData,
    platformData,
    markupData,
    platformSelected,
})