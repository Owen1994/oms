
// const MOCK_PATH = '/mockjsdata/31';
const MOCK_PATH = '';

// 不良品普通商品列表查询
export const Main_List_Api = `${MOCK_PATH}/pmsservice/api/Defectiveproduct/getCommonProductLists`;

// 采购人员查询
export const Order_People_Name_Api = `${MOCK_PATH}/pmsservice/api/merchandiserManagement/InquireOPEmployee/inquireOPEmployee`;

// 不良品处理保存编辑
export const Save_Submit_Defective_Product_Api = `${MOCK_PATH}/pmsservice/api/Defectiveproduct/commonProductSave`;

// 不良品处理列表
export const Defective_Product_Details_List_Api = `${MOCK_PATH}/pmsservice/api/Defectiveproduct/getCommonProductDetail`;

// 获取仓库列表API
export const Get_Warehouse_List_Api = `${MOCK_PATH}/pmsservice/api/Commonapi/getWarehouse`;

// 导出
export const EXPORT_COMMON_PRODUCT_LISTS = `${MOCK_PATH}/pmsservice/api/Defectiveproduct/exportCommonProductLists`;

// 供应商列表查询
export const ORDER_DETAIL_SUPPLIER_LIST = `${MOCK_PATH}/pmsservice/api/OrderDetailSupplierList/orderDetailSupplierList`