// const MOCK_PATH = '/mockjsdata/33';
const MOCK_PATH = '';
// 待核查任务、待审批订单 数量
export const REVIEW_TASK_AND_ORDER_NUMBER_API = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/getCountTodo`;

// 待我核查任务、待审批订单 列表API
export const REVIEW_TASK_AND_ORDER_API = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/findTodoList`;

// 待核查任务、待审批订单 任务转移
export const REVIEW_TASK_AND_ORDER_TRANSFER_API = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/transferTodo`;

// 待核查任务、待审批订单 快速审批API
export const REVIEW_TASK_AND_ORDER_RAPID_APPROVAL_API = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/approvalTodo`;

// 获取人员
export const REVIEW_CHECK_USER_API = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/findCheckUserList`;
