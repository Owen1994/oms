import { combineReducers } from 'redux'
import { 
    listField
} from '../action'

export const listData = (state={
    list: [], 
    total: 0,
    loading:false,
    params:{
        pageNumber:1,
        pageData:20
    }
}, action) => {
    switch(action.type){
        case listField:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state    
    }
}


const rootReducer = combineReducers({
    listData
})

export default rootReducer
