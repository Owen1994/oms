// 销售平台
import { post } from '../../util/axios';
import { path } from '../configs';

export const getCountry = (values={}) => {
    var result = [];
    values.pageNumber = 1;
    values.pageData = 999;
    return post(path.irp + 'common/GetCountry/getCountry', values).then(data=>{
        if(data && data.state === "000001"){
            result = data.data.data;
        }
        return Promise.resolve(result)
    })
}
