import { createSelector } from 'reselect'
import { angentPicUrl, randNum } from '../../../../util/baseTool'
import defaultPng from '../../../common/constants/imgs/default.png'
import { parseSaleType } from './index'

const getAlerdayDeleteData = state => state.tablemodel

export const parseAlerdayDeleteData = createSelector(
    [getAlerdayDeleteData],
    alerdayDeleteData => {
        alerdayDeleteData.lst = alerdayDeleteData.lst.map(item => {
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
            if(item.children&&item.children.length>0){ // 多属性明细
                item.sellerSkuStr = item.children[0].sellerSkuStr
                item.children.map((it, index)=>{
                    it.key = item.listingId + '' + index; 
                    it.currencyCode = item.currencyCode
                    it.isChildren = true
                    it.operation  = '--'
                    if(it.img){
                        it.img = angentPicUrl(it.img)
                    } else {
                        it.img = defaultPng
                    }
                })
            }
            return item
        })
        return alerdayDeleteData
    }
)