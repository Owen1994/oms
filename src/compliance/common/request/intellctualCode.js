import { fetchPost } from '../../../util/fetch';
// import { GET_INTELLECTUALCODE_LIST } from "../constants";
import { path } from "../../configs";

// 获取资产代码列表
export const getIntellctualCode = (values={}) => {
    let result = [];
    let params = {
        pageData:9999,
        pageNumber:1,
        ...values
    }
    return fetchPost(path.irp + 'common/GetIntellectualCodeList/getIntellectualCodeList', params)
        .then(data => {
            if(data && data.state === "000001"){
                result = data.data;
            }
            return Promise.resolve(result)
        })
}