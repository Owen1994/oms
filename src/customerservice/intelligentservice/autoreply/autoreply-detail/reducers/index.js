import { combineReducers } from 'redux';
import {
    receiveListInfo,
    platformListInfo,
    configurationInfo,
    plateInfo,
} from '../actions/index';

// 列表数据reducer
export const autoreplyDtailList = (state = {
    list: [],
    total: 0,
    params: {
        pageNumber: 1,
        pageData: 20,
    },
    loading: false,
}, action) => {
    switch (action.type) {
    case receiveListInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};

export const platformList = (state = [], action) => {
    switch (action.type) {
    case platformListInfo:
        return action.payload;
    default:
        return state;
    }
};

// 根据平台板块获取可选条件配置信息
export const configurationData = (state = [], action) => {
    switch (action.type) {
    case configurationInfo:
        return action.payload;
    default:
        return state;
    }
};

export const plateList = (state = [], action) => {
    switch (action.type) {
    case plateInfo:
        return action.payload;
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    autoreplyDtailList,
    platformList,
    configurationData,
    plateList,
});

export default rootReducer;
