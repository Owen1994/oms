import { combineReducers } from 'redux';
import { DOMESTIC_LIST, PRICING_STATE } from '../constants';
import { paginationReducer } from '../../../../common/pagination';

import { changeFieldName } from '../selector';

const domesticReducer = (state = {
    domesticList: [],
    loading: false
}, action) => {
    switch (action.type) {
        case DOMESTIC_LIST:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
        }
}

const pricingStatesReducer = (state = {
    platform: [{}],
    basicRule: [{}],
    profitsRate: undefined,
    skus: ''
}, action) => {
    const data = action.payload;
    switch (action.type) {
        case PRICING_STATE:
            return {
                platform: changeFieldName(data.platform),
                basicRule: data.basicRule,
                profitsRate: data.profitsRate,
                skus: data.skus && data.skus.join('\n')
            };
        default:
            return state;
        }
}

export default combineReducers({
    domesticReducer,
    pricingStatesReducer,
    paginationReducer
})
