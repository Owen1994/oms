import { fetchPost } from '../../../util/fetch';
import { GET_INTELLECTUALCODE_DETAIL } from "../constants";

// 获取资产代码列表
export const getIntellctualCodeDetail = (values={}) => {
    let result = [];
    return fetchPost(GET_INTELLECTUALCODE_DETAIL, values)
        .then(data => {
            if(data && data.state === "000001"){
                result = data.data;
            }
            return Promise.resolve(result)
        })
}