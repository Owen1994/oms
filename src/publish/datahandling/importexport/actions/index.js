import * as config from '../../../../util/connectConfig'
import { api } from '../constants/index'
import { fetchPost } from '../../../../util/fetch'
import {
    message
} from 'antd'
// const header = '/mockjsdata/46'
const header = ''
export const tablemodelInfo = 'datahandling-tablemodelInfo';
export const updateListState = 'updateListState';

const getList = (params) => {
    return {
        type: tablemodelInfo,
        payload: params
    }
}

const updateList = (params) => (dispatch) => {
    return dispatch({
                type: updateListState,
                payload: params,
            })
}

const getListAsync = (params) => (dispatch) => {
    dispatch(getList({ loading: true }))
    return fetchPost(`${config.api_url}${header}${api.getFileTaskList}`, params)
        .then(reuslt => {
            if (reuslt.state == '000001') {
                let p = {
                    list: reuslt.data && reuslt.data.list.map(v => {
                        v.key = v.id;
                        return v
                    }) || [],
                    total: reuslt.data.total,
                    loading: false,
                }
                if (params) {
                    p.params = params.data;
                }
                dispatch(getList(p))
            } else {
                dispatch(getList({
                    loading: false
                }))
                message.error(reuslt.msg);
            }
        })
}

const cancleExportTaskAsync = (params) => (dispatch) => {
    return fetchPost(`${config.api_url}${header}${api.cancleExportTask}`, params)
        .then(data => {
            if (data.state == '000001') {
                message.success(data.msg || "取消成功");
                return true;
            } else {
                message.error(data.msg);
            }
        })
}
const breakExportTaskAsync = (params) => (dispatch) => {
    return fetchPost(`${config.api_url}${header}${api.breakExportTask}`, params)
        .then(data => {
            if (data.state == '000001') {
                message.success(data.msg || "取消成功");
                return true;
            } else {
                message.error(data.msg);
            }
        })
}

const actions = {
    getList,
    getListAsync,
    cancleExportTaskAsync,
    updateList,
    breakExportTaskAsync
}

export default actions




