const preurl = '/customerServiceSystem/index/api/AfterSale/';
// const preurl = '/mockjsdata/29/customerServiceSystem/index/api/AfterSale/';
// 获取退款原因分类列表
export const GET_REFUNDRESON_LIST = `${preurl}getRefundReasonList`;

// 一级分类新增/编辑
export const ADD_EDIT_LABEL = `${preurl}classAddOrEdit`;

// 子标签分类新增/编辑
export const ADD_EDIT_SUBLABEL = `${preurl}subTagClassAddOrEdit`;

// 删除标签分类
export const DELETA_LABEL = `${preurl}classDelete`;

// 获取退款原因表单字段列表
export const GET_REFUND_FORM = `${preurl}getFormFieldList`;

// 编辑/新增退款原因自定义表单
export const ADD_OR_EDIT_FIELD = `${preurl}addOrEditField`;

// 删除自定义表单字段
export const DELETE_FIELD = `${preurl}deleteField`;

// 获取添加字段的字段类型
export const GET_FIELDS_TYPE = `${preurl}getFieldsType`;
