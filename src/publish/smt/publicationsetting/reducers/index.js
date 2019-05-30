import {combineReducers} from 'redux'
import {
    baseInfo,settingtableInfo,PaginationmodelInfo,modalmodelInfo,PaginationmodelInfo2,settingtantableInfo
} from '../actions'
import {modalmodelInfo3} from "../../../../order/orderconsignee/actions";
function Infos(state = {
    params:{
        publishState:"0",
        searchType:"0"
    }
}, action) {
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

//查看列表弹窗
function modalmodelsetting(state = {
                         title: "导入", ModalText: '内容',
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
function settingtablemodule(state = {
                                data:[],
                                count: 0,
                                loading:false,
                            }
    , action) {
    switch (action.type) {
        case settingtableInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
function settingtantablemodule(state = {
                                data:[],
                                count: 0,
                                loading:false,
                            }
    , action) {
    switch (action.type) {
        case settingtantableInfo:
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
                             pageSize:20,
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
function Paginationmodel2(state = {
                             current: 1,
                             total:0,
                             pageSize:20,
                         }
    , action) {
    switch (action.type) {
        case PaginationmodelInfo2:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
 Infos,settingtablemodule,Paginationmodel,modalmodelsetting,Paginationmodel2,settingtantablemodule
})

export default rootReducer
