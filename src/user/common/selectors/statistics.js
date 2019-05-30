export const parseBasicData = (basicData) => {
    const firstCategory = basicData.firstCategory;
    const dataColumn    = parseDataColumn(basicData.dataColumn);
    return { firstCategory, dataColumn };
}

const parseDataColumn = (dataColumn = []) => {
    return dataColumn.map((item) => {
        item.value = item.key;
        item.label = item.name;
        return item;
    });
}
