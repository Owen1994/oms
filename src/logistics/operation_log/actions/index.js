import {
    OPERATION_LOG_LIST_API,
    RECEIVE_OPERATION_LOG_LIST,
    RECEIVE_OPERATION_LOG_LIST_FAILED,
} from '../constants/ActionTypes'
import { post } from '../../../util/axios';

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

const receiveOperationLogList = (data) => ({
    type: RECEIVE_OPERATION_LOG_LIST, 
    data
});

export const getOperationLogList = params => (dispatch) => {
    dispatch(receiveOperationLogList({ "loading": true }))
    return post(OPERATION_LOG_LIST_API, params).then(data => {
            if (data && data.state === '000001') {
                data["loading"] = false;
                const total = data.total;
                dispatch(paginationAction({
                    current: params["pageNumber"] || 1,
                    total: total,
                    pageSize: params["pageDate"] || 20,
                }));
                return dispatch(receiveOperationLogList(data))
            }
            return dispatch({ type: RECEIVE_OPERATION_LOG_LIST_FAILED })
        }
    )
};

