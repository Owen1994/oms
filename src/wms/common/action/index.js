// 请求函数封装
import { fetchPost } from '../../../util/fetch';

/**
 * 获取公共参数
 * @param url
 * @param callBack
 */
export const getCommonData = (url, callBack) => {
    fetchPost(url, {}, 2)
        .then((result) => {
            if (result.state === '000001') {
                const data = result.data.list;
                if (data && data.length > 0) {
                    callBack(data);
                }
            }
        });
};

export default getCommonData;
