/**
*作者: 任贸华
*功能描述: 获取过滤器数据
*参数说明:
*时间: 2018/4/16 11:29
*/
import * as config from '../../../util/connectConfig'
import {post} from '../../../util/axios'
import {message} from 'antd';
export const filterTableactionInfo = 'filterTableactionInfo'

export const filterTableaction = value => ({
    type: filterTableactionInfo,
    payload: value
})


export const fetchfilterPosts = ({key, value={}}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    return axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/getOrderGrabConfigAllSkuConfig`, value)
        .then(response => {

            if (response.status == 200) {
                if (response.data.state == '000001') {
                dispatch(filterTableaction({[key]: response.data.data, loading: false}))
            }else {
                    message.error(response.data.msg)
                }
            }
        }).catch(e => {
            console.log(e);
        })
}


const actions = {
    filterTableaction,
    fetchfilterPosts,
}

export default actions




