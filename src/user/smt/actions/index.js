import * as config from '@/util/connectConfig'
import axios from '@/util/axios'

export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'
export const quickdstate = 'quickdstate'
export const tablemodelInfo2 = 'tablemodelInfo2'
export const placeInfo = 'placeInfo' //获取发货地
import {
    datasaddkey,
} from '@/util/baseTool';
export const baseInfoForm = value => ({type: baseInfo, payload: value})

export const modalmodelaction = value => ({type: modalmodelInfo, payload: value})

export const tablemodelaction = value => ({type: tablemodelInfo, payload: value})

export const Paginationmodelaction = value => ({type: PaginationmodelInfo, payload: value})

export const tablemodelaction2 = value => ({type: tablemodelInfo2, payload: value})

/**
    *作者: 唐勇
    *功能描述: 查询列表数据
    *参数说明:
    *时间: 2018/4/3 19:00
    */
export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    return axios
        .post(`${config.api_url}/oms/order/grab/motan/SellStoreAccountApi/findStoreList`, value)
        .then(response => {
            if (response.status == 200) {
                const productInfo = response.data.data;
                const productInfoarr = datasaddkey(productInfo);
                const newproductInfoarr = productInfoarr.length
                    ? productInfoarr.map((v, i) => {
                        var starttime = v.secretStartTime;
                        var endtime = v.secretEndTime;
                        var showabled = true
                        var time = ''
                        if (!starttime || !endtime) {
                            showabled = false;
                        }
                        time = showabled
                            ? starttime + '-' + endtime
                            : starttime || "" + endtime || ""
                        return ({
                            sid: v.sid,
                            platformAccounts: v.platformAccount,
                            accountTypes: {
                                name: `accountTypes${v.key}`,
                                initialValue: v.accountType,
                                message: '请选择账号类型',
                                placeholder: '账号类型'
                            },
                            authStates: {
                                name: `authStates${v.key}`,
                                initialValue: v.authState,
                                message: '请选择授权状态',
                                placeholder: '授权状态'
                            },
                            Keyvalidityperiods: time,
                            operators: v.operator,
                            operationTimes: v.operationTime,
                            shopId: v.shopId,
                            url: v.url
                        })
                    })
                    : []

                const total = response.data.total
                dispatch(Paginationmodelaction({
                    current: value['pageNumber'] || 1,
                    total: total,
                    pageSize: value['pageData'] || 20
                }))
                dispatch(tablemodelaction({data: newproductInfoarr, count: newproductInfoarr.length, loading: false}));
            }
        })
        .catch(e => {
            console.log(e);
        })
}

const actions = {
    baseInfoForm,
    modalmodelaction,
    Paginationmodelaction,
    tablemodelaction2,
    tablemodelaction,
    fetchPosts
}

export default actions
