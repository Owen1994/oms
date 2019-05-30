import axios from "../../../../util/axios";
import * as config from "../../../../util/connectConfig";
import {modalmodelInfo3} from "../../../../order/orderconsignee/actions";

export const baseInfo = 'baseInfo'
export const settingtableInfo = 'settingtableInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'
export const PaginationmodelInfo2 = 'PaginationmodelInfo2'
export const modalmodelInfo = 'modalmodelInfo'
export const settingtantableInfo = 'settingtantableInfo' //弹窗

export const baseInfoForm = value => ({type: baseInfo, payload: value})
export const settingtableaction = value => ({type: settingtableInfo, payload: value})

export const settingtantableaction = value => ({type: settingtantableInfo, payload: value})
export const Paginationmodelaction = value => ({type: PaginationmodelInfo, payload: value})
export const Paginationmodelaction2 = value => ({type: PaginationmodelInfo2, payload: value})
//弹窗
export const modalmodelaction = value => ({
    type: modalmodelInfo,
    payload: value
})

//列表数据加载公共方法
export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    // var url=`http://192.168.201.211:9090/mockjsdata/25/plsamazon/api/setting/importList`
    var url = `/smtbatchlisting/api/sku/LogList/logList`;
    return axios.post(url, value)
        .then(response => {
            if (response.data.state == '000001') {
                const total = response.data.data.total
                dispatch(Paginationmodelaction({
                    current: value['pageNumber'] || 1,
                    total: total,
                    pageSize: value['pageData'] || 20
                }))
                dispatch(settingtableaction({data:response.data.data.data,loading:false}))
            }
        }).catch(e => {
            console.log(e);
        })
}

//列表数据加载公共方法
export const fetchtanPosts = ({key, value}) => (dispatch, getState) => {
    // var url=`http://192.168.201.211:9090/mockjsdata/25/plsamazon/api/setting/sellerAccount`
    var url = `/smtbatchlisting/api/account/AccountList/accountList`;
    return axios.post(url, value)
        .then(response => {
            if (response.data.state == '000001') {
                const total = response.data.data.total
                dispatch(Paginationmodelaction2({
                    current: value['pageNumber'] || 1,
                    total: total,
                    pageSize: value['pageData'] || 20
                }))
                dispatch(settingtantableaction({data:response.data.data.data,loading:false}))
            }
        }).catch(e => {
            console.log(e);
        })
}

const actions = {
    baseInfoForm,settingtableaction,Paginationmodelaction,modalmodelaction,Paginationmodelaction2,fetchPosts,settingtantableaction,fetchtanPosts
}

export default actions




