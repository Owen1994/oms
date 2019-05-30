import { combineReducers } from 'redux';

import {
    userRolePermissionInfo,
    userAuthorizablePermissionInfo,
    getRoleList,
    delRole,
} from '../actions';

function userRolePermissionModel(state = [], action) {
    switch (action.type) {
    case userRolePermissionInfo:
        return action.payload;
    default:
        return state;
    }
}
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

function userAuthorizablePermissionModel(state = [], action) {
    switch (action.type) {
    case userAuthorizablePermissionInfo:
        return action.payload;
    case delRole:
        return delRoleInfo(state, action.payload.roleId);
    default:
        return state;
    }
}
function roleListModel(state = [], action) {
    switch (action.type) {
    case getRoleList:
        return action.payload;
    case delRole:
        var i = state.indexOf(action.payload);
        if (i > -1) {
            state.splice(i, 1);
        }
        return [...state];
    default:
        return state;
    }
}


const rootReducer = combineReducers({
    userRolePermissionModel,
    userAuthorizablePermissionModel,
    roleListModel,
});

export default rootReducer;
