import { createSelector } from 'reselect'
import { timestampFromat } from '../../../../util/baseTool'
const returnData = state => state.returnData

/**
 * 运输列表数据转换
 */
export const parseReturnData = createSelector(
    [returnData],
    returnData => {
        returnData.data = returnData.data.map(item => {
            item.createdTime=  timestampFromat(item.createdTime,2)
            item.modifiedTime =  timestampFromat(item.modifiedTime,2)
            item.key = item.plsProfileId
            return item
        })
        return returnData
    }
)