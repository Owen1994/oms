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
        warehouseOrderId: {name: 'warehouseOrderId1', message: '请输入包裹单号', placeholder: '请输入包裹单号', },
        warehouseState: {name: 'warehouseState1', message: '请输入分仓订单状态', placeholder: '请输入分仓订单状态',},
        deliveryState: {name: 'deliveryState1', message: '请输入发货状态', placeholder: '请输入发货状态',},
        deliveryBay: {name: 'deliveryBay1', message: '请输入发货仓', placeholder: '请输入发货仓',},
        channelName: {name: 'channelName1', message: '请输入物流渠道', placeholder: '请输入物流渠道',},
        skuNum: {name: 'skuNum1', message: 'SKU/数量', placeholder: 'SKU/数量',},
        weight: {name: 'weight1', message: '请输入重量', placeholder: '请输入重量', required: false, }
    }],
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
    data2: [
        // {
        //     key: '1',
        //     No: '1',
        //     image: {name: 'image1', message: '请上传图片', placeholder: '品牌名称', num: 3,},
        //     sku: {name: 'sku1', message: '请输入sku', placeholder: '请输入sku',},
        //     skuName: {name: 'skuName1', message: '请输入skuName', placeholder: '请输入skuName',},
        //     costPrice: {name: 'costPrice1', message: '请输入成本价', placeholder: '请输入成本价',},
        //     weight: {name: 'weight1', message: '请输入体重', placeholder: '请输入体重',},
        //     salenum: {name: 'num1', message: '请输入销售数量', placeholder: '请输入销售数量',},
        //     salePrice: {name: 'salePrice1', message: '请输入销售金额', placeholder: '请输入销售金额',},
        //     totalMoney: {name: 'totalMoney1', message: '请输入销售总金额', placeholder: '请输入销售总金额',},
        //     Operation: '删除',
        // }
    ],
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
                         data: [
                            //  {
                            //     "platformName": "测试内容r2p1",
                            //     "saleAccount": "测试内容kt82",
                            //     "processingperson": "测试内容yt4u",
                            //     "processingstate": "测试内容vh2f",
                            //      "time": "", 
                            //     "remark": "测试内容87i5",
                            // }
                         ],
                         count: 0,
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


const rootReducer = combineReducers({
    ...commonReducer, Infos, modalmodel, tablemodel, tablemodel2, tablemodel3, tablemodel4,tablemodel5
})

export default rootReducer
