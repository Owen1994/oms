const HEAD_URL = ''; // mockjsdata/35
const HEAD_URL2 = ''; // 二期Mock

// （公共接口）获取所有仓库列表
export const GET_WAREHOUSE = `${HEAD_URL}/wmsservice/api/BasicConfig/Warehouse/warehouse`;
// 获取用户所属主仓库
export const GET_MAIN_PERMISSION_WAREHOUSE = `${HEAD_URL2}/wmsservice/api/BasicConfig/mainWarehouse`;
// 获取用户有权限的仓库
export const GET_ALL_PERMISSION_WAREHOUSE = `${HEAD_URL2}/wmsservice/api/BasicConfig/allWarehouse  `;


// （公共接口）获取异常状态
export const GET_SPECIAL_STATE_LIST = `${HEAD_URL}/wmsservice/api/Public/specialCaseState`;
// （公共接口）获取异常状态
export const GET_SPECIAL_TYPE_LIST = `${HEAD_URL}/wmsservice/api/Public/specialCaseType`;
// （公共接口）获取处理方案
export const GET_TREATMENT_PLAN_LIST = `${HEAD_URL}/wmsservice/api/Public/treatmentPlan`;
// （公共接口）获取不良品类型
export const GET_BAD_TYPE = `${HEAD_URL}/wmsservice/api/Public/badType`;
// （公共接口）获取储位类型
export const GET_PLACE_TYPE = `${HEAD_URL}/wmsservice/api/Public/placeType`;
// （公共接口）获取货架编码
export const GET_GOOD_SHELVES_NUMBER = `${HEAD_URL}/wmsservice/api/Public/getGoodShelvesNumber`;
// （公共接口）获取储位数
export const GET_STORAGE_NUMBER = `${HEAD_URL}/wmsservice/api/Public/getStorageNumber`;
// （公共接口）获取仓库类型
export const GET_WAREHOUSE_TYPE = `${HEAD_URL}/wmsservice/api/Public/warehouseType`;
// 根据sku获取产品中文名
export const GET_PRODUCT_NAME = `${HEAD_URL2}/wmsservice/api/BasicConfig/getProductNameBySku`;
// 获取当前登录用户所属仓库
export const GET_USER_WAREHOUSE = `${HEAD_URL2}/wmsservice/api/Public/getUserWarehouse`;

/**
 * -----------------------------------仓储二期-----------------------------------
 */
// 出库异常类型
export const EXCEPTION_TYPE = `${HEAD_URL2}/wmsservice/api/BasicConfig/exceptionType`;
// 平台
export const PLATFORMS = `${HEAD_URL2}/wmsservice/api/BasicConfig/platforms`;
// 订单状态
export const GET_ORDER_STATUS = `${HEAD_URL2}/wmsservice/api/BasicConfig/getOrderStatus`;
// 样品处理状态
export const SAMPLE_PROCESS_STATUS = `${HEAD_URL2}/wmsservice/api/BasicConfig/sampleProcessStatus`;
// 物流渠道
export const LOGISTICS_CHANNEL = `${HEAD_URL2}/wmsservice/api/BasicConfig/logisticsChannel`;
// 处理状态
export const MANAGE_STATES = `${HEAD_URL2}/wmsservice/api/BasicConfig/manageStates`;
// 货代
export const FREIGHT_FORWARDING = `${HEAD_URL2}/wmsservice/api/BasicConfig/getFreightForwardingList`;
// 退件原因
export const RETURN_REASON = `${HEAD_URL2}/wmsservice/api/BasicConfig/returnReason`;
// 盘点类型
export const INVENTORY_TYPE = `${HEAD_URL2}/wmsservice/api/BasicConfig/inventoryType`;
// 主体
export const PURCHASING_AGENT = `${HEAD_URL2}/wmsservice/api/BasicConfig/purchasingAgent`;
// 获取可设置主仓库
export const GET_MAIN_WAREHOUSE = `${HEAD_URL2}/wmsservice/api/UserAuthority/getOwnWarehouseById`;
// 预报类型
export const PREDICT_TYPE = `${HEAD_URL2}/wmsservice/api/BasicConfig/predictType`;
// 检索储位
export const GET_PLACE_CODE = `${HEAD_URL2}/wmsservice/api/Place/getPlaceCode`;
// 检索sku
export const GET_SKUNAME_BY_SKUUNIQUE = `${HEAD_URL2}/wmsservice/api/OutBound/getSkuNameBySkuUnique`;
// 移位状态
export const MOVE_PLACE_STATUS = `${HEAD_URL2}/wmsservice/api/BasicConfig/movePlaceStatus`;
// 移位类型
export const MOVE_PLACE_TYPE = `${HEAD_URL2}/wmsservice/api/BasicConfig/movePlaceType`;
// 拣货类型
export const PICK_TYPE = `${HEAD_URL2}/wmsservice/api/BasicConfig/getTaskType`;
// 入库类型
export const SHELVE_TYPE = `${HEAD_URL2}/wmsservice/api/BasicConfig/shelveType`;
// 出库类型
export const OUTBOUND_TYPE = `${HEAD_URL2}/wmsservice/api/BasicConfig/outboundType`;


/**
 * 获取包材规格
 * @type {string}
 */
export const GET_PACKAGE_SPECIFICATION = `${HEAD_URL}/wmsservice/api/Public/packageSpecification`;
/**
 * 不合格原因
 * @type {string}
 */
export const GET_UNQUALIFIED_REASON = `${HEAD_URL}/wmsservice/api/Public/unqualifiedReason`;

/**
 * 打印异常标签
 * @type {string}
 */
export const DEFECTIVE_PRODUCT_LABEL = `${HEAD_URL}/wmsservice/api/Public/defectiveProductLabel`;

/**
 * 打印SKU标签
 * @type {string}
 */
export const PRINT_SKU_LABEL = `${HEAD_URL}/wmsservice/api/Public/printSkuLabel`;
/**
 *  打印箱唛标签
 * @type {string}
 */
export const PRINT_BOX_LABEL = `${HEAD_URL}/wmsservice/api/Public/printBoxLabel`;
/**
 * 补打箱唛标签
 * @type {string}
 */
export const PRINT_RE_BOX_LABEL = `${HEAD_URL2}/wmsservice/api/Public/rePrintBoxLabel`;

// 补打异常标签
export const REPRINT_DEFECTSKU_LABEL = `${HEAD_URL2}/wmsservice/api/PrintLabel/rePrintDefectSkuLabel`;
