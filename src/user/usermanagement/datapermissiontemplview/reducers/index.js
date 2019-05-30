/**
 *作者: 唐峰
 *功能描述: 渠道标记详情列表页reducer
 *参数说明:
 *时间: 2018/4/4 9:23
 */
import { combineReducers } from 'redux';
import commonReducer from '../../../../common/reducers/commonreducer';
import searchOptReducers from '../../../../components/searchOpt/reducers';
import searchValuesReducers from '../../../../components/searchValues/reducers';

import {
    baseInfo, modalmodelInfo, tablemodelInfo, PaginationmodelInfo, autdetInfo, projectInfo,
} from '../actions';
import { RECEIVE_TEMPL_RULE_DATA } from '../constants';

function Infos(state = {
    sysArr: [],
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

function modalmodel(state = {
    title: '渠道标记配置',
    ModalText: '内容',
    visible: false,
},
action) {
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


// tablelist组件数据 reducers
function tablemodel(state = {
    data: [],
    count: 0,
    selectedRowKeys: [],
    loading: true,
			            active: 1,
},
action) {
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


// 方案名称
function project(state = {
    sysIndex: 0,
},
action) {
    switch (action.type) {
    case projectInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
}

// 授权详情
function autdet(state = {
    sysIndex: 0,
    leftArr: [],
},
action) {
    switch (action.type) {
    case autdetInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
}

const templData = (state = { lstDataRuleSys: [] }, action) => {
    switch (action.type) {
    case RECEIVE_TEMPL_RULE_DATA:
        return {
            ...state,
            ...action.data,
        };
    default:
        return state;
    }
};
const rootReducer = combineReducers({
    ...commonReducer,
    ...searchOptReducers,
    ...searchValuesReducers,
    Infos,
    modalmodel,
    tablemodel,
    Paginationmodel,
    project,
    autdet,
    templData,
});

export default rootReducer;
