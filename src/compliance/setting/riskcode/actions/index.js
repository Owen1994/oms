// import { GET_INTELLECTUALCODE_LIST } from '../constants';
import { fetchPost } from '../../../../util/fetch';
import { page } from '../../../../constants';
import { paginationAction } from '../../../../common/pagination';
import { path } from '../../../configs';


/* 列表 */
export const list = 'list';
export const list_action = value => ({
    type: list,
    payload: value
})

export const listFetch = ({ name, value }) => (dispatch) => {
    const param = value
    param.searchType = 1
    return fetchPost(path.irp + 'intellectualCode/List/list', param)
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
    listFetch
}

export default actions