import { combineReducers } from 'redux';

import { scanDeliveryParts, scanDeliveryLoading } from './ScanDeliveryPart';
import { channelParts, channelLoading } from './ChannelPart';
import { collectGoodsParts, collectGoodsLoading } from './CollectGoodsPart';
import { updateWeightParts, updateWeightLoading } from './UpdateWeightPart';
import { weighingParts, weighingLoading } from './WeighingPart';


const rootReducer = combineReducers({
    channelParts,
    channelLoading,

    scanDeliveryParts,
    scanDeliveryLoading,

    collectGoodsParts,
    collectGoodsLoading,

    updateWeightParts,
    updateWeightLoading,

    weighingParts,
    weighingLoading,
});

export default rootReducer;
