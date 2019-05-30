import { post } from '../../../../util/axios';
import { RECEIVE_GALLERY_LIST,GALLERY_GET_SETTING_IMAGE,RECEIVE_GALLERY_RATE_LIST_FAILED } from '../constants/index'

// 分页
const paginationType = "PAGINATION_TYPE";
export const paginationAction = (data) => ({
    type: paginationType,
    data
});


// 搜索条件
const filterDataType = "FILTER_TYPE";
export const filterDataAction = (data) => ({
    type: filterDataType,
    data
});

// 获取图库设置列表
export const receiveGalleryRateList = (data) => ({
    type: RECEIVE_GALLERY_LIST,
    data
});
export const getGalleryRateList = params => (dispatch) => {
    dispatch(receiveGalleryRateList({ "loading": true }))
    return post(GALLERY_GET_SETTING_IMAGE, params).then(data => {
        if(data && data.state === "000001"){
            data["loading"] = false;
            const total = data.total;
            dispatch(paginationAction({
                pageSize: params["pageSize"] || 10,
                total: total,
                current: params["pageNumber"] || 1,
            }));
            return dispatch(receiveGalleryRateList(data))
        }
        return dispatch({type: RECEIVE_GALLERY_RATE_LIST_FAILED})
    })
}