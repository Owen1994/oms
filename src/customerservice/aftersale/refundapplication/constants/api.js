const preurl = '/customerServiceSystem/index/api/RefundApplication/';
// const preurl = '/mockjsdata/29/customerServiceSystem/index/api/RefundApplication/';

// 获取退款原因分类列表
export const GET_REFUND_LIST = `${preurl}getRefundList`;

// 同意/批量同意退款
export const AGREEN_REFUND = `${preurl}agreenRefund`;

// 拒绝/批量拒绝退款
export const REFUSE_REFUND = `${preurl}refuseRefund`;

// 下载批量补充信息模板
export const DOWNLOAD_IMPORT_TEMPLAGGE = `${preurl}downloadTemplate`;

// 重试退款
export const RETRY_REFUND = `${preurl}retryRefund`;
