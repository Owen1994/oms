/**
 * 作者: 陈林
 * 描述: 增加页面相关action
 * 时间: 2018/4/18 0018 下午 8:32
 **/
// import * as config from '../../../util/connectConfig'
// import axios from '../../../util/axios'
import { fetchPost } from 'util/fetch';
import commonactions from '../../../common/actions/commonactions'
// import searchOptactions from '../../../components/searchOpt/actions'
// import searchCountryactions from '../../../components/searchCountry/actions'
// import searchValuesactions from '../../../components/searchValues/actions'
// import {
//     message,
// } from 'antd'
import {datasaddkey, getrangetime} from "../../../util/baseTool";
import {
    REVOKE_PACKAGE,
    GETPACKAGE_LIST
} from '../constants';

// export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'
// export const baseInfoForm = value => ({
//     type: baseInfo,
//     payload: value
// })


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


// export const fetchPosts2 = value => (dispatch, getState) => {
//     return fetchPost(`http://localhost:3333/testApi/bd`)
//             .then(data => {
//                 if(data.state == "000001"){
//                     dispatch(tablemodelaction({[value]: response.data.data,}))
//                 }else{
//                    message.error(response.data.msg);
//                 }
//         })
// }

// export const fetchcitysPosts = ({name, value, returnName}) => (dispatch, getState) => {
//     return axios.post(`http://localhost:3333/testApi/citys?${name}=${value}`)
//         .then(response => {
//             if (response.status == 200) {
//                 if(response.data.state == "000001") {
//                     dispatch(baseInfoForm({[returnName]: response.data.data,}))
//                 }else{
//                     message.error(response.data.msg);
//                 }
//             }
//         }).catch(e => {
//             console.log(e);
//         })
// }


export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    // if (!value.paymentStartTime) {
    //     const {start, end} = getrangetime()
    //     value.paymentStartTime = start
    //     value.paymentEndTime = end
    // }
    
    return fetchPost(GETPACKAGE_LIST,  value, 2)
            .then(data => {
                if(data.state == "000001") {
                    const total = data.total
                    dispatch(Paginationmodelaction({
                        current: value['pageNumber'] || 1,
                        total: total,
                        pageSize: value['pageData'] || 20
                    }))
                    dispatch(tablemodelaction({[key]: data, loading: false}))
                }
        })
}
// 撤单
export const revokeAction = (params) => () => {
    return fetchPost(REVOKE_PACKAGE, params)
            .then(data => {
                    if(data.state == "000001") {
                        return data
                    }
            });
}



const actions = {
    // ...searchOptactions,
    // ...searchCountryactions,
    // ...searchValuesactions,
    ...commonactions,
    // baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    Paginationmodelaction,
    fetchPosts,
    revokeAction
}

export default actions




