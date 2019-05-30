// 销售平台
import { post } from '../../util/axios';
import { path } from '../configs';

export const getPlatform = (values={}) => {
    var result = [];
    return post(path.irp + 'common/Getplatform/getplatform', values).then(data=>{
        if(data && data.state === "000001"){
            result = data.data.data;
        }
        return Promise.resolve(result)
    })
}
