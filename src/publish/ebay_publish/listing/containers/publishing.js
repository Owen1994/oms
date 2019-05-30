import { connect } from 'react-redux'
import PublishingComponent from '../components/publishing'
import { queryPublishingList } from '../actions/publishing'
import { parsePublishingData } from '../selector/publishing'

const mapStateToProps = (state, props) => {
    const publishingData = parsePublishingData(state)
    const loadingObj = state.loadingObj
    return { publishingData,loadingObj, ...props }
};

export default connect(
    mapStateToProps,
    { queryPublishingList }
)(PublishingComponent)
