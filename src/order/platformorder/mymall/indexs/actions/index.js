import {
    RECEIVE_TABLE_LIST,
    LOADING_TABLE_LIST,
    RECEIVE_MYMALL_TAB_STATE,
} from '../constants';
import { GET_ORDER_LIST, GET_TAB_STATE } from '../constants/Api';
import { fetchPost } from '../../../../../util/fetch';

const receiveTableList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_TABLE_LIST,
        data,
    });
};

//请求ebay订单页签数据action
const receiveMymallTabState = (dispatch, data) => {
    dispatch({
        type: RECEIVE_MYMALL_TAB_STATE,
        data
    })
}

const queryTableList = params => (dispatch) => {
    dispatch({
        type: LOADING_TABLE_LIST,
        state: true,
    });
    fetchPost(GET_ORDER_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: LOADING_TABLE_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveTableList(dispatch, result.data);
            }
        });
};

//请求ebay订单页签数据方法
export const queryMymallTabState = () => dispatch => {
    fetchPost(GET_TAB_STATE, {}, 2)
        .then(result => {
            if(result.state === '000001'){
                receiveMymallTabState(dispatch, result.data)
            }
        })
}

export default queryTableList;
