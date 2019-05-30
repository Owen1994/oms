import {
    GET_PRICINT_STATE,
    RESET_CONDITIONS,
    GET_PRICING_RESULT,
    EDIT_PRICING_RESULT,
} from '../constants/reducerTypes'

// 查询定价状态
export const getPricingStateAction = data=> dispatch=>{
    dispatch({type:GET_PRICINT_STATE, data})
}
// 查询定价结果
export const getPricingResultAction = data=> dispatch=>{
    dispatch({type:GET_PRICING_RESULT, data})
}
// 重置搜索条件
export const resetConditionsAction = data=> dispatch=>{
    dispatch({type:RESET_CONDITIONS, data})
}
// 修改定价结果数据
export const editPricingResultAction = (key, data)=> dispatch=>{
    dispatch({type:EDIT_PRICING_RESULT, key, data})
}