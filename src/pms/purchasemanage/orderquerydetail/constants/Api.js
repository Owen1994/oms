// const MOCK_PATH = '/mockjsdata/31';
const MOCK_PATH = '';

/**
 * 订单详情日志信息
 * @type {string}
 */
export const ORDER_DETAILS_LOG = `${MOCK_PATH}/pmsservice/api/PurchaseOrderDetailsLog/purchaseOrderDetailsLog`;

/**
 * 订单详情基础信息
 * @type {string}
 */
export const ORDER_DETAILS_ACCESS = `${MOCK_PATH}/pmsservice/api/PurchaseOrderDetailsAccess/purchaseOrderDetailsAccess`;

/**
 * 仓库
 * @type {string}
 */
export const PUBLIC_INFORMATION_WARE_HOUSE = `${MOCK_PATH}/pmsservice/api/PublicInformationWarehouse/publicInformationWarehouse`;

/**
 * 转运仓库
 * @type {string}
 */
export const TRANS_SHIPMENT_WARE_HOUSE = `${MOCK_PATH}/pmsservice/api/TransshipmentWarehouse/transshipmentWarehouse`;

/**
 * 公司主体
 * @type {string}
 */
export const PUBLICIN_FORM_ATION_COMPANYMAINBODY = `${MOCK_PATH}/pmsservice/api/PublicInformationCompanyMainBody/publicInformationCompanyMainBody`;

/**
 * 物流方式
 * @type {string}
 */
export const LOGISTICS_MODE = `${MOCK_PATH}/pmsservice/api/LogisticsMode/logisticsMode`;

/**
 * 取消订单
 * @type {string}
 */
export const PURCHASE_ORDER_CANCEL = `${MOCK_PATH}/pmsservice/api/PurchaseOrderCancel/purchaseOrderCancel`;

/**
 * 保存并提交订单
 * @type {string}
 */
export const PURCHASE_ORDERDETAILS_SUBMIT = `${MOCK_PATH}/pmsservice/api/PurchaseOrderDetailsSubmit/purchaseOrderDetailsSubmit`;

/**
 * 查询审批人
 * @type {string}
 */
export const PURCHASE_ORDER_DETAILS_SEARCH_APPROVER = `${MOCK_PATH}/pmsservice/api/StaffInquiry/staffInquiry`;

/**
 * 转移审核
 * @type {string}
 */
export const PURCHASE_ORDER_DETAILS_TRANSFER_APPROVAL = `${MOCK_PATH}/pmsservice/api/purchaseOrderDetails/TransferApproval/transferApproval`;

/**
 * 审核通过
 * @type {string}
 */
export const PURCHASE_ORDER_DETAILS_APPROVALPASS = `${MOCK_PATH}/pmsservice/api/purchaseOrderDetails/ApprovalPass/approvalPass`;

/**
 * 审核驳回
 * @type {string}
 */
export const PURCHASE_ORDER_DETAILS_APPROVALDISMISSAL = `${MOCK_PATH}/pmsservice/api/purchaseOrderDetails/ApprovalDismissal/approvalDismissal`;

/**
 * 上架明细
 * @type {string}
 */
export const Purchase_Shelve_List_Api = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/getShelveList`;

/**
 * 付/退款明细
 * @type {string}
 */
export const Purchase_Order_Pay_Details_Api = `${MOCK_PATH}/pmsservice/api/Pay/getPayList`;

/**
 * 收货明细
 * @type {string}
 */
export const Purchase_Pay_List_Api = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/getRecieveList`;

/**
 * 质检明细
 * @type {string}
 */
export const Purchase_Inspect_List_Api = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/getInspectList`;

/**
 * 网拍物流详情
 * @type {string}
 */
export const Racquet_Logistics_List_Api = `${MOCK_PATH}/pmsservice/api/Ali/logisticsList`;

/**
 * 更新SKU名称
 * @type {string}
 */
export const Update_SKU_Name_Api = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/updateDetailSkuName`;

/**
 * 校验否是该采购单的订货员或跟单员
 * @type {string}
 */
export const Check_Users_Purchase_Orders_Api = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/checkUsersPurchaseOrdersPemission`;


/**
 * 退货明细
 * @type {string}
 */
export const Get_Return_Detail_Api = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/getReturnDetail`;
