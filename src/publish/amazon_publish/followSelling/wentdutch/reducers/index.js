import { combineReducers } from 'redux'
import {
    listField,
    siteField
} from '../action'

export const listData = (state = {
    list: [],
    total: 0,
    loading: false,
    params: {
        pageNumber: 1,
        pageData: 20
    }
}, action) => {
    switch (action.type) {
        case listField:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

const siteData = (state = [], action) => {
    switch (action.type) {
        case siteField:
            return action.payload
        default:
            return state
    }
}

const rootReducer = combineReducers({
    listData,
    siteData
})

export default rootReducer
