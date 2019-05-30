import { createSelector } from 'reselect'

const getListStateData = state => state.listingStateData

export const parseListStateData = createSelector(
    [getListStateData],
    listStateData => {
        listStateData = listStateData.map(item => {
            // item.title = item.name + `(${item.num})`
            item.title = item.name;
            return item;
        })
        return listStateData
    }
)

/**
 * 队列类型转换
 * @param {*} queueType 
 */
export const parseQueueType = (queueType) => {
    switch(queueType){
        case 1:
            return '新增'
        case 2:
            return '修改'
        case 3:
            return '上架'
        case 4:
            return '下架'
        default:
            return queueType
    }
}

/**
 * 销售类型转换
 */
export const parseSaleType = (saleType) => {
    switch(saleType){
        case '0':
            return '拍卖'
        case '1':
            return '一口价'
        case '2':
            return '多属性'
        default:
            return saleType            
    }
}