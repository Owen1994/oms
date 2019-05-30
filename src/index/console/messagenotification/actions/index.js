/**
 * 获取接收消息列表数据
 * @param params
 * @returns {Function}
 */
import {
    IS_LOADING,
    MY_RECEIVE_LIST,
    MY_SEND_LIST,
    Updata_Review_Data,
    Updata_Send_Data,
} from '../constants';
import { fetchPost } from '../../../../util/fetch';
import { MY_RECEIVE_MESSAGE_LIST, MY_SEND_MESSAGE_LIST } from '../constants/Api';

/**
 * 我收到的消息
 * @returns {Function}
 * @param params
 */
export const getMyReceiveList = params => (dispatch) => {
    dispatch({
        type: IS_LOADING,
        state: true,
    });
    fetchPost(MY_RECEIVE_MESSAGE_LIST, params)
        .then((result) => {
            dispatch({
                type: IS_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: MY_RECEIVE_LIST,
                    data: result.data, // 这里发送数据,key:value
                });
            }
        });
};

/**
 * 我发送的消息
 * @param params
 * @returns {Function}
 */
export const getMySendList = params => (dispatch) => {
    dispatch({
        type: IS_LOADING,
        state: true,
    });
    fetchPost(MY_SEND_MESSAGE_LIST, params)
        .then((result) => {
            dispatch({
                type: IS_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: MY_SEND_LIST,
                    data: result.data, // 这里发送数据,key:value
                });
            }
        });
};

/**
 * 更新 我收到的消息
 * @returns {Function}
 * @param index
 */
export const updataMyReviewMsgListViewState = (index, data) => (dispatch) => {
    data.index = index;
    dispatch({
        type: Updata_Review_Data,
        data: data,
    });
};

/**
 * 更新 我发送的消息
 * @returns {Function}
 * @param index
 */
export const updataMySendMsgListViewState = (index, data) => (dispatch) => {
    data.index = index;
    dispatch({
        type: Updata_Send_Data,
        data: data,
    });
};
