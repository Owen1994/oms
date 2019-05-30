import { fetchPost } from '../../../util/fetch';
import { GET_TEMPLATE_CLASS_LIST2 } from '../constants';

// 获取平台列表
const getTempClassList = (values = {}) => {
    let result = [];
    return fetchPost(GET_TEMPLATE_CLASS_LIST2, values, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                result = data.data;
                return Promise.resolve(result);
            }
        });
};
export default getTempClassList;
