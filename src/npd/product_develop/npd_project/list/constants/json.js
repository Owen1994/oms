export const TYPEJSON = [
    {
        title:"立项状态",
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
                id: 601,
                name: "待开发经理审核"
            }, {
                id: 701,
                name: "待开发总监审核"
            }, {
                id: 201,
                name: "待销售主管审核"
            }, {
                id: 301,
                name: "待销售经理审核"
            }, {
                id: 602,
                name: "开发经理驳回"
            }, {
                id: 702,
                name: "开发总监驳回"
            }, {
                id: 202,
                name: "销售主管驳回"
            }, {
                id: 302,
                name: "销售经理驳回"
            }, {
                id: 901,
                name: "已通过"
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
    },
    {
        title:"绑定状态",
        type:"bindState",
        showField:"name",
        valueField:"id",
        list:[
            {
                id: "902",
                name: "未绑定"
            },{
                id: "1001",
                name: "待对样"
            },{
                id: "3001",
                name: "已锁定"
            }
        ]
    },
]
