import axios from 'util/axios'
import * as config from 'util/connectConfig'
import searchValuesactions from '@/components/searchValues/actions'
import commonactions from '@/common/actions/commonactions'
import {message} from 'antd';

export const baseInfo = 'baseInfo'
export const isEditInfo = 'isEditInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const tablemodelInfo2 = 'tablemodelInfo2'
export const tablemodelInfo3 = 'tablemodelInfo3'
export const tablemodelInfo4 = 'tablemodelInfo4'
export const tablemodelInfo5 = 'tablemodelInfo5'
export const tablemodelInfo6 = 'tablemodelInfo6'
export const tablemodelInfo7 = 'tablemodelInfo7'
export const skuTableInfo = 'skuTableInfo'
export const amendSkuArrInfo = 'amendSkuArrInfo'
export const repertoryListInfo = 'repertoryListInfo'

export const devanningTableactionInfo = 'devanningTableactionInfo'
export const devanningAPPInfo = 'devanningAPPInfo'
import { fetchPost } from 'util/fetch';

export const devanningTableaction = value => ({
    type: devanningTableactionInfo,
    payload: value
})
export const isEditAction = value => ({
    type: isEditInfo,
    payload: value
})

const devanningAPPaction = value => ({
    type: devanningAPPInfo,
    payload: value
})

export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value
})

export const modalmodelaction = value => ({
    type: modalmodelInfo,
    payload: value
})

export const tablemodelaction = value => ({
    type: tablemodelInfo,
    payload: value
})

export const tablemodelaction2 = value => ({
    type: tablemodelInfo2,
    payload: value
})

export const tablemodelaction3 = value => ({
    type: tablemodelInfo3,
    payload: value
})

export const tablemodelaction4 = value => ({
    type: tablemodelInfo4,
    payload: value
})

export const tablemodelaction5 = value => ({
    type: tablemodelInfo5,
    payload: value
})

export const tablemodelaction6 = value => ({
    type: tablemodelInfo6,
    payload: value
})

export const tablemodelaction7 = value => ({
    type: tablemodelInfo7,
    payload: value
})
export const skuTableAction = value => ({
    type: skuTableInfo,
    payload: value
})
export const repertoryListAction = value => ({
    type: repertoryListInfo,
    payload: value
})
export const amendSkuArrAction = value => ({
    type: amendSkuArrInfo,
    payload: value
})



export const fetchPosts = value => (dispatch, getState) => {
    dispatch(baseInfoForm({[value]: []}))
    return axios(`${config.api_url}/queryCategoryList.do`)
        .then(response => {
            if (response.status == 200) {
                dispatch(baseInfoForm({[value]: response.data.data,}))
            }
        }).catch(e => {
            console.log(e);
        })
}

export const fetchzonesPosts = ({url, name, value, returnName}) => (dispatch, getState) => {
    return axios(`${url}?${name}=${value}`)
        .then(response => {
            if (response.status == 200) {
                dispatch(baseInfoForm({[returnName]: response.data.data,}))
            }
        }).catch(e => {
            console.log(e);
        })
}


export const fetchdevanningPosts = ({key, value = {}}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    const current = value['pageSize'] || 1;
    const pageSize = value['offset'] || 20;
    return axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/getOrderGrabConfigAllSkuConfig`, value)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    dispatch(devanningTableaction({[key]: response.data.data, loading: false}))
                } else {
                    message.error(response.data.msg)
                }
            }
        }).catch(e => {
            console.log(e);
        })
}
export const logisticsAmendAction = (value) => (dispatch) => {
    return axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/updateGuestSelectionLogistics`, value)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    message.success(response.data.msg)
                    return true
                } else {
                    message.error(response.data.msg)
                    return false
                }
            }
        }).catch(e => {
            console.log(e);
            message.error(e.message)
        })
}

export const queryLog = params => dispatch => {
    return fetchPost('/oms/order/manage/motan/ICompanyOrderManageApi/getExceptionOrderDetailLog', { data: params }, 2)
        .then(res => {
            if(res.state === '000001') {
                dispatch(tablemodelaction5({ data: res.data }));
            }
        })
}

const actions = {
    ...searchValuesactions,
    ...commonactions,
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    tablemodelaction2,
    tablemodelaction3,
    tablemodelaction4,
    tablemodelaction5,
    tablemodelaction6,
    tablemodelaction7,
    fetchPosts,
    fetchzonesPosts,
    devanningTableaction,
    devanningAPPaction,
    fetchdevanningPosts,
    isEditAction,
    skuTableAction,
    repertoryListAction,
    amendSkuArrAction,
    logisticsAmendAction,
    queryLog,
}

export default actions