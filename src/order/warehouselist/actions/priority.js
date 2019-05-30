/**
*作者: 任贸华
*功能描述: 获取优先级数据
*参数说明:
*时间: 2018/4/16 11:29
*/
import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'

export const priorityTableactionInfo = 'priorityTableactionInfo'
import {message} from 'antd';

export const priorityTableaction = value => ({
    type: priorityTableactionInfo,
    payload: value
})


export const fetchpriorityPosts = ({key, value = {}}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    return axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/getOrderGrabConfigAllSkuConfig`, value)
        .then(response => {

            if (response.status == 200) {
                if (response.data.state == '000001') {
                    dispatch(priorityTableaction({[key]: response.data.data, loading: false}))
                } else {
                    message.error(response.data.msg)
                }
            }
        }).catch(e => {
            console.log(e);
        })
}

export const fetchwarehouseDeliverPosts = ({key, value = {}}) => (dispatch, getState) => {
    return axios.post(`${config.api_url}/oms/order/manage/motan/IPackageApi/getPackageWarehouseDeliver`, value)
        .then(response => {

            if (response.status == 200) {
                if (response.data.state == '000001') {
                    dispatch(priorityTableaction({[key]: response.data.data,}))
                } else {
                    message.error(response.data.msg)
                }
            }
        }).catch(e => {
            console.log(e);
        })
}


const actions = {
    priorityTableaction,
    fetchpriorityPosts,
    fetchwarehouseDeliverPosts,
}

export default actions




