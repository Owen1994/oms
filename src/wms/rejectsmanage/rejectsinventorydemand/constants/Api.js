const HEAD_URL = ''; // /mockjsdata/35

// 获取不良品库存列表
export const GET_REJECTS_LIST = `${HEAD_URL}/wmsservice/api/DefectiveProductList/defectiveProductList`;
// 新增或修改不良品处理备注
export const ADD_UPDATE_REJECT_MARK = `${HEAD_URL}/wmsservice/api/DefectiveProductList/addOrUpdateRejectMark`;
// 导出Excel
export const EXPORT_DATA = `${HEAD_URL}/wmsservice/api/DefectiveProductList/exportData`;
