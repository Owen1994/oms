import { combineReducers } from 'redux'
import Sites from '../../../common/reducers/SiteReducer'
import { skus, loadingSkuState } from './sku'

const rootReducer = combineReducers({
  skus,
  loadingSkuState,
  Sites
})

export default rootReducer
