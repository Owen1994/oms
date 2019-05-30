/**
 *作者: 唐峰
 *功能描述: 渠道列表页方法的action集合
 *参数说明:
 *时间: 2018/4/4 9:26
 */
import * as config from '../../../../util/connectConfig';
import axios from '../../../../util/axios';
import searchValuesactions from '../../../../components/searchValues/actions';

export const baseInfo = 'baseInfo';
export const tablemodelInfo = 'tablemodelInfo';
export const modalmodelInfo = 'modalmodelInfo';
export const PaginationmodelInfo = 'PaginationmodelInfo';

/**
 *作者: 唐峰
 *功能描述: 顶部搜索组件的表单信息action
 *参数说明:
 *时间: 2018/4/4 9:28
 */
export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value,
});

/**
 *作者: 唐峰
 *功能描述: 用于表格列表的删除按钮action
 *参数说明:
 *时间: 2018/4/4 11:00
 */
export const modalmodelaction = value => ({
    type: modalmodelInfo,
    payload: value,
});

/**
 *作者: 唐峰
 *功能描述: 表格模块表格数据action
 *参数说明:
 *时间: 2018/4/4 9:42
 */
export const tablemodelaction = value => ({
    type: tablemodelInfo,
    payload: value,
});

/**
 *作者: 唐峰
 *功能描述: 底部分页模块action
 *参数说明:
 *时间: 2018/4/4 9:41
 */
export const Paginationmodelaction = value => ({
    type: PaginationmodelInfo,
    payload: value,
});

/**
 *作者: 唐峰
 *功能描述: 本地mock数据接口请求
 *参数说明: /mockjsdata/7/urc/motan/service/api/IUrcService/getUsersByUserInfo
 *时间: 2018/4/4 9:43
 */
// export const fetchPosts2 = value => (dispatch, getState) => {

//     return axios.post(`/mockjsdata/7/urc/motan/service/api/IUrcService/getUsersByUserInfo`,value)
//         .then(response => {
//             console.log(response);
//             if (response.status == 200) {
//                 if (response.data.state == '000001') {
//                     const total = response.data.total
//                     dispatch(Paginationmodelaction({
//                         current: current,
//                         total: total,
//                         pageSize: pageSize
//                     }))
//                     dispatch(tablemodelaction({[key]: response.data.data, loading: false}))
//                 }
//             }
//         }).catch(e => {
//             console.log(e);
//         })
// }

export const fetchPosts2 = ({ key, value }) => (dispatch, getState) => {
    dispatch(tablemodelaction({ loading: true }));
    return axios.post('/mockjsdata/7/urc/motan/service/api/IUrcService/getUserPermissionList', value)
        .then((response) => {
            // console.log(response);
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const total = response.data.data.total;
                    const current = value.pageNumber || 1;
                    const pageSize = value.pageData || 20;
                    dispatch(Paginationmodelaction({
                        current,
                        total,
                        pageSize,
                    }));
                    dispatch(tablemodelaction({ [key]: response.data.data, loading: false }));
                }
            }
        }).catch((e) => {
            console.log(e);
        });
};


/**
 *作者: 唐峰
 *功能描述: 本地数据请求
 *参数说明: @name 名称  @value 值   @returnName 返回的数据键值名  @dispatch() redux方法
 *时间: 2018/4/4 9:44
 */
export const fetchcitysPosts = ({ name, value, returnName }) => (dispatch, getState) => axios(`http://localhost:3333/testApi/citys?${name}=${value}`)
    .then((response) => {
        if (response.status == 200) {
            if (response.data.state == '000001') {
                dispatch(baseInfoForm({ [returnName]: response.data.data }));
            }
        }
    }).catch((e) => {
        console.log(e);
    });

/**
 *作者: 唐峰
 *功能描述: 渠道标记列表数据请求
 *参数说明:@key 用于存返回的数据  @value 页码数据
 *时间: 2018/4/4 9:55
 */
export const fetchPosts = ({ key, value }) => (dispatch, getState) => {
    dispatch(tablemodelaction({ loading: true }));
    const current = value.pageNumber || 1;
    const pageSize = value.pageData || 20;
    return axios.post(`${config.api_url}/urc/motan/service/api/IUrcService/getUserPermissionList`, value)
        .then((response) => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const total = response.data.data.total;
                    dispatch(Paginationmodelaction({
                        current,
                        total,
                        pageSize,
                    }));
                    dispatch(tablemodelaction({ [key]: response.data.data, loading: false }));
                }
            }
        }).catch((e) => {
            console.log(e);
        });
};

const actions = {
    ...searchValuesactions,
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    Paginationmodelaction,
    fetchPosts2,
    fetchcitysPosts,
    fetchPosts,
};

export default actions;
