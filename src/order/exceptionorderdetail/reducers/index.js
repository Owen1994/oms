import { combineReducers } from 'redux'
import commonReducer from '../../../common/reducers/commonreducer'
import searchValuesReducers from '../../../components/searchValues/reducers'
import {
    baseInfo,
    isEditInfo,
    modalmodelInfo,
    tablemodelInfo,
    tablemodelInfo2,
    tablemodelInfo3,
    tablemodelInfo4,
    tablemodelInfo5,
    tablemodelInfo6,
    tablemodelInfo7,
    devanningTableactionInfo,
    devanningAPPInfo,
    skuTableInfo,
    repertoryListInfo,
    shrinkageInfo,
    amendSkuArrInfo
} from '../actions'

function Infos(state = { orOut: { name: 'orOut', value: '2' },productInfoStatus:false }, action) {
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
    previewVisible: false,
    visible2: false,
    jsbuttionVisible: false,
    submitVisible: false,
    remarksvisible: false,
    devanningvisible: false,
    auditvisible: false,
    addproductvisible: false,
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
    count: 2,
}, action) {

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
    count: 2,
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
    data3: [],
    count: 0,
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

function tablemodel4(state = {
    data4: [],
    count: 0,
}
    , action) {
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

function tablemodel5(state = {
    data: [],
    pageNumber: 1,
    pageData: 20,
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

function tablemodel6(state = {
    data: [],
    count: 0,
}
    , action) {
    switch (action.type) {
        case tablemodelInfo6:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function tablemodel7(state = {
    data: [],
    count: 0,
}
    , action) {
    switch (action.type) {
        case tablemodelInfo7:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}




function devanningtable(state = {
    data: [{
        key: '1',
        No: '1',
        warehouseCode: { name: 'warehouseCode1', message: '发货仓', placeholder: '发货仓', readonly: false },
        channelCode: { name: 'channelCode1', message: '物流渠道', placeholder: '物流渠道', },
        skuAffix: { name: 'skuAffix1', message: '前后缀', placeholder: '前后缀', },
        skuCode: { name: 'skuCode1', message: '产品', placeholder: '产品', },
        skuCount: { name: 'skuCount1', message: '数量', placeholder: '数量', },
        recommend: {name: 'recommend1', message: '优选推荐', placeholder: '优选推荐',initialValue: true},
        Operation: '删除',
    }],
    count: 2,
    loading: true,
}
    , action) {
    switch (action.type) {
        case devanningTableactionInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function devanningAPP(state = {
    title: "订单拆分", ModalContent: '内容',
    visible: false, type: 'multiple', type: false
}
    , action) {
    switch (action.type) {
        case devanningAPPInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function isEditModel(state = { is: false, state: "",type:"" }, action) {

    switch (action.type) {
        case isEditInfo:
            return action.payload
        default:
            return state;
    }
}

function skuTableModel(state = [], action) {
    switch (action.type) {
        case skuTableInfo:
            return action.payload
        default:
            return state;
    }
}
/**
 * 用于接受 获取到的库存数据
 */
function repertoryListModel(state = [], action) {
    switch (action.type) {
        case repertoryListInfo:
            return action.payload
        default:
            return state;
    }
}
/**
 * 用于接受 获取到的库存数据
 */
function amendSkuArrModel(state = [], action) {
    switch (action.type) {
        case amendSkuArrInfo:
            return action.payload
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    ...commonReducer,
    ...searchValuesReducers,
    Infos,
    modalmodel,
    tablemodel,
    tablemodel2,
    tablemodel3,
    tablemodel4,
    tablemodel5,
    tablemodel6,
    tablemodel7,
    devanningtable,
    devanningAPP,
    isEditModel,
    skuTableModel,
    repertoryListModel,
    amendSkuArrModel,
    
})

export default rootReducer
