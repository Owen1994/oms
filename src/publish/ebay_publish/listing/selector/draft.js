import { createSelector } from 'reselect'
import { angentPicUrl, timestampFromat, randNum } from '../../../../util/baseTool'
import defaultPng from '../../../common/constants/imgs/default.png'
import { parseSaleType } from './index'

const getDraftData = state => state.tablemodel

export const parseDraftData = createSelector(
    [getDraftData],
    draftData => {
        draftData.lst = draftData.lst.map(item => {
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
            // if(item.saleType === '1') {
            //     item.saleType = '一口价'
            // } else {
            //     item.saleType = '--'
            // }
            if(item.isComplete === 1) {
                item.isCompleteDesc = '是'
            } else {
                item.isCompleteDesc = '否'
            }
            item.failureTime = timestampFromat(item.failureTime,2)
            if(item.children&&item.children.length>0){ // 多属性明细
                item.sellerSkuStr = item.children[0].sellerSkuStr
                item.children.map((it, index)=>{
                    it.key = item.listingId + '' + index; 
                    // it.key = randNum();
                    it.currencyCode = item.currencyCode;
                    it.isChildren = true;
                    it.operation  = '--';
                    if(it.img){
                        it.img = angentPicUrl(it.img)
                    } else {
                        it.img = defaultPng
                    }
                })
            }
            return item
        })
        return draftData
    }
)