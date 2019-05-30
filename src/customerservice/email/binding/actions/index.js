import {
    LIST,
    GET_EMAIL_BINDING_LIST,
    LOG_LIST,
    GET_EMAIL_BINDING_LOG_LIST,
} from '../constants';
import { fetchPost } from '../../../../util/fetch';
import { paginationAction } from '../../../../common/pagination';
import { page } from '../../../../constants';

// 邮箱绑定列表
export const listAction = value => ({
    type: LIST,
    payload: value,
});
export const listFetch = ({ name, value }) => (dispatch) => {
    dispatch(listAction({ loading: true }));
    fetchPost(GET_EMAIL_BINDING_LIST, value, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                const d = data.data;
                if (d && d.statusList && d.statusList.length) {
                    d.statusList = d.statusList.map((v) => {
                        v.code = v.id;
                        v.name = `${v.name}（${v.num}）`;
                        return v;
                    });
                }
                dispatch(listAction({ [name]: d.data, statusList: d.statusList }));
                dispatch(paginationAction({
                    current: value.pageNumber || page.defaultCurrent,
                    total: d.total,
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

// 绑定邮箱列表
export const logListAction = value => ({
    type: LOG_LIST,
    payload: value,
});
export const logListFetch = ({ name, value }) => (dispatch) => {
    fetchPost(GET_EMAIL_BINDING_LOG_LIST, value)
        .then((data) => {
            if (data && data.state === '000001') {
                dispatch(logListAction({ [name]: data.data }));
            }
        });
};

const actions = {
    listFetch,
    logListFetch,
};

export default actions;
