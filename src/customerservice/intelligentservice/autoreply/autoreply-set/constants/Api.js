// const HEAD_URL = '/mockjsdata/50';
const HEAD_URL = '';

// 列表
export const GET_LIST_API = `${HEAD_URL}/customerServiceSystem/index/api/AutoReply/getRuleList`;
// 详情
export const GET_DETAIL_API = `${HEAD_URL}/customerServiceSystem/index/api/AutoReply/ruleDetail`;
// 根据板块获取平台
export const GET_PLATFORM_API = `${HEAD_URL}/customerServiceSystem/index/api/Pub/plateGetPlatformList`;
// 根据平台获取板块
export const GET_AUTOREPLAY_API = `${HEAD_URL}/customerServiceSystem/index/api/Pub/platformGetPlateList`;
// 发送方式
export const GET_SENDINFMODE_API = `${HEAD_URL}/customerServiceSystem/index/api/Pub/sendTypeList`;
// 卖家账号
export const GET_SELLERACCOUNT_API = `${HEAD_URL}/customerServiceSystem/index/api/Pub/autoReplySellerAccount`;
// 根据平台板块获取可选条件配置信息
export const GET_SEARCH_API = `${HEAD_URL}/customerServiceSystem/index/api/AutoReplyRule/autoReplySearch`;
// 删除
export const GET_DEL_RULE_API = `${HEAD_URL}/customerServiceSystem/index/api/AutoReply/ruleDelete`;
// 规则状态开启/停用
export const GET_TOGGLE_RULE_API = `${HEAD_URL}/customerServiceSystem/index/api/AutoReply/ruleSetState`;
// 新增 或 编辑
export const GET_ADD_RULE_API = `${HEAD_URL}/customerServiceSystem/index/api/AutoReply/ruleAddOrUpdate`;
//  获取动态变量列表
export const GET_VARIAYE_LIST_API = `${HEAD_URL}/customerServiceSystem/index/api/DynamicVar/getDynamicVarList`;
// 平台字数限制
export const GET_FONT_LIMIT_API = `${HEAD_URL}/customerServiceSystem/index/api/Pub/getPlatformFontLimit`;
