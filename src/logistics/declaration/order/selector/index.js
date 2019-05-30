/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */

export const parseCheckList = (state) => {
    const data = state.checkList || [];
    return data.map((item, index) => {
        item.key = item.itemId;
        return item;
    })
};