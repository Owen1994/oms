import { post } from '../../../../util/axios';
import { PROJECT_FLOW_LIST_API, PLATFORM_LIST_API, USER_GROUP_LIST_API } from '../../../constants/Api'       //新品项目流数据请求接口

export const list = 'list';
export const pagination = 'pagination';
export const list_action = value => ({
    type: list,
    payload: value
})
export const paginationAction = value => ({
    type: pagination,
    payload: value
})

/**
 * 功能：新品项目流页面请求table数据
 * @param {*} param0 
 */
export const list_fetch = ({ name, value }) => (dispatch) => {
    return post(PROJECT_FLOW_LIST_API, value).then(data => {
        if (data.state === '000001') {
            dispatch(list_action({
                [name]: data.data.list,
                loading: false
            }));
            dispatch(paginationAction({
                current: value.pageNumber,
                total: data.data.total,
                pageSize: value.pageData
            }));
        }
    })
};

/**
 * 功能：平台列表数据
 */
export const list_fetch2 = ({ name, value }) => (dispatch) => {
    return post(PLATFORM_LIST_API, value).then(data => {
        if (data.state === '000001') {
            dispatch(list_action({
                [name]: data.data.list,
            }));
        }
    })
};

/**
 * 功能：用户组列表（销售平台）数据
 */
export const list_fetch3 = ({ name, value }) => (dispatch) => {
    return post(USER_GROUP_LIST_API, value).then(data => {
        if (data.state === '000001') {
            dispatch(list_action({
                [name]: data.data.list,
            }));
        }
    })
};

export const actions = {
    list_action,
    paginationAction,
    list_fetch,
    list_fetch2,
    list_fetch3
}

export default actions

