import { combineReducers } from 'redux'
import Sites from '../../../common/reducers/SiteReducer'
import { titles, loadingTitleState } from './title'

const rootReducer = combineReducers({
  titles,
  loadingTitleState,
  Sites
})

export default rootReducer
