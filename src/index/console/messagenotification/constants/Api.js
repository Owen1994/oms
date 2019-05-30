// const MOCK_PATH = '/mockjsdata/33';
const MOCK_PATH = '';

// 我发送的消息列表-导出API
export const My_Send_Msg_Export_API = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/exportSendMessage`;

// 我接受的消息列表-导出API
export const My_Receive_Msg_Export_API = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/exportReceiveMessage`;

// 我接受的消息-审批处理
export const My_Recive_Msg_Dispose_API = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/approvalMessage`;

// 创建消息
export const Create_Msg_API = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/createMessage`;

// 我发送的消息-信息详情
export const My_Send_Msg_Info_API = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/getSendMessageById`;

// 我接受的消息-信息详情
export const My_Recive_Msg_Info_API = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/getReceiveMessageById`;

// 我发送的消息列表
export const MY_SEND_MESSAGE_LIST = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/findSendMessageList`;

// 我接受的消息列表
export const MY_RECEIVE_MESSAGE_LIST = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/findReceiveMessageList`;

// 人员查询--老接口
export const User_Name_API = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/fuzzSearchPersonByName`;

// 人员查询--新接口
export const New_User_Name_API = `${MOCK_PATH}/eco/motan/service/api/IEcoFacadeService/searchUserPerson`;
