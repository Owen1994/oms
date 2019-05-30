const MOCK_PATH = '';

// const MOCK_PATH = '/mockjsdata/31';

/**
 * 获取采购订单打印单详情
 * @type {string}
 */
export const ORDER_PRINT_DETAILS = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/purchaseprint`;

/**
 * 更新打印订单打印状态
 * @type {string}
 */
export const ORDER_UPDATE_PRINT_STATE = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/updatePrintState`;

/**
 * 获取打印订单的下载URL
 * @type {string}
 */
export const ORDER_GET_PRINT_RUL_STATE = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/getPurchaseOrderUrl`;

/**
 * 获取标识卡的下载URL
 * @type {string}
 */
export const Designation_Card_URL_Api = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/getDesignationCardUrl`;

/**
 * 校验否是该采购单的订货员或跟单员
 * @type {string}
 */
export const Check_Users_Purchase_Orders_Api = `${MOCK_PATH}/pmsservice/api/PurchaseOrder/checkUsersPurchaseOrdersPemission`;

