/**
 *作者: 唐峰
 *功能描述: 渠道列表页方法的action集合
 *参数说明:
 *时间: 2018/4/4 9:26
 */
import * as config from '../../../../util/connectConfig'
import axios from '../../../../util/axios'
import searchValuesactions from '../../../../components/searchValues/actions'

export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'

/**
 *作者: 唐峰
 *功能描述: 顶部搜索组件的表单信息action
 *参数说明:
 *时间: 2018/4/4 9:28
 */
export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value
})


/**
 *作者: 唐峰
 *功能描述: 表格模块表格数据action
 *参数说明:
 *时间: 2018/4/4 9:42
 */
export const tablemodelaction = value => ({
    type: tablemodelInfo,
    payload: value
})


/**
 *作者: 唐峰
 *功能描述: 列表数据请求  http://192.168.201.211:9090/mockjsdata/19/arm/motan/service/api/IArmService/getReimedReportList
 *参数说明:@key 用于存返回的数据  @value 页码数据  ${config.api_url}/urc/motan/service/api/IUrcService/getUsersByUserInfo
 *时间: 2018/4/4 9:55
 */
export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    const current = value['pageNumber'] || 1;
    const pageSize = value['pageData'] || 20;
    return axios.post(`/arm/motan/service/api/IArmService/getReimedReportList`, value)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const total = response.data.data.total
                    dispatch(tablemodelaction({
                        current: current,           //每页展示的条数
                        total: total,               //总条数
                        pageSize: pageSize          //当前页码
                    }))
                    dispatch(tablemodelaction({[key]: response.data.data, loading: false}))
                }
            }
        }).catch(e => {
            console.log(e);
        })
}

const actions = {
    ...searchValuesactions,
    baseInfoForm,
    tablemodelaction,
    fetchPosts,
}

export default actions




