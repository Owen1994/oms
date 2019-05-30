export const filterPostdata = (values) => {
    // 处理商品数据
    const postData = {};
    if (values.product) {
        const productArr = Object.values(values.product).filter(item => item.checked);
        postData.refundSkus = productArr;
        delete values.product;
    }
    // 处理各类表单字段
    const fieldDatas = values.fieldData;
    if (fieldDatas) {
        let params = Object.values(fieldDatas);
        params = params.filter(item => item.fieldValue);
        params.forEach(item => {
            if (item.type === 'checkbox') {
                item.fieldValue = item.fieldValue.join('|');
            } else if (item.type === 'date') {
                item.fieldValue = item.fieldValue.valueOf();
            } else if (item.type === 'file') {
                if (Array.isArray(item.fieldValue)) {
                    item.fieldValue = item.fieldValue.length ? item.fieldValue[0].url : '';
                }
            }
        })
        postData.fieldData = params;
    }
    if (values.refundType === 3 && postData.refundSkus) delete postData.refundSkus;
    // 处理退款原因
    const refundReasonId = values.refundReasonId;
    postData.refundReasonId = refundReasonId[refundReasonId.length - 1];
    return {
        ...values,
        ...postData,
    };
};
