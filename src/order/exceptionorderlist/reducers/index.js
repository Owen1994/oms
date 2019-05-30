import { combineReducers } from 'redux'
import commonReducer from '../../../common/reducers/commonreducer';
import searchCountryReducers from '../../../components/searchCountry/reducers'
import searchValuesReducers from '../../../components/searchValues/reducers'
import {
    baseInfo, modalmodelInfo, tablemodelInfo, PaginationmodelInfo, exceptiontypeInfo
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

function exceptiontypemodel(state = "0", action) {
    switch (action.type) {
        case exceptiontypeInfo:
            return action.payload;
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
    active: 1,
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
    ...commonReducer,
    ...searchCountryReducers,
    ...searchValuesReducers,
    Infos,
    modalmodel,
    tablemodel,
    Paginationmodel,
    exceptiontypemodel
})

export default rootReducer
