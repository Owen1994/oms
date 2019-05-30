import {
    LIST,
} from '../constants';
import { QUERY_MESSAGE_INTERCEPT } from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

export const fetchListAction = value => ({
    type: LIST,
    payload: value,
});

/**
 * 加载拦截列表
 * @param {*} params
 */
export const queryMessageInterceptList = ({ name, value }) => (dispatch) => {
    dispatch(fetchListAction({ loading: true }));
    fetchPost(QUERY_MESSAGE_INTERCEPT, value, 2)
        .then((data) => {
            if (data.state === '000001') {
                dispatch(fetchListAction({ [name]: data.data.data, loading: false }));
            }
        });
};

const actions = {
    queryMessageInterceptList,
};

export default actions;
