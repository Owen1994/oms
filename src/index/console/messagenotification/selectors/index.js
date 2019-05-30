import { createSelector } from 'reselect';
import { timestampFromat } from '../../../../util/baseTool';
import { MESSAGE_TYPE, Process_State_TYPE, Process_Result_TYPE } from '../constants/Search';

const getTables = state => state;

/**
 * 图库设置列表数据转换
 */
export const receiveTables = createSelector(
    [getTables],
    (data) => {
        data.list.forEach((t) => {
            t.handleTime = t.handleTime ? timestampFromat(t.handleTime, 2) : '--';
            t.sendTime = t.sendTime ? timestampFromat(t.sendTime, 2) : '--';
            t.messageTypeString = MESSAGE_TYPE[t.messageType] || '--';
            t.processStateString = Process_State_TYPE[t.processState] || '--';
            t.processResultString = Process_Result_TYPE[t.processResult] || '--';
        });
        return data;
    },
);

export const sendTables = createSelector(
    [getTables],
    (data) => {
        data.list.forEach((t) => {
            t.handleTime = t.handleTime ? timestampFromat(t.handleTime, 2) : '--';
            t.sendTime = t.sendTime ? timestampFromat(t.sendTime, 2) : '--';
            t.messageTypeString = MESSAGE_TYPE[t.messageType] || '--';
            t.processStateString = Process_State_TYPE[t.processState] || '--';
            t.processResultString = Process_Result_TYPE[t.processResult] || '--';
        });
        return data;
    },
);
