/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
export const TOP_ACTION = 'lgt-dlc-order_';
export const CHECK_LIST_API = `/customs/api/list/Detail/detail`; // 核对清单

export const CHECK_LIST = `${TOP_ACTION}check_list`;
export const RECEIVE_CHECK_LIST = `${TOP_ACTION}receive_check_list`;
export const RECEIVE_CHECK_LIST_FAILED = `${TOP_ACTION}receive_check_list_failed`; // 获取核算清单列表失败

export const CUSTOMS_DOCUMENT = `/customs/api/form/Detail/detail`; // 获取报关单详情
export const EDIT_DOCUMENT_COLUMN = `${TOP_ACTION}edit_document_column`; // 修改报关文件字段
export const RECEIVE_CUSTOMS_DOCUMENT = `${TOP_ACTION}receive_customs_document`; // 接收报关单详情数据
export const RECEIVE_CUSTOMS_DOCUMENT_FAILED = `${TOP_ACTION}receive_customs_document_failed`; // 接收报关单详情数据失败


export const EDIT_DOCUMENT_COLUMNS = `/customs/api/document/columns/Edit/edit`; // 修改公司、海关和合同资料字段
export const RECEIVE_EDIT_DOCUMENT_COLUMNS = `${TOP_ACTION}receive_edit_document_columns`; // 接收修改公司、海关和合同资料字段
export const RECEIVE_EDIT_DOCUMENT_COLUMNS_FAILED = `${TOP_ACTION}receive_edit_document_columns_failed`; // 修改公司、海关和合同资料字段失败

export const GET_SELECT_LIST = `${TOP_ACTION}selectList`;// 获取下拉列表项

export const GET_LEVY_SELECT_LIST = `/customs/api/list/Levy/levy`; // 征免列表
export const GET_PACKAGE_SELECT_LIST = `/customs/api/list/PackingType/packingtype`; // 包装类型列表
export const GET_EXPORT_SELECT_LIST = `/customs/api/list/ExportPorts/exportports`; // 出口口岸列表
export const GET_TSP_SELECT_LIST = `/customs/api/list/TspMethod/tspmethod`; // 运输方式
export const GET_RGP_SELECT_LIST = `/customs/api/list/RgApproach/rgapproach`; // 监管方式列表
export const GET_EXE_SELECT_LIST = `/customs/api/list/ExeNature/exenature`; // 征免性质列表
export const GET_FPORT_SELECT_LIST = `/customs/api/list/FingerPorts/fingerports`; // 指运港列表


export const EDIT_ORDER_LIST = `/customs/api/list/item/EditOrder/editorder`; // 核对清单排序调整
export const RECEIVE_EDIT_ORDER_LIST = `${TOP_ACTION}receive_edit_order_list`; // 接收核对清单排序调整
export const RECEIVE_EDIT_ORDER_LIST_FAILED = `${TOP_ACTION}receive_edit_order_list_failed`; // 修改核对清单排序调整失败

export const ORDER_LIST_OPERATION = `/customs/api/Operation/operation`; // 合并、删除和同步sku
export const RECEIVE_ORDER_LIST_OPERATION = `${TOP_ACTION}receive_order_list_operation`; // 接收合并、删除和同步sku
export const RECEIVE_ORDER_LIST_OPERATION_FAILED = `${TOP_ACTION}receive_order_list_operation_failed`; // 修改合并、删除和同步sku失败


export const ORDER_LIST_COLUMN_EDIT = `/customs/api/list/item/Edit/edit`; // 修改核对清单条目字段
export const RECEIVE_ORDER_LIST_COLUMN_EDIT = `${TOP_ACTION}receive_order_list_column_edit`; // 接收修改核对清单条目字段
export const RECEIVE_ORDER_LIST_COLUMN_EDIT_FAILED = `${TOP_ACTION}receive_order_list_column_edit_failed`; // 修改修改核对清单条目字段失败


export const ORDER_LIST_EXPORT_COLUMN = `/customs/api/export/Columns/columns`; // 选择导出字段
export const RECEIVE_LIST_EXPORT_COLUMN = `${TOP_ACTION}receive_list_export_column`; // 接收选择导出字段
export const RECEIVE_LIST_EXPORT_COLUMN_FAILED = `${TOP_ACTION}receive_list_export_column_failed`; // 修改选择导出字段失败


export const CONTROL_MODAL = 'Control_Modal'; // 用于控制弹窗
