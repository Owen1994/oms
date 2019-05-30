import { combineReducers } from 'redux';

import { levelOptions } from '../../../../util/options';

import {
    auditedTaskInfo,
    historyPricingListInfo,
} from '../constants/ActionTypes';
import { getLoginmsg } from '../../../../util/baseTool';

const getInitPrams = () => ({
    pageNumber: levelOptions('pageInit').pagenum,
    pageData: levelOptions('pageInit').pagedata,
});

const auditedTaskList = (state = {
    loading: false,
    params: {
        ...getInitPrams(),
        state: 0,
        checkPriceType: 0,
        inspector: getLoginmsg().personName,
    },
    list: [],
    total: 0,
}, action) => {
    switch (action.type) {
    case auditedTaskInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};

const historyPricingList = (state = {
    origin: [],
    loading: false,
    params: {
        ...getInitPrams(),
        state: 4,
        checkPriceType: 0,
        inspector: getLoginmsg().personName,
    },
    list: [],
    total: 0,
}, action) => {
    switch (action.type) {
    case historyPricingListInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    auditedTaskList,
    historyPricingList,
});

export default rootReducer;
