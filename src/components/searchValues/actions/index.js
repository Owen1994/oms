/**
 *作者: 任贸华
 *功能描述: 弹窗分发事件
 *参数说明:
 *时间: 2018/4/16 11:01
 */
import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'

export const searchValuesInfo = 'searchValuesInfo'
export const searchValuesPaginationInfo = 'searchValuesPaginationInfo'
export const serchVluesListInfo = 'serchVluesListInfo'


const serchVluesListaction = value => ({
    type: serchVluesListInfo,
    payload: value
})

const searchVluesaction = value => ({
    type: searchValuesInfo,
    payload: value
})


const searchValuesPaginationaction = value => ({
    type: searchValuesPaginationInfo,
    payload: value
})


const fetchsearchValues = ({url, tags = [], idval = '', nameval = '', key = 'data', value = {},transformData}) => (dispatch, getState) => {

    dispatch(searchVluesaction({loading: true}))
    value.pageData = value.pageData ? value.pageData : 20
    value.pageNumber = value.pageNumber ? value.pageNumber : 1
    return axios.post(`${config.api_url}${url}`, value)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const total = response.data.total || response.data.data.length
                    var  data = response.data.data
                    dispatch(searchValuesPaginationaction({
                        current: value['pageNumber'] || 1,
                        total: total,
                        pageSize: value['pageData'] || 20
                    }))
                    let tagsarr = []
                    if (idval) {
                        const idarr = idval.split(',')
                        const namearr = nameval.split(',')
                        for (let i = 0; i < data.length; i++) {
                            if (idarr.includes(data[i].id)) {
                                data[i].checked = true
                                //tags.push(data[i])
                            }
                        }
                        for (let j = 0; j < idarr.length; j++) {
                            tagsarr.push({id: idarr[j], name: namearr[j], key: idarr[j]})
                        }
                    } else {
                        tagsarr = tags
                        const newtags = tagsarr.map(v => v.id)
                        for (let i = 0; i < data.length; i++) {
                            if (newtags.includes(data[i].id)) {
                                data[i].checked = true
                            }
                        }
                    }
                    if(transformData){
                        data = transformData(data)
                    }
                    dispatch(searchVluesaction({[key]: data, tags: tagsarr, loading: false}))

                }

            }
        }).catch(e => {
            console.log(e);
        })
}

const actions = {
    serchVluesListaction,
    searchVluesaction,
    searchValuesPaginationaction,
    fetchsearchValues,
}

export default actions




