// export const MOCK_PATH = `/mockjsdata/24`;
export const MOCK_PATH = ``;
export const GET_PUBLISH_TEMPLLIST = `${MOCK_PATH}/pls/ebay/motan/service/api/IEbayService/getPublishTemplList`; //获取刊登模板列表 API
export const DELETE_PUBLISH_TEMPL= `${MOCK_PATH}/pls/ebay/motan/service/api/IEbayService/deletePublishTempl`; //删除刊登模板列表 API
export const ADD_ORUPDATE_PUBLISH_TEMPL = `${MOCK_PATH}/pls/ebay/motan/service/api/IEbayService/addOrUpdatePublishTempl`;  // 新增/修改
export const GET_PUBLISH_TEMPL_DETAIL = `${MOCK_PATH}/pls/ebay/motan/service/api/IEbayService/getPublishTemplDetail`;  // 获取刊登模板详情

//  获取库存价格队列同步状态
export const STATUS_DEFAULT = [
    {
        id: -1,
        name: "全部"
    },
    {
        id: 1,
        name: "是"
    }, {
        id: 0,
        name: "否"
    }
]