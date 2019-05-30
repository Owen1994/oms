import {
    fetchPost,
} from '../../../../util/fetch';
import { ORDER_DETAIL_LIST } from '../constants/Api';
import {
    RECEIVE_DATA_LIST,
    LOADING_LIST,
} from '../constants/ActionTypes';

const getDataList = params => (dispatch) => {
    dispatch({
        type: LOADING_LIST,
        state: true,
    });
    fetchPost(ORDER_DETAIL_LIST, params).then((result) => {
        dispatch({
            type: LOADING_LIST,
            state: false,
        });
        if (result.state === '000001') {
            result.data.list = result.data.list.map((item) => {
                item.poTime = Number.parseInt(item.poTime, 10);
                item.receivingTime = Number.parseInt(item.receivingTime, 10); 
                item.warehouseInTime = Number.parseInt(item.warehouseInTime, 10);
               
                item.poTimeNumber = item.poTime;
                item.receivingTimeNumber = item.receivingTime;
                item.warehouseInTimeNumber = item.warehouseInTime;
                return item;
            });
            dispatch({
                type: RECEIVE_DATA_LIST,
                data: result.data,
            });
        }
    });
};
export default getDataList;
