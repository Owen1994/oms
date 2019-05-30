import {combineReducers} from 'redux'
import searchOptReducers from '../../../components/searchOpt/reducers'
import searchCountryReducers from '../../../components/searchCountry/reducers'
import searchValuesReducers from '../../../components/searchValues/reducers'
import {
    baseInfo,claimreportInfo,PaginationmodelInfo,dataoverviewInfo,timeInfo,rankingtimeInfo,rankingbysiteInfo,rankingasinInfo,PaginationsiteInfo,PaginationasinInfo,claimdatalistInfo
} from '../actions'
import commonReducer from "../../../common/reducers/commonreducer";

function Infos(state = {
    xaxisselectedTags:'预计索赔金额',
    timetab:'按月',
    tabs:'1'
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
function rankingbysitemodule(state = {
                                 data: [],
                                 count: 0,
                                 loading:false,
                             }
    , action) {
    switch (action.type) {
        case rankingbysiteInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
function rankingasinmodule(state = {
                                 data: [],
                                 count: 0,
                                 loading:false,
                             }
    , action) {
    switch (action.type) {
        case rankingasinInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function dataoverviewmodule(state = {
                               data: [],
                               count: 0,
                               loading:false,
                           }
    , action) {
    switch (action.type) {
        case dataoverviewInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function timemodule(state = {
                                data: [],
                                count: 0,
                                loading:false,
                            }
    , action) {
    switch (action.type) {
        case timeInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
function rankingtimemodule(state = {
                               data: [],
                               count: 0,
                               loading:false,
                           }
    , action) {
    switch (action.type) {
        case rankingtimeInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
function claimdatalistmodule(state = {
                               data: [],
                               count: 0,
                               loading:false,
                           }
    , action) {
    switch (action.type) {
        case claimdatalistInfo:
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
function Paginationsitemodel(state = {
                             current: 1,
                             total:0,
                             pageSize:20,
                         }
    , action) {
    switch (action.type) {
        case PaginationsiteInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
function Paginationasinmodel(state = {
                                 current: 1,
                                 total:0,
                                 pageSize:20,
                             }
    , action) {
    switch (action.type) {
        case PaginationasinInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


const rootReducer = combineReducers({
 ...commonReducer,...searchOptReducers,Infos,...searchCountryReducers,...searchValuesReducers,claimreportmodule,Paginationmodel,dataoverviewmodule,timemodule,rankingtimemodule,rankingbysitemodule,rankingasinmodule,
    Paginationsitemodel,Paginationasinmodel,claimdatalistmodule
})

export default rootReducer
