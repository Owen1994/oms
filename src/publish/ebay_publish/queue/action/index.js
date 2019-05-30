import { RECEIVE_GALLERY_LIST, RECEIVE_GALLERY_RATE_LIST_FAILED, GET_INVENTORY_PRICE_QUEUE } from '../constants/index'
import { post } from '../../../../util/axios';

// 分页
const paginationType = "PAGINATION_TYPE";
export const paginationAction = (data) => ({
    type: paginationType,
    data
});

// 筛选条件
const filterType = "FILTER_TYPE";
export const filterAction = (data) => ({
    type: filterType,
    data
});

//获取库存价格队列
const receiveQueueList = (data) => ({
    type: RECEIVE_GALLERY_LIST,
    data
});

export const getQueueList = params => (dispatch) => {
    dispatch(receiveQueueList({ "loading": true }))
    return post(GET_INVENTORY_PRICE_QUEUE, params).then(data => {
        if (data && data.state === '000001') {
            // data["loading"] = false;
            const total = data.total;
            dispatch(paginationAction({
                current: params["pageNumber"] || 1,
                total: total,
                pageSize: params["pageDate"] || 20,
            }));
            return dispatch(receiveQueueList(data))
        }
        return dispatch({ type: RECEIVE_GALLERY_RATE_LIST_FAILED })
    })
        .finally(() => {
            dispatch(receiveQueueList({ "loading": false }))
        })
};