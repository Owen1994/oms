/**
 *作者: pzt
 *功能描述:  listing reducers
 *参数说明:
 *时间: 2018/7/27 15:48
 */
import { SET_INIT_DETAIL } from '../constants/reducerTypes'
import { combineReducers } from 'redux'
import { basicData } from './basicData'
import { productattrData } from './productattrData'
import { skuinfoData } from './skuinfoData'
import { productinfoData } from './productinfoData'
import { templateinfoData } from './templateinfoData'
import { buyerpolicyData } from './buyerpolicyData'
import { anotherData } from './anotherData'
import { sendResult } from './sendResult'
import { vrelationship } from './vrelationship'
import { vlist, delVlist } from './vlist'
import { ebayCategoryData } from './ebaycategory'
import { templatiesData } from './templatiesdata'
import { outTransportAddress } from "../../template/reducers/OutTransportAddress"
import { formData } from "../../template/reducers/fromdata"
import { serviceData } from "../../template/reducers/service"
import { transportData } from "../../template/reducers/transport"


const initData = (state = null, action) => {
    switch (action.type) {
        case SET_INIT_DETAIL:
            return action.payload
        default:
            return state
    }
}

const transportAllData = combineReducers({
    transportData,     //运输模板table数据
    outTransportAddress,    //弹窗排除运输列表数据
    serviceData,            //弹窗服务数据
    formData,               //弹窗详情所有数据
})
const rootReducer = combineReducers({
    initData,
    basicData,
    productattrData,
    skuinfoData,
    productinfoData,
    templateinfoData,
    buyerpolicyData,
    anotherData,
    sendResult,
    vrelationship,
    vlist,
    delVlist,
    ebayCategoryData,
    templatiesData,
    transportAllData
    // formData,
    // outTransportAddress,
    // serviceData,
    // transportData

});

export default rootReducer
