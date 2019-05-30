
import axios from '../../../util/axios';
import { api_url } from '../../../util/connectConfig';
// mock请求接口  暂用
// var api_url_1 = 'http://localhost:8282/mockjsdata/7';
export const userAuthorizablePermissionInfo = 'userAuthorizablePermissionInfo';
export const userRolePermissionInfo = 'userRolePermissionInfo';
export const getRoleList = 'getRoleList';
export const delRole = 'delRole';
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
 *功能描述: 角色能授权的功能权限
 *参数说明:
 */
export const getUserAuthorizablePermissionAction = payload => (
    {
        type: userRolePermissionInfo,
        payload,
    }
);
export const getUserAuthorizablePermissionAsync = value => (dispatch, getState) => axios.post(`${api_url}/urc/motan/service/api/IUrcService/getUserAuthorizablePermission`, value)
    .then((response) => {
        if (response.status == 200) {
            if (response.data.state == '000001') {
                let data = response.data.data;
                data = data.map((v) => {
                    try {
                        v.sysContext = JSON.parse(v.sysContext);
                        return v;
                    } catch (e) {
                        throw e;
                    }
                });
                dispatch(getUserAuthorizablePermissionAction(data));
            }
        }
    }).catch((e) => {
        console.log(e);
    });
/**
 *作者: 魏洁
 *功能描述: 角色已有的功能权限
 *参数说明:
 */
export const getUserRolePermissionAction = payload => (
    {
        type: userAuthorizablePermissionInfo,
        payload,
    }
);
export const getUserRolePermissionAsync = value => (dispatch, getState) => axios.post(`${api_url}/urc/motan/service/api/IUrcService/getRolePermission`, value)
    .then((response) => {
        if (response.status == 200) {
            if (response.data.state == '000001') {
                const data = response.data.data;
                data.forEach((element) => {
                    element.selectedContext = element.selectedContext.map((val) => {
                        try {
                            val.sysContext = JSON.parse(val.sysContext);
                            return val;
                        } catch (e) {
                            throw e;
                        }
                    });
                });
                dispatch(getUserRolePermissionAction(data));
                return response.data.data;
            }
        }
    }).catch((e) => {
        console.log(e);
    });

/**
 *作者: 魏洁
 *功能描述: 保存角色的功能权限
 *参数说明:
 */
export const saveUserAuthorizablePermissionAsync = value => (dispatch, getState) => axios.post(`${api_url}/urc/motan/service/api/IUrcService/updateRolePermission`, value)
    .then((response) => {
        if (response.status == 200) {
            if (response.data.state == '000001') {
                return true;
            }
        }
        return false;
    }).catch((e) => {
        console.log(e);
    });

const actions = {
    getUserAuthorizablePermissionAction,
    getUserAuthorizablePermissionAsync,
    getUserRolePermissionAction,
    getUserRolePermissionAsync,
    saveUserAuthorizablePermissionAsync,
    getRoleListAction,
    delRoleAction,
};

export default actions;
