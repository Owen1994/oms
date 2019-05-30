import { fetchPost } from '../../../util/fetch';
// import { GET_TRADEMARK_LIST } from "../constants";
import { path } from "../../configs";

// 获取商品分类列表
export const getTrademark = (values={}) => {
    let result = [];
    return fetchPost(path.irp + 'common/GetTrademarkList/getTrademarkList', values)
        .then(data => {
            if(data && data.state === "000001"){
                result = data.data;
            }
            return Promise.resolve(result)
        })
}