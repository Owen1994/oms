/**
 *作者: 唐峰
 *功能描述: 渠道标记修改页面相关reducer
 *参数说明:
 *时间: 2018/4/17 11:11
 */
import {combineReducers} from 'redux'
import commonReducer from '@/common/reducers/commonreducer';
import searchOptReducers from '@/components/searchOpt/reducers'
import {
    baseInfo,buttonTypeInfo, skuprefixModalmodelInfo, signModalmodelInfo, signupdateModalmodelInfo,thirdModalmodelInfo, tablemodelInfo,tablemodelInfo2,tablemodelInfo3,tablemodelInfo5, PaginationmodelInfo,
    thirdinfoTableactionInfo, signinfoTableactionInfo, skuprefixTableactionInfo,
} from '../actions'
import searchValuesReducers from "@/components/searchValues/reducers";

function Infos(state = {
    isAdd:false,
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

function buttonType(state = {
    buttonType:'0'
}, action){
    switch (action.type) {
        case buttonTypeInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function skuprefixModalmodel(state = {
                         title: "仓库信息",
                         ModalText: '内容',
                         visible: false,
                    }
    , action) {
    switch (action.type) {
        case skuprefixModalmodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function signModalmodel(state = {
                                 title: "渠道标记配置", ModalText: '内容',
                                 visible: false,
                             }
    , action) {
    switch (action.type) {
        case signModalmodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function signupdateModalmodel(state = {
                            title: "渠道标记配置", ModalText: '内容',
                            visible: false,
                        }
    , action) {
    switch (action.type) {
        case signupdateModalmodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function thirdModalmodel(state = {
                            title: "渠道标记配置", ModalText: '内容',
                            visible: false,
                        }
    , action) {
    switch (action.type) {
        case thirdModalmodelInfo:
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

//仓库详情
function tablemodel5(state = {
                        data: [],
                        count: 0,
                        selectedRowKeys:[],
                        loading:true,
                    }
    , action) {
    switch (action.type) {
        case tablemodelInfo5:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


//标记详情
function tablemodel2(state = {
                         data: [],
                         count: 0,
                         selectedRowKeys:[],
                         loading:true,
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

//第三方详情
function tablemodel3(state = {
                         data: [],
                         count: 0,
                         selectedRowKeys:[],
                         loading:true,
                     }
    , action) {
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


//仓库信息
function skuprefixtable(state = {
                         data: [],
                         count: 2,
                         loading:true,
                     }
    , action) {
    switch (action.type) {
        case skuprefixTableactionInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

//第三方信息
function thirdinfotable(state = {
                            data: [],
                            count: 2,
                            loading:true,
                        }
    , action) {
    switch (action.type) {
        case thirdinfoTableactionInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

//标记信息
function signinfotable(state = {
                            data: [],
                            count: 1,
                            loading:true,
                        }
    , action) {
    switch (action.type) {
        case signinfoTableactionInfo:
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
    ...commonReducer,...searchOptReducers,...searchValuesReducers,Infos,buttonType,skuprefixModalmodel,signupdateModalmodel, signModalmodel,thirdModalmodel, tablemodel,tablemodel2,tablemodel3,tablemodel5,Paginationmodel,thirdinfotable,signinfotable,skuprefixtable
})

export default rootReducer
