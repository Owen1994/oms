import { fetchPost } from '../../../../util/fetch';
import {
    RECEIVE_EXECUTIONACTION,
    RECEIVE_FINISHCONDITION,
    RECEIVE_CONDITION,
    LOADING_STATE,
    CHECK_CONDTION,
    DEL_CONDTION,
    FORM_DATA,
    ADD_FINISH_CONDITION_RIGHT,
    EXECUTION_ACTION_ADD,
    EXECUTION_ACTION_DEL,
    EXECUTION_SETVALUE,
} from '../constants/ActionTypes';
import {
    EDITORIAL_RULES_DETAILS,
} from '../constants';

// 编辑规则
const receiveRulesList = (dispatch, data, type) => {
    dispatch({
        type,
        data,
    });
};

export const getRulesList = params => (dispatch) => {
    dispatch({
        type: LOADING_STATE,
        state: true,
    });
    fetchPost(EDITORIAL_RULES_DETAILS, params)
        .then((result) => {
            dispatch({
                type: LOADING_STATE,
                state: false,
            });
            if (result.state === '000001') {
                const {
                    executionAction,
                    finishCondition,
                    lastModifiedPerson,
                    lastModifiedTime,
                    condition,
                    ruleName,
                } = result.data;
                receiveRulesList(dispatch, executionAction, RECEIVE_EXECUTIONACTION);
                receiveRulesList(dispatch, finishCondition, RECEIVE_FINISHCONDITION);
                receiveRulesList(dispatch, condition, RECEIVE_CONDITION);
                receiveRulesList(dispatch, { lastModifiedPerson, lastModifiedTime, ruleName }, FORM_DATA);
            }
        });
};

// 选择条件
export const checkCondtion = params => (dispatch) => {
    dispatch({
        type: CHECK_CONDTION,
        data: params,
    });
};

// 删除条件
export const delCondtion = params => (dispatch) => {
    dispatch({
        type: DEL_CONDTION,
        data: params,
    });
};

// 已选择条件(增加)
export const addFinishConditionRight = params => (dispatch) => {
    dispatch({
        type: ADD_FINISH_CONDITION_RIGHT,
        data: params,
    });
};

// 执行动作(增加)
export const executionActionAdd = params => (dispatch) => {
    dispatch({
        type: EXECUTION_ACTION_ADD,
        data: params,
    });
};

// 执行动作(增加)
export const executionActionDel = params => (dispatch) => {
    dispatch({
        type: EXECUTION_ACTION_DEL,
        data: params,
    });
};

// 设置键值对
export const executionActionSetValue = params => (dispatch) => {
    dispatch({
        type: EXECUTION_SETVALUE,
        data: params,
    });
};
