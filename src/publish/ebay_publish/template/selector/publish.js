import { createSelector } from 'reselect'
import { timestampFromat } from '../../../../util/baseTool'
const publishData = state => state.publishData

/**
 * 运输列表数据转换
 */
export const parsePublishData = createSelector(
    [publishData],
    publishData => {
        publishData.data = publishData.data.map(item => {
            item.createdTime =  timestampFromat(item.createdTime,2)
            item.modifiedTime =  timestampFromat(item.modifiedTime,2)
            item.key = item.publishTemplId
            return item
        })
        return publishData
    }
)