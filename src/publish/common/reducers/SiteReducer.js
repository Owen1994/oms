import { RECEIVE_SITE_LIST } from '../constants/SiteTypes'

const Sites = (state = [], action) => {
    switch(action.type){
        case RECEIVE_SITE_LIST:
            return action.data.list
        default:
            return state    
    }
}

export default Sites
