// 二次确认请求
import { fetchPost } from '../../../util/fetch';

const commonRequest = (url, values = {}, fetch) => {
    const commonfetchPost = fetchPost(url, values, 1)
        .then((data) => {
            if (data && data.state === '000001') {
                fetch();
            }
        });
    return commonfetchPost;
};
export default commonRequest;
