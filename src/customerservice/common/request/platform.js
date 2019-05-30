import { fetchPost } from '../../../util/fetch';
import { GET_PLATFORM_LIST, GET_MODE_PLATFORM } from '../constants';

// 获取平台列表
export const getPlatformList = (values = { commonStatus: 1 }) => {
    let result = [];
    return fetchPost(GET_PLATFORM_LIST, values, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                result = data.data;
                return Promise.resolve(result);
            }
        });
};

// 获取模块平台列表
export const getModePlatform = (values = {}) => {
    let result = [];
    return fetchPost(GET_MODE_PLATFORM, values, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                result = data.data.data;
                return Promise.resolve(result);
            }
        });
};
