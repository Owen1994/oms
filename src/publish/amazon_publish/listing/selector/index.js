import { createSelector } from 'reselect'
import { timestampFromat, autoZeroToString } from '@/util/baseTool'
import { queueTypeList } from '../constants/index'
const getListingData = state => state.listData

export const getListData = createSelector(
    [getListingData],
    listData => {
        // discountPrice
        let list = listData.list;
        list = list.map(v => {
            let queueType = queueTypeList.find(val => val.id == v.queueType);
            queueType = queueType ? queueType.name : ''
            v._retailPrice = v.retailPrice !== undefined && v.retailPrice !== null ? autoZeroToString(v.retailPrice) : '--'
            v._discountPrice = v.discountPrice !== undefined && v.discountPrice !== null ? autoZeroToString(v.discountPrice) : '--'
            v._listTime = v.listTime ? timestampFromat(v.listTime, 2) : '--'
            v.queueTime = v.queueTime ? timestampFromat(v.queueTime, 2) : '--'
            v.failureTime = v.failureTime ? timestampFromat(v.failureTime, 2) : '--'
            v.deleteTime = v.deleteTime ? timestampFromat(v.deleteTime, 2) : '--'
            v._queueType = queueType
            return v;
        })
        return {
            ...listData,
            list
        }
    }
)
