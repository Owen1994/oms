import { fetchPost } from '../../../util/fetch';
// import { GET_COUNTRY_LIST } from "../constants";
import { path } from "../../configs";

// 获取国家列表
export const getCountry = (values={}) => {
    let result = [];
    return fetchPost(path.irp + 'common/GetCountry/getCountry', values)
        .then(data => {
            if(data && data.state === "000001"){
                result = data.data;
            }
            return Promise.resolve(result)
        })
}