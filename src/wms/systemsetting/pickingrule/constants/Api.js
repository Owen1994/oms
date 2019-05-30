const MOCK_PATH = '';
// 获取优先级任务拣货规则列表
export const PART_LIST = `${MOCK_PATH}/wmsservice/api/PickRule/pickRuleList`;
// 新增优先级
export const ADD_PRIORITY = `${MOCK_PATH}/wmsservice/api/PickRule/addPickRule`;
// 切换拣货规则状态
export const SWITCH_RULE = `${MOCK_PATH}/wmsservice/api/PickRule/switchPickingRuleState`;
// 切换拣货规则优先级
export const SWITCH_PRIORITY = `${MOCK_PATH}/wmsservice/api/PickRule/switchPickingRulePriority`;

// 获取平台优先级设置列表
export const GET_PLATFORM_LIST = `${MOCK_PATH}/wmsservice/api/PickRule/platformPickRuleList`;
// 新增平台优先级
export const SET_PLATFORM_PRIORITY = `${MOCK_PATH}/wmsservice/api/PickRule/addPlatformPickRuleDetail`;
// 删除渠道优先级
export const DELETE_PLATFORM_PRIORITY = `${MOCK_PATH}/wmsservice/api/PickRule/deletePickRuleDetail`;

// 获取渠道优先级设置列表
export const GET_CHANNEL_LIST = `${MOCK_PATH}/wmsservice/api/PickRule/channelPickRuleList`;
// 新增渠道优先级
export const SET_CHANNEL_PRIORITY = `${MOCK_PATH}/wmsservice/api/PickRule/addChannelPickRuleDetail`;
// 删除渠道优先级
export const DELETE_CHANNEL_PRIORITY = `${MOCK_PATH}/wmsservice/api/PickRule/deletePickRuleDetail`;
