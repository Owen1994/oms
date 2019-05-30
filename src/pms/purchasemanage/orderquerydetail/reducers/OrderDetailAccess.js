import { GET_ORDER_DETAILS_ACCESS, IS_CAN_EDIT, Product_Select, ACCESS_LOADING } from '../constants';

export const orderDetailsAccessState = (state = {
    supplierInfo: {},
    productInfoArray: [],
    basicInfo: {},
}, action) => {
    switch (action.type) {
    case GET_ORDER_DETAILS_ACCESS:
        return action.data;
    default:
        return state;
    }
};
/**
 * 是否可编辑
 * @param state
 * @param action
 * @returns {*}
 */
export const isCanEditState = (state = false, action) => {
    switch (action.type) {
    case IS_CAN_EDIT:
        return action.data;
    default:
        return state;
    }
};

export const isAccessLoadingState = (state = false, action) => {
    switch (action.type) {
    case ACCESS_LOADING:
        return action.data;
    default:
        return state;
    }
};

export const ProductSelectData = (state = {selectedRowKeys: [], selectedRows: []}, action) => {
    switch (action.type) {
        case Product_Select:
            return action.data;
        default:
            return state;
    }
};
