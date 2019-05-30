import { createSelector } from 'reselect'
import { timestampFromat} from '../../../../../util/baseTool'
const matchListData = state => state.matchListData

/**
 * 描述模板列表数据转换
 */
export const parseMatchListData  = createSelector(
    [matchListData],
    matchListData => {
        matchListData.data = matchListData.data.map(item => {
            item.createdTime =  timestampFromat(item.createdTime,2)
            item.modifiedTime =  timestampFromat(item.modifiedTime,2)
            item.key = item.matchId
            return item
        })
        return matchListData
    }
)

/**
 * 转换模板详情数据
 * @param {*} list 
 */
export const parseTempMatchDetailData = (list) => {
    return list.map((item,index) => {
        item.key = index ;
        return item;
    })
}