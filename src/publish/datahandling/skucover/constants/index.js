/**
 * 显示列表加载中
 * @type {string}
 */
export const has_list_loading_state = 'has_list_loading_state';

/**
 * 获取查询列表
 * @type {string}
 */
export const has_list_main_data = 'has_list_main_data';

/**
 * 显示列表加载中
 * @type {string}
 */
export const not_list_loading_state = 'not_list_loading_state';

/**
 * 获取查询列表
 * @type {string}
 */
export const not_list_main_data = 'not_list_main_data';

/**
 * SKU 状态
 * @type {*[]}
 */
export const Today_State_List = [
    {
        code: 1,
        name: '正常销售',
    },
    {
        code: 2,
        name: '断货',
    },
    {
        code: 3,
        name: '缺货',
    },
    {
        code: 4,
        name: '新品',
    },
    {
        code: 5,
        name: '清库存',
    },
    {
        code: 6,
        name: '清库存（侵权/违禁）',
    },
    {
        code: 7,
        name: '下架',
    },
    {
        code: 8,
        name: '下架（侵权/违禁）',
    },
];

/**
 * 平台列表
 * @type {*[]}
 */
export const Platform_List = [
    {
        code: '亚马逊',
        name: 'Amazon',
    },
    {
        code: 'eBay',
        name: 'eBay',
    },
    {
        code: '速卖通',
        name: 'Aliexpress',
    },
];

export const Site_Code_Dic = {
    '速卖通': 'Aliexpress',
    '亚马逊': 'AMAZON',
    'eBay': 'eBay',
};


/**
 * 亚马逊 销售页面链接
 * @type {{'1DE': string, '1AU': string, '1IN': string, '1UK': string, '1JP': string, '1IT': string, '1MX': string, '1FR': string, '1CA': string, '1US': string, '1ES': string}}
 */
export const AmazonSalesWeb = {
    '1CA': 'https://www.amazon.ca/dp/',
    '1US': 'https://www.amazon.com/dp/',
    '1ES': 'https://www.amazon.es/dp/',
    '1FR': 'https://www.amazon.fr/dp/',
    '1IN': 'https://www.amazon.in/dp/',
    '1IT': 'https://www.amazon.it/dp/',
    '1UK': 'https://www.amazon.co.uk/dp/',
    '1JP': 'https://www.amazon.co.jp/dp/',
    '1MX': 'https://www.amazon.com.mx/dp/',
    '1AU': 'https://www.amazon.com.au/dp/',
    '1DE': 'https://www.amazon.de/dp/',
};

export const EBaySalesWeb = {
    '2US': 'https://www.ebay.com/itm/',
    '2eBayMotors': 'https://www.ebay.com/itm/',
    '2AU': 'https://www.ebay.com.au/itm/',
    '2DE': 'https://www.ebay.de/itm/',
    '2FR': 'https://www.ebay.fr/itm/',
    '2UK': 'https://www.ebay.co.uk/itm/',
    '2IT': 'https://www.ebay.it/itm/',
    '2ES': 'https://www.ebay.es/itm/',
    '2CA': 'https://www.ebay.ca/itm/',
};
