import RECEIVE_DOCUMENTAR_DETAIL_LIST from '../constants/index';
import { fetchPost } from '../../../../util/fetch';
import { REVIEW_MERCHANDISER_DETAIL_API } from '../constants/Api';

const receiveMerchandiserDetailList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_DOCUMENTAR_DETAIL_LIST,
        data,
    });
};


/**
 * 加载供应商跟单明细
 */
const queryMerchandiserDetailList = params => (dispatch) => {
    fetchPost(REVIEW_MERCHANDISER_DETAIL_API, params)
        .then((result) => {
            if (result.state === '000001') {
                receiveMerchandiserDetailList(dispatch, result.data);
            }
        });
};

export default queryMerchandiserDetailList;
