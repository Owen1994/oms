import { connect } from 'react-redux'
import App from '../components'
import { queryGalleryList, loadImgTypeList, loadGalleryImgList } from '../actions'
import { parseGallers } from '../selectors'

const mapStateToProps = state => ({
  data: parseGallers(state),
  imgTypes: state.imgTypes.list,
  loadingState: state.loadingGalleryState,
  galleryImgs: state.galleryImgs,
})

export default connect(
  mapStateToProps, 
  { queryGalleryList, loadImgTypeList, loadGalleryImgList }
)(App)
