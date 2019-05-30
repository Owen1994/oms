import { connect } from 'react-redux'
import DraftComponent from '../components/draft'
import { queryDraftList } from '../actions/draft'
import { parseDraftData } from '../selector/draft'

const mapStateToProps = (state, props) => {
    const draftData = parseDraftData(state)
    const loadingObj = state.loadingObj
    return { draftData, loadingObj, ...props }
};

export default connect(
    mapStateToProps,
    { queryDraftList }
)(DraftComponent)
