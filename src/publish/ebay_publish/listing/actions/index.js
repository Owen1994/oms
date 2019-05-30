/**
 * 作者: pzt
 * 描述: listing 列表页相关action
 * 时间: 2018/7/28 15:39
 **/
import { fetchPost } from '../../../../util/fetch'
import Api from '../constants/Api'
import ActionType from '../constants'
import { queryDraftList } from './draft'
import { queryPublishingList } from './publishing'
import { queryPublishfailList } from './publishfail'
import { querySellingList } from './selling'
import { queryAlerdaydownList } from './alerdaydown'
import { queryAlerdaydeleteList } from './alerdaydelete'

// 获取listing列表 start
export const receiveListingData = data => ({
    type: ActionType.RECEIVE_LISTING_STATE,
    data
})

export const queryListingState = params => (dispatch) => {
    return fetchPost(Api.GET_LISTING_STATE, params, 2).then(res => {
        if (res && res.state === "000001") {
            return dispatch(receiveListingData(res.data));
        }
    })
}

// 获取listing列表 start
export const toggleKayAction = data => ({
    type: ActionType.tablemodelInfo,
    data
})

export const getListAsync = (params, key) => dispatch => {
    switch (key) {
        case "0":
            return queryDraftList(params,key)(dispatch);
        case "1":
            return queryPublishingList(params,key)(dispatch);
        case "2":
            return queryPublishfailList(params,key)(dispatch);
        case "3":
            return querySellingList(params,key)(dispatch);
        case "4":
            return queryAlerdaydownList(params,key)(dispatch);
        case "5":
            return queryAlerdaydeleteList(params,key)(dispatch);
    }
}
