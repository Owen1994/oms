// 获取敏感词sku详情
import { post } from '../../util/axios';
import { path } from '../configs';

const mockUrl = '/mockjsdata/23/irp/api/GetSensitiveSkuDetail/getSensitiveSkuDetail'
export const getSkuDetail = (values={}) => {
    var result = {};
    return post(mockUrl, values).then(data=>{
        if(data && data.state === "000001"){
            result = data.data;
        }
        return Promise.resolve(result)
    })
}
