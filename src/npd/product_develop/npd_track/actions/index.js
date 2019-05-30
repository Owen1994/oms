import {
    GET_TRACK_LIST,
    RECEIVE_TRACK_LIST
} from '../constants'
import {post} from '../../../../util/axios'
import { parseNetErrorToMsg } from '../../../../util/baseTool'
import { 
    GET_LIST_APLI,
    APPLY_FIRST_API
} from '../constants/Api'

const receiveTrackList = data => ({
    type: RECEIVE_TRACK_LIST,
    data
})

export const getTrackList= params => (dispatch)=>{
    dispatch(({loading: true, type: GET_TRACK_LIST}))
    post(GET_LIST_APLI, params).then(data=>{
        if(data && data.state === "000001"){
            return dispatch(receiveTrackList(data.data));
        }
        return dispatch({loading: false, type: GET_TRACK_LIST, msg: parseNetErrorToMsg(data)})
    })
}
export const searchUserList = (params) =>dispatch=>{
    return post(`/pim/motan/service/api/IPimService/getNpsUserList`, params)
    .then(data=>{
        if(data && data.state === "000001"){
            return data.data.list
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

