import { fetchPost } from '../../../../util/fetch';

import {
    GET_IMPORT_EXPORT_LIST, 
    RECEIVE_IMPORT_LIST,
    LOADING_RECORD_LIST,
} from '../constants';

const receiveImportList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_IMPORT_LIST,
        data,
    });
};

const getImportExportList = params => (dispatch) => {
    dispatch({
        type: LOADING_RECORD_LIST,
        state: true,
    });
    fetchPost(GET_IMPORT_EXPORT_LIST, params, 2)
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

export default getImportExportList;
