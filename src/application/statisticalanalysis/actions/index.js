import searchValuesactions from "../../../components/searchValues/actions";
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";

export const baseInfo = 'baseInfo'
export const claimreportInfo = 'claimreportInfo'

export const dataoverviewInfo = 'dataoverviewInfo'
export const timeInfo = 'timeInfo'
export const rankingtimeInfo = 'rankingtimeInfo'
export const rankingbysiteInfo = 'rankingbysiteInfo'
export const rankingasinInfo = 'rankingasinInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'
export const PaginationsiteInfo = 'PaginationsiteInfo'
export const PaginationasinInfo = 'PaginationasinInfo'
export const claimdatalistInfo = 'claimdatalistInfo'


export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value
})

export const claimreportaction = value => ({
    type: claimreportInfo,
    payload: value
})

export const rankingbysiteaction = value => ({
    type: rankingbysiteInfo,
    payload: value
})

export const rankingasinaction = value => ({
    type: rankingasinInfo,
    payload: value
})

export const claimdatalistaction = value => ({
    type: claimdatalistInfo,
    payload: value
})

export const Paginationmodelaction = value => ({type: PaginationmodelInfo, payload: value})

export const Paginationsiteaction = value => ({type: PaginationsiteInfo, payload: value})

export const Paginationasinaction = value => ({type: PaginationasinInfo, payload: value})

export const dataoverviewaction = value => ({
    type: dataoverviewInfo,
    payload: value
})

export const timeaction = value => ({
    type:  timeInfo,
    payload: value
})

export const rankingtimeaction = value => ({
    type:  rankingtimeInfo,
    payload: value
})

//数据概况
export const dataoverviewajax = ({key, value}) => (dispatch, getState) => {
    var url=`${config.api_url}/arm/motan/service/api/IArmService/getReimBriefByShopAccount`
    return axios.post(url, value)
        .then(response => {
            if (response.status == 200) {
                dispatch(dataoverviewaction({data:response.data.data}))
            }
        }).catch(e => {
            console.log(e);
        })
}

//图像索赔数据
export const claimdataajax = ({key, value,tab}) => (dispatch, getState) => {
    var url=`${config.api_url}/arm/motan/service/api/IArmService/getStatShopAccountByMonth`
    return axios.post(url, value)
        .then(response => {
            if (response.status == 200) {
                let datalist=response.data.data;
                let tablist=[]
                for(var i=0;i<datalist.length;i++){
                    if(tab=="1"){
                        tablist.push(datalist[i].estimatedAmount);
                    }
                }
                dispatch(claimdatalistaction({data:tablist}))
            }
        }).catch(e => {
            console.log(e);
        })
}
//排名按店铺
export const ringingdataajax = ({key, value}) => (dispatch, getState) => {
    var url=`${config.api_url}/arm/motan/service/api/IArmService/getReimRankingByShopAccount`
    return axios.post(url, value)
        .then(response => {
            if (response.status == 200) {
                const total = response.data.data.total
                dispatch(Paginationmodelaction({
                    current: value['pageNumber'] || 1,
                    total: total,
                    pageSize: value['pageData'] || 20
                }))
                dispatch(claimreportaction({data:response.data.data.lst}))

            }
        }).catch(e => {
            console.log(e);
        })
}

//排名按站点
export const ringsitedataajax = ({key, value}) => (dispatch, getState) => {
    var url=`${config.api_url}/arm/motan/service/api/IArmService/getReimRankingBySite`
    return axios.post(url, value)
        .then(response => {
            if (response.status == 200) {
                const total = response.data.data.total
                dispatch(Paginationsiteaction({
                    current: value['pageNumber'] || 1,
                    total: total,
                    pageSize: value['pageData'] || 20
                }))
                dispatch(rankingbysiteaction({data:response.data.data.lst}))
            }
        }).catch(e => {
            console.log(e);
        })
}
//排名按Asin
export const ringasindataajax = ({key, value}) => (dispatch, getState) => {
    var url=`${config.api_url}/arm/motan/service/api/IArmService/getReimRankingByAsin`
    return axios.post(url, value)
        .then(response => {
            if (response.status == 200) {
                const total = response.data.data.total
                dispatch(Paginationasinaction({
                    current: value['pageNumber'] || 1,
                    total: total,
                    pageSize: value['pageData'] || 20
                }))
                dispatch(rankingasinaction({data:response.data.data.lst}))
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
    dataoverviewaction,
    timeaction,
    rankingtimeaction,
    claimdataajax, //图像索赔数据
    dataoverviewajax, //数据概况
    ringingdataajax, //排名店铺
    ringsitedataajax,//排名站点
    ringasindataajax,//排名asin
    rankingbysiteaction,
    rankingasinaction,
    Paginationsiteaction,
    Paginationasinaction,
    claimdatalistaction,
}

export default actions




