import { createSelector } from 'reselect'
import { timestampFromat} from '../../../../util/baseTool'
const paymentData= state => state.paymentData

/**
 * 描述模板列表数据转换
 */
export const parsePaymentData = createSelector(
    [paymentData],
    paymentData=> {
        paymentData.data = paymentData.data.map(item => {
            item.createdTime=  timestampFromat(item.createdTime,2)
            item.modifiedTime =  timestampFromat(item.modifiedTime,2)
            item.key = item.plsProfileId
            return item
        })
        return paymentData
    }
)
