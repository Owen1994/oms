/**
*作者: 任贸华
*功能描述: 获取列表数据
*参数说明:
*时间: 2018/4/16 11:28
*/
import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'
import searchValuesactions from '../../../components/searchValues/actions'
import commonactions from '../../../common/actions/commonactions'
import filteractions from './filter'
import priorityactions from './priority'
import warehouserulections from './warehouserule'

export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'
import {message} from 'antd';

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


export const fetchPosts = ({key, value = {}}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    value.pageData = value.pageData ? value.pageData : 20
    value.pageNumber = value.pageNumber ? value.pageNumber : 1
    value.salesPlatform = value.salesPlatform ? value.salesPlatform : ''
    return axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/queryConfigRuleWarehouse`, value)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const total = response.data.total

                    dispatch(Paginationmodelaction({
                        current: value['pageNumber'] || 1,
                        total: total,
                        pageSize: value['pageData'] || 20
                    }))
                    dispatch(tablemodelaction({[key]: response.data.data, loading: false}))
                } else {
                    message.error(response.data.msg)
                }
            }
        }).catch(e => {
            console.log(e);
        })
}

const actions = {
    ...searchValuesactions,
    ...filteractions,
    ...priorityactions,
    ...warehouserulections,
    ...commonactions,
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    Paginationmodelaction,
    fetchPosts,
}

export default actions




