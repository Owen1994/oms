/**
 * 获取查询列表地址
 * @type {string}
 */
// const MOCK_PATH = '/mockjsdata/31';
const MOCK_PATH = '';

// 采购单列表查询
export const ORDER_QUERY_LIST = `${MOCK_PATH}/pmsservice/api/PurchaseOrderInquiryList/purchaseOrderInquiryList`;

// 付款方式查询
export const PAY_METHOD_B = `${MOCK_PATH}/pmsservice/api/PublicInformationPaymentMethod/publicInformationPaymentMethod`;

// 批量提交
export const Order_Batch_Submit_Api_B = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/batchSubmit`;

// 修改采购单跟单员
export const Order_Modify_Merchandiser_Api_B = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/batchModifyMerchandiser`;

// 人员查询（用户中心）
export const Order_Staff_Inquiry_Api_B = `${MOCK_PATH}/pmsservice/api/StaffInquiry/staffInquiry`;

// 查询采购人员-查询订货人员-查询跟单人员
export const Order_Query_People_Name = `${MOCK_PATH}/pmsservice/api/merchandiserManagement/InquireOPEmployee/inquireOPEmployee`;

// 网拍信息编辑
export const Order_Query_Racquet_Edit = `${MOCK_PATH}/pmsservice/api/Ali/bind`;

// 采购单状态获取
export const Order_Query_State_Api = `${MOCK_PATH}/pmsservice/api/Commonapi/getPurchaseorderState`;

// 同步供应商账户
export const Order_Query_Sync_Supplier_Api = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/syncSupplier`;

// 获取仓库列表API
export const Get_Warehouse_List_Api = `${MOCK_PATH}/pmsservice/api/Commonapi/getWarehouse`;

// 导入更换跟单员
export const IMPORT_MERCHANDISERS = `${MOCK_PATH} /pmsservice/api/PurchaseOrder/importMerchandisers`;
// 文件上传公共接口
export const UPLOAD_URL = '/yks/file/server/';
// 供应商列表查询
export const ORDER_DETAIL_SUPPLIER_LIST = `${MOCK_PATH}/pmsservice/api/OrderDetailSupplierList/orderDetailSupplierList`