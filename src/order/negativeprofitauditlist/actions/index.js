/**
 * 作者: 陈林
 * 描述:负利润审核action
 * 时间: 2018/4/18 0018 下午 8:41
 **/
import { fetchPost } from 'util/fetch';
import commonactions from '../../../common/actions/commonactions'

import {datasaddkey, getrangetime} from "../../../util/baseTool";
import { 
    GETDEFICIT_PACKAGE_LIST,
    GET_FREIGHT_TRIAL, //  运费试算
    RECEIVE_TRIALFREIGHT_LIST,
    LOADING_RECORD_LIST
 } from '../constants';

export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'

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


export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    // if (!value.paymentStartTime) {
    //     const {start, end} = getrangetime()
    //     value.paymentStartTime = start
    //     value.paymentEndTime = end
    // }

    return fetchPost(GETDEFICIT_PACKAGE_LIST, value, 2)
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


const actions = {
    ...commonactions,
    modalmodelaction,
    tablemodelaction,
    Paginationmodelaction,
    fetchPosts,
}

export default actions




