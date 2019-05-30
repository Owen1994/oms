/**
 * 作者: 陈林
 * 描述: 分仓订单reducers
 * 时间: 2018/4/18 0018 下午 8:39
 **/
import {combineReducers} from 'redux'
import commonReducer from '../../../common/reducers/commonreducer';
// import searchOptReducers from '../../../components/searchOpt/reducers'
// import searchCountryReducers from '../../../components/searchCountry/reducers'
// import searchValuesReducers from '../../../components/searchValues/reducers'
import {
    // baseInfo, 
    modalmodelInfo, 
    tablemodelInfo,
    PaginationmodelInfo,
} from '../actions'

// function Infos(state = {}, action) {
//     switch (action.type) {
//         case baseInfo:
//             return {
//                 ...state,
//                 ...action.payload,
//             };
//         default:
//             return state;
//     }
// }
function modalmodel(state = {
    title: "提示", ModalText: '内容',
    visible: false,
}
    , action) {
    switch (action.type) {
        case modalmodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function tablemodel(state = {
    data: [],
    count: 0,
    selectedRowKeys:[],
    loading:true,
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

function Paginationmodel(state = {
    current: 1,
    total:0,
    pageSize:10,
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
    ...commonReducer,
    // ...searchOptReducers,
    // ...searchCountryReducers,
    // ...searchValuesReducers,
    // Infos, 
    modalmodel, 
    tablemodel,
    Paginationmodel,
})

export default rootReducer
