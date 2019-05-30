import {
    GET_LIST_API,
    GET_PLATFORM_API,
    GET_SEARCH_API,
    GET_DETAIL_API,
    GET_TOGGLE_RULE_API,
    GET_VARIAYE_LIST_API,
    GET_FONT_LIMIT_API,
} from '../constants/Api';
import { fetchPost } from '../../../../../util/fetch';

export const receiveListInfo = 'receive_list';
export const RECEIVE_DETAIL = 'receive_detail';
export const platformListInfo = 'platformListInfo';

// 请求列表action
const receiveList = payload => ({
    payload,
    type: receiveListInfo,
});

// 请求列表数据方法
const queryList = params => (dispatch) => {
    dispatch(receiveList({
        loading: true,
    }));
    return fetchPost(GET_LIST_API, params, 2)
        .then((result) => {
            if (result.state === '000001') {
                const data = result.data;
                dispatch(receiveList({
                    params,
                    list: data.data || [],
                    total: data.total,
                }));
            }
        })
        .finally(() => {
            dispatch(receiveList({
                loading: false,
            }));
        });
};
// 请求列表action
const platformListAction = payload => ({
    payload,
    type: platformListInfo,
});


// 请求平台数据方法
const queryPlatformListAsync = () => dispatch => fetchPost(GET_PLATFORM_API, { commonStatus: 1 }, 2)
    .then((result) => {
        if (result.state === '000001') {
            const data = result.data;
            dispatch(platformListAction(data));
        }
    });

const queryConfigurationAsync = params => () => fetchPost(GET_SEARCH_API, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            const plate = params.plate;
            return (result.data && result.data[plate]) || [];
        }
    });

// 获取详情
const getDetailAsync = params => () => fetchPost(GET_DETAIL_API, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            const data = result.data || {};
            // dispatch(platformListAction(data));
            return data;
        }
    });

// 开启 / 关闭  规则状态
const toggleRuleAsync = params => () => fetchPost(GET_TOGGLE_RULE_API, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            return result;
        }
    });

// 变量规则获取
const getVariayeAsync = params => () => fetchPost(GET_VARIAYE_LIST_API, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            return (result && result.data && result.data.list) || [];
        }
    });

// 平台字数限制获取 GET_FONT_LIMIT_API
const getLimitAsync = params => () => fetchPost(GET_FONT_LIMIT_API, params)
    .then((result) => {
        if (result.state === '000001') {
            return (result && result.data && result.data.list) || [];
        }
    });

export default {
    receiveList,
    queryList,
    platformListAction,
    queryPlatformListAsync,
    queryConfigurationAsync,
    getDetailAsync,
    toggleRuleAsync,
    getVariayeAsync,
    getLimitAsync,
};
