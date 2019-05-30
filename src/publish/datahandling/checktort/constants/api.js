
// const prefix = '/mockjsdata/54'
const prefix = ''
// 列表
const list = prefix + '/pls/motan/service/api/IPlsFacadeService/getPlsAmazonViolateListingList';
// 查看
const view = prefix + '/pls/motan/service/api/IPlsFacadeService/getPlsAmazonViolateListingDetail';
// 删除
const del = prefix + '/pls/motan/service/api/IPlsFacadeService/deletePlsAmazonViolateListing'
// listing侵权特批销售检验
const check = prefix + '/pls/motan/service/api/IPlsFacadeService/checkPlsAmazonViolateApproveSale'
// 平台
const platform = prefix + '/pls/motan/service/api/IPlsFacadeService/getPlatform'
// 站点
const site = prefix + '/pls/motan/service/api/IPlsFacadeService/getSite';
// 账号
const account = prefix + '/pls/motan/service/api/IPlsFacadeService/getAccount'

export default {
    platform,
    list,
    view,
    site,
    del,
    account,
    check
}