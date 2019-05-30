import {
    GET_LIST_API,
    GET_PLATFORM_API,
    GET_SEARCH_API,
    GET_PLATE_LIST,
    GET_SEND_API,
    GET_SENDDETIAL_API,
    GET_DETAIL_API,
} from '../constants/Api';
// import {
//     openPlate,
// } from '../../common/json';
import { fetchPost } from '../../../../../util/fetch';

export const receiveListInfo = 'receive_list';
export const RECEIVE_DETAIL = 'receive_detail';
export const platformListInfo = 'platformListInfo';
export const configurationInfo = 'configurationActionInfo';
export const plateInfo = 'plateInfo';
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
                    list: data.list || [],
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
const queryPlatformListAsync = params => dispatch => fetchPost(GET_PLATFORM_API, params)
    .then((result) => {
        if (result.state === '000001') {
            const data = (result.data && result.data.list) || [];
            dispatch(platformListAction(data));
        }
    });

// 配置信息
const configurationAction = payload => ({
    payload,
    type: configurationInfo,
});
const queryConfigurationAsync = params => dispatch => fetchPost(GET_SEARCH_API, params)
    .then((result) => {
        if (result.state === '000001') {
            const data = result.data[params.plate] || [];
            dispatch(configurationAction(data.map((v) => {
                if (v.list && v.list.length) {
                    v.list.unshift({ key: '_all', label: '全部' });
                } else {
                    v.list = [];
                }
                return v;
            })));
        }
    });

// 获取板块信息
const plateAction = payload => ({
    payload,
    type: plateInfo,
});

const queryplateAsync = (params = {}) => dispatch => fetchPost(GET_PLATE_LIST, params) //  platformId: 0
    .then((result) => {
        if (result.state === '000001') {
            const data = (result.data && result.data.list) || [];
            // 后台要求我们控制开放板块   ，  服了
            // dispatch(plateAction(data.map((v) => {
            //     if (!openPlate.includes(v.key)) {
            //         v.disabled = true;
            //     }
            //     return v;
            // })));
            dispatch(plateAction(data));
            return data;
        }
    });

// 发送 / 批量发送
const sendAsync = params => () => fetchPost(GET_SEND_API, params, 1)
    .then((result) => {
        if (result.state === '000001') {
            return data;
        }
    });
// 获取发送详情
const getSendDetialAsync = params => () => fetchPost(GET_SENDDETIAL_API, params)
    .then((result) => {
        if (result.state === '000001') {
            const data = (result.data && result.data.sendingContent) || '';
            return data;
        }
    });

// 获取规则详情
const getDetailAsync = params => () => fetchPost(GET_DETAIL_API, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            const data = result.data || {};
            // dispatch(platformListAction(data));
            return data;
        }
    });

export default {
    receiveList,
    queryList,
    platformListAction,
    queryPlatformListAsync,
    configurationAction,
    queryConfigurationAsync,
    queryplateAsync,
    plateAction,
    sendAsync,
    getSendDetialAsync,
    getDetailAsync,
};
