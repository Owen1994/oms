/**
 *作者: 任贸华
 *功能描述: 菜单数据
 *参数说明:
 *时间: 2018/4/16 10:52
 */
import {combineReducers} from 'redux'
import commonReducer from '../../common/reducers/commonreducer';
import {
    menudataInfo,
} from '../actions'
import { pagecache } from './pagecache'
/**
 *作者: 任贸华
 *功能描述: 左侧及头部菜单数据
 *参数说明:
 *时间: 2018/4/16 10:52
 */
function menuInfos(state = {
    data: {topmenudata: [], leftmenudata: []},
    topmenudata: [],
    leftmenudata: [],
    crumbs: [],
    tabcrumbs: [],
    pageCache: {},
    funcVersion:'',
    shrinkage: true,
    selectedKeys: [],
    openKeys: [],
    functions: {},
    topmenukey:'',
}, action) {
    switch (action.type) {
        case menudataInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    ...commonReducer, menuInfos, pagecache
})

export default rootReducer
