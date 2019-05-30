import { createSelector } from 'reselect'
import { timestampFromat} from '../../../../util/baseTool'
const transportData = state => state.transportAllData.transportData

/**
 * 运输模板列表数据转换
 */
export const parseTransportData = createSelector(
    [transportData],
    transportData => {
        transportData.data = transportData.data.map(item => {
            item.createdTime=  timestampFromat(item.createdTime,2)
            item.modifiedTime =  timestampFromat(item.modifiedTime,2)
            item.key = item.plsProfileId
            return item
        })
        return transportData
    }
)
