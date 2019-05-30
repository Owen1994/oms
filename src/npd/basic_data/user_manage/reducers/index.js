import { combineReducers } from 'redux'
import { list, pagination ,list2, pagination2, list3, pagination3 } from '../actions'

// 列表
const list_reducer = (
    state = {
        data: [],
        user_data: [],
        all_user_data: [],
        loading: true,
    }, action) => {
    switch (action.type) {
        case list:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state
    }
};
const list_reducer2 = (
    state = {
        data: [],
        platform_data: [],
        loading: true,
    }, action) => {
    switch (action.type) {
        case list2:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state
    }
};
const list_reducer3 = (
    state = {
        data: [],
        userGroup_data: [],
        loading: true,
    }, action) => {
    switch (action.type) {
        case list3:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state
    }
};

//分页
const paginationReducer = (
    state = {
        current: 1,
        total: 0,
        pageSize: 20,
    }
    , action) => {
    switch (action.type) {
        case pagination:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
const paginationReducer2 = (
    state = {
        current: 1,
        total: 0,
        pageSize: 20,
    }
    , action) => {
    switch (action.type) {
        case pagination2:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
const paginationReducer3 = (
    state = {
        current: 1,
        total: 0,
        pageSize: 20,
    }
    , action) => {
    switch (action.type) {
        case pagination3:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    list_reducer,
    paginationReducer,
    list_reducer2,
    paginationReducer2,
    list_reducer3,
    paginationReducer3,
});
export default rootReducer
