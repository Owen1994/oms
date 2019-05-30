import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";

export const baseInfo = 'baseInfo'
export const claimreportdetailInfo = 'claimreportdetailInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'
export const claimeditmodalInfo = 'claimeditmodalInfo'
export const claimletterdeaileInfo = 'claimletterdeaileInfo'
export const claimlettableeditInfo = 'claimlettableeditInfo' //明细 编辑
export const claimlettablelcaimletterInfo = 'claimlettablelcaimletterInfo' //明细索赔信

export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value
})
export const claimreportdetailaction = value => ({
    type: claimreportdetailInfo,
    payload: value
})
export const Paginationmodelaction = value => ({type: PaginationmodelInfo, payload: value})

export const claimeditmodalaction = value => ({
    type: claimeditmodalInfo,
    payload: value
})
export const claimletterdeailemodalaction = value => ({
    type: claimletterdeaileInfo,
    payload: value
})

export const claimlettableeditaction = value => ({
    type: claimlettableeditInfo,
    payload: value
})

export const claimlettablelcaimletteraction = value => ({
    type: claimlettablelcaimletterInfo,
    payload: value
})

//列表数据加载公共方法
export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    var url=`${config.api_url}/arm/motan/service/api/IArmService/getReimReportDetailList`
    dispatch(claimreportdetailaction({loading: true}))
    return axios.post(url, value)
        .then(response => {
            if (response.status == 200) {
                const total = response.data.data.total
                dispatch(Paginationmodelaction({
                    current: value['pageNumber'] || 1,
                    total: total,
                    pageSize: value['pageData'] || 20
                }))
                dispatch(claimreportdetailaction({data:response.data.data.lst,loading:false}))
            }
        }).catch(e => {
            console.log(e);
        })
}

const actions = {
    baseInfoForm,
    claimreportdetailaction,
    Paginationmodelaction,
    claimeditmodalaction,
    claimletterdeailemodalaction,
    fetchPosts,
    claimlettableeditaction,
    claimlettablelcaimletteraction
}

export default actions




