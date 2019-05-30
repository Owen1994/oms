import { GET_DOMESTIC_LIST, DOMESTIC_RULES_LIST, RULE_INIT_STATE } from '../constants';
import { paginationAction } from '../../../../common/pagination';
import { fetchPost } from '../../../../util/fetch';

const listAction = (value) => {
    return {
        type: DOMESTIC_RULES_LIST,
        payload: value
    }
}

// 获取规则列表
const queryRules = (value) => (dispatch) => {
    dispatch(listAction({ loading: true }));
    fetchPost(GET_DOMESTIC_LIST, { data: value }, 2)
        .then((res) => {
            if (res && res.state === '000001') {
                const data = res.data;
                dispatch(listAction({ domesticRulesList: data.list, loading: false }));
                dispatch(paginationAction({
                    current: value.pageNumber,
                    total: data.total,
                    pageSize: value.pageData,
                }));
            }
        });
}

// 改变新增/编辑时表单状态
const rulesStateInit = (value) => (dispatch) => {
    dispatch(({ type: RULE_INIT_STATE, payload: value }));
}

export {
    queryRules,
    rulesStateInit
}
