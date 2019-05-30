const filterParams = (values, searchType) => {
    if (values.searchType !== undefined) {
        const fieldName = searchType.find(item => values.searchType === item.id).field;
        const obj = { field: fieldName, value: values.searchContent };
        delete values.searchType;
        delete values.searchContent;
        return obj;
    }
    return null;
};
export default filterParams;
