// const api = '/mockjsdata/23'
const api = ''
// 获取平台认证库列表
export const GET_AUTHENTICATION_LIST = api + '/irp/api/GetPlatformAuthenticationPoolList/getPlatformAuthenticationPoolList';
// 获取平台认证库详情
export const GET_AUTHENTICATION_DETAIL = api + '/irp/api/GetPlatformAuthenticationPoolDetail/getPlatformAuthenticationPoolDetail'
// 获取平台认证库详情2
export const GET_AUTHENTICATION_DETAIL2 = api + '/irp/api/GetPlatformAuthenticationPoolDetail2/getPlatformAuthenticationPoolDetail'
// 新增编辑平台认证库
export const AUTHENTICATION_EDIT = api + '/irp/api/PlatformAuthenticationAddPoolOrEdit/platformAuthenticationAddPoolOrEdit'
// 删除平台认证库
export const AUTHENTICATION_DELETE = api + '/irp/api/platformAuthenticationPoolDelete/platformAuthenticationPoolDelete'

// 获取基础资料审核详情
export const GET_BASEINFO_REVIEW_DETAIL = api + '/irp/api/getBaseInfoReviewDetail/Detail/detail'

// 审核操作
export const BASEINFOREVIEW = api + '/irp/api/baseInfoReview/Review/review'

// 获取敏感信息
export const SENSITIVE = api + '/irp/api/GetSensitiveDisableInfoTable/getSensitiveDisableInfoTable'
