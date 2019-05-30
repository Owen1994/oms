import { fetchPost } from '../../../util/fetch';
// import { GET_PLATFORM_LIST } from "../constants";
import { path } from "../../configs";

// 获取平台列表
export const getPlatform = (values={}) => {
    let result = [];
    return fetchPost(path.irp + 'common/Getplatform/getplatform', values)
        .then(data => {
            if(data && data.state === "000001"){
                result = data.data.data;
            }
            return Promise.resolve(result)
        })
}