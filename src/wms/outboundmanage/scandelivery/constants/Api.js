const MOCK_PATH = '';
// const MOCK_PATH = '';
/**
 * 扫描发运-列表
 * @type {string}
 */
export const PART_LIST = `${MOCK_PATH}/wmsservice/api/CollectingBag/collectingOrderCacheList`;
/**
 * 扫描发运-确认结袋
 * @type {string}
 */
export const CONFIRM = `${MOCK_PATH}/wmsservice/api/CollectingBag/addCollectingBag`;
/**
 *扫描发运-删除
 * @type {string}
 */
export const DELETE_ITEM = `${MOCK_PATH}/wmsservice/api/CollectingBag/deleteCollectingOrderCache`;
/**
 *扫描发运-扫描面单
 * @type {string}
 */
export const SCAN_SHIPMENT = `${MOCK_PATH}/wmsservice/api/CollectingBag/scanShipment`;
/**
 * 集货称重-列表
 * @type {string}
 */
export const WEIGHING_LIST = `${MOCK_PATH}/wmsservice/api/CollectingBag/queryCollectingBag`;

/**
 * 集货称重-集货袋称重
 * @type {string}
 */
export const COLLECTING_BAGWEIGHT = `${MOCK_PATH}/wmsservice/api/CollectingBag/collectingBagWeight`;
/**
 * 渠道合并-列表
 * @type {string}
 */
export const CHANNEL_LIST = `${MOCK_PATH}/wmsservice/api/ChannelTable/channelTableList`;
/**
 * 渠道合并-合并
 * @type {string}
 */
export const CHANNEL_TABLE_MERGE = `${MOCK_PATH}/wmsservice/api/ChannelTable/channelTableMerge`;
/**
 * 渠道合并-取消
 * @type {string}
 */
export const CHANNEL_TABLE_CANCEL = `${MOCK_PATH}/wmsservice/api/ChannelTable/channelTableCancel`;

/**
 * 集合袋合并-列表
 * @type {string}
 */
export const COLLECT_GOODS_LIST = `${MOCK_PATH}/wmsservice/api/CollectingBag/queryCollectingBagMerge`;
/**
 * 集合袋合并-合并
 * @type {string}
 */
export const COLLECTING_BAG_MERGE = `${MOCK_PATH}/wmsservice/api/CollectingBag/collectingBagMerge`;
/**
 * 集合袋合并-打印
 * @type {string}
 */
export const PRINT_COLLECTING_BAG = `${MOCK_PATH}/wmsservice/api/CollectingBag/printCollectingBag`;
/**
 * 更新包裹重量-更新
 * @type {string}
 */
export const UPDATE_BAG_WEIGHT = `${MOCK_PATH}/wmsservice/api/CollectingBag/updateBagWeight`;
/**
 * 更新包裹重量-查询列表
 * @type {string}
 */
export const BAGLIST = `${MOCK_PATH}/wmsservice/api/CollectingBag/bagList`;
/**
 * 获取渠道国家列表
 * @type {string}
 */
export const QUERY_CHANNEL_COUNTRY = `${MOCK_PATH}/wmsservice/api/ChannelTable/queryChannelCountry`;
