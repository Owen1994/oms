
// const prefix = '/mockjsdata/54'
const prefix = ''
// 列表
const list = prefix + '/pls/motan/service/api/IPlsFacadeService/getListingList';
// 修改
const amend = prefix + '/pls/motan/service/api/IPlsFacadeService/updateListingToQueue';
// 删除
// const del = prefix + '/pls/motan/service/api/IPlsFacadeService/updateListingToQueue'
// 导入
const upload = prefix + '/pls/motan/service/api/IPlsFacadeService/importFile'
// 站点
const site = prefix + '/pls/motan/service/api/IPlsFacadeService/getSite';
// 账号
const account = prefix + '/pls/motan/service/api/IPlsFacadeService/getAccount';
// 账号分组
const accountgroup = prefix + '/pls/motan/service/api/IPlsFacadeService/getAccountGroup'

export default {
    list,
    amend,
    // del,
    upload,
    site,
    account,
    accountgroup
}