import {combineReducers} from 'redux'
import searchOptReducers from '../../../components/searchOpt/reducers'
import searchCountryReducers from '../../../components/searchCountry/reducers'
import searchValuesReducers from '../../../components/searchValues/reducers'
import {
    baseInfo,claimreportInfo,PaginationmodelInfo
} from '../actions'
import commonReducer from "../../../common/reducers/commonreducer";

function Infos(state = {}, action) {
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
function claimreportmodule(state = {
                        data: [],
                        count: 0,
                        loading:false,
                    }
    , action) {
    switch (action.type) {
        case claimreportInfo:
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
 ...commonReducer,...searchOptReducers,Infos,...searchCountryReducers,...searchValuesReducers,claimreportmodule,Paginationmodel
})

export default rootReducer
