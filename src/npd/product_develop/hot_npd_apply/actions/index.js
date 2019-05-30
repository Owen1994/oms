import {
    GET_HOT_NPD_APPLY_LIST,
    RECEIVE_HOT_NPD_APPLY_LIST,

    ADD_AND_EDIT_ITEM,
    RECEIVE_ADD_AND_EDIT_ITEM,

    DELETE_ITEM,
    RECEIVE_DELETE_ITEM,

    ASSIGN_TASK,
    RECEIVE_ASSIGN_TASK,

    EXPORT_FILE,
    RECEIVE_EXPORT_FILE
} from '../constants'
import {post} from '../../../../util/axios'
import { parseNetErrorToMsg } from '../../../../util/baseTool'
import { 
    SEARCH_LIST_API,
    ADD_AND_EDIT_API,
    DELETE_ITEM_API,
    ASSIGN_TASK_API,
    EXPORT_FILE_API
} from '../constants/Api';


const receiveHotNpdApplyList = data => ({
    type: RECEIVE_HOT_NPD_APPLY_LIST,
    data
})

export const getHotNpdApplyList= params => (dispatch)=>{
    dispatch(({loading: true, type: GET_HOT_NPD_APPLY_LIST}))
    post(SEARCH_LIST_API, params).then(data=>{
        if(data && data.state === "000001"){
            dispatch(({loading: false, type: GET_HOT_NPD_APPLY_LIST}))
            return dispatch(receiveHotNpdApplyList(data.data));
        }
        return dispatch({loading: false, type: GET_HOT_NPD_APPLY_LIST, msg: parseNetErrorToMsg(data)})
    })
}

const receiveDeleteItem = data => ({
    type: RECEIVE_DELETE_ITEM,
    data
})

export const deleteItem = params => (dispatch) => {
    dispatch(({loading: true, type: DELETE_ITEM}))
    post(DELETE_ITEM_API, params).then(data=>{
        if(data && data.state === "000001"){
            return dispatch(receiveDeleteItem(data.data));
        }
        return dispatch({loading: false, type: DELETE_ITEM, msg: parseNetErrorToMsg(data)})
    })
}

const receiveAssignTask = data => ({
    type: RECEIVE_ASSIGN_TASK,
    data
})

export const assignTask = params => (dispatch) => {
    dispatch(({loading: true, type: ASSIGN_TASK}))
    post(ASSIGN_TASK_API, params).then(data=>{
        if(data && data.state === "000001"){
            return dispatch(receiveAssignTask(data.data));
        }
        return dispatch({loading: false, type: ASSIGN_TASK, msg: parseNetErrorToMsg(data)})
    })
}

const receiveExportFile = data => ({
    type: RECEIVE_EXPORT_FILE,
    data
})

export const exportFile = params => (dispatch) => {
    dispatch(({loading: true, type: EXPORT_FILE}))
    post(EXPORT_FILE_API, params).then(data=>{
        if(data && data.state === "000001"){
            return dispatch(receiveExportFile(data.data));
        }
        return dispatch({loading: false, type: EXPORT_FILE, msg: parseNetErrorToMsg(data)})
    })
}
