const messagePreurl = '/customerServiceSystem/index/api/TemplateMessage/';
const languagePreurl = '/customerServiceSystem/index/api/TemplateLanguage/';
// 01 获取消息模板列表
// export const GET_MESSAGE_TEMP_LIST = '/mockjsdata/29/customerServiceSystem/index/api/TemplateMessage/GetMessageTempList/getMessageTempList';
export const GET_MESSAGE_TEMP_LIST = `${messagePreurl}GetMessageTempList/getMessageTempList`;

// 02 根据平台ID获取模板分类列表
// export const GET_TEMPLATE_CLASS_LIST2 = '/mockjsdata/29/customerServiceSystem/index/api/TemplateClass/GetTemplateClassList2/getTemplateClassList';
export const GET_TEMPLATE_CLASS_LIST2 = `${messagePreurl}GetTemplateClassList2/getTemplateClassList`;

// 03 获取语种列表
// export const GET_LANGUAGES_LIST = '/mockjsdata/29/customerServiceSystem/index/api/TemplateLanguage/GetLanguagesList/getLanguagesList';
export const GET_LANGUAGES_LIST = `${languagePreurl}GetLanguagesList/getLanguagesList`;

// 04 语种新增/编辑
// export const LANGUAGES_ADD_OR_EDIT = '/mockjsdata/29/customerServiceSystem/index/api/TemplateClass/LanguagesAddOrEdit/languagesAddOrEdit';
export const LANGUAGES_ADD_OR_EDIT = `${languagePreurl}LanguagesAddOrEdit/languagesAddOrEdit`;

// 05 获取消息模板详情
// export const GET_MESSAGE_TEMPDETAIL = '/mockjsdata/29/customerServiceSystem/index/api/TemplateMessage/GetMessageTempDetail/getMessageTempDetail';
export const GET_MESSAGE_TEMPDETAIL = `${messagePreurl}GetMessageTempDetail/getMessageTempDetail`;

// 06 消息模板新增/编辑
// export const MESSAGE_TEMP_ADD_OR_EDIT = '/mockjsdata/29/customerServiceSystem/index/api/TemplateClass/MessageTempAddOrEdit/messageTempAddOrEdit';
export const MESSAGE_TEMP_ADD_OR_EDIT = `${messagePreurl}/MessageTempAddOrEdit/messageTempAddOrEdit`;

// 07 消息模板删除
// export const MESSAGE_TEMP_DELETE = '/mockjsdata/29/customerServiceSystem/index/api/TemplateClass/MessageTempDelete/messageTempDelete';
export const MESSAGE_TEMP_DELETE = `${messagePreurl}MessageTempDelete/messageTempDelete`;

// 08 消息模板审核
// export const MESSAGE_TEMP_TO_EXAM_EINE = '/mockjsdata/29/customerServiceSystem/index/api/TemplateClass/MessageTempToExamine/messageTempToExamine';
export const MESSAGE_TEMP_TO_EXAM_EINE = `${messagePreurl}MessageTempToExamine/messageTempToExamine`;

// 09 消息模板设置失效
// export const MESSAGE_TEMP_SET_INVALID = '/mockjsdata/29/customerServiceSystem/index/api/TemplateClass/MessageTempSetInvalid/messageTempSetInvalid';
export const MESSAGE_TEMP_SET_INVALID = `${messagePreurl}MessageTempSetInvalid/messageTempSetInvalid`;

// 10 设置共有/私有
// export const MESSAGE_TEMP_SET_PUBLIC_OR_PRAIVATE = '/mockjsdata/29/customerServiceSystem/index/api/TemplateClass/MessageTempSetPublicOrPrivate/messageTempSetPublicOrPrivate';
export const MESSAGE_TEMP_SET_PUBLIC_OR_PRAIVATE = `${messagePreurl}MessageTempSetPublicOrPrivate/messageTempSetPublicOrPrivate`;

// 11 语种删除
// export const LANGUAGES_DELETE = '/mockjsdata/29/customerServiceSystem/index/api/TemplateClass/LanguageDelete/languageDelete';
export const LANGUAGES_DELETE = `${languagePreurl}LanguageDelete/languageDelete`;

// 12 获取动态变量列表
export const GET_VARIAYE_LIST_API = '/customerServiceSystem/index/api/DynamicVar/getDynamicVarList';
