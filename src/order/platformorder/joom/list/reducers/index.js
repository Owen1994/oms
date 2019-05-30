import { combineReducers } from 'redux'
import { orderStatus } from '../constants/index'
import {
    tablemodelInfo,
    quickdstateInfo
} from '../actions'



function tablemodel(state = {
    list: [],
    total: 0,
    params: {
        tab: 1,
        pageData: 20,
        pageNumber: 1
    },
    loading: false
}
    , action) {
    switch (action.type) {
        case tablemodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
function quickdstateModel(state = orderStatus, action) {
    switch (action.type) {
        case quickdstateInfo:
            return action.payload;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    tablemodel,
    quickdstateModel
})

export default rootReducer
