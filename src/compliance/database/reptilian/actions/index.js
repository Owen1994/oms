import { GET_REPTILIAN_LIST } from '../constants/api';
import { fetchPost } from '../../../../util/fetch';
import { page } from '../../../../constants';
import { paginationAction } from '../../../../common/pagination';


/* 报关单列表 */
export const list = 'list';
export const list_action = value => ({
    type: list,
    payload: value
})

export const list_fetch = ({ name, value }) => (dispatch) => {
    return fetchPost(GET_REPTILIAN_LIST, value)
        .then(data => {
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