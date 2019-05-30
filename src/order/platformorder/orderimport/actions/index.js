export const ADD_TABLE_ITEM = 'add_table_item';
export const MODIFY_TABLE_ITEM = 'modify_table_item';
export const DELETE_TABLE_ITEM = 'delete_table_item';
export const CLEAR_TABLE_ITEM = 'clear_table_item';
export const CHANGE_CURRENCY = 'change_currency';

const addTableItem = value => ({
    type: ADD_TABLE_ITEM,
    payload: value
});

const modifyTableItem = value => ({
    type: MODIFY_TABLE_ITEM,
    payload: value
})

const deleteTableItem = value => ({
    type: DELETE_TABLE_ITEM,
    payload: value
})

const clearTableItem = value => ({
    type: CLEAR_TABLE_ITEM,
    payload: value
});

const changeCurrency = value => ({
    type: CHANGE_CURRENCY,
    payload: value
});

const actions = {
    addTableItem,
    modifyTableItem,
    deleteTableItem,
    clearTableItem,
    changeCurrency,
}

export default actions;




