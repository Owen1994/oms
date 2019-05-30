import { connect } from 'react-redux'
import AddModal from '../components/AddModal'
import { loadImgTypeList, updateImgTypeList } from '../actions'

const mapStateToProps = state => ({
  imgTypes: state.imgTypes.list,
  galleryImgs: state.galleryImgs,
  imgTypeList: state.imgTypeList
})

export default connect(
  mapStateToProps,
  { loadImgTypeList, updateImgTypeList }
)(AddModal)
