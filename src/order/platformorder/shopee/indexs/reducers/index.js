import { combineReducers } from 'redux'
import {
    shopeeListInfo,
    shopeeTabInfo
} from '../actions/index'
//ebay订单列表数据reducer
export const shopeeList = (state = {
    list: [],
    total: 0,
    params: {
        pageData: 20,
        pageNumber: 1,
        type: -1
    },
    loading: false
}, action) => {
    switch (action.type) {
        case shopeeListInfo:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

//shopee订单页签数据reducer
export const shopeeOrderTabState = (state = [
    { "id": -1, "name": "全部订单", "num": 0 },
    { "id": 0, "name": "未付款", "num": 0 },
    { "id": 1, "name": "已付款待发货", "num": 0 },
    { "id": 2, "name": "已发货", "num": 0 },
    { "id": 3, "name": "已完成", "num": 0 },
    { "id": 4, "name": "取消中", "num": 0 },
    { "id": 5, "name": "已取消", "num": 0 },
    { "id": 6, "name": "退款", "num": 0 }
], action) => {
    switch (action.type) {
        case shopeeTabInfo:
            return action.payload
        default:
            return state
    }
}

const rootReducer = combineReducers({
    shopeeList,
    shopeeOrderTabState,
})

export default rootReducer

