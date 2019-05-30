import * as config from '@/util/connectConfig'
import axios from '@/util/axios'
import { fetchPost} from '@/util/fetch'
import commonactions from '@/common/actions/commonactions'
import searchCountryactions from '@/components/searchCountry/actions'
import searchValuesactions from '@/components/searchValues/actions'

export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'
export const exceptiontypeInfo = 'exceptiontypeInfo'
import {getrangetime} from "@/util/baseTool";
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

export const exceptiontypeaction = value => ({
    type: exceptiontypeInfo,
    payload: value
})

export const Paginationmodelaction = value => ({
    type: PaginationmodelInfo,
    payload: value
})

// export const fetchPosts2 = value => (dispatch, getState) => {

//     return axios(`http://localhost:3333/testApi/bd`)
//         .then(response => {
//             if (response.status == 200) {
//                 if (response.data.state == '000001') {
//                     dispatch(tablemodelaction({[value]: response.data.data,}))
//                 } else {

//                 }

//             }
//         }).catch(e => {
//             console.log(e);
//         })
// }

// export const fetchcitysPosts = ({name, value, returnName}) => (dispatch, getState) => {
//     return axios(`http://localhost:3333/testApi/citys?${name}=${value}`)
//         .then(response => {
//             if (response.status == 200) {
//                 dispatch(baseInfoForm({[returnName]: response.data.data,}))
//             }
//         }).catch(e => {
//             console.log(e);
//         })
// }


export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    return fetchPost(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getExceptionOrderList`, value, 2)
        .then(response => {
            if (response.state == '000001') {
                const total = response.total
                dispatch(Paginationmodelaction({
                    current: value['pageNumber'] || 1,
                    total: total,
                    pageSize: value['pageData'] || 20
                }))
                dispatch(exceptiontypeaction(value.exceptionType || "0"))
                dispatch(tablemodelaction({[key]: response, loading: false}))
            }
        })
}

export const redoSeparateWarehouseAsync = (params) => (dispatch, getState) => {
    return axios.post(`${config.api_url}/oms/order/manage/motan/service/api/IOrderManageService/redoSeparateWarehouse`, params)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    return response.data
                }else {
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
    // fetchPosts2,
    // fetchcitysPosts,
    fetchPosts,
    exceptiontypeaction,
    redoSeparateWarehouseAsync
}

export default actions




