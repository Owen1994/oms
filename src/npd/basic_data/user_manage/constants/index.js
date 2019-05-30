// import { post } from '../../../../util/axios';
// import * as API from '../../../constants/Api'
export var userGroupName = [],
    platformCode = [],  //平台列表，下拉框（没有全部）
    platformCode2 = [],   //平台列表，搜索
    userList = [],
    AllUserList = [];

// //获取平台列表
// post(API.PLATFORM_LIST_API).then(data => {
//     if (data.state === "000001") {
//         let newObj;
//         data.data.list.map((item, index) => {
//             platformCode.push(item.name);
//             newObj = {};
//             newObj.id = ++index;
//             newObj.name = item.name;
//             platformCode2.push(newObj);
//         })
//         platformCode2.unshift({id: 0, name: "全部"});
//     }
// })

// //获取用户组列表
// post(API.USER_GROUP_LIST_API).then(data => {
//     if (data.state === "000001") {
//         data.data.list.map((item, index) => {
//             userGroupName.push(item.name);
//         })
//     }
// })
// //获取用户列表 - 上级（用户列表中的用户）
// post(API.USER_LIST_API).then(data => {
//     if (data.state === "000001") {
//         data.data.list.map((item, index) => {
//             userList.push(item.name);
//         })
//     }
// })
// //用户管理 - 新增弹窗中用户数据获取
// post(API.ALL_USER_LIST_API).then(data => {
//     if (data.state === "000001") {
//         let newObj;
//         data.data.list.map((item, index) => {
//             newObj = {};
//             newObj.name = item.name;
//             newObj.userName = item.userName;
//             AllUserList.push(newObj);
//         })
//     }
// })

//用于弹窗下拉列表，不需要“全部”选项
export const businessCode = [
    {
        id: 0,
        name: "国内线"
    }, {
        id: 1,
        name: "海外线"
    }, {
        id: 2,
        name: "FBA线"
    }
]
//用于搜索
export const businessCode2 = [
    {
        id: -1,
        name: "全部"
    }, {
        id: 1,
        name: "国内线"
    }, {
        id: 2,
        name: "海外线"
    }, {
        id: 3,
        name: "FBA线"
    }
]

//用户组页面筛选条件
export const platform = [
    {
        id: -1,
        name: "全部"
    }, {
        id: 0,
        name: "EBAY"
    }, {
        id: 1,
        name: "WISH"
    }, {
        id: 2,
        name: "亚马逊"
    }, {
        id: 3,
        name: "速卖通"
    }
]

//用户列表页面 - 职位   
export const positionName = [
    {
        id: 0,
        name: "销售总监"
    }, {
        id: 1,
        name: "销售经理"
    }, {
        id: 2,
        name: "销售主管"
    }, {
        id: 3,
        name: "销售员"
    }, {
        id: 4,
        name: "开发总监"
    }, {
        id: 5,
        name: "开发经理"
    }, {
        id: 6,
        name: "开发专员"
    }, {
        id: 7,
        name: "产权专员"
    }, {
        id: 8,
        name: "物流专员"
    }
]



