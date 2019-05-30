export const RECEIVE_PART_LIST = 'receive_part_list';
export const LOADING_PART_LIST = 'loading_part_list';

// 来货不良
export const IN_ERROR_TYPE = '10';
// 仓退不良
export const WAREHOUSE_ERROR_TYPE = '20';
// 退件不良
export const RETURN_ERROR_TYPE = '30';
export const ERROR_TYPE = [
    { code: IN_ERROR_TYPE, name: '来货不良' },
    { code: WAREHOUSE_ERROR_TYPE, name: '仓退不良' },
    { code: RETURN_ERROR_TYPE, name: '退件不良' },
];
