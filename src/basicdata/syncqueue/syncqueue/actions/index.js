import { fetchPost } from '../../../../util/fetch';

import {
    LOADING_RECORD_LIST,
    RECEIVE_EXPORT_LIST,
    RECEIVE_IMPORT_LIST,
} from '../constants/ActionTypes';

import {
    GET_UPLOAD_FILELIST,
    GET_DOWNLOAD_LIST,
} from '../constants/APi';

// 导出
const receiveExportList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_EXPORT_LIST,
        data,
    });
};

const getExportList = params => (dispatch) => {
    dispatch({
        type: LOADING_RECORD_LIST,
        state: true,
    });
    fetchPost(GET_DOWNLOAD_LIST, params)
        .then((result) => {
            dispatch({
                type: LOADING_RECORD_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveExportList(dispatch, result.data);
            }
        });
};

// 导入
const receiveImportList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_IMPORT_LIST,
        data,
    });
};

const getImportList = params => (dispatch) => {
    dispatch({
        type: LOADING_RECORD_LIST,
        state: true,
    });
    fetchPost(GET_UPLOAD_FILELIST, params)
        .then((result) => {
            dispatch({
                type: LOADING_RECORD_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveImportList(dispatch, result.data);
            }
        });
};


export { getExportList, getImportList };
