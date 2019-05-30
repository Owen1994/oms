import { createSelector } from 'reselect'
import { timestampFromat} from '../../../../util/baseTool'
const describeData = state => state.describeData

/**
 * 描述模板列表数据转换
 */
export const parseDescribeData = createSelector(
    [describeData],
    describeData => {
        describeData.data = describeData.data.map(item => {
            item.addTime =  timestampFromat(item.addTime,2)
            item.editTime =  timestampFromat(item.editTime,2)
            item.key = item.tempId
            return item
        })
        return describeData
    }
)
