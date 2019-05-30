import {
    CHECK_LIST,
    CHECK_LIST_API,
    RECEIVE_CHECK_LIST,
    RECEIVE_CHECK_LIST_FAILED,
    CUSTOMS_DOCUMENT,
    EDIT_DOCUMENT_COLUMN,
    RECEIVE_CUSTOMS_DOCUMENT,
    RECEIVE_CUSTOMS_DOCUMENT_FAILED,
    EDIT_DOCUMENT_COLUMNS,
    RECEIVE_EDIT_DOCUMENT_COLUMNS,
    RECEIVE_EDIT_DOCUMENT_COLUMNS_FAILED,
} from "../constants";
import { post } from '../../../../util/axios';
import { requestDatas, receiveDatas } from "../../../utils/util";


const receiveCheckList = (data) => ({
    type: RECEIVE_CHECK_LIST,
    data
});
export const getCheckList = params => (dispatch) => {
    dispatch(requestDatas(CHECK_LIST));
    return post(CHECK_LIST_API, params).then(data => {
            dispatch(receiveDatas(CHECK_LIST));
            if ( data && data.state === '000001'){
                return dispatch(receiveCheckList(data))
            }
            return dispatch({type: RECEIVE_CHECK_LIST_FAILED})
        }
    );
};

const receiveCustomsDocument = (data) => ({
    type: RECEIVE_CUSTOMS_DOCUMENT,
    data
});
export const getCustomsDocument = params => (dispatch) => {
    dispatch(requestDatas('getCustomsDocument'));
    return post(CUSTOMS_DOCUMENT, params).then(data => {
            dispatch(receiveDatas('getCustomsDocument'));
            if ( data && data.state === '000001'){
                return dispatch(receiveCustomsDocument(data))
            }
            return dispatch({type: RECEIVE_CUSTOMS_DOCUMENT_FAILED})
        }
    );
};

const receiveEditDocumentColumn = (data) => ({
    type: RECEIVE_EDIT_DOCUMENT_COLUMNS,
    data
});
const editDocumentColumn = (data) => ({
   type: EDIT_DOCUMENT_COLUMN,
    ...data
});
export const editCustomsDocumentColumn = params => (dispatch) => {
    dispatch(editDocumentColumn({name: params.name, value: (params.aname || params.value), key: params.key}));
    delete params.key;
    return post(EDIT_DOCUMENT_COLUMNS, params).then(data => {
            if ( data && data.state === '000001'){
                return dispatch(receiveEditDocumentColumn({...data, name: params.name, value: params.value}));
            }
            return dispatch({type: RECEIVE_EDIT_DOCUMENT_COLUMNS_FAILED})
        }
    );
};
