/**
 *作者: pzt
 *功能描述:  模板管理 reducers：获取运输模板弹窗的详情数据
 *参数说明:
 *时间: 2018/7/27 15:48
 */
import * as ActionType from "../constants"
import {getShippingProfileDetailconstant} from "../constants/formdata"
export const formData = (state = getShippingProfileDetailconstant, action) => {
    switch (action.type) {
        case ActionType.INITI_FORM_DATALIST:
            state = action.data;
            if(state.shipToLocationsArrVO){
                state.shipToLocationsArrVO = state.shipToLocationsArrVO.map(item => item.locationCode);
            }else{
                state.shipToLocationsArrVO = [];
            }
            const map = new Map();
            if(state.excludeShipToLocationArrVO){
                state.excludeShipToLocationArrVO.forEach(item => {
                    const regionCode = item.regionCode;
                    if(item.locationCodeArr){
                        item.locationCodeArr.forEach(it => {
                            const k = `${regionCode}${it.locationCode}`;
                            map.set(k, 1);
                        })
                    }
                })
            }
            state.excludeShipToLocationArrVO = map;
            return state;
        case ActionType.RESET_FORM_DATALIST:
            return getShippingProfileDetailconstant
        default:
            return state
    }
};
