/**
 *作者: pzt
 *功能描述:  模板管理 reducers
 *参数说明:
 *时间: 2018/7/27 15:48
 */
import { combineReducers } from 'redux'
import * as ActionType from "../constants/index"
import {describeData} from "./describe"
import {transportData} from "./transport"
import {outTransportAddress} from "./OutTransportAddress"
import {returnData} from "./return"
import {paymentData} from "./payment"
import {publishData} from "./publish"
import {serviceData} from "./service"
import {formData} from"./fromdata"
import  { TABS } from "../constants/TabTitles";
import {REVISE_TEMPLATE_TAB_NUM} from "../constants";

const loadingState  = (state = {
    describeLoadingState: false,
    transportLoadingState: false,
    returnLoadingState: false,
    paymentLoadingState: false,
    matchruleLoadingState: false,
}, action) => {
    switch (action.type) {
        case ActionType.LOADING_TEMPLATE_LIST:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state
    }
};

const templateNumData = (state=TABS, action) => {
    switch (action.type) {
        case ActionType.RECEIVE_TEMPLATE_NUM:
            return action.data;
        case ActionType.REVISE_TEMPLATE_TAB_NUM:
             state[action.index].tempNum = action.num;
            return [...state];
        default:
            return state
    }

};
const transportAllData = combineReducers({
    transportData,     //运输模板table数据
    outTransportAddress,    //弹窗排除运输列表数据
    serviceData,            //弹窗服务数据
    formData,               //弹窗详情所有数据
})
const rootReducer = combineReducers({
    loadingState,
    describeData,
    // transportData,
    returnData,
    paymentData,
    publishData,
    templateNumData,
    // outTransportAddress,
    // serviceData,
    // formData,
    transportAllData
});

export default rootReducer
