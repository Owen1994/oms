import {combineReducers} from 'redux'
import {
    baseInfo,queuetableInfo,PaginationmodelInfo
} from '../actions'
function Infos(state = {
    params:{
        publishState:'0',
        searchType:'0',
        searchContent:'',
        startTime:'',
        endTime:''
    }
}, action) {
    switch (action.type) {
        case baseInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
function queuetablemodule(state = {
                        data:[],
                        count: 0,
                        loading:false,
                    }
    , action) {
    switch (action.type) {
        case queuetableInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function Paginationmodel(state = {
                             current: 1,
                             total:0,
                             pageSize:20,
                         }
    , action) {
    switch (action.type) {
        case PaginationmodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
 Infos,queuetablemodule,Paginationmodel
})

export default rootReducer
