import { fetchPost } from '../../../util/fetch';
// import { path } from "../../configs";
import { path } from "../../configs";

// 获取图形分类列表
export const getFigureCategory = (values={}) => {
    let result = [];
    return fetchPost(path.irp + 'figureCategory/List/list', values)
        .then(data => {
            if(data && data.state === "000001"){
                result = data.data;
            }
            return Promise.resolve(result)
        })
}