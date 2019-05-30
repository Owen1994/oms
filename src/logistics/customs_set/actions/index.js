import * as types from '../constants/ActionTypes'
import { post } from '../../../util/axios';

// 分页
const paginationType = "PAGINATION_TYPE";
export const paginationAction = (data) => ({
  type: paginationType,
  data
});

// 搜索条件
const filterDataType = "FILTER_TYPE";
export const filterDataAction = (data) => ({
    type: filterDataType,
    data
});

// 获取SKU税率列表
export const receiveSkuRateList = (data) => ({
    type: types.RECEIVE_SKU_RATE_LIST,
    data
});
export const getSkuRateList = params => (dispatch) => {
    dispatch(receiveSkuRateList({ "loading": true }))
    return post(types.SKU_RATE_LIST_API, params).then(data => {
        if(data && data.state === "000001"){
            data["loading"] = false;
            const total = data.total;
            dispatch(paginationAction({
                pageSize: params["pageSize"] || 10,
                total: total,
                current: params["pageNumber"] || 1,
            }));
            return dispatch(receiveSkuRateList(data))
        }
        return dispatch({type: types.RECEIVE_SKU_RATE_LIST_FAILED})
    })
}

// 获取税率列表
export const receiveRateList = (data) => ({
    type: types.RECEIVE_RATE_LIST,
    data
});
export const getRateList = params => (dispatch) => {
    dispatch(receiveRateList({ "loading": true }))
    return post(types.RATE_LIST_API, params).then(data => {
        if (data && data.state === "000001") {
            data["loading"] = false;
            return dispatch(receiveRateList(data))
        }
        return dispatch({ type: types.RECEIVE_RATE_LIST_FAILED })
    })
}
