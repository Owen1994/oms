/**
 *作者: pzt
 *功能描述:  模板管理 reducers
 *参数说明:
 *时间: 2018/7/27 15:48
 */
import { combineReducers } from 'redux'
import Sites from '../../../common/reducers/SiteReducer'
import { records, loadingRecordState } from './record'

const rootReducer = combineReducers({
  records,
  loadingRecordState,
  Sites
})

export default rootReducer
