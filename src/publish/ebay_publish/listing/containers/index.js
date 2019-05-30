import { connect } from 'react-redux'
import App from '../components'
import { toggleKayAction } from '../actions'
import { parseListStateData } from '../selector'
import { getListAsync } from '../actions/index'
import { parseDraftData } from '../selector/draft'
import { parsePublishFailData } from '../selector/publishfail'
import { parseAlerdayDeleteData } from '../selector/alerdaydelete'
import { parseAlerdayDownData } from '../selector/alerdaydown'
import { parsePublishingData } from '../selector/publishing'
import { parseSellingData } from '../selector/selling'

function getData(key, state) {
    switch (key) {
        case "0":
            return parseDraftData(state);
        case "1":
            return parsePublishingData(state);
        case "2":
            return parsePublishFailData(state);
        case "3":
            return parseSellingData(state);
        case "4":
            return parseAlerdayDownData(state);
        case "5":
            return parseAlerdayDeleteData(state);
        default:
            console.log(key)
            return {}
    }

}

const mapStateToProps = (state, props) => {
    const listingStateData = parseListStateData(state);
    const tablemodel = getData(state.tablemodel.key, state);
    return { listingStateData, tablemodel, ...props }
};

export default connect(
    mapStateToProps,
    { getListAsync, toggleKayAction }
)(App)
