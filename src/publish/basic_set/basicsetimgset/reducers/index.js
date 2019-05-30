import { combineReducers } from 'redux'
import Sites from '../../../common/reducers/SiteReducer'
import { 
  gallery, 
  imgTypes, 
  loadingGalleryState, 
  galleryImgs, 
  imgTypeList
} from './gallery'

const rootReducer = combineReducers({
  Sites,
  gallery,
  imgTypes,
  loadingGalleryState,
  galleryImgs,
  imgTypeList
})

export default rootReducer
