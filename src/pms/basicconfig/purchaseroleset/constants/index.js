// export const MOCK_PATH = '/mockjsdata/31';
export const MOCK_PATH = '';

export const LOADING_RECORD_LIST = 'loading_record_list';

export const RECEIVE_PROCUREMENT_LIST = 'receive_procurement_list';

export const RECEIVE_SUPPLIER_LIST = 'receive_supplier_list';

// 采购角色配置列表查询
export const PROCUREMENT_ROLE_CONFIGUR_ATION_LIST = `${MOCK_PATH}/pmsservice/api/ProcurementRoleConfigurationList/procurementRoleConfigurationList`;

//  删除、批量删除
export const PROCUREMENT_ROLE_CONFIGUR_ATION_DELETE = `${MOCK_PATH}/pmsservice/api/ProcurementRoleConfigurationDelete/procurementRoleConfigurationDelete`;

// 导入
export const PROCUREMENT_ROLE_CONFIGUR_ATION_IMPORT = `${MOCK_PATH}/pmsservice/api/ProcurementRoleConfigurationImport/procurementRoleConfigurationImport`;

// 批量导出
export const PROCUREMENT_ROLE_CONFIGUR_ATION_EXPORT = `${MOCK_PATH}/pmsservice/api/ProcurementRoleConfigurationExport/procurementRoleConfigurationExport`;

// 新增采购角色配置
export const PROCUREMENT_ROLE_CONFIGUR_ATION_NEWADD = `${MOCK_PATH}/pmsservice/api/ProcurementRoleConfigurationNewAdd/procurementRoleConfigurationNewAdd`;

// 确定数据导入
export const PROCUREMENT_ROLE_SUREDATA_IMPORT = `${MOCK_PATH}/pmsservice/api/ProcurementRoleSureDataImport/procurementRoleSureDataImport`;

// 供应商跟单员配置
export const PROCUREMENT_ROLE_CONFIGUR_ATION_SUPPLIER = `${MOCK_PATH}/pmsservice/api/ProcurementRoleConfigurationSupplier/procurementRoleConfigurationSupplier`;

// 供应商跟单员配置列表查询
export const PROCUREMENT_ROLE_SUPPLIER_LIST = `${MOCK_PATH}/pmsservice/api/ProcurementRoleSupplierList/procurementRoleSupplierList`;


// 供应商跟单员配置导出
export const PROCUREMENT_ROLE_SUPPLIER_EXPORT = `${MOCK_PATH}/pmsservice/api/ProcurementRoleSupplierExport/procurementRoleSupplierExport`;

// 人员名称
export const STAFFINQUIRY = `${MOCK_PATH}/pmsservice/api/StaffInquiry/staffInquiry`;

// 业务线
export const PUBLIC_INFORMATION_BUSINESSLINE = `${MOCK_PATH}/pmsservice/api/PublicInformationBusinessLine/publicInformationBusinessLine`;

// 根据SKU自动带出采购名称
export const PROCUREMENT_ROLE_SKU = `${MOCK_PATH}/pmsservice/api/ProcurementRoleSku/procurementRoleSku`;

// 采购角色配置-导出
export const PROCUREMENT_ROLE_CONFIGURATION_EXPORT = `${MOCK_PATH}/pmsservice/api/ProcurementRoleConfigurationExport/procurementRoleConfigurationExport`
// 角色类型
const ROLETYPE = [
    { code: 0, name: '全部' },
    { code: 2, name: '采购订货' },
    { code: 4, name: '采购核价' },
    { code: 3, name: '采购主管' },
];

// 采购角色配置搜索类型
const PROCUREMENT_SEARCHTYPE = [
    { code: 0, name: '供应商' },
    { code: 1, name: '跟单员账号' },
    { code: 2, name: '跟单员' },
];

// 供应商跟单员搜索类型
const SUPPLIER_SEARCHTYPE = [
    { code: 0, name: '采购员ID' },
    { code: 1, name: '人员名称' },
    { code: 2, name: 'SKU' },
];

// 业务线
const PUBLIC_INFORMATION_BUSINESS_LINE = [
    { key: 1, label: '国内仓' },
    { key: 2, label: '亚马逊' },
    { key: 3, label: '海外仓' },
];

// 采购角色配置角色类型
const ROLE_TYPE = [
    { key: 1, label: '采购开发' },
    { key: 2, label: '采购订货' },
    { key: 3, label: '采购主管' },
    { key: 4, label: '采购核价' },
];

export {
    ROLETYPE,
    PROCUREMENT_SEARCHTYPE,
    SUPPLIER_SEARCHTYPE,
    PUBLIC_INFORMATION_BUSINESS_LINE,
    ROLE_TYPE,
};
