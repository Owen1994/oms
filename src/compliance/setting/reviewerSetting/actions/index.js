import { page } from '../../../../constants';
import { paginationAction } from '../../../common/pagination';
import { fetchPost } from '../../../../util/fetch';
import { GET_REVIEWERSETTING_LIST } from "../constants";
import { path } from '../../../configs';

/* 列表 */
export const list = 'list';
export const list_action = value => ({
    type: list,
    payload: value
})
export const list_fetch = ({ name, value }) => (dispatch) => {
    const param = {...value}
    if (param && param.reviewType) {
        param.reviewType = param.reviewType[0]
    } else {
        param.reviewType = 1
    }
    return fetchPost(GET_REVIEWERSETTING_LIST, param).then(data=>{
        if(data && data.state === "000001"){
            dispatch(list_action({ [name]: data.data.data, loading: false }));
            dispatch(paginationAction({
                current: value.pageNumber || page.defaultCurrent,
                total: data.data.total,
                pageSize: value.pageData || page.defaultPageSize
            }))
        }
    })
}

const actions = {
    list_fetch
}

export default actions