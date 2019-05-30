//  是否低于售价 0:否 1:是
export const sellingPriceList = [
    { name: "请选择", value: -1 },
    { name: "是", value: 1 },
    { name: "否", value: 0 },
]

//  当前状态：1：监控中；2：已暂停
export const currentStateList = [
    { name: "请选择", value: -1 },
    { name: "监控中", value: 1 },
    { name: "已暂停", value: 2 },
]
// 搜索类型(1-ASIN; 2-seller SKU; 3-原sku)
export const sreachTypeList = [
    { name: "ASIN", value: 1 },
    { name: "seller SKU", value: 2 },
    { name: "原sku", value: 3 },
]

// 敏感等级
export const getSensitiveLayer = [
    {
        id: '0',
        name: "全部"
    },
    {
        id: '1',
        name: "绝对禁售"
    }, {
        id: '2',
        name: "高风险禁售"
    }, {
        id: '3',
        name: "高风险可售"
    }, {
        id: '4',
        name: "低风险可售"
    }
]


export const linkMap = {
    CA: "https://www.amazon.ca/dp/",
    US: "https://www.amazon.com/dp/",
    ES: "https://www.amazon.es/dp/",
    FR: "https://www.amazon.fr/dp/",
    IN: "https://www.amazon.in/dp/",
    IT: "https://www.amazon.it/dp/",
    UK: "https://www.amazon.co.uk/dp/",
    JP: "https://www.amazon.co.jp/dp/",
    MX: "https://www.amazon.com.mx/dp/",
    AU: "https://www.amazon.com.au/dp/",
    DE: "https://www.amazon.de/dp/",
}