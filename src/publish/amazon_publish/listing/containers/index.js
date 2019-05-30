import { connect } from 'react-redux'
import App from '../components'
import action from '../actions'
import { getListData } from '../selector/index'

const mapStateToProps = (state, props) => {
    const listData = getListData(state, props);
    return {
        ...state,
        ...props,
        listData
    }
};

export default connect(
    mapStateToProps,
    action
)(App)
