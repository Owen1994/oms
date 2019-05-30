/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import { combineReducers } from 'redux'
import {tableData} from "../actions/index"
import {levelOptions} from "../../../../../util/options"
import {filterParams} from "../../../../../util/baseTool"

var initPrams = {
    pageNumber:levelOptions('pageInit').pagenum,
    pageData:levelOptions('pageInit').pagedata
}

const npdListData = (state = { params:initPrams,list:[],total:0},action)=>{
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
export default {
    npdListData
}