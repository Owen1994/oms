import { combineReducers } from 'redux';
import {
    boxInfo,
    skuInfo,
    errorInfo,
    skuLoading,
    boxLoading,
    errorLoading,
} from './part';

const rootReducer = combineReducers({
    boxInfo,
    skuInfo,
    errorInfo,
    skuLoading,
    boxLoading,
    errorLoading,
});

export default rootReducer;
