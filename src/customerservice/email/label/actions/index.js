import {
    GET_LABEL_LIST, FETCH_LIST, PLATFORM_LIST, GET_PLATFORM_LIST,
} from '../constants';
import { fetchPost } from '../../../../util/fetch';
import { paginationAction } from '../../../../common/pagination';
import { page } from '../../../../constants';

// 列表
export const listAction = value => ({
    type: FETCH_LIST,
    payload: value,
});
export const listFetch = ({ name, value }) => (dispatch) => {
    dispatch(listAction({ loading: true }));
    fetchPost(GET_LABEL_LIST, value, 2)
        .then((res) => {
            if (res && res.state === '000001') {
                dispatch(listAction({ [name]: res.data.data, loading: false }));
                dispatch(paginationAction({
                    current: value.pageNumber || page.defaultCurrent,
                    total: res.data.total,
                    pageSize: value.pageData || page.defaultPageSize,
                }));
            }
        });
};
// 平台列表
export const platformListAction = value => ({
    type: PLATFORM_LIST,
    payload: value,
});
export const platformList = () => (dispatch) => {
    fetchPost(GET_PLATFORM_LIST, { commonStatus: -1 }).then((res) => {
        if (res && res.state === '000001') {
            const data = res.data;
            dispatch(platformListAction({ platformList: data }));
        }
    });
};

const actions = {
    listFetch,
    platformList,
};

export default actions;
