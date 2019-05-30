import {
    RECEIVE_INVENTORY_LIST,
    LOADING_INVENTORY_LIST,
} from '../constants/inventory';
import { GET_SP_CAPACITY_LIST } from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

const receiveInventoryList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_INVENTORY_LIST,
        data,
    });
};

export const queryInventoryList = params => (dispatch) => {
    dispatch({
        type: LOADING_INVENTORY_LIST,
        state: true,
    });
    fetchPost(GET_SP_CAPACITY_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: LOADING_INVENTORY_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveInventoryList(dispatch, result.data);
            }
        });
};

// 清空列表数据
export const clearInventoryList = () => (dispatch) => {
    receiveInventoryList(dispatch, { list: [] });
};
