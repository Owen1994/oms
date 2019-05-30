import { fetchPost } from '../../../util/fetch';
// import { path } from "../../configs";
import { path } from "../../configs";

// 获取站点列表
export const getSite = (values={}) => {
    let result = [];
    return fetchPost(path.irp + 'common/GetSite/getSite', values)
        .then(data => {
            if(data && data.state === "000001"){
                result = data.data.data;
            }
            return Promise.resolve(result)
        })
}