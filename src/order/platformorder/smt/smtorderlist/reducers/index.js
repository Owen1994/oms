import {combineReducers} from 'redux'
import commonReducer from '../../../../../common/reducers/commonreducer';
import searchOptReducers from '../../../../../components/searchOpt/reducers'
import {
    baseInfo, modalmodelInfo, tablemodelInfo, PaginationmodelInfo, quickdstate, synchroInfo, placeInfo,
} from '../actions'
import searchValuesReducers from "../../../../../components/searchValues/reducers";


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
                        key:'0',
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

function quickdstateModel(state = {
                            data: [],
                            quickdstate: '',
                            orderstate: [],
                          }
    , action) {
    switch (action.type) {
        case quickdstate:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
function fetchsynchroModel(state = {
                              msg: '订单同步成功！'
                          }
    , action) {
    switch (action.type) {
        case synchroInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function fetchplaceModel(state = {
                               data: [],
                           }
    , action) {
    switch (action.type) {
        case placeInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    ...commonReducer,...searchOptReducers,...searchValuesReducers,Infos, modalmodel, tablemodel,Paginationmodel,quickdstateModel,fetchsynchroModel,fetchplaceModel
})

export default rootReducer
