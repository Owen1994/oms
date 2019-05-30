
// const prefix = '/mockjsdata/54'
const prefix = ''
// 列表
const list = prefix + '/pls/motan/service/api/IPlsFacadeService/getFollowMonitorSettingList';
// 修改
const view = prefix + '/pls/motan/service/api/IPlsFacadeService/getFollowView';
// 删除
const del = prefix + '/pls/motan/service/api/IPlsFacadeService/deleteFollowMonitorSetting'
// 站点
const site = prefix + '/pls/motan/service/api/IPlsFacadeService/getSite';
// 账号
const account = prefix + '/pls/motan/service/api/IPlsFacadeService/getAccount'
// 新增监控设置
const addSetting = prefix + '/pls/motan/service/api/IPlsFacadeService/addFollowMonitorSetting'
// 修改监控设置
const updateSetting = prefix + '/pls/motan/service/api/IPlsFacadeService/updateFollowMonitorSetting'
// 导入
const upload = prefix + "/pls/motan/service/api/IPlsFacadeService/importFile"

export default {
    list,
    view,
    site,
    del,
    account,
    addSetting,
    updateSetting,
    upload
}