import { fetchPost } from '../../../../../util/fetch';
import { Review_Amazon_List_Api } from '../constants/Api';
import { Receive_Amazon_List, Receive_Amazon_List_State } from '../constants/index';

const receiveAmazonList = (dispatch, data) => {
    dispatch({
        type: Receive_Amazon_List,
        data,
    });
};

/**
 * 加载Amazon列表数据
 */
const queryAmazonList = params => (dispatch) => {
    dispatch({
        type: Receive_Amazon_List_State,
        loadingObj: { loadingState: true },
    });
    fetchPost(Review_Amazon_List_Api, params)
        .then((result) => {
            dispatch({
                type: Receive_Amazon_List_State,
                loadingObj: { loadingState: false },
            });
            if (result.state === '000001') {
                receiveAmazonList(dispatch, result.data);
            }
        });
};

export default queryAmazonList;
