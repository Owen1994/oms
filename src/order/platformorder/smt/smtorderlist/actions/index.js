import * as config from '../../../../../util/connectConfig'
import axios from '../../../../../util/axios'
import commonactions from '../../../../../common/actions/commonactions'
import searchOptactions from '../../../../../components/searchOpt/actions'
import searchValuesactions from '../../../../../components/searchValues/actions'
import {
    message
} from 'antd'

import {datasaddkey} from '../../../../../util/baseTool';
export const baseInfo = 'baseInfo';
export const tablemodelInfo = 'tablemodelInfo';
export const modalmodelInfo = 'modalmodelInfo';
export const PaginationmodelInfo = 'PaginationmodelInfo';
export const quickdstate = 'quickdstate';
export const synchroInfo = 'synchroInfo';
export const placeInfo = 'placeInfo' ;      //获取发货地

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

export const Paginationmodelaction = value => ({
    type: PaginationmodelInfo,
    payload: value
})

export const quickdstateData = value => ({
    type: quickdstate,
    payload: value
})

export const synchroInfoaction = value =>({
    type: synchroInfo,
    payload: value
})

export const placeInfoaction = value => ({
    type: placeInfo,
    payload: value
})

export const fetchPosts2 = value => (dispatch, getState) => {
    return axios(`http://localhost:3333/testApi/bd`)
        .then(response => {
            if (response.status == 200) {
                dispatch(tablemodelaction({[value]: response.data.data,}))
            }
        }).catch(e => {
            console.log(e);
        })
}

export const fetchcitysPosts = ({name, value, returnName}) => (dispatch, getState) => {
    return axios(`http://localhost:3333/testApi/citys?${name}=${value}`)
        .then(response => {
            if (response.status == 200) {
                dispatch(baseInfoForm({[returnName]: response.data.data,}))
            }
        }).catch(e => {
            console.log(e);
        })
}

/**
 * 作者: pzt
 * 描述: 获取快捷状态
 * 时间: 2018/4/4 17:21
 * @param <Array> name 保存响应数据
 * @param <Array> value 请求参数
 **/
export const fetchquickdstatePosts = ({name, value = {}}) => (dispatch, getState) => {
    return axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabApi/quickdState`,value)
        .then(response => {
            if (response.status == 200) {
                if(response.data.state == '000001'){
                    dispatch(quickdstateData({[name]: response.data.data,}))
                }else{
                    message.error("服务器响应失败！");
                }
            }
        }).catch(e => {
            console.log(e);
        })
}


export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    return axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabApi/getOrderList`,value)
        .then(response => {
            if (response.status == 200) {
                if(response.data.state == '000001'){
                    const total = response.data.total
                    dispatch(Paginationmodelaction({
                        current: value['pageNumber'] || 1,
                        total: total,
                        pageSize: value['pageData'] || 20
                    }))
                    const tableItems = response.data.data
                    const newTableItmes = datasaddkey(tableItems)

                   dispatch(tablemodelaction({[key]: newTableItmes, loading: false}))
                }else{
                    message.error(response.data.msg)
                }
            }
        }).catch(e => {
            console.log(e);
        })
}

export const fetchsynchroPosts = ({key, value}) => (dispatch, getState)=>{
    return axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabApi/syncOrder`, value)
        .then(response => {
            if(response.status == 200){
                if(response.data.state == '000001') {
                    dispatch(synchroInfoaction({[key]: response.data.msg}))
                }else{
                    message.error(response.data.msg);
                }
            }
        })
}

export const fetchplacePosts = ({key, type}) => (dispatch, getState)=>{
    return axios.post(`${config.api_url}/oms/order/grab/motan/OrderBadgeApi/getListLogisticsService`, type)
        .then(response => {
            if(response.status == 200){
                dispatch(placeInfoaction({[key]: response.data.data}))
            }
        })
}

const actions = {
    ...searchOptactions,
    ...commonactions,
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    Paginationmodelaction,
    quickdstateData,
    synchroInfoaction,
    placeInfoaction,
    fetchPosts2,
    fetchcitysPosts,
    fetchPosts,
    fetchquickdstatePosts,
    fetchsynchroPosts,
    fetchplacePosts,
    ...searchValuesactions,
}

export default actions




