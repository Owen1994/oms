import { message } from 'antd';
import {
    RECEIVE_EXECUTIONACTION,
    EXECUTION_ACTION_ADD,
    EXECUTION_ACTION_DEL,
    EXECUTION_SETVALUE,
} from '../constants/ActionTypes';

const executionData = (state = [
    {
        key: Date.now(),
        approvalStage: '',
        approver: [{ key: '', label: '' }],
    },
], action) => {
    switch (action.type) {
    case RECEIVE_EXECUTIONACTION:
        return action.data;
    case EXECUTION_ACTION_ADD: {
        if (state.length < 3) {
            state.push(action.data.value);
        } else {
            message.warning('最多添加三项');
        }
        return [...state];
    }
    case EXECUTION_ACTION_DEL:
        state.splice(action.data.index, 1);
        return [...state];
    case EXECUTION_SETVALUE: {
        // { index, key, value }
        const { index, key, value } = action.data;
        state[index][key] = value;
        return [...state];
    }
    default:
        return state;
    }
};


export default executionData;
