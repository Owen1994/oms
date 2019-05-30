
const parseList = (result) => {
    result.data = result.data || [];
    result.data = result.data.map((item) => {
        if (item.price) {
            item.price = Number.parseFloat(item.price).toFixed(2);
        } else {
            item.price = '0.00';
        }

        if (item.regCost) {
            item.regCost = Number.parseFloat(item.regCost).toFixed(2);
        } else {
            item.regCost = '0.00';
        }

        if (item.operationCost) {
            item.operationCost = Number.parseFloat(item.operationCost).toFixed(2);
        } else {
            item.operationCost = '0.00';
        }
        
        if (item.freight) {
            item.freight = Number.parseFloat(item.freight).toFixed(2);
        } else {
            item.freight = '0.00';
        }
        item.key = item.id;
        return item;
    });
    return result;
}
export default parseList;