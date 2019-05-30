// 自定义表单项数据管理
export const fieldData1 = [
    {
        fieldName: "退款类型",
        fieldOption: "全额退款|部分退款|额外退款",
        fieldType: "radio",
        isRequire: 1,
    }, {
        fieldName: "退款原因",
        fieldOption: "",
        fieldType: "cascader",
        isRequire: 1,
    }, {
        fieldName: "退款金额",
        fieldOption: "",
        fieldType: "input",
        isRequire: 1
    }
]

export const fieldData2 = [
    {
        fieldName: "退款凭证",
        fieldOption: "",
        fieldType: "input",
        isRequire: 2
    }, {
        fieldName: "退款详情",
        fieldOption: "",
        fieldType: "textarea",
        isRequire: 2
    }
]
