import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'
import searchOptactions from '../../../components/searchOpt/actions'

export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const modalmodelInfo2 = 'modalmodelInfo2'
export const modalmodelInfo3 = 'modalmodelInfo3'
export const modalmodelInfo4 = 'modalmodelInfo4'

export const PaginationmodelInfo = 'PaginationmodelInfo'
export const tablemodelInfo2 = 'tablemodelInfo2'
export const tablemodelInfo3 = 'tablemodelInfo3'
export const tablemodelInfo4 = 'tablemodelInfo4'
import searchCountryactions from '../../../components/searchCountry/actions'
import searchValuesactions from '../../../components/searchValues/actions'

import commonactions from '../../../common/actions/commonactions'

export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value
})


export const modalmodelaction = value => ({
    type: modalmodelInfo,
    payload: value
})
//删除弹窗
export const modalmodelaction2 = value => ({
    type: modalmodelInfo2,
    payload: value
})
//查看弹窗
export const modalmodelaction3 = value => ({
    type: modalmodelInfo3,
    payload: value
})

export const modalmodelaction4= value => ({
    type: modalmodelInfo4,
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

export const Paginationmodelaction = value => ({
    type: PaginationmodelInfo,
    payload: value
})

export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    return axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/queryConfigRuleAddressee`, value)
        .then(response => {
            if (response.status == 200) {
                const total = response.data.total
                dispatch(Paginationmodelaction({
                    current: value['pageNumber'] || 1,
                    total: total,
                    pageSize: value['pageData'] || 20
                }))
                dispatch(tablemodelaction({[key]: response.data.data, loading: false}))
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
    tablemodelaction2,
    tablemodelaction3,
    tablemodelaction4,
    Paginationmodelaction,
    fetchPosts,
    modalmodelaction2,
    modalmodelaction3,
    modalmodelaction4,
}

export default actions




