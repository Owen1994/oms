
// const MOCK_PATH = '/mockjsdata/46';
const MOCK_PATH = '';

// 平台列表
// export const Plat_List_Api = `${MOCK_PATH}/pls/ebay/motan/service/api/IEbayService/getYksPlatform`;

// 平台列表
export const Site_List_Api = `${MOCK_PATH}/listing/base/ext/IListingExtInfoService/query`;

// SKU已覆盖主列表查询
export const Has_Cover_Main_List_Api = `${MOCK_PATH}/pls/motan/service/api/IPlsFacadeService/getSkuCoveredList`;

// SKU已覆盖主列表查询
export const Has_Cover_Sub_List_Api = `${MOCK_PATH}/pls/motan/service/api/IPlsFacadeService/getSkuCoveredListing`;

// 字段定义查询接口
export const Field_List_Api = `${MOCK_PATH}/pls/motan/service/api/IPlsFacadeService/getFieldList`;

// 已覆盖 导出接口
export const Export_Sku_Covered_Api = `${MOCK_PATH}/pls/motan/service/api/IPlsFacadeService/exportSkuCovered`;

// SKU未覆盖 列表查询
export const Not_Cover_Main_List_Api = `${MOCK_PATH}/pls/motan/service/api/IPlsFacadeService/getSkuUnCoveredList`;

// 未覆盖 导出接口
export const ExportE_Sku_UnCovered_Api = `${MOCK_PATH}/pls/motan/service/api/IPlsFacadeService/exportSkuUnCovered`;
