// 敏感sku操作日志
import { post } from '../../util/axios';
import { path } from '../configs';

export const getSkuLog = (values={}) => {
    var result = [];
    return post(path.irp + 'sku/Log/log', values).then(data=>{
        if(data && data.state === "000001"){
            result = data.data;
        }
        return Promise.resolve(result)
    })
}
