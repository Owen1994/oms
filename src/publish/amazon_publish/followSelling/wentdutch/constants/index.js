//  是否低于售价 0:否 1:是
export const sellingPriceList = [
    { name: "请选择", value: -1 },
    { name: "是", value: 1 },
    { name: "否", value: 0 },
]

//  当前状态：0：监控中；1：已暂停
export const isDeleteList = [
    { name: "请选择", value: -1 },
    { name: "监控中", value: 0 },
    { name: "已暂停", value: 1 },
]
// 搜索类型(1-ASIN; 2-seller SKU; 3-原sku)
export const sreachTypeList = [
    { name: "ASIN", value: 1 },
    { name: "seller SKU", value: 2 },
    { name: "原sku", value: 3 },
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