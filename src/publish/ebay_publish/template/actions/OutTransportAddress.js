/**
 * 运输模板新增修改弹窗排除运输地点组件action
 */
import {fetchPost} from "../../../../util/fetch";
import {GET_EXCLUDE_SHIP_TO_LOCATION_LIST} from "../constants/OutTransportAddress";
import {
    RECEIVE_LOCATION_LIST, GET_EXCLUDE_SHIP_TO_LOCATION_CHECK, GET_EXCLUDE_SHIP_TO_LOCATION_CHECK_ALL,
    LOADING_TEMPLATE_LIST
} from "../constants"

const receiveOutTransportAddress = (dispatch, data) => {
    dispatch({
        type: RECEIVE_LOCATION_LIST,
        data
    })
}
/**
 * 获取排除运输地区及国家可选值
 * @param {*} params
 */
export const getOutTransportAddress = (params) => (dispatch, getState) => {
    dispatch({
        type: LOADING_TEMPLATE_LIST,
        data: {state: true}
    });
    fetchPost(GET_EXCLUDE_SHIP_TO_LOCATION_LIST, params, )
        .then(result => {
            dispatch({
                type: LOADING_TEMPLATE_LIST,
                data: {state: false}
            });
            const map = getState().transportAllData.formData.excludeShipToLocationArrVO;
            if(result.state === '000001'){
                result.data.data = result.data.data || [];
                result.data.data = result.data.data.map(item => {
                        const regionCode = item.regionCode;
                        if(item.locationCodeArr){
                            item.locationCodeArr = item.locationCodeArr.map(it => {
                                const k = `${regionCode}${it.locationCode}`;
                                if(map&&map.get(k)===1){
                                    it.checked = true;
                                }
                                return it;
                            })
                        }
                        return item;
                });
                receiveOutTransportAddress(dispatch, result.data)
            }
        })
};
// 单选操作   { index: 1, data: { checked: true, position: 0 } }
export const checkAddress = (params) => dispatch => {
    dispatch({
        type: GET_EXCLUDE_SHIP_TO_LOCATION_CHECK,
        data: params
    })
};
//全选操作 { index: 1, checked: true }
export const checkAllAddress = (params) => dispatch => {
    dispatch({
        type: GET_EXCLUDE_SHIP_TO_LOCATION_CHECK_ALL,
        data: params
    })

};
