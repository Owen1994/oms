// 模板管理
import { post } from '../../../util/axios';

export const tempData = (values={}) => {
    let result = [];
    return post('/pls/ebay/motan/service/api/IEbayService/templateNum', values).then(data=>{
        if(data && data.state === "000001"){
            result = data.data;
            // console.log(data.data);
            result[0].url = '/publish/template/describe/';
            result[1].url = '/publish/template/transport/';
            result[2].url = '/publish/template/return/';
            result[3].url = '/publish/template/payment/';
            return result
        }else{
            result = [{tempId: 0, tempName: "描述模板", tempNum: 10,url:"/publish/template/describe/"},
                {tempId: 1, tempName: "运输模板", tempNum: 20,url:"/publish/template/transport/"},
                {tempId: 2, tempName: "退货模板", tempNum: 10,url:"/publish/template/return/"},
                {tempId: 3, tempName: "付款模板", tempNum: 24,url:"/publish/template/payment/"}
            ]
            return result
        }
    })
}