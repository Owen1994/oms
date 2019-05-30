/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--全部订单--reducer
 *参数说明:
 *时间: 2018/5/28 10:16
 */
import {combineReducers} from 'redux'
import commonReducer from '../../../common/reducers/commonreducer';
import searchCountryReducers from '../../../components/searchCountry/reducers'
import searchValuesReducers from '../../../components/searchValues/reducers'
import {
    baseInfo, modalmodelInfo, tablemodelInfo, PaginationmodelInfo,
} from '../actions'

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
                        selectedRowKeys: [],
                        loading: true,
                        active: 1
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
    ...commonReducer, ...searchCountryReducers, ...searchValuesReducers, Infos, modalmodel, tablemodel, Paginationmodel,
})

export default rootReducer
