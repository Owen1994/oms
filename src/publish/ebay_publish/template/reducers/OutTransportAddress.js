/**
 *作者: pzt
 *功能描述:  模板管理 reducers
 *参数说明:
 *时间: 2018/7/27 15:48
 */
import * as ActionType from "../constants"

export const outTransportAddress = (state = {data: [{locationCodeArr: [{locationCode: "",locationDesc: ""}],regionCode: ""}],total: 0}, action) => {
    switch (action.type) {
        case ActionType.RECEIVE_LOCATION_LIST:
            return action.data;
        case ActionType.GET_EXCLUDE_SHIP_TO_LOCATION_CHECK://{index: 1, data: { code: 'aa', checked: true, position: 0 } }
            const { checked, position } = action.data.data;
            const index = action.data.index;
            state.data[index].locationCodeArr[position].checked = checked;
            return {...state};
        case ActionType.GET_EXCLUDE_SHIP_TO_LOCATION_CHECK_ALL: //{ index: 1, checked: true }
            state.data[action.data.index].checked = action.data.checked;
            state.data[action.data.index].locationCodeArr = state.data[action.data.index].locationCodeArr.map(item => {
                item.checked = action.data.checked;
                return item
            });
            return {...state};
        default:
            return state
    }
};
