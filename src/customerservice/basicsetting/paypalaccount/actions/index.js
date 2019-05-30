import { GET_PAYPALACCOUNT_LIST, PAYPAL_LIST } from '../constants';
import { paginationAction } from '../../../../common/pagination';
import { fetchPost } from '../../../../util/fetch';

const listAction = (value) => {
    return {
        type: PAYPAL_LIST,
        payload: value
    }
}

const fetchList = (value) => (dispatch) => {
    dispatch(listAction({ loading: true }));
    fetchPost(GET_PAYPALACCOUNT_LIST, value, 2)
        .then((res) => {
            if (res && res.state === '000001') {
                const data = res.data;
                dispatch(listAction({ paypalList: data.list, loading: false }));
                dispatch(paginationAction({
                    current: value.pageNumber || page.defaultCurrent,
                    total: data.total,
                    pageSize: value.pageData || page.defaultPageSize,
                }));
            }
        });
}

export {
    fetchList
}
