import { fetchPost } from 'util/fetch';
import { Review_Get_Order_Detail_Api, Review_Get_Order_Detail_Api_Log } from '../constants/Api';
import { Receive_Amazon_Detail, Receive_Amazon_Detail_Log } from '../constants/index';

const receiveAmazonDetail = (dispatch, data) => {
    dispatch({
        type: Receive_Amazon_Detail,
        data,
    });
};

const receiveAmazonDetailLog = (dispatch, data) => {
    dispatch({
        type: Receive_Amazon_Detail_Log,
        data,
    });
};

/**
 * 加载跟单管理列表数据
 */
export const queryAmazonDetail = params => (dispatch) => {
    fetchPost(Review_Get_Order_Detail_Api, params)
        .then((result) => {
            if (result.state === '000001') {
                receiveAmazonDetail(dispatch, result.data);
            }
        });
};

/**
 * 详情日志
 */
export const queryAmazonDetailLog = params => (dispatch) => {
    fetchPost(Review_Get_Order_Detail_Api_Log, params)
        .then((result) => {
            if (result.state === '000001') {
                receiveAmazonDetailLog(dispatch, result.data);
            }
        });
};

