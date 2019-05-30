import {
    SCAN_DELIVERY_LOADING,
    SCAN_DELIVERY_PART_LIST,
    WEIGHING_PART_LIST,
    WEIGHING_LOADING,
    CHANNEL_LOADING,
    CHANNEL_PART_LIST,
    COLLECT_GOODS_LOADING,
    COLLECT_GOODS_PART_LIST,
    UPDATE_WEIGHT_LOADING, UPDATE_WEIGHT_PART_LIST,
} from '../constants';
import {
    BAGLIST,
    CHANNEL_LIST, COLLECT_GOODS_LIST, PART_LIST, WEIGHING_LIST,
} from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

export const scanDeliveryPartList = params => (dispatch) => {
    dispatch({
        type: SCAN_DELIVERY_LOADING,
        state: true,
    });
    fetchPost(PART_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: SCAN_DELIVERY_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: SCAN_DELIVERY_PART_LIST,
                    data: result.data,
                });
            }
        });
};

export const weighingPartList = params => (dispatch) => {
    dispatch({
        type: WEIGHING_LOADING,
        state: true,
    });
    fetchPost(WEIGHING_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: WEIGHING_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: WEIGHING_PART_LIST,
                    data: result.data,
                });
            }
        });
};

export const channelPartList = params => (dispatch) => {
    dispatch({
        type: CHANNEL_LOADING,
        state: true,
    });
    fetchPost(CHANNEL_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: CHANNEL_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: CHANNEL_PART_LIST,
                    data: result.data,
                });
            }
        });
};

export const collectGoodsPartList = params => (dispatch) => {
    dispatch({
        type: COLLECT_GOODS_LOADING,
        state: true,
    });
    fetchPost(COLLECT_GOODS_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: COLLECT_GOODS_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: COLLECT_GOODS_PART_LIST,
                    data: result.data,
                });
            }
        });
};

export const updateWeightPartList = params => (dispatch) => {
    dispatch({
        type: UPDATE_WEIGHT_LOADING,
        state: true,
    });
    fetchPost(BAGLIST, params, 2)
        .then((result) => {
            dispatch({
                type: UPDATE_WEIGHT_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: UPDATE_WEIGHT_PART_LIST,
                    data: result.data,
                });
            }
        });
};
