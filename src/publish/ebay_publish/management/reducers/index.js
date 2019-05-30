import { combineReducers } from 'redux'
import Sites from '../../../common/reducers/SiteReducer'
import { 
  parts,
  loadingPartState,
 } from './part'

const rootReducer = combineReducers({
  parts,
  loadingPartState,
  Sites,
})

export default rootReducer
