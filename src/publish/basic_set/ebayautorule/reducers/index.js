import { combineReducers } from 'redux'
import Sites from '../../../common/reducers/SiteReducer'
import { 
  rules,
  loadingRuleState,
 } from './rule'

const rootReducer = combineReducers({
  rules,
  loadingRuleState,
  Sites,
})

export default rootReducer
