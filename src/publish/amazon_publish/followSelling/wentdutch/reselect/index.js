import { createSelector } from 'reselect'
import { timestampFromat, autoZeroToString } from '@/util/baseTool'

const getList = (state) => state.listData
const getSite = (state) => state.siteData

export const getListData = createSelector(
    [getList, getSite],
    (listData, siteData) => {
        const { list } = listData;
        if (!list.length || !siteData.length) return listData
        const newlist = list.map(v => {
            const site = siteData.find(val => val.siteCode == v.siteCode)
            v._currency = site ? site.currency : "USD"
            v._discountPrice = typeof v.discountPrice === "number" ? autoZeroToString(v.discountPrice) : "--";
            v._retailPrice = typeof v.retailPrice === "number"  ? autoZeroToString(v.retailPrice) : "--";
            v._postage = v.postage ? v.postage : "--";
            v._followLowestPrice = typeof v.followLowestPrice === "number" ? autoZeroToString(v.followLowestPrice) : "--";
            v.latestCrawlTime = v.latestCrawlTime ? timestampFromat(v.latestCrawlTime, 2) : "--";

            // v._discountPrice = site.discountPrice ? site.discountPrice : "--";
            return v
        });
        return {
            ...listData,
            list: newlist
        }
    }
)