// const HOST = '/mockjsdata/31';
import { MOCK_PATH } from '../../../prmanage/prquery/constants';

const HOST = '';
export const ORDER_DETAIL_LIST = `${HOST}/pmsservice/api/PurchaseOrder/getPurchaseorderDetailList`; // 采购订单明细表列表
export const ORDER_DETAIL_EXPORT = `${HOST}/pmsservice/api/PurchaseOrder/exportPurchaseorderDetail`; // 采购订单明细表导出

// 订单SKU状态
export const PURCHASE_ORDER_DETAIL_STATE = `${HOST}/pmsservice/api/Commonapi/getPurchaseorderDetailState`;

/**
 * 公司主体
 * @type {string}
 */
export const PUBLICIN_FORM_ATION_COMPANYMAINBODY = `${HOST}/pmsservice/api/PublicInformationCompanyMainBody/publicInformationCompanyMainBody`;

// 获取仓库列表API
export const Get_Warehouse_List_Api = `${MOCK_PATH}/pmsservice/api/Commonapi/getWarehouse`;

// 查询采购人员-查询订货人员-查询跟单人员
export const Order_Query_People_Name = `${MOCK_PATH}/pmsservice/api/merchandiserManagement/InquireOPEmployee/inquireOPEmployee`;

// 供应商列表查询
export const ORDER_DETAIL_SUPPLIER_LIST = `${MOCK_PATH}/pmsservice/api/OrderDetailSupplierList/orderDetailSupplierList`