/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/7/7 10:55
 */
import { combineReducers } from 'redux'
import bindVendor from '../bind_vendor/reducers'
import checkSpecimen from '../check_specimen/reducers'
import npdCreate from '../create/reducers'
import npdList from '../list/reducers/index'
import common from '../common/reducers/index'
const rootReducer = combineReducers({
    ...bindVendor,
    ...checkSpecimen,
    ...npdCreate,
    ...npdList,
    ...common,
});
export default rootReducer
