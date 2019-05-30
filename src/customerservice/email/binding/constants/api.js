const preurl = '/customerServiceSystem/index/api/EmailBind/';
// 01 获取邮箱绑定列表
// export const GET_EMAIL_BINDING_LIST = `/mockjsdata/29${preurl}GetEmailBindingList/getEmailBindingList`;
export const GET_EMAIL_BINDING_LIST = `${preurl}GetEmailBindingList/getEmailBindingList`;

// 02 邮箱验证（密码是否错误，密码正确发送验证码）
// export const GET_VALIDATE_CODE = '/mockjsdata/29/customerServiceSystem/index/api/EmailBind/GetValidateCode/getValidateCode';
export const GET_VALIDATE_CODE = `${preurl}GetValidateCode/getValidateCode`;

// 03 绑定/修改邮箱
// export const BINDING_EMAIL = '/mockjsdata/29/customerServiceSystem/index/api/EmailBind/BindingEmail/bindingEmail';
export const BINDING_EMAIL = `${preurl}BindingEmail/bindingEmail`;

// 04 获取绑定记录列表
// export const GET_EMAIL_BINDING_LOG_LIST = '/mockjsdata/29/customerservice/onephase/api/GetEmailBindingLogList/getEmailBindingLogList';
export const GET_EMAIL_BINDING_LOG_LIST = `${preurl}GetEmailBindingLogList/getEmailBindingLogList`;

// 05 设置为主邮箱或辅邮箱
// export const SET_EMAIL_USE = '/mockjsdata/29/customerServiceSystem/index/api/EmailBind/SetEmailUse/setEmailUse';
export const SET_EMAIL_USE = `${preurl}SetEmailUse/setEmailUse`;

// 06 邮箱绑定审核
// export const SET_EMAIL_TO_EXAMINE = '/mockjsdata/29/customerServiceSystem/index/api/EmailBind/SetEmailToExamine/setEmailToExamine';
export const SET_EMAIL_TO_EXAMINE = `${preurl}SetEmailToExamine/setEmailToExamine`;
