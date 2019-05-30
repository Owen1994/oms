import {
    combineReducers,
} from 'redux';

import {
    getRoleList,
    getAllRoleListData,
    setSource,
    setDefault,
    clearAll,
    addSearch,
    delRole,
} from '../actions';

// 删除关联角色信息
function delRoleInfo(state, id) {
    let i = 0; const l = state.length;
    for (;i < l; i++) {
        if (state[i].roleId === id) {
            state.splice(i, 1);
            return [...state];
        }
    }
    return [...state];
}

// 获取角色关联的用户
function userByRoleIdModel(state = [], action) {
    switch (action.type) {
    case getAllRoleListData:
        return action.payload;
    case delRole:
        return delRoleInfo(state, action.payload.roleId);
    case clearAll:
        return [];
    default:
        return state;
    }
}
// 获取角色列表
function userListModel(state = [], action) {
    switch (action.type) {
    case getRoleList:
        return action.payload;
    case delRole:
        var i = state.indexOf(action.payload);
        if (i > -1) {
            state.splice(i, 1);
        }
        return [...state];
    case clearAll:
        return [];
    default:
        return state;
    }
}

// 搜索时去重
function distinct(state, data) {
    const name = data.name;


    let i = 0;


    const l = state.length;
    for (;i < l; i++) {
        if (name === state[i].name) {
            return state;
        }
    }
    return [...state, ...data];
}
// 设置数据源
function sourceModel(state = [], action) {
    switch (action.type) {
    case setSource:
        return action.payload;
    case addSearch:
        return distinct(state, action.payload[0]);
    case clearAll:
        return [];
    default:
        return state;
    }
}
// 设置默认值
function targetKeysModel(state = {lstUser: [], lstUserName: []}, action) {
    switch (action.type) {
    case setDefault:
        return action.payload;
    case clearAll:
        return {lstUser: [], lstUserName: []};
    default:
        return state;
    }
}
const rootReducer = combineReducers({
    userByRoleIdModel,
    userListModel,
    targetKeysModel,
    sourceModel,
});

export default rootReducer;
