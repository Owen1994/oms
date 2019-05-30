const preurl = '/customerServiceSystem/index/api/Paypal/';
// const preurl = '/mockjsdata/29/customerServiceSystem/index/api/Paypal/';

// 获取列表
export const GET_PAYPALACCOUNT_LIST = `${preurl}getList`;

// 账号状态开启/关闭
export const ACCOUNT_TOGGLE = `${preurl}switchStatus`;

// 重新授权
export const ACCOUNT_REAUTHORIZATE = `${preurl}retryAuth`;

// 获取账号详情
export const GET_PAYPALACCOUNT_DETAIL = `${preurl}getPaypalDetail`;

// 新增/编辑账号
export const ADD_EDIT_ACCOUNT = `${preurl}addOrEditAccount`;

// 获取操作记录
export const OPERATION_LOGS = `${preurl}operateList`;
