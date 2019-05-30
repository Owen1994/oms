
const parseList = (result) => {
    result = result || [];
    result = result.map((item) => {
        item.value = item.fieldCode;
        item.label = item.fieldName;
        item.key = item.id;
        return item;
    });
    return result;
};

export default parseList;
