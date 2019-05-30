export const TYPEJSON = [
    {
        title:"使用平台",
        type:"platformId",
        // isMultiple:true,
        showField:"name",
        valueField:"id",
        // defaultValue:["111111","222222"],
        // oneLine:true,
        list:[]
    },
    {
        title:"是否启用",
        type:"ruleState",
        showField:"name",
        valueField:"id",
        list:[
            {
                id: "0",
                name: "是"
            }, {
                id: "1",
                name: "否"
            }
        ]
    },
]
