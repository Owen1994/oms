const priceTypes = [
    {
        code: 1,
        name: '修改为统一值'
    },
    {
        code: 2,
        name: '加'
    },
    {
        code: 3,
        name: '按百分比加'
    },
    {
        code: 4,
        name: '减'
    },
    {
        code: 5,
        name: '按百分比减'
    }
]
export const minAndMax = {
    1: { 'min': 0.99, 'max': 999999.99 },
    2: { 'min': 0.01, 'max': 99999.99 },
    3: { 'min': 0.01, 'max': 100.00 },
    4: { 'min': 0.01, 'max': 99999.99 },
    5: { 'min': 0.01, 'max': 99.99 },
}
// Seller SKU变更
export const modeList = [
    {
        code: 1,
        name: "国内发货模式"
    },
    {
        code: 2,
        name: "专线模式/分仓模式"
    }
]

export default priceTypes