/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import { GET_SELECT_LIST } from "../constants";
import { post } from "../../../../util/axios";

const getSelectList = (data) => ({
  type:  GET_SELECT_LIST,
  data
});

const shouldLoadSelectList = (state, type) => {
    const selectObj = state.selectList;
    if (!selectObj) {
        return true;
    }
    const data = selectObj[type];
    if (data && data.length > 0) {
        return false;
    }
    return true;
};
export const loadSelectList = (params) => (dispatch, getState) => {
    if (shouldLoadSelectList(getState(), params.type)) {
        return post(params.url, null).then(data => {
            if ( data && data.state === '000001'){
                return dispatch(getSelectList({list: data.data, sType: params.type}));
            }
        })
    }
};
