import { combineReducers } from 'redux'
import {
    tablemodelInfo,
    updateListState,
} from '../actions'



function tablemodel(state = {
    list: [],
    total: 0,
    params: {
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
        case updateListState:
            const { index, key, value } = action.payload;
            state.list[index][key] = value;
            return {
                ...state
            }; 
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    tablemodel
})

export default rootReducer
