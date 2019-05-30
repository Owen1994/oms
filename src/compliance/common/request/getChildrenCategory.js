import { fetchPost } from '../../../util/fetch';
// import { path } from "../../configs";
import { path } from "../../configs";

const mockUrl = '/mockjsdata/23/irp/api/common/GetChildrenCategory/getChildrenCategory';
const url = '/irp/api/common/GetChildrenCategory/getChildrenCategory';
// 获取基础资料子级分类列表
export const getChildrenCategory = (values={}) => {
    let result = [];
    return fetchPost(url, values)
        .then(data => {
            if(data && data.state === "000001"){
                result = data.data.data;
            }
            return Promise.resolve(result)
        })
}