import { QUERY_RESULT, DOMESTIC_LIST, PRICING_STATE } from '../constants';
import { paginationAction } from '../../../../common/pagination';
import { fetchPost } from '../../../../util/fetch';

const listAction = (value) => {
    return {
        type: DOMESTIC_LIST,
        payload: value
    }
}

// 查询结果
const queryResult = (value) => (dispatch) => {
    dispatch(listAction({ loading: true }));
    fetchPost(QUERY_RESULT, { data: value }, 2)
        .then((res) => {
            if (res && res.state === '000001') {
                const data = res.data;
                dispatch(listAction({ domesticList: data.list, loading: false }));
                dispatch(paginationAction({
                    current: value.pageNumber,
                    total: data.total,
                    pageSize: value.pageData,
                }));
            }
        });
}

// 表单初始状态
const pricingStateInit = data => dispatch => {
    dispatch(({ type: PRICING_STATE, payload: data }));
}

export {
    queryResult,
    pricingStateInit
}
