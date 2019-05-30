
// const prefix = '/mockjsdata/54';
const prefix = '';
// 列表
const list = prefix + '/pls/motan/service/api/IPlsFacadeService/getFollowMonitorList';
// 查看
const view = prefix + '/pls/motan/service/api/IPlsFacadeService/getFollowView';
// 站点
const site = prefix + '/pls/motan/service/api/IPlsFacadeService/getSite';
// 账号
const account = prefix + '/pls/motan/service/api/IPlsFacadeService/getAccount';
// 日志
const log = prefix + '/pls/motan/service/api/IPlsFacadeService/getFollowLog';
// 修改
const amend = prefix + '/pls/motan/service/api/IPlsFacadeService/updateListingToQueue';

export default {
    list,
    view,
    site,
    account,
    log,
    amend
}