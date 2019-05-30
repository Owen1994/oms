/**
 *作者: 唐峰
 *功能描述: 渠道标记详情列表页reducer
 *参数说明:
 *时间: 2018/4/4 9:23
 */
import {combineReducers} from 'redux'
import commonReducer from '../../../../common/reducers/commonreducer';
import searchValuesReducers from '../../../../components/searchValues/reducers'

import {
    baseInfo, tablemodelInfo,
} from '../actions'

function Infos(state = {
    perValue:{},            //保存搜索的参数
    searchType:{value:'asin'},
    areaValue:{value:''},
    shopAccount:{value:''}
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


//tablelist组件数据 reducers
function tablemodel(state = {
                        data: [],
                        count: 0,
                        selectedRowKeys:[],
                        loading:false,
                        current:1,
                        total:0,
                        pageSize:20
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



const rootReducer = combineReducers({
    ...commonReducer,...searchValuesReducers, Infos, tablemodel,
})

export default rootReducer
