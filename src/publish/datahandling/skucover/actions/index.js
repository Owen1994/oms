import { fetchPost } from '../../../../util/fetch';
import {
    has_list_main_data,
    has_list_loading_state,
    not_list_loading_state,
    not_list_main_data,
} from '../constants';
import { Has_Cover_Main_List_Api, Not_Cover_Main_List_Api } from '../constants/Api';

export const getHasCoveredMainDataList = params => (dispatch) => {
    dispatch({
        type: has_list_loading_state,
        data: true,
    });
    fetchPost(Has_Cover_Main_List_Api, params, 2)
        .then((request) => {
            dispatch({
                type: has_list_loading_state,
                data: false,
            });
            if (request.state === '000001') {
                dispatch({
                    type: has_list_main_data,
                    data: request.data,
                });
            } else {
                dispatch({
                    type: has_list_main_data,
                    data: { list: [], total: 0 },
                });
            }
        });
};

export const getNotCoveredMainDataList = params => (dispatch) => {
    dispatch({
        type: not_list_loading_state,
        data: true,
    });
    fetchPost(Not_Cover_Main_List_Api, params, 2)
        .then((request) => {
            dispatch({
                type: not_list_loading_state,
                data: false,
            });
            if (request.state === '000001') {
                dispatch({
                    type: not_list_main_data,
                    data: request.data,
                });
            } else {
                dispatch({
                    type: not_list_main_data,
                    data: { list: [], total: 0 },
                });
            }
        });
};

export const getHasCovereDefaultData = () => (dispatch) => {
    dispatch({
        type: has_list_main_data,
        data: { list: [], total: 0 },
    });
};

export const getNotCoveredDefaultData = () => (dispatch) => {
    dispatch({
        type: not_list_main_data,
        data: { list: [], total: 0 },
    });
};
