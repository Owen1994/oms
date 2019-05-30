export const addKey = (data) => {
    data.list = data.list.map(item => {
        item.key = item.id;
        return item;
    })
    return data;
}