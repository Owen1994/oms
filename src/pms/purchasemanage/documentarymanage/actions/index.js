import { RECEIVE_DOCUMENTAR_LIST, RECEIVE_LOADING_DOCUMENTAR_STATE } from '../constants/index';
import { fetchPost } from '../../../../util/fetch';
import { REVIEW_MERCHANDISER_LIST_API } from '../constants/Api';

const receiveMerchandiserList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_DOCUMENTAR_LIST,
        data,
    });
};


/**
 * 加载跟单管理列表数据
 */
const queryMerchandiserList = params => (dispatch) => {
    dispatch({
        type: RECEIVE_LOADING_DOCUMENTAR_STATE,
        loadingObj: { loadingState: true },
    });
    fetchPost(REVIEW_MERCHANDISER_LIST_API, params)
        .then((result) => {
            dispatch({
                type: RECEIVE_LOADING_DOCUMENTAR_STATE,
                loadingObj: { loadingState: false },
            });
            if (result.state === '000001') {
                receiveMerchandiserList(dispatch, result.data);
            }
        });
};

export default queryMerchandiserList;
