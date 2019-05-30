import { FETCH_LIST, GET_MAIL_LIST, OPEN_RIRLE } from '../constants';
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
    fetchPost(GET_MAIL_LIST, value, 2)
        .then((data) => {
            dispatch(listAction({ loading: false }));
            if (data && data.state === '000001') {
                const d = data.data;
                if (d && d.operateStateList && d.operateStateList.length) {
                    d.operateStateList = d.operateStateList.map((v) => {
                        v.code = v.id;
                        if (v.text === '全部') {
                            v.name = `${v.text}`;
                        } else {
                            v.name = `${v.text}（${v.num}）`;
                        }
                        return v;
                    });
                }
                if (d && d.readStateList && d.readStateList.length) {
                    d.readStateList = d.readStateList.map((v) => {
                        v.code = v.id;
                        if (v.text === '全部') {
                            v.name = `${v.text}`;
                        } else {
                            v.name = `${v.text}（${v.num}）`;
                        }
                        return v;
                    });
                }
                dispatch(listAction({
                    [name]: d.data,
                    readStateList: d.readStateList,
                    operateStateList: d.operateStateList,
                    loading: false,
                }));
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

export const isOpenTitleSearch = value => () => fetchPost(OPEN_RIRLE, value, 2)
    .then((data) => {
        if (data && data.state === '000001') {
            return data.data;
        }
    });

const actions = {
    listFetch,
    isOpenTitleSearch,
};

export default actions;
