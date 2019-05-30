import { combineReducers } from 'redux';

import {
    baseInfo, orgsntableInfo, PaginationmodelInfo, treelistInfo,
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

function treelistmodel(state = {
    data: [],
    count: 0,
},
action) {
    switch (action.type) {
    case treelistInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
}

function organtable(state = {
    data: [],
    count: 0,
    loading: false,
},
action) {
    switch (action.type) {
    case orgsntableInfo:
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

const rootReducer = combineReducers({
    Infos, organtable, Paginationmodel, treelistmodel,
});

export default rootReducer;
