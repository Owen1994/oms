export const parseBasicData = (basicData) => {
    const firstCategory = parseCategory(basicData.firstCategory);
    const dataColumn    = parseDataColumn(basicData.dataColumn);
    return { firstCategory, dataColumn };
}

const parseCategory = (categories = []) => {
    return categories.map((item1) => {
        item1.key = item1.cateId;
        item1.title = item1.cateNameCn;
        item1.checked = false;
        if (item1.children) {
            item1.children = parseCategory(item1.children);
        }
        return item1;
    });
}

const parseDataColumn = (dataColumn = []) => {
    return dataColumn.map((item) => {
        item.value = item.key;
        item.label = item.name;
        return item;
    });
}
