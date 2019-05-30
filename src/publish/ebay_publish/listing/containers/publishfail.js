import { connect } from 'react-redux'
import PublishfailComponent from '../components/publishfail'
import { queryPublishfailList } from '../actions/publishfail'
import { parsePublishFailData } from '../selector/publishfail'

const mapStateToProps = (state, props) => {
    const publishFailData = parsePublishFailData(state)
    const loadingObj = state.loadingObj
    return { publishFailData, loadingObj, ...props }
};

export default connect(
    mapStateToProps,
    { queryPublishfailList }
)(PublishfailComponent)
