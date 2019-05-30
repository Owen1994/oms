/**
 * 作者: pzt
 * 描述: listing 详情页 API
 * 时间: 2018/7/27 20:57
 **/
// const prefix = '/mockjsdata/54'
const prefix = ''

// 详情
const detail = prefix + '/pls/motan/service/api/IPlsFacadeService/getListingDetail';
// 保存并刊登
const publish = prefix + '/pls/motan/service/api/IPlsFacadeService/updateListingInfo'
export default {
    detail,
    publish
}