// 公司产品分类
import { post } from '../../util/axios';
import { path } from '../configs';

export const getProductClass = (values={}) => {
    var result = [];
    return post(path.irp + 'common/ProductClass/productClass', values).then(data=>{
        if(data && data.state === "000001"){
            result = data.data.data;
        }
        return Promise.resolve(result)
    })
}
