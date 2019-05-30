import * as config from '@/util/connectConfig'
import axios from '@/util/axios'
import {
    message
} from 'antd'
const header = ''
export const tablemodelInfo = 'joom-tablemodelInfo';
export const quickdstateInfo = 'joom-quickdstateInfo';

const getListAsync = (params) => (dispatch) => {
    dispatch(getList({ loading: false }))
    return axios.post(`${config.api_url}${header}/oms/order/manage/motan/service/api/IOrderManageService/searchJoomOrders`, params)
        .then(response => {
            if (response.status == 200) {
            }
        })
}


const actions = {
    getListAsync,
}

export default actions




