const preurl = '/customerServiceSystem/index/api/Email/';

// 获取列表
// export const GET_MAIL_LIST = '/mockjsdata/29/customerServiceSystem/index/api/Email/GetEmailList/getEmailList';
export const GET_MAIL_LIST = `${preurl}GetEmailList/getEmailList`;

// 获取标签分类列表
// export const GET_TAG_LIST = '/mockjsdata/29/customerServiceSystem/index/api/GetTagClassList2/getTagClassList2'
export const GET_TAG_LIST = `${preurl}GetTagClassList2/getTagClassList2`;

// 邮件处理/批量处理
// export const MAIL_OPTION = '/mockjsdata/29/customerServiceSystem/index/api/EmailHandleOrBatch/emailHandleOrBatch'
export const MAIL_OPTION = `${preurl}EmailHandleOrBatch/emailHandleOrBatch`;

// 邮件移动/批量移动
// export const MAIL_MOVE = '/mockjsdata/29/customerServiceSystem/index/api/EmailMoveOrBatch/emailMoveOrBatch'
export const MAIL_MOVE = `${preurl}EmailMoveOrBatch/emailMoveOrBatch`;

// 邮件详情
// export const MAIL_DETAIL = '/mockjsdata/29/customerServiceSystem/index/api/GetEmailDetail/getEmailDetail'
export const MAIL_DETAIL = `${preurl}GetEmailDetail/getEmailDetail`;

// 同步邮件
// export const SYNC_EMAIL = '/mockjsdata/29${preurl}syncEmaily';
export const SYNC_EMAIL = `${preurl}syncEmail`;

//  判断是否开放标题模糊搜索 /customerServiceSystem/index/api/Email/isOpenFuzzySearchTitle

export const OPEN_RIRLE = `${preurl}isOpenFuzzySearchTitle`;
