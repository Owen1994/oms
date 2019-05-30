const parseListData = (datas) => {
    datas = datas || [];
    datas.map((item) => {
        item.value = item.key;
        // delete item.key;
        return item;
    });
    return datas;
};
export default parseListData;
