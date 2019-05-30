import {receiveDatas, requestDatas} from "../../../utils/util";
import { post} from "../../../../util/axios";
import {message} from 'antd'
import {
    EDIT_ORDER_LIST,
    RECEIVE_EDIT_ORDER_LIST,
    RECEIVE_EDIT_ORDER_LIST_FAILED,

    ORDER_LIST_OPERATION,
    RECEIVE_ORDER_LIST_OPERATION,
    RECEIVE_ORDER_LIST_OPERATION_FAILED,

    ORDER_LIST_COLUMN_EDIT,
    RECEIVE_ORDER_LIST_COLUMN_EDIT,
    RECEIVE_ORDER_LIST_COLUMN_EDIT_FAILED,

    ORDER_LIST_EXPORT_COLUMN,
    RECEIVE_LIST_EXPORT_COLUMN,
    RECEIVE_LIST_EXPORT_COLUMN_FAILED
} from "../constants";
import { getCheckList } from "./index";


const receiveEditOrderList = (data) => ({
    type: RECEIVE_EDIT_ORDER_LIST,
    data
});
/**
 *  排序编辑
 * @param params
 * @returns {function(*)}
 */
export const editOrderList = params => (dispatch) => {
    dispatch(requestDatas('lgt-dlc-order_editOrderList'));
    return post(EDIT_ORDER_LIST, params).then(data => {
            dispatch(receiveDatas('lgt-dlc-order_editOrderList'));
            dispatch(getCheckList({ id: params.id })); // 刷新列表数据
            if ( data && data.state === '000001'){
                return dispatch(receiveEditOrderList(data))
            }
            return dispatch({type: RECEIVE_EDIT_ORDER_LIST_FAILED})
        }
    );
};
const receiveListOperation = (data) => ({
    type: RECEIVE_ORDER_LIST_OPERATION,
    data
});
/**
 * 合并、删除、同步数据
 * @param params
 * @returns {function(*)}
 */
export const editListOperation = params => (dispatch) => {
    const isReload = params.isReload;
    delete params.isReload;
    dispatch(requestDatas('lgt-dlc-order_editListOperation'));
    return post(ORDER_LIST_OPERATION, params).then(data => {
        dispatch(receiveDatas('lgt-dlc-order_editListOperation'));
        dispatch(getCheckList({ id: params.id })); // 刷新列表数据
        if ( data && data.state === '000001'){
            message.success(data.msg);
            if(params.type === 4 && isReload){
                setTimeout(()=>{
                    window.location.href="/lgtconfig/declaration/";
                },1500)
            }
            return dispatch(receiveListOperation(data))
        }
            return dispatch({type: RECEIVE_ORDER_LIST_COLUMN_EDIT_FAILED})
        }
    );
};
const receiveListColumnEdit = (data) => ({
    type: RECEIVE_ORDER_LIST_COLUMN_EDIT,
    data
});
/**
 * 条目字段编辑
 * @param params
 * @returns {function(*)}
 */
export const editListColumn = params => (dispatch) => {
    return post(ORDER_LIST_COLUMN_EDIT, params).then(data => {
            if ( data && data.state === '000001'){
                message.success(data.msg);
                dispatch(getCheckList({ id: params.id })); // 刷新列表数据
                return dispatch(receiveListColumnEdit(data))
            }
            return dispatch({type: RECEIVE_ORDER_LIST_OPERATION_FAILED})
        }
    );
};
