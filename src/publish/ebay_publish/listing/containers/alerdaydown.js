import { connect } from 'react-redux'
import AlerdaydownComponent from '../components/alerdaydown'
import { queryAlerdaydownList } from '../actions/alerdaydown'
import { parseAlerdayDownData } from '../selector/alerdaydown'

const mapStateToProps = (state, props) => {
    const alerdayDownData = parseAlerdayDownData(state)
    const loadingObj = state.loadingObj
    return { alerdayDownData,loadingObj, ...props }
};

export default connect(
    mapStateToProps,
    { queryAlerdaydownList }
)(AlerdaydownComponent)
