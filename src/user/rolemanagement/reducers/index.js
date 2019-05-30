import { combineReducers } from 'redux';

import {
    baseInfo, roletableInfo, PaginationmodelInfo, deletemodalInfo, copymodalInfo,
} from '../actions';

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

function roletable(state = {
    data: [],
    count: 0,
    loading: false,
},
action) {
    switch (action.type) {
    case roletableInfo:
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
    pageSize: 20,
},
action) {
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
function deletemodel(state = {
    title: '提示',
    ModalText: '内容',
    visible: false,
},
action) {
    switch (action.type) {
    case deletemodalInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
}
function copymodel(state = {
    title: '复制角色',
    ModalText: '内容',
    visible: false,
},
action) {
    switch (action.type) {
    case copymodalInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
}

const rootReducer = combineReducers({
    Infos, roletable, Paginationmodel, deletemodel, copymodel,
});

export default rootReducer;
