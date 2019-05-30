import { page } from '../../../../constants';
import { paginationAction } from '../../../common/pagination';
import { fetchPost } from '../../../../util/fetch';
// import { path } from '../../../configs';
import { path } from '../../../configs';

/* 报关单列表 */
export const list = 'list';
export const list_action = value => ({
    type: list,
    payload: value
})
export const list_fetch = ({ name, value }) => (dispatch) => {
    return fetchPost('/irp/api/listingImageReview/List/list', value).then(data => {
        if (data && data.state === "000001") {
            const list = Array.isArray(data.data.data) ?
                data.data.data.map(v => {
                    v.key = v.id;
                    return v;
                }) : []
            dispatch(list_action({
                [name]: list, loading: false
            }));
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