/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--全部订单--actions
 *参数说明:
 *时间: 2018/5/28 9:59
 */
import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'
import commonactions from '../../../common/actions/commonactions'
import searchCountryactions from '../../../components/searchCountry/actions'
import searchValuesactions from '../../../components/searchValues/actions'
import { getrangetime } from "../../../util/baseTool";

export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'
import { message } from 'antd';

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


export const fetchPosts = ({ key, value }) => (dispatch, getState) => {
    dispatch(tablemodelaction({ loading: true }))
    return axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getOrderList`, value)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const total = response.data.total
                    dispatch(Paginationmodelaction({
                        current: value['pageNumber'] || 1,
                        total: total,
                        pageSize: value['pageData'] || 20
                    }))
                    dispatch(tablemodelaction({ [key]: response.data, loading: false }))
                } else {
                    message.error(response.data.msg)
                }
            }
        }).catch(e => {
            console.log(e);
        })
}
const actions = {
    ...searchCountryactions,
    ...searchValuesactions,
    ...commonactions,
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    Paginationmodelaction,
    fetchPosts,
}

export default actions




