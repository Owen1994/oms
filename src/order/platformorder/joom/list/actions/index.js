import * as config from '../../../../../util/connectConfig'
import axios from '../../../../../util/axios'
import {
    message
} from 'antd'
const header = ''
export const tablemodelInfo = 'joom-tablemodelInfo';
export const quickdstateInfo = 'joom-quickdstateInfo';

const getList = (params) => {
    return {
        type: tablemodelInfo,
        payload: params
    }
}
const getListAsync = (params) => (dispatch) => {
    dispatch(getList({ loading: false }))
    return axios.post(`${config.api_url}${header}/oms/order/manage/motan/service/api/IOrderManageService/searchJoomOrders`, params)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const data = response.data.data;
                    let p = {
                        list: data.data.map((v,key) => {
                            v.key = key;
                            // v.key = v.buyerId;
                            return v
                        }) || [],
                        total: data.total,
                        loading: false,
                    }
                    if (params) {
                        p.params = params.data;
                    }
                    dispatch(getList(p))
                } else {
                    message.error(response.data.msg);
                }
            }
        })
}

const getTabList = (params) => {
    return {
        type: quickdstateInfo,
        payload: params
    }
}
const getTabListAsync = (params) => (dispatch) => {
    return axios.post(`${config.api_url}${header}/oms/order/manage/motan/service/api/IOrderManageService/getJoomTabState`, params)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const data = response.data.data || [];
                    dispatch(getTabList(data))
                } else {
                    message.error(response.data.msg);
                }
            }
        })
}


const getJoomSellerId = (params)=>dispatch=>{
    return axios.post(`${config.api_url}${header}/oms/order/manage/motan/service/api/IOrderManageService/searchJoomSellerId`, params)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    return (response.data && response.data.list) || [];
                }
            }
        })
}
const getSyncJoomOrder = (params)=>dispatch=>{
    return axios.post(`${config.api_url}${header}/oms/order/manage/motan/service/api/IOrderManageService/syncJoomOrder`, params)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    return response.data
                }
            }
        })
}


const actions = {
    getList,
    getListAsync,
    getTabList,
    getTabListAsync,
    getJoomSellerId,
    getSyncJoomOrder,
    
}

export default actions




