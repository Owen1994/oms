import { combineReducers } from 'redux';
import { DOMESTIC_RULES_LIST, RULE_INIT_STATE, INIT_RULES } from '../constants';
import { paginationReducer } from '../../../../common/pagination';
import { changeFieldName } from '../selector';

const domesticRulesReducer = (state = {
    domesticRulesList: [],
    loading: false
}, action) => {
    switch (action.type) {
        case DOMESTIC_RULES_LIST:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
        }
}

const rulesInitReducer = (state = INIT_RULES, action) => {
    switch (action.type) {
        case RULE_INIT_STATE:
            const value = action.payload;
            if (value) {
                const basis = value.basis;
                return {
                    channelInit: basis.channel || undefined,
                    currencyInit: basis.currency,
                    destinationInit: basis.destination,
                    platformInit: changeFieldName(basis.platform),
                    warehouseInit: basis.warehouse,
                    siteInit: changeFieldName(basis.siteId),
                };
            } else {
                return INIT_RULES;
            }
        default:
            return state;
        }
}


export default combineReducers({
    domesticRulesReducer,
    paginationReducer,
    rulesInitReducer,
})
