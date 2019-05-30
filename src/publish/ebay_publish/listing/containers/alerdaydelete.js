import { connect } from 'react-redux'
import AlerdaydeleteComponent from '../components/alerdaydelete'
import { queryAlerdaydeleteList } from '../actions/alerdaydelete'
import { parseAlerdayDeleteData } from '../selector/alerdaydelete'

const mapStateToProps = (state, props) => {
    const alerdayDeleteData = parseAlerdayDeleteData(state)
    const loadingObj = state.loadingObj
    return { alerdayDeleteData,loadingObj, ...props }
};

export default connect(
    mapStateToProps,
    { queryAlerdaydeleteList }
)(AlerdaydeleteComponent)
