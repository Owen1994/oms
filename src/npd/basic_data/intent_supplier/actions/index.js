import { post } from '../../../../util/axios'
import { INTENT_SUPPLIER_LIST_API } from '../../../constants/Api'  //导入意向供应商数据接口

export const list = 'list';     //列表
export const pagination = 'pagination';     //分页
export const datas = 'datas';   //其他数据

export const list_action = value => ({
    type: list,
    payload: value
});

export const paginationAction = value => ({
    type: pagination,
    payload: value
});

export const data_action = value => ({
    type: datas,
    payload: value
});

/**
 * 功能：意向供应商页面请求table数据
 */
export const list_fetch = ({ name, value }) => (dispatch) => {
    return post(INTENT_SUPPLIER_LIST_API, value).then(data => {
        if (data.state === '000001') {
            dispatch(list_action({
                [name]: data.data.list,
                loading: false
            }));
            dispatch(paginationAction({
                current: value.pageNumber,
                total: data.data.total,
                pageSize: value.pageData
            }))
        }
    })
};

export const data_fetch = ({ name, value }) => (dispatch) => {
    return (
        dispatch(data_action({
            [name]: value,
        }))
    )
};



const actions = {
    list_fetch,
    data_fetch
};

export default actions

