import { fetchPost } from '../../../util/fetch';
// import { GET_DISABLEINFO_TABEL_DETAIL } from "../constants";
import { path } from "../../configs";

// 获取资产代码列表
export const getDisableInfoTabel = (values={}) => {
    let result = [];
    return fetchPost(path.irp + 'common/GetDisableInfoTable/getDisableInfoTable', values)
        .then(data => {
            if(data && data.state === "000001"){
                result = data.data;
            }
            return Promise.resolve(result)
        })
}
