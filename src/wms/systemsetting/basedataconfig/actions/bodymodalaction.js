import * as TYPES from '../constants';

// 主体、采购单状态项
export const addBodyItem = params => dispatch => dispatch({ type: TYPES.ADD_BODY_ITEM, ...params });
export const delBodyItem = params => dispatch => dispatch({ type: TYPES.DELETE_BODY_ITEM, ...params });
export const modifyBodyItem = params => dispatch => dispatch({ type: TYPES.MODIFY_BODY_ITEM, ...params });
export const editBodyItem = params => dispatch => dispatch({ type: TYPES.EDIT_BODY_ITEM, ...params });
export const saveBodyItem = params => dispatch => dispatch({ type: TYPES.SAVE_BODY_ITEM, ...params });
export const initBodyItem = params => dispatch => dispatch({ type: TYPES.INIT_BODY_ITEM, ...params });
export const clearBodyItem = params => dispatch => dispatch({ type: TYPES.CLEAR_BODY_ITEM, ...params });

// 设置仓库项
export const addWarehouseItem = params => dispatch => dispatch({ type: TYPES.ADD_WAREHOUSE_ITEM, ...params });
export const delWarehouseItem = params => dispatch => dispatch({ type: TYPES.DELETE_WAREHOUSE_ITEM, ...params });
export const modifyWarehouseItem = params => dispatch => dispatch({ type: TYPES.MODIFY_WAREHOUSE_ITEM, ...params });
export const editWarehouseItem = params => dispatch => dispatch({ type: TYPES.EDIT_WAREHOUSE_ITEM, ...params });
export const saveWarehouseItem = params => dispatch => dispatch({ type: TYPES.SAVE_WAREHOUSE_ITEM, ...params });
export const initWarehouseItem = params => dispatch => dispatch({ type: TYPES.INIT_WAREHOUSE_ITEM, ...params });
export const clearWarehouseItem = params => dispatch => dispatch({ type: TYPES.CLEAR_WAREHOUSE_ITEM, ...params });
