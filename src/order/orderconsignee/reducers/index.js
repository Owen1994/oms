import {combineReducers} from 'redux'
import commonReducer from '../../../common/reducers/commonreducer';
import searchOptReducers from '../../../components/searchOpt/reducers'
import searchCountryReducers from '../../../components/searchCountry/reducers'
import searchValuesReducers from '../../../components/searchValues/reducers'
import {
    baseInfo, modalmodelInfo, tablemodelInfo,PaginationmodelInfo,tablemodelInfo2,tablemodelInfo3,tablemodelInfo4,modalmodelInfo2,modalmodelInfo3,modalmodelInfo4
} from '../actions'
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

//删除弹窗确定
function modalmodel2(state = {
    title: "提示", ModalText: '内容',
    visible: false,
}
, action) {
    switch (action.type) {
    case modalmodelInfo2:
    return {
    ...state,
    ...action.payload,
    };
    default:
    return state;
}
}

//查看列表弹窗
function modalmodel3(state = {
    title: "提示", ModalText: '内容',
    visible: false,
}
, action) {
    switch (action.type) {
    case modalmodelInfo3:
    return {
    ...state,
    ...action.payload,
    };
    default:
    return state;
}
}

//修改列表弹窗
function modalmodel4(state = {
    title: "提示", ModalText: '内容',
    visible: false,
}
, action) {
    switch (action.type) {
    case modalmodelInfo4:
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

function tablemodel2(state = {
    data2: [],
    count: 0,

}
    , action) {
    switch (action.type) {
        case tablemodelInfo2:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function tablemodel3(state = {
    data3: {
        addresseePlatform:{
            platform:''
        },
        addresseeDetail:[
            {
                addresseeIsNull:'',
                addresseeKey:'',
                addresseeValue:'',
            }
        ]
    },
    count: 1,

}, action) {
    switch (action.type) {
        case tablemodelInfo3:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function tablemodel4(state = {
    data4:[],
    count: 0,

}, action) {
    switch (action.type) {
        case tablemodelInfo4:
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
    ...commonReducer,...searchOptReducers,Infos,...searchCountryReducers,...searchValuesReducers,modalmodel2, modalmodel, tablemodel,tablemodel2,tablemodel3,tablemodel4,Paginationmodel,modalmodel3,modalmodel4
})

export default rootReducer
