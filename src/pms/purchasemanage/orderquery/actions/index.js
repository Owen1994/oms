import { fetchPost } from '../../../../util/fetch';
import { GET_ORDER_QUERY_LIST, ORDER_LIST_LOADING } from '../constants';
import { ORDER_QUERY_LIST } from '../constants/Api';

export const getOrderQueryList = params => (dispatch) => {
    dispatch({
        type: ORDER_LIST_LOADING,
        data: true,
    });
    fetchPost(ORDER_QUERY_LIST, params)
        .then((request) => {
            dispatch({
                type: ORDER_LIST_LOADING,
                data: false,
            });
            if (request.state === '000001') {
                dispatch({
                    type: GET_ORDER_QUERY_LIST,
                    data: request.data,
                });
            }
        });
};
export default getOrderQueryList;
