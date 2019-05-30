import {
    GET_REFUND_LIST,
    REFUND_LIST,
    REFUND_LIST_LOADING,
} from '../constants';
import { fetchPost } from '../../../../util/fetch';

import { screenTypeFilter, addChecked } from '../selector';

// 退款申请订单列表
export const refundAction = value => ({
    type: REFUND_LIST,
    payload: value,
});

export const refundFetch = value => (dispatch) => {
    dispatch({
        type: REFUND_LIST_LOADING,
        payload: true,
    });
    fetchPost(GET_REFUND_LIST, value, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                const res = data.data;
                dispatch(refundAction({
                    data: addChecked(res.refundList),
                    total: res.total,
                    returnList: screenTypeFilter(res.returnGoodsList),
                    modeList: screenTypeFilter(res.refundModeList),
                    statusList: screenTypeFilter(res.refundStatusList),
                    typeList: screenTypeFilter(res.refundTypeList),
                }));
            } else if (data !== true) {
                dispatch(refundAction([]));
            }
        })
        .finally(() => {
            dispatch({
                type: REFUND_LIST_LOADING,
                payload: false,
            });
        });
};

const actions = {
    refundFetch,
};

export default actions;
