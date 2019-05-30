// 店铺列表API  http://192.168.201.211:9090/mockjsdata/19/
export const GET_SHOPACCOUNTSETTINGLIST_API = `/arm/motan/service/api/IArmService/getShopAccountSettingList`; 

//店铺-批量设置启用状态     
export const SETSHOPACCOUNTENABLED_API = `/arm/motan/service/api/IArmService/setShopAccountEnabled`; 

//店铺-批量分析     
export const SUBMITSHOPACCOUNTANALYSIS_API = `/arm/motan/service/api/IArmService/submitShopAccountAnalysis`; 

// 金额阈值列表API
export const GET_THRESHOLDTABLELIST_API = `/arm/motan/service/api/IArmService/getSiteThresholdList`; 

// 金额-添加或编辑阈值API
export const UPDATESITETHRESHOLDDETAIL_API = `/arm/motan/service/api/IArmService/updateSiteThresholdDetail`; 

//金额-添加或编辑阈值判重
export const CHECKSITECODEDUP_API = `/arm/motan/service/api/IArmService/checkSiteCodeDup`; 

//金额-获取站点币种关系
export const GETSITECURRENCYLIST_API = `/arm/motan/service/api/IArmService/getSiteCurrencyList`;

// 盘点列表API
export const GET_INVENTORYTABLELIST_API = `/arm/motan/service/api/IArmService/getInventoryCodeList`; 

// 盘点列表--更新申请API
export const UPDATECANAPPLY_API = `/arm/motan/service/api/IArmService/updateCanApply`; 

//启用状态
export const STATUS_OPEN = [        
    {
        id: '',
        name: "全部"
    },
    {
        id: 1,
        name: "启用"
    }, {
        id: 0,
        name: "禁用"
    }
]