import { combineReducers } from 'redux';
import {
    bases,
    loadingBaseState,
} from './base';
import {
    bodymodaldata,
    warehousemodaldata,
} from './bodymodalreducer';

const rootReducer = combineReducers({
    bases,
    loadingBaseState,
    bodymodaldata,
    warehousemodaldata,
});

export default rootReducer;
