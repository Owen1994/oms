import { fetchPost } from '../../../util/fetch';
// import { GET_SKU } from "../constants";
import { path } from "../../configs";

// 获取资产代码列表
export const getSku = (values={}) => {
    let result = [];
    return fetchPost(path.irp + 'common/GetSku/getSku', values)
        .then(data => {
            if(data && data.state === "000001"){
                result = data.data;
            }
            return Promise.resolve(result)
        })
}