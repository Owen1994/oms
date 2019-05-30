/**
*作者: 任贸华
*功能描述: 指定发货仓数据管理
*参数说明:
*时间: 2018/4/16 11:30
*/
import {combineReducers} from 'redux'
import commonReducer from '../../../common/reducers/commonreducer';
import searchValuesReducers from '../../../components/searchValues/reducers'
import {
    baseInfo, modalmodelInfo, tablemodelInfo, PaginationmodelInfo
} from '../actions'
import filterReducers from './filter'
import priorityReducers from './priority'
import warehouseruleReducers from './warehouserule'


function Infos(state = {}, action) {
    switch (action.type) {
        case baseInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function modalmodel(state = {
                        title: "提示", ModalText: '内容',
                        visible: false, filtervisible: false, priorityvisible: false
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
                        count: 1,
                        selectedRowKeys: [],
                        loading: true,
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
                             total: 0,
                             pageSize: 10,
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
    ...commonReducer, ...searchValuesReducers, ...filterReducers, ...priorityReducers, ...warehouseruleReducers,
    Infos,
    modalmodel,
    tablemodel,
    Paginationmodel,
})

export default rootReducer
