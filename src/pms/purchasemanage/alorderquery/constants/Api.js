
// const MOCK_PATH = '/mockjsdata/31';
const MOCK_PATH = '';

// 阿里订单列表查询
export const Main_List_Api = `${MOCK_PATH}/pmsservice/api/Ali/orderList`;

// 采购单状态获取
export const PO_State_Api = `${MOCK_PATH}/pmsservice/api/Commonapi/getPurchaseorderState`;

// 查询采购人员-查询订货人员-查询跟单人员
export const Query_Order_People_Name = `${MOCK_PATH}/pmsservice/api/merchandiserManagement/InquireOPEmployee/inquireOPEmployee`;

// 更新订单
export const AL_Update_Order_Api = `${MOCK_PATH}/pmsservice/api/Ali/update`;

// 解除订单
export const AL_Dissolution_Order_Api = `${MOCK_PATH}/pmsservice/api/Ali/unbind`;

// 导出订单
export const AL_Export_Order_Api = `${MOCK_PATH}/pmsservice/api/Ali/exportOrderList`;

// 导出物流信息
export const AL_Export_Logistics_Info_Api = `${MOCK_PATH}/pmsservice/api/Ali/exportLogistics`;

// 创建付款计划单
export const AL_Create_Payment_Document_Api = `${MOCK_PATH}/pmsservice/api/Ali/create`;
