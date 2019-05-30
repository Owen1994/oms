/**
 *作者: 唐峰
 *功能描述: 渠道列表页方法的action集合
 *参数说明:
 *时间: 2018/4/4 9:26
 */
import searchValuesactions from '../../../../components/searchValues/actions';
import { fetchPost } from '../../../../util/fetch';
import
{
    RECEIVE_SYS_ARR,
    SET_TEMP_DATA,
    UPDATE_SYS_RULE,
    ADD_SYS_RULE,
    DEL_SYS_RULE,
    SET_SYS_RULE,
    RESET_DATA,
} from '../constants';
import { parsePlanData } from '../selectors';

export const tablemodelInfo = 'tablemodelInfo';
export const userlistInfo = 'userlistInfo';
export const autscopInfo = 'autscopInfo';
export const PaginationmodelInfo = 'PaginationmodelInfo';

const receiveSysStateArr = (dispatch, data) => {
    dispatch({
        type: RECEIVE_SYS_ARR,
        data,
    });
};
const loadSysStateArr = () => (dispatch) => {
    fetchPost('/urc/motan/service/api/IUrcService/getMyAuthWay')
        .then((result) => {
            if (result.state == '000001') {
                receiveSysStateArr(dispatch, result.data);
            }
        });
};

const refreshSysStateRule = params => (dispatch) => {
    fetchPost('/urc/motan/service/api/IUrcService/getDataRuleTemplByTemplId', params, 2)
        .then((result) => {
            if (result.state === '000001') {
                dispatch({
                    type: SET_SYS_RULE,
                    data: parsePlanData(result.data.lstDataRuleSys),
                });
                const data = { ...result.data };
                delete data.lstDataRuleSys;
                dispatch({
                    type: SET_TEMP_DATA,
                    data,
                });
            }
        });
};

const setTempData = data => (dispatch) => {
    dispatch({
        type: SET_TEMP_DATA,
        data,
    });
};

const updateSysRulel = data => (dispatch) => {
    dispatch({
        type: UPDATE_SYS_RULE,
        data,
    });
};

const addSysRule = data => (dispatch) => {
    dispatch({
        type: ADD_SYS_RULE,
        data,
    });
};

const delSysRule = data => (dispatch) => {
    dispatch({
        type: DEL_SYS_RULE,
        data,
    });
};

const resetData = () => (dispatch) => {
    dispatch({ type: RESET_DATA });
};
const actions = {
    ...searchValuesactions,
    loadSysStateArr,
    setTempData,
    updateSysRulel,
    addSysRule,
    delSysRule,
    refreshSysStateRule,
    resetData,
};

export default actions;
