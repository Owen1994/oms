import * as TYPES from '../constants';

export const defaultData = {
    itemKey: Date.now(),
    key: '',
    code: '',
    name: '',
    ifEditing: true,
};
// 主体、采购单状态
export const bodymodaldata = (state = [], action) => {
    switch (action.type) {
    case TYPES.ADD_BODY_ITEM: // 新增行
        state.splice(0, 0, {
            itemKey: Date.now(),
            key: '',
            code: '',
            name: '',
            ifEditing: true,
        });
        return [...state];
    case TYPES.DELETE_BODY_ITEM: // 删除行
        state.splice(action.index, 1);
        return [...state];
    case TYPES.MODIFY_BODY_ITEM: // input输入
        state[action.index][action.inputType] = action.value;
        state[action.index].key = action.key;
        return [...state];
    case TYPES.SAVE_BODY_ITEM: // 保存
        state[action.index].key = action.key ? action.key : '';
        state[action.index].ifEditing = false;
        return [...state];
    case TYPES.EDIT_BODY_ITEM: // 点击编辑
        state[action.index].ifEditing = true;
        state[action.index].key = action.key;
        return [...state];
    case TYPES.INIT_BODY_ITEM: // 初始化
        state = [];
        state = action.value;
        return [...state];
    case TYPES.CLEAR_BODY_ITEM: // 清空
        return [];
    default:
        return state;
    }
};
// 仓库项
export const warehousemodaldata = (state = [], action) => {
    switch (action.type) {
    case TYPES.ADD_WAREHOUSE_ITEM: // 新增行
        state.splice(0, 0, {
            itemKey: Date.now(),
            key: '',
            code: '',
            name: '',
            address: '',
            contact: '',
            contactPhone: '',
            remarks: '',
            warehouseType: '',
            warehouseTypeName: '',
            ifEditing: true,
        });
        return [...state];
    case TYPES.DELETE_WAREHOUSE_ITEM: // 删除行
        state.splice(action.index, 1);
        return [...state];
    case TYPES.MODIFY_WAREHOUSE_ITEM: // input输入
        state[action.index][action.inputType] = action.value;
        state[action.index].key = action.key;
        return [...state];
    case TYPES.SAVE_WAREHOUSE_ITEM: // 保存
        state[action.index].key = action.key ? action.key : '';
        state[action.index].ifEditing = false;
        return [...state];
    case TYPES.EDIT_WAREHOUSE_ITEM: // 点击编辑
        state[action.index].ifEditing = true;
        state[action.index].key = action.key;
        return [...state];
    case TYPES.INIT_WAREHOUSE_ITEM: // 初始化
        state = [];
        state = action.value;
        return [...state];
    case TYPES.CLEAR_WAREHOUSE_ITEM: // 清空
        return [];
    default:
        return state;
    }
};
