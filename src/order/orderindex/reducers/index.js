import {combineReducers} from 'redux'
import commonReducer from '../../../common/reducers/commonreducer';
import searchOptReducers from '../../../components/searchOpt/reducers'
import {
    baseInfo,platformInfo,yesterdaySkuall,orderdeailall,ringDataAll
} from '../actions'
import {PaginationmodelInfo} from "../../orderlist/actions";

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
function ringdataAllmodel(state = {
    data: {
        orderNumber: '',
        priceSingle:'',
        sale:'',
        updateTime:''
    }
                      }
    , action) {
    switch (action.type) {
        case ringDataAll:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function orderdeailallmodel(state = {
                          data:[]
                      }
    , action) {
    switch (action.type) {
        case orderdeailall:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function platformodel(state = {
                               data:[]
                           }
    , action) {
    switch (action.type) {
        case platformInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function yesterdaySkumodel(state = {
                               data:[]
                           }
    , action) {
    switch (action.type) {
        case yesterdaySkuall:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    Infos,platformodel,yesterdaySkumodel,orderdeailallmodel,ringdataAllmodel
})

export default rootReducer
