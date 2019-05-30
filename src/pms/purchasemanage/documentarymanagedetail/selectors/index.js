import { createSelector } from 'reselect';
import { timestampFromat } from '../../../../util/baseTool';

const getDocumentaryDetai = state => state.documentaryDetailListObj;

/**
 * 供应商跟单明细数据转换
 */
const parseDocumentaryDetai = createSelector(
    [getDocumentaryDetai],
    (documentarysDetais) => {
        const newDate = Date.parse(new Date());
        const dataSeconds = 24 * 60 * 60 * 1000;
        documentarysDetais.list = documentarysDetais.list.map((documentaryDetai) => {
            if (documentaryDetai.earliestFollowUpTime) {
                documentaryDetai.earliestFollowUpTime = timestampFromat(Number.parseInt(documentaryDetai.earliestFollowUpTime, 10), 0);
            } else {
                documentaryDetai.earliestFollowUpTime = '--';
            }

            // if (documentaryDetai.followUpResults) {
            //     if (documentaryDetai.followUpResults.length > 6) {
            //         documentaryDetai.followUpResults_SX = documentaryDetai.followUpResults.slice(0,6) + '...';
            //     }
            // }
            //
            // if (documentaryDetai.remark) {
            //     if (documentaryDetai.remark.length > 6) {
            //         documentaryDetai.remark_SX = documentaryDetai.remark.slice(0,6) + '...';
            //     }
            // }

            if (documentaryDetai.estimatedStorageTime) {
                documentaryDetai.remainingDays = Math.round((documentaryDetai.estimatedStorageTime - newDate) / dataSeconds);
            } else {
                documentaryDetai.remainingDays = '---';
            }

            if (documentaryDetai.remainingDays !== '---') {
                if (parseFloat(documentaryDetai.remainingDays) <= -5) {
                    documentaryDetai.iColorType = 1;
                } else {
                    documentaryDetai.iColorType = 0;
                }
            } else {
                // 0 代表蓝色 1代表红色
                documentaryDetai.iColorType = 0;
            }

            if (documentaryDetai.estimatedStorageTime) {
                documentaryDetai.estimatedStorageTime = timestampFromat(Number.parseInt(documentaryDetai.estimatedStorageTime, 10), 0);
            } else {
                documentaryDetai.estimatedStorageTime = '--';
            }

            if (documentaryDetai.latestFollowUpTime) {
                documentaryDetai.latestFollowUpTime = timestampFromat(Number.parseInt(documentaryDetai.latestFollowUpTime, 10), 0);
            } else {
                documentaryDetai.latestFollowUpTime = '--';
            }

            if (documentaryDetai.purchaseOrderTime) {
                documentaryDetai.purchaseOrderTime = timestampFromat(Number.parseInt(documentaryDetai.purchaseOrderTime, 10), 0);
            } else {
                documentaryDetai.purchaseOrderTime = '--';
            }
            return documentaryDetai;
        });
        return documentarysDetais;
    },
);

export default parseDocumentaryDetai;
