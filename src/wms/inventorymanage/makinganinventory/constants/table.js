import { PLAN_FIRST_INVENTORYRESULT, PLAN_SECOND_INVENTORYRESULT } from './Api';

export const TAB_TITLES = [
    // '盘点审核',
    '盘点计划',
];
export const UPLOAD_INFO_LIST = [
    {
        downLoadUrl: PLAN_FIRST_INVENTORYRESULT, // 上传初盘结果
        submitUrl: PLAN_FIRST_INVENTORYRESULT,
        title: '上传初盘结果',
    },
    {
        downLoadUrl: PLAN_SECOND_INVENTORYRESULT, // 上传复盘单
        submitUrl: PLAN_SECOND_INVENTORYRESULT,
        title: '上传复盘单',
    },
];
