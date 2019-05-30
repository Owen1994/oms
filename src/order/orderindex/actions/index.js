import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'
import {tablemodelInfo} from "../../orderlist/actions";
export const baseInfo = 'baseInfo'
export const platformInfo = 'platformInfo'
export const yesterdaySkuall = 'yesterdaySkuall'
export const orderdeailall = 'orderdeailall'
export const ringDataAll = 'ringDataAll'

export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value
})

export const platformaction = value => ({
    type: platformInfo,
    payload: value
})

export const yesterdaySkuaction = value => ({
    type: yesterdaySkuall,
    payload: value
})

export const orderdeailaction = value => ({
    type: orderdeailall,
    payload: value
})

export const ringDataaction = value => ({
    type: ringDataAll,
    payload: value
})

const actions = {
    baseInfoForm,
    platformaction,
    yesterdaySkuaction,
    orderdeailaction,
    ringDataaction
}

export default actions




