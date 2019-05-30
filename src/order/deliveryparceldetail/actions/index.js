/**
 * 作者: 陈林
 * 描述: 分仓订单详情actions
 * 时间: 2018/4/18 0018 下午 8:49
 **/
export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const tablemodelInfo2 = 'tablemodelInfo2'
export const tablemodelInfo3 = 'tablemodelInfo3'
export const tablemodelInfo4 = 'tablemodelInfo4'
export const tablemodelInfo5 = 'tablemodelInfo5'
export const tablemodelInfo6 = 'tablemodelInfo6'
export const tablemodelInfo7 = 'tablemodelInfo7'
import axios from 'util/axios'
import * as config  from 'util/connectConfig'
import searchCountryactions from '@/components/searchCountry/actions'
import searchValuesactions from '@/components/searchValues/actions'
import { fetchPost } from 'util/fetch';
import {
    message,
} from 'antd'

export const baseInfoForm = value=> ({
    type: baseInfo,
    payload: value
})

export const modalmodelaction = value=> ({
    type: modalmodelInfo,
    payload: value
})

export const tablemodelaction = value=> ({
    type: tablemodelInfo,
    payload: value
})

export const tablemodelaction2 = value=> ({
    type: tablemodelInfo2,
    payload: value
})

export const tablemodelaction3 = value=> ({
    type: tablemodelInfo3,
    payload: value
})

export const tablemodelaction4 = value=> ({
    type: tablemodelInfo4,
    payload: value
})

export const tablemodelaction5 = value=> ({
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

export const fetchPosts = value => (dispatch, getState) => {
    dispatch(baseInfoForm({[value]: []}))
    return axios.post(`${config.api_url}/queryCategoryList.do`)
        .then(response => {
            if (response.status == 200) {
                if(response.data.state == "000001"){
                    dispatch(baseInfoForm({[value]: response.data.data,}))
                }else{
                    message.error(response.data.msg);
                }
            }
        }).catch(e=> {
            console.log(e);
        })
}

export const fetchzonesPosts = ({url, name, value, returnName}) => (dispatch, getState) => {
    return axios.post(`${url}?${name}=${value}`)
        .then(response => {
            if (response.status == 200) {
                if(response.data.state == "000001") {
                    dispatch(baseInfoForm({[returnName]: response.data.data,}))
                }else{
                    message.error(response.data.msg);
                }
            }
        }).catch(e=> {
            console.log(e);
        })
}

export const revokeAction = (params) => () => {
    return axios.post(`${config.api_url}/oms/order/manage/motan/IPackageApi/revokePackage`,params)
        .then(response => {
            if (response.status == 200) {
                if(response.data.state == "000001") {
                    return response.data
                }
            }
        }).catch(e => {
            console.log(e);
        })
}

export const queryLog = params => dispatch => {
    return fetchPost('/oms/order/manage/motan/IPackageApi/getPackageDetailLog', { data: params }, 2)
        .then(res => {
            if(res.state === '000001') {
                dispatch(tablemodelaction5({ data: res.data }));
            }
        })
}

const actions = {
    ...searchCountryactions,
    ...searchValuesactions,
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
    revokeAction,
    queryLog,
}

export default actions