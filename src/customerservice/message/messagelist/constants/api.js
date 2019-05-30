const messagePreurl = '/customerServiceSystem/index/api/MessageList/';
// 01 获取站内信列表
export const GET_MESSAGE_LIST = `${messagePreurl}getMessageList`;

// 02 获取买家邮件列表
export const GET_BUYER_EMAIL_LIST = `${messagePreurl}getBuyerEmailList`;
// export const GET_BUYER_EMAIL_LIST = `/mockjsdata/29/customerServiceSystem/index/api/MessageList/GetBuyerEmailList/getBuyerEmailList`;

// 03 同步站内信
export const SYNC_MESSAGE = `${messagePreurl}syncMessage`;
