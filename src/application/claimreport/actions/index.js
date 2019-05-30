
import searchValuesactions from "../../../components/searchValues/actions";
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";
import {roletableaction} from "../../../user/rolemanagement/actions";

export const baseInfo = 'baseInfo'
export const claimreportInfo = 'claimreportInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'

export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value
})

export const claimreportaction = value => ({
    type: claimreportInfo,
    payload: value
})

export const Paginationmodelaction = value => ({type: PaginationmodelInfo, payload: value})

export const fetchPosts = ({key, value}) => (dispatch, getState) => {

    var url=`${config.api_url}/arm/motan/service/api/IArmService/getReimReportList`
    dispatch(claimreportaction({loading: true}))
    return axios.post(url, value)
        .then(response => {
            if (response.status == 200) {
                const total = response.data.data.total
                dispatch(Paginationmodelaction({
                    current: value['pageNumber'] || 1,
                    total: total,
                    pageSize: value['pageData'] || 20
                }))
                dispatch(claimreportaction({data:response.data.data.lst,loading:false}))
            }
        }).catch(e => {
            console.log(e);
        })
}

const actions = {
    ...searchValuesactions,
    baseInfoForm,
    claimreportaction,
    Paginationmodelaction,
    fetchPosts
}

export default actions




