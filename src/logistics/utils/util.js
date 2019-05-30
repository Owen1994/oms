/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import { LOADED_STATE, LOADING_STATE } from "../constant";

export const requestDatas = (rType) => ({
    type: LOADING_STATE,
    rType
});
export const receiveDatas = (rType) => ({
    type: LOADED_STATE,
    rType
});
