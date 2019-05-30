export const TYPEJSON = [
    {
        title:"使用平台",
        type:"usePlatform",
        // isMultiple:true,
        showField:"name",
        valueField:"id",
        // defaultValue:["111111","222222"],
        // oneLine:true,
        list:[]
    },
    {
        title:"是否使用",
        type:"isUsed",
        showField:"name",
        valueField:"id",
        list:[
            {
                id: "1",
                name: "是"
            }, {
                id: "0",
                name: "否"
            }
        ]
    },
    {
        title:"来源方式",
        type:"sourceType",
        showField:"name",
        valueField:"id",
        list:[
            {
                id: "1",
                name: "手动导入"
            }, {
                id: "0",
                name: "自动导入"
            }
        ]
    },
]
