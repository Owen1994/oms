/**
 * 作者: pzt
 * 描述: 买家政策数据转换
 * 时间: 2018/8/31 15:57
 * @param <object> buyerPolicy 后台返回的原始数据
 **/
import { createSelector } from 'reselect'
import {buyerPolicy} from "../constants/listingDetail";

const getBuyerPolicy = state=> state.buyerpolicyData
export const parseBuyerPolicy = createSelector(
    [getBuyerPolicy],
    (buyerPolicy1) => {
        if (!buyerPolicy1.buyers) {
            return buyerPolicy;
        }
        return buyerPolicy1;
    }
)
