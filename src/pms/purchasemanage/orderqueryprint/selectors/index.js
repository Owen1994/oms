import { createSelector } from 'reselect';
import { timestampFromat, angentPicUrl } from '../../../../util/baseTool';
import { randNum } from '@/util/baseTool';
const prints = state => state.orderQueryPrintObj;

/**
 * 采购订单打印页接口数据转化
 */
export const parsePrint = createSelector(
    [prints],
    (data) => {

        data.map((t) => {
            if (t.info.orderTime) {
                t.info.orderTime = timestampFromat(Number.parseInt(t.info.orderTime, 10), 0);
            } else {
                t.info.orderTime = '--';
            }

            if (t.info.isTaxRebate) {
                t.info.isTaxRebate = t.info.isTaxRebate === 1 ? '出口退税' : '非出口退税';
            } else {
                t.info.isTaxRebate = '--';
            }

            if (t.info.PObarCode && t.info.PObarCode.length !== 0) {
                t.info.PObarCode = angentPicUrl(t.info.PObarCode);
            }

            for (let i = 0; i < t.skuList.length; i++) {
                if (t.skuList[i].skuImage && t.skuList[i].skuImage.length !== 0) {
                    t.skuList[i].skuImage = angentPicUrl(t.skuList[i].skuImage);
                }

                if (t.skuList[i].skuBarCode && t.skuList[i].skuBarCode.length !== 0) {
                    t.skuList[i].skuBarCode = angentPicUrl(t.skuList[i].skuBarCode);
                }
                t.skuList[i].keyNumber = randNum();
            }


            const newObj = {
                key: '合计',
                keyNumber: randNum(),
                sku: t.info.skuTotal ? t.info.skuTotal : '',
                skuBarCode: '',
                skuImage: '',
                skuName: '',
                skuNumber: t.info.skuAllNumber ? t.info.skuAllNumber : '',
                skuPrice: '',
                totalMoney: t.info.skuTotalMoney ? t.info.skuTotalMoney : '',
                unit: '',
            };
            t.skuList.push(newObj);

            if (t.infoCard.purchaseBar && t.infoCard.purchaseBar.length !== 0) {
                t.infoCard.purchaseBar = angentPicUrl(t.infoCard.purchaseBar);
            }

            for (let i = 0; i < t.listCard.length; i++) {
                if (t.listCard[i].skuCode && t.listCard[i].skuCode.length !== 0) {
                    t.listCard[i].skuCode = angentPicUrl(t.listCard[i].skuCode);
                }
                t.listCard[i].keyNumber = randNum();
            }

            const newCardObj = {
                key: '来货要求',
                keyNumber: randNum(),
            };
            t.listCard.push(newCardObj);
        });

        return data;
    },
);

