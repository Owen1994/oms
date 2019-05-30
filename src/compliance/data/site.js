// 站点
import { post } from '../../util/axios';
import { path } from '../configs';

export const getSite = (values={}) => {
    var result = [];
    return post(path.irp + 'common/GetSite/getSite', values).then(data=>{
        if(data && data.state === "000001"){
            result = data.data.data;
        }
        return Promise.resolve(result)
    })
}
