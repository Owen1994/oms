import { createSelector } from 'reselect'
import { angentPicUrl, timestampFromat, randNum } from '../../../../util/baseTool'
import defaultPng from '../../../common/constants/imgs/default.png'
import { parseQueueType, parseSaleType } from './index'
const getPublishingData = state => state.tablemodel

export const parsePublishingData = createSelector(
    [getPublishingData],
    publishingData => {
        publishingData.lst = publishingData.lst.map(item => {
            item.key = item.listingId;
            if(item.img){
                item.img = angentPicUrl(item.img)
            } else {
                item.img = defaultPng
            }
            if(!item.oneClass) {
                item.oneClass = '--'
            }
            item.saleTypeStr = parseSaleType(item.saleType)
            item.queueTime = timestampFromat(item.queueTime,2)
            item.queueType = parseQueueType(item.queueType)
            if(item.children&&item.children.length>0){ // 多属性明细
                item.sellerSkuStr = item.children[0].sellerSkuStr
                item.children.map((it, index)=>{
                    it.key = item.listingId + '' + index; 
                    it.isChildren = true
                    it.currencyCode = item.currencyCode
                    if(it.img){
                        it.img = angentPicUrl(it.img)
                    } else {
                        it.img = defaultPng
                    }
                })
            }
            return item
        })
        return publishingData
    }
)

