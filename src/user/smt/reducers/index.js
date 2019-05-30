import {combineReducers} from 'redux'
import {
    baseInfo, modalmodelInfo, tablemodelInfo, PaginationmodelInfo, quickdstate, synchroInfo, placeInfo,tablemodelInfo2,
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

function tablemodel(state = {
                        data:[],
                        count: 0,
                        loading:false,
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

function modalmodel(state = {
    title: "提示", ModalText: '内容',
    visible: false, previewVisible: false, visible2: false, jsbuttionVisible: false,
                        submitVisible: false,remarksvisible:false,devanningvisible:false,
    addproductvisible:false,
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


function tablemodel2(state = {
    data2: [],
    count: 2,
}
    , action) {
    switch (action.type) {
        case tablemodelInfo2:
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
    tablemodel,Paginationmodel,modalmodel,Infos,tablemodel2

})

export default rootReducer
