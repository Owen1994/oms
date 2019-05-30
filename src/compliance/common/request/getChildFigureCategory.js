import { fetchPost } from '../../../util/fetch';
import { path } from "../../configs";

// 获取图形子类列表
export const getChildFigureCategory = (values={}) => {
    let result = [];
    return fetchPost(path.irp + 'figureCategory/GetChirdrenList/getChirdrenList', values)
        .then(data => {
            if(data && data.state === "000001"){
                result = data.data;
            }
            return Promise.resolve(result)
        })
}
