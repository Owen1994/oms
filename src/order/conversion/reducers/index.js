/**
*作者: 任贸华
*功能描述: 抓单转换配置数据管理文件
*参数说明:
*时间: 2018/4/16 11:47
*/
import {combineReducers} from 'redux'
import commonReducer from '../../../common/reducers/commonreducer';
import {
    baseInfo,
    modalmodelInfo,
    tablemodelInfo,
    PaginationmodelInfo,
    skuprefixTableactionInfo,
    skuprefixAPPInfo,
    logtablemodelInfo,
    characterInfo,
    characterAPPInfo,
    editconditionAppInfo
} from '../actions'
import searchValuesReducers from "../../../components/searchValues/reducers";


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
                        title: "提示",
                        ModalText: '内容',
                        visible: false,
                        tablelistvisible: false,
                        skuprefixvisible: false,
                        delcharactervisible: false,
                        okcharactervisible: false,
                        delvisible: false,
                        editvisible: false,
                        platformDelvisible: false,
                        platformEditvisible: false,
                        orderDelvisible: false,
                        orderEditvisible: false,
                        paymentDelvisible: false,
                        paymentEditvisible: false,
                        methodDelvisible: false,
                        methodEditvisible: false,
                        logisticsDelvisible: false,
                        logisticsEditvisible: false,
                        customerDelvisible: false,
                        customerEditvisible: false,
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
                        selectedRowKeys: [],
                        loading: true,
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


function skuprefixtable(state = {
                            data: [],
                            count: 1,
                            characterdata: [],
                            charactercount: 1,
                            log: [],
                            loading: true,
                            visible: false
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


function charactertable(state = {
                            platformdata: [],
                            platformcount: 1,
                            orderdata: [],
                            ordercount: 1,
                            paymentdata: [],
                            paymentcount: 1,
                            methoddata: [],
                            methodcount: 1,
                            logisticsdata: [],
                            logisticscount: 1,
                            customerdata: [],
                            customercount: 1,
                            loading: true,
                            visible: false,
                            select: {
                                data: {order_main: [], order_goods: [], order_pay_info: [], order_pay_record: [], order_receiver_info: []},
                                logArray: []
                            }
                        }
    , action) {
    switch (action.type) {
        case characterInfo:
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
                             total: 0,
                             pageSize: 10,
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


function skuprefixAPP(state = {
                          title: "SKU解析配置", ModalContent: '内容',
                          visible: false, type: 'multiple', type: false
                      }
    , action) {
    switch (action.type) {
        case skuprefixAPPInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function characterAPP(state = {
                          title: "字段配置", ModalContent: '内容',
                          visible: false, type: 'multiple', type: false
                      }
    , action) {
    switch (action.type) {
        case characterAPPInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function editconditionApp(state = {
                              title: "条件配置", ModalContent: '内容',
                              visible: false, type: 'multiple', type: false, operationLog: []
                          }
    , action) {
    switch (action.type) {
        case editconditionAppInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function logtablemodel(state = {
                           data: [],
                           count: 0,
                       }
    , action) {
    switch (action.type) {
        case logtablemodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    ...commonReducer, ...searchValuesReducers,
    Infos,
    modalmodel,
    tablemodel,
    Paginationmodel,
    skuprefixtable,
    skuprefixAPP,
    logtablemodel,
    charactertable,
    characterAPP,
    editconditionApp
})

export default rootReducer
