// 二次确认请求
import { message } from 'antd';
import { fetchPost } from '../../../util/fetch';

export const commonRequest = (url, values={}, fetch) => {
    let result = [];
    return fetchPost(url, values)
        .then(data => {
            if(data && data.state === "000001"){
                message.success('操作成功.');
                fetch();
            }
        })
}
