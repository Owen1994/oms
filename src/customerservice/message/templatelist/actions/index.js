import {
    LIST,
    GET_MESSAGE_TEMP_LIST,
    EDIT_DATA,
} from '../constants';
import { fetchPost } from '../../../../util/fetch';
import { paginationAction } from '../../../../common/pagination';
import { page } from '../../../../constants';

// 列表
export const listAction = value => ({
    type: LIST,
    payload: value,
});
export const listFetch = ({ name, value }) => (dispatch) => {
    dispatch(listAction({ loading: true }));
    fetchPost(GET_MESSAGE_TEMP_LIST, value, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                dispatch(listAction({ [name]: data.data.data }));
                dispatch(paginationAction({
                    current: value.pageNumber || page.defaultCurrent,
                    total: data.data.total,
                    pageSize: value.pageData || page.defaultPageSize,
                }));
            } else if (data !== true) {
                dispatch(listAction({ [name]: [] }));
            }
        })
        .finally(() => {
            dispatch(listAction({ loading: false }));
        });
};

// 编辑弹窗详情数据
export const editDataAction = value => ({
    type: EDIT_DATA,
    payload: value,
});

const actions = {
    listFetch,
    editDataAction,
};

export default actions;
