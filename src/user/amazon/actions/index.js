import { fetchPost } from '@/util/fetch';
import { Review_Amazon_Authorization_List_Api } from '../constants/Api';
import { Receive_Amazon_Authorization_List, Receive_Amazon_Authorization_List_State } from '../constants/index';

const receiveAmazonAuthorizationList = (dispatch, data) => {
    dispatch({
        type: Receive_Amazon_Authorization_List,
        data,
    });
};

/**
 * 加载Amazon列表数据
 */
const queryAmazonAuthorizationList = params => (dispatch) => {
    dispatch({
        type: Receive_Amazon_Authorization_List_State,
        loadingObj: { loadingState: true },
    });
    fetchPost(Review_Amazon_Authorization_List_Api, params)
        .then((result) => {
            dispatch({
                type: Receive_Amazon_Authorization_List_State,
                loadingObj: { loadingState: false },
            });
            if (result.state === '000001') {
                receiveAmazonAuthorizationList(dispatch, result.data);
            }
        });
};

export default queryAmazonAuthorizationList;
