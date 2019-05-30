/**
 *作者: 唐峰
 *功能描述: 渠道标记-修改页 相关action
 *参数说明:
 *时间: 2018/4/4 14:17
 */
import * as config from 'util/connectConfig'
import axios from 'util/axios'
import searchOptactions from '@/components/searchOpt/actions'
import searchValuesactions from "@/components/searchValues/actions";

export const baseInfo = 'baseInfo';
export const buttonTypeInfo = 'buttonTypeInfo';
export const tablemodelInfo = 'tablemodelInfo';
export const tablemodelInfo2 = 'tablemodelInfo2' //标记详情
export const tablemodelInfo3 = 'tablemodelInfo3' //第三方详情
export const tablemodelInfo5 = 'tablemodelInfo5' //仓库详情
export const skuprefixModalmodelInfo = 'skuprefixModalmodelInfo';
export const signModalmodelInfo = 'signModalmodelInfo';
export const signupdateModalmodelInfo = 'signupdateModalmodelInfo';

export const thirdModalmodelInfo = 'thirdModalmodelInfo';
export const PaginationmodelInfo = 'PaginationmodelInfo';
export const skuprefixTableactionInfo = 'skuprefixTableactionInfo';
export const thirdinfoTableactionInfo = 'thirdinfoTableactionInfo';
export const signinfoTableactionInfo = 'signinfoTableactionInfo';

export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value
})

export const buttonTypelaction = value => ({
    type: buttonTypeInfo,
    payload: value
})

export const skuprefixModelaction = value => ({
    type: skuprefixModalmodelInfo,
    payload: value
})

export const signModalmodelaction = value => ({
    type: signModalmodelInfo,
    payload: value
})

export const signupdateModalmodelaction = value => ({
    type: signupdateModalmodelInfo,
    payload: value
})


export const thirdModalmodelaction = value => ({
    type: thirdModalmodelInfo,
    payload: value
})

export const tablemodelaction = value => ({
    type: tablemodelInfo,
    payload: value
})

//详情相关
export const tablemodelaction2 = value=> ({
    type: tablemodelInfo2,
    payload: value
})

//详情相关
export const tablemodelaction3 = value=> ({
    type: tablemodelInfo3,
    payload: value
})

//详情相关
export const tablemodelaction5 = value=> ({
    type: tablemodelInfo5,
    payload: value
})

//仓库信息
export const skuprefixTableaction = value => ({
    type: skuprefixTableactionInfo,
    payload: value
})

//第三方信息
export const thirdinfoTableaction = value => ({
    type: thirdinfoTableactionInfo,
    payload: value
});

//标记信息
export const signinfoTableaction = value => ({
    type: signinfoTableactionInfo,
    payload: value
});

//分页
export const Paginationmodelaction = value => ({
    type: PaginationmodelInfo,
    payload: value
})

//本地数据请求方法
export const fetchPosts2 = value => (dispatch, getState) => {

    return axios(`http://localhost:3333/testApi/bd`)
        .then(response => {
            if (response.status == 200) {
                dispatch(tablemodelaction({[value]: response.data.data,}))
            }
        }).catch(e => {
            console.log(e);
        })
}

//仓库信息--保存时数据请求
export const fetchskuprefixPosts = ({key, value={}}) => (dispatch, getState) => {
        dispatch(tablemodelaction({loading: true}))
        const current=value['pageSize'] || 1;
        const pageSize=value['offset'] ||20;
        return axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/getOrderGrabConfigAllSkuConfig`, value)
            .then(response => {
                if (response.status == 200) {
                    dispatch(skuprefixTableaction({[key]: response.data.data, loading: false}))
                }
            }).catch(e => {
                console.log(e);
            })
    }

//标记信息--保存时数据请求
export const fetchSigninfoPosts = ({key, value={}}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    const current=value['pageSize'] || 1;
    const pageSize=value['offset'] ||20;
    return axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/getOrderGrabConfigAllSkuConfig`, value)
        .then(response => {
            if (response.status == 200) {
                dispatch(signinfoTableaction({[key]: response.data.data, loading: false}))
            }
        }).catch(e => {
            console.log(e);
        })
}

//第三方信息--保存时数据请求
export const fetchThirdinfoPosts = ({key, value={}}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    const current=value['pageSize'] || 1;
    const pageSize=value['offset'] ||20;
    return axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/getOrderGrabConfigAllSkuConfig`, value)
        .then(response => {
            if (response.status == 200) {
                dispatch(thirdinfoTableaction({[key]: response.data.data, loading: false}))
            }
        }).catch(e => {
            console.log(e);
        })
}

//获取city数据请求
export const fetchcitysPosts = ({name, value, returnName}) => (dispatch, getState) => {
    return axios(`http://localhost:3333/testApi/citys?${name}=${value}`)
        .then(response => {
            if (response.status == 200) {
                dispatch(baseInfoForm({[returnName]: response.data.data,}))
            }
        }).catch(e => {
            console.log(e);
        })
}

//获取单条数据详细信息请求
export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    return axios.get(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/queryConfigRuleChannel`, {params: value})
        .then(response => {
            if (response.status == 200) {
                const total = response.data.total
                dispatch(Paginationmodelaction({
                    current: value['pageSize'] || 1,
                    total: total,
                    pageSize: value['offset'] || 20
                }))
                dispatch(tablemodelaction({[key]: response.data.data, loading: false}))
            }
        }).catch(e => {
            console.log(e);
        })
}

const actions = {
    ...searchOptactions,
    ...searchValuesactions,
    baseInfoForm,
    buttonTypelaction,
    skuprefixModelaction,
    signModalmodelaction,
    signupdateModalmodelaction,
    thirdModalmodelaction,
    tablemodelaction,
    tablemodelaction2,
    tablemodelaction3,
    tablemodelaction5,
    Paginationmodelaction,
    fetchPosts2,
    fetchcitysPosts,
    fetchPosts,
    fetchskuprefixPosts,
    fetchSigninfoPosts,
    fetchThirdinfoPosts,
    skuprefixTableaction,
    signinfoTableaction,
    thirdinfoTableaction,
}

export default actions




