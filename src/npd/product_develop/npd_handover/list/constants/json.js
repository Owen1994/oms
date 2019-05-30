export const TYPEJSON = [
    {
        title:"交接状态",
        type:"state",
        // isMultiple:true,
        showField:"name",
        valueField:"id",
        // defaultValue:["111111","222222"],
        // oneLine:true,
        list:[
            {
                id: 101,
                name: "待提交"
            }, {
                id: 701,
                name: "待开发总监审核"
            },  {
                id: 301,
                name: "待销售经理审核"
            }, {
                id: 5001,
                name: "待产权专员确认"
            },{
                id: 4001,
                name: "待物流专员确认"
            }, {
                id: 702,
                name: "开发总监驳回"
            }, {
                id: 302,
                name: "销售经理驳回"
            }, {
                id: 403,
                name: "待销售总监复核"
            }, {
                id: 402,
                name: "销售总监驳回"
            }, {
                id: 4002,
                name: "物流专员驳回"
            }, {
                id: 7001,
                name: "已完成"
            }
        ]
    },
    {
        title:"新品类型",
        type:"ntsType",
        showField:"name",
        valueField:"id",
        list:[
            {
                id: 1,
                name: "热销引入"
            }, {
                id: 2,
                name: "自主引入"
            }
        ]
    }
]

// export const 