// 获取商标类别详情
import { post } from '../../util/axios';
import { path } from '../configs';

export const getTradeDetail = (values={}) => {
    var result = {};
    return post(path.irp + 'trademark/ListDetail/listDetail', values).then(data=>{
        if(data && data.state === "000001"){
            result = data.data;
        }
        return Promise.resolve(result)
    })
}
