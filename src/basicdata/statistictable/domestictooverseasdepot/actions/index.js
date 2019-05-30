import {
    fetchPost,
    downlodFile,
} from '../../../../util/fetch';
import {
    GET_SKU_LIST,
    EXPORT_SKU,
    // IMPORT_SKU,
} from '../../constants/Api';
import {
    RECEIVE_DATA_LIST,
    LOADING_LIST,
    DOWNLOD_FILE,
} from '../../constants/ActionTypes';

export const getSkuList = params => (dispatch) => {
    dispatch({
        type: LOADING_LIST,
        state: true,
    });
    fetchPost(GET_SKU_LIST, params).then((result) => {
        dispatch({
            type: LOADING_LIST,
            state: false,
        });
        if (result.state === '000001') {
            dispatch({
                type: RECEIVE_DATA_LIST,
                data: result.data,
            });
        }
    });
};

export const exportSku = params => (dispatch) => {
    fetchPost(EXPORT_SKU, params, 1).then((result) => {
        if (result.state === '000001') {
            downlodFile(result.data.url);
            dispatch({
                type: DOWNLOD_FILE,
                state: true,
            });
        }
    });
};

// export const importSku = (params) => {
//     fetchPost(IMPORT_SKU, params).then((result) => {
//         if (result.state === '000001') {
//             downlodFile(result.data.url);
//         }
//     });
// };
// export default getSkuList;
