import { RECEIVE_SITE_LIST } from '../constants/SiteTypes'
import { fetchPost } from '../../../util/fetch'

const receivePlatforms = (dispatch, data) => {
    dispatch({
        type: RECEIVE_SITE_LIST,
        data: data
    })
}

const querySites = (params) => dispatch => {
    fetchPost('/listing/base/ext/IListingExtInfoService/query', params)
        .then(result => {
            if(result.state === '000001') {
                receivePlatforms(dispatch, result.data)
            }
        })
}

export default querySites