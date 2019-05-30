import { createSelector } from 'reselect'
const stateData = state => state;

/**
 * 描述模板列表数据转换
 */
export const parseTemplateNumData = createSelector(
    [stateData],
    (state) => {
        let templateNum  = state.templateNumData;
        if(state.describeData.total !== -1) {
            templateNum[0].tempNum = state.describeData.total
        }
        return templateNum
    }
);

export const parseShippingService = (array) => {
    return array.map(item => {
        if(typeof item.shippingService === 'object') {
            item.shippingService = item.shippingService.code;
        }
        // delete item.key;
        return item;
    })
};

