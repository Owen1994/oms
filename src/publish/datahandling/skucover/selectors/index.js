import { createSelector } from 'reselect/lib/index';
import { timestampFromat } from '../../../../util/baseTool';
import { AmazonSalesWeb, EBaySalesWeb } from '../constants/index';

const getHasCoverData = state => state.HasCoverListData;
const getNotCoverData = state => state.NotCoverListData;

export const parseHasCoverData = createSelector(
    [getHasCoverData],
    (data) => {
        if (data.list) {
            data.list.map((t) => {
                if (t.modifyDate) {
                    t.modifyDate = timestampFromat(t.modifyDate,2);
                } else {
                    t.modifyDate = '--';
                }

                t.siteCode = t.siteCode ? t.siteCode : '--';
                t.salesAccountNum = t.salesAccountNum ? t.salesAccountNum : '--';
                t.coverNum = t.coverNum ? t.coverNum : '--';
            });
        } else {
            data.list = [];
            data.total = 0;
        }
        return data;
    },
);

export const parseNotCoverData = createSelector(
    [getNotCoverData],
    (data) => {
        if (data.list) {
            data.list.map((t) => {
                if (t.modifyDate) {
                    t.modifyDate = timestampFromat(t.modifyDate,2);
                } else {
                    t.modifyDate = '--';
                }

                t.todayState = t.todayState ? t.todayState : '--';
                t.platform = t.platform ? t.platform : '--';
                t.siteCode = t.siteCode ? t.siteCode : '--';
            });
        } else {
            data.list = [];
            data.total = 0;
        }

        return data;
    },
);

/**
 * 已覆盖 子列表数据转换
 */
export const parseHasSubCoverData = (data, platform, siteCode) => {

    data.list.forEach((t) => {
        if (t.shelfTime) {
            t.shelfTime = timestampFromat(t.shelfTime,2);
        } else {
            t.shelfTime = '--';
        }

        t.discountPrice = t.discountPrice ? t.discountPrice : '--';
        t.listingId = t.listingId ? t.listingId : '--';
        t.marginalProfitMargin = t.marginalProfitMargin ? t.marginalProfitMargin : '--';
        t.retailPrice = t.retailPrice ? t.retailPrice : '--';
        t.sellerAccount = t.sellerAccount ? t.sellerAccount : '--';
        t.sellerSku = t.sellerSku ? t.sellerSku : '--';
        t.historicalSales = t.historicalSales !== null ? t.historicalSales : '--';

        if (t.listingId !== '--') {
            if (platform === 1) {
                t.webUrl = AmazonSalesWeb[`${platform}${siteCode}`] + t.listingId;
            } else if (platform === 2) {
                t.webUrl = EBaySalesWeb[`${platform}${siteCode}`] + t.listingId;
            } else if (platform === 3) {
                t.webUrl = `https://www.aliexpress.com/item/${t.listingId}.html`;
            } else {
                t.webUrl = undefined;
            }
        }

    });
    return data;
};
