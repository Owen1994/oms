import { combineReducers } from 'redux';
import { compareParts, compareLoading } from './Compare';
import { compareDetailLoading, compareDetailParts } from './CompareDetail';
import { qualityTestLoading, qualityTestParts } from './QualityTest';
import { qualityTestDetailLoading, qualityTestDetailParts } from './QualityTestDetail';
import { receivieGoodsLoading, receivieGoodsParts } from './ReceivieGoods';
import { receivieGoodsDetailLoading, receivieGoodsDetailParts } from './ReceivieGoodsDetail';
import { compareDetailDrawerParts, compareDetailDrawerLoading } from './CompareDetailDrawer';
import { qualityTestDetailDrawerParts, qualityTestDetailDrawerLoading } from './QualityTestDetailDrawer';
import { receivieGoodsDetailDrawerParts, receivieGoodsDetailDrawerLoading } from './ReceivieGoodsDetailDrawer';

const rootReducer = combineReducers({
    compareDetailDrawerParts,
    compareDetailDrawerLoading,

    qualityTestDetailDrawerParts,
    qualityTestDetailDrawerLoading,

    receivieGoodsDetailDrawerParts,
    receivieGoodsDetailDrawerLoading,

    compareParts,
    compareLoading,

    compareDetailLoading,
    compareDetailParts,

    qualityTestLoading,
    qualityTestParts,

    qualityTestDetailLoading,
    qualityTestDetailParts,

    receivieGoodsLoading,
    receivieGoodsParts,

    receivieGoodsDetailLoading,
    receivieGoodsDetailParts,
});

export default rootReducer;
