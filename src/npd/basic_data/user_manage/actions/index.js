import { post } from '../../../../util/axios'

import {
    USER_LIST_API,      //用户列表
    PLATFORM_LIST_API,  //平台列表
    USER_GROUP_LIST_API,//用户组列表
    ALL_USER_LIST_API,
} from '../../../constants/Api'

export const list = 'list';     //列表
export const pagination = 'pagination';     //分页
export const list2 = 'list2';
export const pagination2 = 'pagination2';
export const list3 = 'list3';
export const pagination3 = 'pagination3';

export const list_action = value => ({
    type: list,
    payload: value
});
export const list_action2 = value => ({
    type: list2,
    payload: value
});
export const list_action3 = value => ({
    type: list3,
    payload: value
});

export const paginationAction = value => ({
    type: pagination,
    payload: value
})
export const paginationAction2 = value => ({
    type: pagination2,
    payload: value
})


export const paginationAction3 = value => ({
    type: pagination3,
    payload: value
})

/**
 * 功能：用户列表tab请求table数据
 */
export const list_fetch1 = ({ name, value }) => (dispatch) => {
    return post(USER_LIST_API, value).then(data => {
        if (data.state === '000001') {
            dispatch(list_action({
                [name]: data.data.list,
                loading: false
            }));
            dispatch(paginationAction({
                current: value.pageNumber,
                total: data.data.total,
                pageSize: value.pageData
            }))
        }
    })
};

/**
 * 功能：平台列表tab请求table数据
 */
export const list_fetch2 = ({ name, value }) => (dispatch) => {
    return post(PLATFORM_LIST_API, value).then(data => {
        if (data.state === '000001') {
            dispatch(list_action2({
                [name]: data.data.list,
                loading: false
            }));
            dispatch(paginationAction2({
                current: value.pageNumber,
                total: data.data.total,
                pageSize: value.pageData
            }))
        }
    })
};

/**
 * 功能：用户组列表tab请求table数据
 */
export const list_fetch3 = ({ name, value }) => (dispatch) => {
    return post(USER_GROUP_LIST_API, value).then(data => {
        if (data.state === '000001') {
            dispatch(list_action3({
                [name]: data.data.list,
                loading: false
            }));
            dispatch(paginationAction3({
                current: value.pageNumber,
                total: data.data.total,
                pageSize: value.pageData
            }))
        }
    })
};

/**
 * 功能：用户列表新增窗口请求用户名
 */
export const list_fetch4 = ({ name, value }) => (dispatch) => {
    return post(ALL_USER_LIST_API, value).then(data => {
        if (data.state === '000001') {
            dispatch(list_action({
                [name]: data.data.list,
            }));
        }
    })
};


const actions = {
    list,
    list2,
    list3,
    pagination,
    pagination2,
    pagination3,
    list_action,
    list_action2,
    list_action3,
    paginationAction,
    paginationAction2,
    paginationAction3,
    list_fetch1,
    list_fetch2,
    list_fetch3,
    list_fetch4,
};

export default actions



