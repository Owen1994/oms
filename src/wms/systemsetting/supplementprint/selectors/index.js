import { createSelector } from 'reselect';
import { parseSkuLabelArr } from '../../../common/selectors';

const skuInfo = state => state;

const parseSku = createSelector(
    [skuInfo],
    (info) => {
        info.printInfoArr = parseSkuLabelArr(info.printInfoArr);// 补打标签只会有一组
        return info;
    },
);
export default parseSku;
