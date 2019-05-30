export const joomDetialInfo = 'joom-detial-info'
import axios from '../../../../../util/axios'
import * as config from '../../../../../util/connectConfig'

const getDetail = (payload) => {
    return {
        type: joomDetialInfo,
        payload
    }
}
const getDetailAsync = (params) => (dispatch) => {
    return axios.post(`${config.api_url}/oms/order/manage/motan/service/api/IOrderManageService/joomOrderDetail`, params)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001' && response.data.data) {
                    const data = response.data.data.order;
                    dispatch(getDetail(data))
                } else {
                    message.error(response.data.msg);
                }
            }
        })
}

const getLogAsync = (params) => (dispatch) => {
    return axios.post(`${config.api_url}/oms/order/manage/motan/service/api/IOrderManageService/joomOrderLogs`, params)
        .then(response => {
            if (response.data.state == '000001') {
                return response.data.data;
            } else {
                message.error(response.data.msg);
            }
        })
}


const actions = {
    getDetail,
    getDetailAsync,
    getLogAsync
}

export default actions
