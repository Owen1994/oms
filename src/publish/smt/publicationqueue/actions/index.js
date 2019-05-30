import axios from "../../../../util/axios";
import * as config from "../../../../util/connectConfig";

export const baseInfo = 'baseInfo'
export const queuetableInfo = 'queuetableInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'


export const baseInfoForm = value => ({type: baseInfo, payload: value})
export const queuetableaction = value => ({type: queuetableInfo, payload: value})
export const Paginationmodelaction = value => ({type: PaginationmodelInfo, payload: value})

//列表数据加载公共方法
export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    //var url=`${config.api_url}/arm/motan/service/api/IArmService/getReimReportDetailList`
    var url=`${config.api_url}/smtbatchlisting/api/sku/PublishList/publishList`
    dispatch(queuetableaction({loading: true}))
    return axios.post(url, value)
        .then(response => {
            if (response.status == 200) {
                const total = response.data.data.total
                dispatch(Paginationmodelaction({
                    current: value['pageNumber'] || 1,
                    total: total,
                    pageSize: value['pageData'] || 20
                }))
                dispatch(queuetableaction({data:response.data.data.data,loading:false}))
            }
        }).catch(e => {
            console.log(e);
        })
}

const actions = {
    baseInfoForm,queuetableaction,Paginationmodelaction,fetchPosts
}

export default actions




