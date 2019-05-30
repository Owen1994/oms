import * as types from '../constants/ActionTypes'
import {post} from '../../../../util/axios'

// 分页
const paginationType = "PAGINATION_TYPE";
export const paginationAction = (data) => ({
    type: paginationType,
    data
});

const receiveDecalarationList = data => ({
    type: types.RECEIVE_DECALARATION_LIST,
    data
})

export const getDecalarationListAciton= params => (dispatch)=>{
    dispatch(receiveDecalarationList({loading: true}))
    post(types.DECALARATION_LIST_API, params).then(data=>{
        if(data && data.state === "000001"){
            data['loading'] = false;
            return dispatch(receiveDecalarationList(data));
        }
        return dispatch({type: types.RECEIVE_DECALARATION_LIST_FAILED})
    })
}

