// const HOST = '/mockjsdata/53';
// const MOCK_HOST = '/mockjsdata/31';
const HOST = '';
const MOCK_HOST = '';
export const GET_BUSINESS_ROLE = `${HOST}/pdm/motan/service/api/IPdmFacadeService/getBusinessRole`; // 获取业务角色列表

export const DELETE_BUSINESS_ROLE = `${HOST}/pdm/motan/service/api/IPdmFacadeService/deleteBusinessRole`; // 批量删除&删除业务角色

export const ADD_BUSINESS_ROLE = `${HOST}/pdm/motan/service/api/IPdmFacadeService/addBusinessRole`; // 新增业务角色

export const STAFFINQUIRY = `${MOCK_HOST}/pmsservice/api/StaffInquiry/staffInquiry`; // 人员查询（用户中心）

export const IMPORTSKU = `${HOST}/pdm/motan/service/api/IPdmFacadeService/importSku`; // 导入
