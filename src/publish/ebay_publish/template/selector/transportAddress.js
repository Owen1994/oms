
export const parseListData = (datas) => {
    return datas.map(item => {
        item.label = item.name
        item.value = item.code
        return item
    })
}
