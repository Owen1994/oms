import {
    GET_SPECIMEN_LIST,
    RECEIVE_SPECIMEN_LIST
} from '../constants'
import {
    GET_LIST_API
} from '../constants/Api'
import {post} from '../../../../util/axios'

import { parseNetErrorToMsg } from '../../../../util/baseTool'


const receiveSpecimenList = data => ({
    type: RECEIVE_SPECIMEN_LIST,
    data
})

export const getSpecimenList= params => (dispatch)=>{
    dispatch(({loading: true, type: GET_SPECIMEN_LIST}))
    post(GET_LIST_API, params).then(data=>{
        if(data && data.state === "000001"){
            return dispatch(receiveSpecimenList(data.data));
        }
        return dispatch({loading: false, type: GET_SPECIMEN_LIST, msg: parseNetErrorToMsg(data)})
    })
}

