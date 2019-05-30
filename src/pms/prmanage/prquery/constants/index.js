// export const MOCK_PATH = '/mockjsdata/31';
export const MOCK_PATH = '';

// PR列表查询
export const PRSEARCH = `${MOCK_PATH}/pmsservice/api/PrSearch/prSearch`;

// PR查询导出
export const PREXPORT = `${MOCK_PATH}/pmsservice/api/PrExport/prExport`;

// 订单SKU状态
export const PURCHASE_ORDER_DETAIL_STATE = `${MOCK_PATH}/pmsservice/api/Commonapi/getPurchaseorderDetailState`;

export const UPDATE_ORDERS_DOCUMENTATION = `${MOCK_PATH}/pmsservice/api/Purchaseplan/refreshData`;

// 导出
export const EXPORTPURCHASEPLAN = `${MOCK_PATH}/pmsservice/api/Purchaseplan/exportPurchaseplan`;

// 获取仓库列表API
export const Get_Warehouse_List_Api = `${MOCK_PATH}/pmsservice/api/Commonapi/getWarehouse`;

// 查询采购人员-查询订货人员-查询跟单人员
export const Order_Query_People_Name = `${MOCK_PATH}/pmsservice/api/merchandiserManagement/InquireOPEmployee/inquireOPEmployee`;

export const RECEIVE_PRSEARCH_LIST = 'receive_prsearch_list';

export const LOADING_RECORD_LIST = 'loading_record_list';

export const SORT_FIELDS_LIST = 'sort_fields_list';


const PRSTATE = [
    { code: 0, name: '全部' },
    { code: 1, name: '执行完毕' },
    { code: 2, name: '部分执行' },
    { code: 3, name: '未执行' },
    { code: 4, name: '已撤销' },
];

export {
    PRSTATE,
};
