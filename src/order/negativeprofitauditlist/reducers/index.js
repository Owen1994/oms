/**
 * 作者: 陈林
 * 描述: 负利润审核模块父组件
 * 时间: 2018/4/18 0018 下午 8:38
 **/
import { combineReducers } from 'redux'
import commonReducer from '../../../common/reducers/commonreducer';
import { 
    RECEIVE_TRIALFREIGHT_LIST,
    LOADING_RECORD_LIST
} from '../constants'
import {
    modalmodelInfo, 
    tablemodelInfo,
    PaginationmodelInfo,
} from '../actions'

function modalmodel(state = {
    title: "提示", ModalText: '内容',
    visible: false,
}
    , action) {
    switch (action.type) {
        case modalmodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function tablemodel(state = {
    data: [],
    count: 0,
    selectedRowKeys:[],
    loading:true,
}
    , action) {
    switch (action.type) {
        case tablemodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function Paginationmodel(state = {
    current: 1,
    total:0,
    pageSize:10,
}
    , action) {
    switch (action.type) {
        case PaginationmodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}



const rootReducer = combineReducers({
    ...commonReducer,
    modalmodel, 
    tablemodel,
    Paginationmodel,
})

export default rootReducer
