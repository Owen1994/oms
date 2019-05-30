const preurl = '/customerServiceSystem/index/api/Tag/';
// 获取列表
// export const GET_LABEL_LIST = '/mockjsdata/29/customerServiceSystem/index/api/Tag/GetTagClassList/getTagClassList'
export const GET_LABEL_LIST = `${preurl}GetTagClassList/getTagClassList`;

// 标签分类开启/关闭
// export const TAG_TOGGLE = '/mockjsdata/29/customerServiceSystem/index/api/Tag/TagClassUpOrDown/tagClassUpOrDown'
export const TAG_TOGGLE = `${preurl}TagClassUpOrDown/tagClassUpOrDown`;

// 获取平台列表
export const GET_PLATFORM_LIST = '/customerServiceSystem/index/api/Pub/GetPlatformList/getPlatformList';

// 一级分类新增/编辑
// export const ADD_EDIT_LABEL = '/mockjsdata/29/customerServiceSystem/index/api/Tag/TagClassAddOrEdit/tagClassAddOrEdit'
export const ADD_EDIT_LABEL = `${preurl}TagClassAddOrEdit/tagClassAddOrEdit`;

// 子标签分类新增/编辑
// export const ADD_EDIT_SUBLABEL = '/mockjsdata/29/customerServiceSystem/index/api/Tag/SubTagClassAddOrEdit/subTagClassAddOrEdit'
export const ADD_EDIT_SUBLABEL = `${preurl}SubTagClassAddOrEdit/subTagClassAddOrEdit`;

// 获取子标签应用规则
// export const GET_SUBLABEL_RULE = '/mockjsdata/29/customerServiceSystem/index/api/Tag/GetSubTagClassRuleList/getSubTagClassRuleList'
export const GET_SUBLABEL_RULE = `${preurl}GetSubTagClassRuleList/getSubTagClassRuleList`;

// 提交子标签应用规则
// export const POST_SUBLABEL_RULE = '/mockjsdata/29/customerServiceSystem/index/api/Tag/SubmitSubTagClassRule/submitSubTagClassRule'
export const POST_SUBLABEL_RULE = `${preurl}SubmitSubTagClassRule/submitSubTagClassRule`;

// 删除标签分类
// export const DELETA_LABEL = '/mockjsdata/29/customerServiceSystem/index/api/Tag/TagClassDelete/tagClassDelete'
export const DELETA_LABEL = `${preurl}TagClassDelete/tagClassDelete`;
