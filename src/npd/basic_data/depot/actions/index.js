// import {
//     GET_DEPOT_LIST,
//     RECEIVE_DEPOT_LIST
// } from '../constants'
import { post } from '../../../../util/axios'
// import { parseNetErrorToMsg } from '../../../../util/baseTool'
import * as API from '../../../constants/Api'   //导入仓库列表数据接口

// const receiveDepotList = data => ({
//     type: RECEIVE_DEPOT_LIST,
//     data
// })

// export const getDepotList= params => (dispatch)=>{
//     dispatch(({loading: true, type: GET_DEPOT_LIST}))
//     post(WARE_HOUSE_LIST, params).then(data=>{
//         if(data && data.state === "000001"){
//             return dispatch(receiveDepotList(data));
//         }
//         return dispatch({loading: false, type: GET_DEPOT_LIST, msg: parseNetErrorToMsg(data)})
//     })
// }

export const list = 'list';     //列表
export const pagination = 'pagination';     //分页

export const list_action = value => ({
    type: list,
    payload: value
});

export const paginationAction = value => ({
    type: pagination,
    payload: value
})

/**
 * 功能：仓库关系页面请求table数据
 */
export const list_fetch = ({ name, value }) => (dispatch) => {
    return post(API.WARE_HOUSE_LIST_API, value).then(data => {
        if (data.state === '000001') {
            dispatch(list_action({
                [name]: data.data.list,
                loading: false,
            }));
            dispatch(paginationAction({
                current: value.pageNumber,
                total: data.data.total,
                pageSize: value.pageData
            }))
        }
    })
};

const actions = {
    list_fetch,
};

export default actions

