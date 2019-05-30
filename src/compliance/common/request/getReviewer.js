import { fetchPost } from '../../../util/fetch';
// import { path } from "../../configs";
import { path } from "../../configs";

const mockUrl = '/mockjsdata/23/irp/api/common/GetReviewer/getReviewer';
const url = '/irp/api/common/GetReviewer/getReviewer';
// 获取销售账号列表列表
export const getReviewer = (values={}) => {
    let result = [];
    return fetchPost(url, values)
        .then(data => {
            if(data && data.state === "000001"){
                result = data.data;
            }
            return Promise.resolve(result)
        })
}