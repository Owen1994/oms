// export const MOCK_PATH = '/mockjsdata/3';
export const MOCK_PATH = '';

// PR列表查询
export const GET_IMPORT_EXPORT_LIST = `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/getImportExportList`;


export const RECEIVE_IMPORT_LIST = 'receive_import_list';

export const LOADING_RECORD_LIST = 'loading_record_list';


// 处理状态
const TASKSTATUS = [
    { code:-1, name: '全部' },
    { code: 0, name: '待处理' },
    { code: 1, name: '处理中' },
    { code: 2, name: '成功' },
    { code: 3, name: '失败' },
];

// 类型
const TASKTYPE = [
    { code: -1, name: '全部' },
    { code: 0, name: '导入' },
    { code: 1, name: '导出' },
];


export {
    TASKSTATUS,
    TASKTYPE
};
