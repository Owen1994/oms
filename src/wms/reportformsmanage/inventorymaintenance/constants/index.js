// 盘点
export const GET_INVENTORY_LIST = 'get_inventory_list';
export const GET_INVENTORY_LIST_LOADING = 'get_inventory_list_loading';
// 入库
export const GET_STOCK_LIST = 'get_stock_list';
export const GET_STOCK_LIST_LOADING = 'get_stock_list_loading';
// 入库明细
export const GET_STOCK_DETAIL_LIST = 'get_stock_detail_list';
export const GET_STOCK_DETAIL_LIST_LOADING = 'get_stock_detail_list_loading';
// 出库
export const GET_OUT_STOCK_LIST = 'get_out_stock_list';
export const GET_OUT_STOCK_LIST_LOADING = 'get_out_stock_list_loading';
// 出库明细
export const GET_OUT_STOCK_DETAIL_LIST = 'get_out_stock_detail_list';
export const GET_OUT_STOCK_DETAIL_LIST_LOADING = 'get_out_stock_detail_list_loading';


export const TAB_TITLES = [
    '入库报表',
    '入库明细报表',
    '出库报表',
    '出库明细报表',
    '盘点报表',
    '储位维护报表',
];

export const STOCK_TYPE = [
    { code: '1', name: '正常采购入库' },
    { code: '2', name: '不良品入库' },
    { code: '3', name: '退件入库' },
    { code: '4', name: '调拨入库' },
    { code: '5', name: '还料入库' },
    { code: '6', name: '其它入库' },
];
export const DELIVERY_TYPE = [
    { code: '', name: '全部' },
    { code: '1', name: '借料出库' },
    { code: '2', name: '调拨出库' },
    { code: '3', name: '其它出库' },
];
export const INVENTORY_TYPE = [
    { code: '10', name: 'SKU款数盘点结果' },
    { code: '20', name: '商品PCS数盘点结果' },
    { code: '30', name: '金额盘点结果' },
];
