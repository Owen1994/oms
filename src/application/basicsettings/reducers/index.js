import {combineReducers} from 'redux'
import commonReducer from '../../../common/reducers/commonreducer';
import searchValuesReducers from '../../../components/searchValues/reducers'
import {
    baseInfo,StoretablelistInfo,InventorytablelistInfo,ThresholdtablelistInfo,EditthresholdInfo
} from '../actions'

function Infos(state = {
            preValue:{}             //保存之前的 搜索参数
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

//店铺设置tablelist组件数据 reducers 
function Storetablelist(state = {
        data:[],
        loading:false,
        current: 1,
        total:0,
        pageSize:20,
        selectedRowKeys:[],
        selectedRows:[]
    }
    , action) {
    switch (action.type) {
        case StoretablelistInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


//金额阈值设置列表tablelist组件数据 reducers  
function Thresholdtablelist(state = {
        data:[],
        loading:false,
        current: 1,
        total:0,
        pageSize:20,
    }
    , action) {
        switch (action.type) {
            case ThresholdtablelistInfo:
                return {
                    ...state,
                    ...action.payload,
                };
            default:
                return state;
        }
}


//金额阈值设置--编辑弹窗列表tablelist组件数据 reducers  
function Editthreshold(state = {
    data:[],            //弹窗上表格数据
    delkey:100,         //要删除的key
    record:{},          //行数据
    count:0,            //记数
    siteData:[],         //站点数据
    addSite:'',         //添加弹窗--站点
    addCurrency:'',      //添加弹窗--币种
}
, action) {
    switch (action.type) {
        case EditthresholdInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


//盘点报赔设置tablelist组件数据 reducers  
function Inventorytablelist(state = {
        data:[],
        loading:false,
        current: 1,
        total:0,
        pageSize:20,
    }
    , action) {
    switch (action.type) {
        case InventorytablelistInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    ...commonReducer,...searchValuesReducers, Infos,Storetablelist,Inventorytablelist,Thresholdtablelist,Editthreshold
})

export default rootReducer
