/**
 * 作者: pzt
 * 描述: 数据转换处理
 * 时间: 2018/11/2 10:09
 **/
import { createSelector } from 'reselect';
const getPricingResultData = state => state.pricingResultData;

export const parsePricingResultData = createSelector(
    [getPricingResultData],(pricingResultData)=>{
        let result;
        if(pricingResultData && pricingResultData.length > 0){
            result = pricingResultData.map((v)=>{
                v.key = v.pricingId;
                return v
            })
        }
        return result
    }
)