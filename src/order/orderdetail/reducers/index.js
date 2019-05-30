import {combineReducers} from 'redux'
import commonReducer from '../../../common/reducers/commonreducer'
import {
    baseInfo,
    modalmodelInfo,
    tablemodelInfo,
    tablemodelInfo2,
    tablemodelInfo3,
    tablemodelInfo4,
    tablemodelInfo5,
    tablemodelInfo7,
    leaveMessageListInfo
} from '../actions'

function Infos(state = {orOut: {name: 'orOut', value: '2'}}, action) {
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
    visible: false, previewVisible: false, visible2: false, jsbuttionVisible: false, submitVisible: false,
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
    data: [{
        key: '1',
        No: '1',
        warehouseOrderId: "",
        warehouseOrderState: "",
        deliveryState: "",
        deliveryBay: "",
        channelName: "",
        skuNum: [],
        weight:""
    }],
    active:1,
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
    extraData: {},
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

function leaveMessageModel(state = {
    data: [],
    leaveMessage: ""
}
    , action) {
    switch (action.type) {
        case leaveMessageListInfo:
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
    Infos, 
    modalmodel, 
    tablemodel, 
    tablemodel2, 
    tablemodel3, 
    tablemodel4,
    tablemodel5,
    tablemodel7,
    leaveMessageModel
})

export default rootReducer
