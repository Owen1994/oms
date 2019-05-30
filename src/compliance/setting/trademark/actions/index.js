import { post } from '../../../../util/axios';
import { path, page } from '../../../configs';
import { paginationAction } from '../../../common/pagination';


/* 报关单列表 */
export const list = 'list';
export const list_action = value => ({
    type: list,
    payload: value
})
export const list_fetch = ({ name, value }) => (dispatch) => {
    return post(path.irp + 'trademark/List/list', value).then(data=>{
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

// 公司分类
export const category = 'category';
export const category_action = value => ({
    type: category,
    payload: value
})
export const category_fetch = ({ name, value }) => (dispatch) => {
    return post(path.irp + 'common/productClass', value).then(data=>{
        if(data && data.state === "000001"){
            dispatch(category_action({ [name]: data.data.data }));
        }
    })
}



const actions = {
    list_fetch,
    category_fetch
}

export default actions