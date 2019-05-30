import { fetchPost } from '../../../../util/fetch';

import {
    PRSEARCH,
    RECEIVE_PRSEARCH_LIST,
    LOADING_RECORD_LIST,
} from '../constants';

const receivePrSearchList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_PRSEARCH_LIST,
        data,
    });
};

const getPrsearchList = params => (dispatch) => {
    dispatch({
        type: LOADING_RECORD_LIST,
        state: true,
    });
    fetchPost(PRSEARCH, params, 2)
        .then((result) => {
            dispatch({
                type: LOADING_RECORD_LIST,
                state: false,
            });
            if (result.state === '000001') {
                result.data.list = result.data.list.map((item) => {
                    item.planUploadTime = Number.parseInt(item.planUploadTime, 10);
                    item.demandTime = Number.parseInt(item.demandTime, 10);
                    item.order = item.order || [];
                    item.order = item.order.map((it) => {
                        it.printTimes = Number.parseInt(it.printTimes, 10);
                        return it;
                    });
                    item.planUploadTimeNumber = item.planUploadTime;
                    item.demandTimeNumber = item.demandTime;
                    return item;
                });
                receivePrSearchList(dispatch, result.data);
            }
        });
};

export default getPrsearchList;
