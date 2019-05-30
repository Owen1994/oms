export const orderManagement = 'getOrderManagementListSync';
export const orderManagementAbnormalOrderInfo = 'orderManagementAbnormalOrderInfo';
export const getOrderException = 'getOrderException'; // 下单异常
// const url = '/mockjsdata/31';
const url = '';
export const orderManagementList = `${url}/pmsservice/api/OrderManagementList/orderManagementList`;
export const orderManagementAbnormalOrder = `${url}/pmsservice/api/OrderManagementAbnormalOrder/orderManagementAbnormalOrder`;
export const orderManagementUpdateAbnormalUrl = `${url}/pmsservice/api/OrderManagementUpdateAbnormal/orderManagementUpdateAbnormal`;
export const userUrl = `${url}/pmsservice/api/StaffInquiry/staffInquiry`;
export const inquireOPEmployeeUrl = `${url}/pmsservice/api/merchandiserManagement/InquireOPEmployee/inquireOPEmployee`;
export const PUBLIC_INFORMATION_PAYMENTMETHOD = `${url}/pmsservice/api/PublicInformationPaymentMethod/publicInformationPaymentMethod`;
// 未订货采购列表更换供应商
export const CHANGE_SUPPLIER = `${url}/pmsservice/api/Order/changeSupplier`;
// 异常订货列表导出
export const EXPORT_ABNORMAL_ORDER = `${url}/pmsservice/api/Order/exportAbnormalOrder`;
// 未订货采购列表导出
export const EXPORT_UNORDERED = `${url}/pmsservice/api/Order/exportUnordered`;

// 文件上传公共接口
export const UPLOAD_URL = '/yks/file/server/';

// 物流方式
export const LOGISTICS_MODE = `${url}/pmsservice/api/LogisticsMode/logisticsMode`;

// 批量生成PO
export const BATCH_CREATE_PO = `${url}/pmsservice/api/Order/batchCreatePo`;
// 下单异常列表
export const GET_ERROR_ORDER_LIST = `${url}/pmsservice/api/Order/getErrorOrderList`;

// 下单异常-批量转为待处理
export const CHANGE_ERROR_ORDER = `${url}/pmsservice/api/Order/changeErrorOrder`;
// 下单异常-导出
export const EXPORT_ERROR_ORDER = `${url}/pmsservice/api/Order/exportErrorOrder`;
// 更新最低价供应商
export const SYS_PURCHASE_PLAN = `${url}/pmsservice/api/Plan/sysPurchasePlan`;

// 供应商列表查询
export const ORDER_DETAIL_SUPPLIER_LIST = `${url}/pmsservice/api/OrderDetailSupplierList/orderDetailSupplierList`;
// 下单异常-编辑
export const EDIT_ERROR_ORDER = `${url}/pmsservice/api/Order/editErrorOrder`;
