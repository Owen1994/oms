import { combineReducers } from 'redux';

import { inventoryParts, inventoryLoading } from './Inventory';
import { outStockParts, outStockLoading } from './OutStock';
import { outStockDetailsParts, outStockDetailsLoading } from './OutStockDetails';
import { stockLoading, stockParts } from './Stock';
import { stockDetailsParts, stockDetailsLoading } from './StockDetails';


const rootReducer = combineReducers({
    inventoryParts,
    inventoryLoading,

    outStockParts,
    outStockLoading,

    outStockDetailsParts,
    outStockDetailsLoading,

    stockLoading,
    stockParts,

    stockDetailsParts,
    stockDetailsLoading,
});

export default rootReducer;
