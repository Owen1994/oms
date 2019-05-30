/**
 *作者: 任贸华
 *功能描述: 暂未用到
 *参数说明:
 *时间: 2018/4/16 11:15
 */
import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'

export const countrysearchInfo = 'countrysearchInfo'
export const countrysearchPaginationInfo = 'countrysearchPaginationInfo'
export const serchcountryListInfo = 'serchcountryListInfo'


const serchcountryListaction = value => ({
    type: serchcountryListInfo,
    payload: value
})

const countrysearchaction = value => ({
    type: countrysearchInfo,
    payload: value
})


const searchcountryaction = value => ({
    type: countrysearchPaginationInfo,
    payload: value
})


const fetchsearchcountry = ({key, value}) => (dispatch, getState) => {

    dispatch(countrysearchaction({loading: true}))
    return axios.get(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getCountry`, {params: value})
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const total = response.data.total || 100
                    dispatch(searchcountryaction({
                        current: value['pageSize'] || 1,
                        total: total,
                        pageSize: value['offset'] || 10
                    }))
                    dispatch(countrysearchaction({[key]: response.data.data, loading: false}))
                }

            }

        }).catch(e => {
            console.log(e);
        })
}

const actions = {
    serchcountryListaction,
    countrysearchaction,
    searchcountryaction,
    fetchsearchcountry,
}

export default actions




