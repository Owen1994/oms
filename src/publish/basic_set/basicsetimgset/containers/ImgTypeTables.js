import { connect } from 'react-redux'
import ImgTypeTables from '../components/ImgTypeTables'
import { updateImgTypeList } from '../actions'

const mapStateToProps = (state, props) => ({
  imgTypeList: state.imgTypeList,
  ...props
})

export default connect(
  mapStateToProps, 
  { updateImgTypeList }
)(ImgTypeTables)
