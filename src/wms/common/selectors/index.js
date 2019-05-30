/**
 * 转换skulabel数组
 */
import { sliceArr } from '../util';

export const parseSkuLabelArr = (dataArr) => {
    const list = [];
    dataArr.forEach((firstItem, index) => { // 遍历一级
        const splitArr = sliceArr(firstItem.skuInfo, 3);// 把一级切割成3份一小组
        splitArr.forEach((item) => { // 遍历二级,把二级数组变成一个对象
            const skuList = {
                start: '',
                center: '',
                end: '',
            };
            if (item) {
                if (item.length > 0) {
                    skuList.start = item[0];
                }
                if (item.length > 1) {
                    skuList.center = item[1];
                }
                if (item.length > 2) {
                    skuList.end = item[2];
                }
            }
            list.push(skuList);// 添加二级数组
        });
        if (index !== (dataArr.length - 1)) {
            list.push({
                start: '',
                center: '',
                end: '',
            });
        }
    });
    return list;
};
export default parseSkuLabelArr;
