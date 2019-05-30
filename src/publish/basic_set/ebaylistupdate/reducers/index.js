import { combineReducers } from 'redux'
import Sites from '../../../common/reducers/SiteReducer'
import { updates, loadingUpdateState } from './update'

const rootReducer = combineReducers({
  updates,
  loadingUpdateState,
  Sites,
})

export default rootReducer
