import { combineReducers } from 'redux';
import commonReducer from '../../../../common/reducers/commonreducer';
import searchOptReducers from '../../../../components/searchOpt/reducers';
import searchValuesReducers from '../../../../components/searchValues/reducers';
import {
    RECEIVE_SYS_ARR,
    RECEIVE_SYS_RULE,
    UPDATE_SYS_RULE,
    ADD_SYS_RULE,
    DEL_SYS_RULE,
    SET_SYS_RULE,
    RESET_DATA,
} from '../constants';
import { sysRuleArrToMap } from '../selectors';
import tempdata from './tempdata';

// 系统列表
const sysStateArr = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_SYS_ARR:
        return action.data;
    case RESET_DATA:
        return [];
    default:
        return state;
    }
};
// 授权列表
const sysRuleMap = (state = new Map(), action) => {
    switch (action.type) {
    case RECEIVE_SYS_RULE:
        return sysRuleArrToMap(action.data);
    case UPDATE_SYS_RULE:
        const entityMap = state.get(action.data.sysKey);
        const value = entityMap.get(action.data.entityCode);
        value.operValuesArr = action.data.operValuesArr;
        return new Map(state);
    case DEL_SYS_RULE: // { sysKey, entityCode}
        state.get(action.data.sysKey).delete(action.data.entityCode);
        if (state.get(action.data.sysKey).size === 0) {
            state.delete(action.data.sysKey);
        }
        return new Map(state);
    case ADD_SYS_RULE: // { sysKey, value}
        const values = action.data.value;
        if (state.get(action.data.sysKey)) {
            state.get(action.data.sysKey).set(values.entityCode, values);
        } else {
            const map = new Map();
            state.set(action.data.sysKey, map);
            map.set(values.entityCode, values);
        }
        return new Map(state);
    case SET_SYS_RULE:
        return action.data;
    case RESET_DATA:
        return new Map();
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    ...commonReducer,
    ...searchOptReducers,
    ...searchValuesReducers,
    sysStateArr,
    sysRuleMap,
    tempdata,
});

export default rootReducer;
