import { combineReducers } from 'redux';
import {
    storageplace,
    loadingStoragePlaceState,
} from './storageplace';
import {
    inventory,
    loadingInventoryState,
} from './inventory';

const rootReducer = combineReducers({
    storageplace,
    loadingStoragePlaceState,
    inventory,
    loadingInventoryState,
});

export default rootReducer;
