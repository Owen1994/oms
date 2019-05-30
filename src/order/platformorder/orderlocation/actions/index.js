import { fetchPost } from 'util/fetch';
import {
    GET_ORDER_POSITION,
} from '../constants';
export const RECEIVE_DATA = 'receive_data';
export const RECEIVE_LOADING_STATE = 'receive_loading_state';

const receiveData = (dispatch, data) => {
    dispatch({
        type: RECEIVE_DATA,
        data: data,
    })
}

const receiveLoadingState = (dispatch, data) => {
    dispatch({
        type: RECEIVE_LOADING_STATE,
        state: data,
    })
}

const queryData = (params) => dispatch => {
    receiveLoadingState(dispatch, true);
    fetchPost(GET_ORDER_POSITION, params, 2)
        .then(res => {
            receiveLoadingState(dispatch, false);
            if(res.state === '000001'){
                receiveData(dispatch, res.data);
            }
        })
}

const actions = {
    queryData,
}

export default actions;




