// 销售账号
import { post } from '../../util/axios';
import { path } from '../configs';

export const getAccount = (values={}) => {
    var result = [];
    return post(path.irp + 'common/GetAccount/getAccount', values).then(data=>{
        if(data && data.state === "000001"){
            result = data.data.data;
        }
        return Promise.resolve(result)
    })
}
