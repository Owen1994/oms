
import axios from '../../../util/axios';
import { api_url } from '../../../util/connectConfig';

export var getRoleList = 'getRoleList';
export var getAllRoleListData = 'getAllRoleListData';
export var setDefault = 'setDefault';
export var setSource = 'setSource';
export var delRole = 'delRole';
export var addSearch = 'addSearch';
export var clearAll = 'clearAll';
/**
 *作者: 魏洁
 *功能描述: 清除数据
 *参数说明:
 */
export const clearAllAction = () => (
    {
        type: clearAll,
    }
);
/**
 *作者: 魏洁
 *功能描述: 角色列表
 *参数说明:
 */
export const getRoleListAction = payload => (
    {
        type: getRoleList,
        payload,
    }
);
/**
 *作者: 魏洁
 *功能描述: 删除当前角色
 *参数说明:
 */
export const delRoleAction = payload => (
    {
        type: delRole,
        payload,
    }
);
/**
 *作者: 魏洁
 *功能描述: 数据源
 *参数说明:
 */
export const getSourceAction = payload => (
    {
        type: setSource,
        payload,
    }
);
/**
 *作者: 魏洁
 *功能描述: 添加搜索数据
 *参数说明:
 */
export const addSearchDataAction = payload => (
    {
        type: addSearch,
        payload,
    }
);
/**
 *作者: 魏洁
 *功能描述: 所有角色数据
 *参数说明:
 */
export const getAllRoleListDataAction = payload => (
    {
        type: getAllRoleListData,
        payload,
    }
);
/**
 *作者: 魏洁
 *功能描述: 默认值设置
 *参数说明:
 */
export const setDefaultAction = payload => (
    {
        type: setDefault,
        payload,
    }
);
/**
 *作者: 魏洁
 *功能描述: 增加查询用户到列表
 *参数说明:
 */
export const getRoleUserActionAsync = value => (dispatch, getState) => axios.post(`${api_url}/urc/motan/service/api/IUrcService/getRoleUser`, value)
    .then((response) => {
        if (response.status == 200) {
            if (response.data.state == '000001') {
                const data = response.data.data;
                dispatch(getAllRoleListDataAction(data));
                if (data && data.length == 1) {
                    const lstUserName = data[0].lstUserName.map(v => ({
                        name: v,
                        key: v,
                    }));
                    dispatch(getSourceAction(lstUserName));
                    dispatch(setDefaultAction(data[0]));
                }
                return response.data.data;
            }
        }
    }).catch((e) => {
        console.log(e);
    });

/**
 *作者: 魏洁
 *功能描述: 保存分配用户角色
 *参数说明:
 */
export const saveUserByListAsync = value => (dispatch, getState) => axios.post(`${api_url}/urc/motan/service/api/IUrcService/updateUsersOfRole`, value)
    .then((response) => {
        if (response.status == 200) {
            if (response.data.state == '000001') {
                return response.data.msg;
            }
        }
    }).catch((e) => {
        console.log(e);
    });
/**
 *作者: 魏洁
 *功能描述: 搜索用户列表
 *参数说明:
 */
export const searchUserByListAsync = value => (dispatch, getState) => axios.post(`${api_url}/urc/motan/service/api/IUrcService/getUserByUserName`, value)
    // getUserByUserName fuzzySearchUsersByUserName getUserByUserInfo getUsersByUserInfo
    .then((response) => {
        if (response.status == 200) {
            if (response.data.state == '000001') {
                let data = response.data.data || [];
                data = data.map(v => ({
                    name: v.userName,
                    key: v.userName,
                }));
                dispatch(addSearchDataAction(data));
                return data;
            }
        }
    }).catch((e) => {
        console.log(e);
    });

const actions = {
    clearAllAction,
    getAllRoleListDataAction,
    getRoleListAction,
    getRoleUserActionAsync,
    saveUserByListAsync,
    searchUserByListAsync,
    getSourceAction,
    delRoleAction,
    addSearchDataAction,
    setDefaultAction,
};

export default actions;
