/**
 *作者: 唐峰
 *功能描述: 渠道列表页方法的action集合
 *参数说明:
 *时间: 2018/4/4 9:26
 */
import * as config from '../../../../util/connectConfig';
import axios from '../../../../util/axios';
import searchValuesactions from '../../../../components/searchValues/actions';
import { fetchPost } from '../../../../util/fetch';
import
{
    RECEIVE_SYS_ARR,
    RECEIVE_SYS_RULE,
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

/**
 *作者: 唐峰
 *功能描述: user列表action
 *参数说明:
 *时间: 2018/4/4 9:42
 */
const userlistaction = value => ({
    type: userlistInfo,
    payload: value,
});

const fetchPosts2 = ({ key, value }) => (dispatch, getState) => {
    dispatch(tablemodelaction({ loading: true }));
    return axios.post('/mockjsdata/7/urc/motan/service/api/IUrcService/getDataRuleTempl', value)
        .then((response) => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const total = response.data.data.total;
                    const current = value.pageNumber || 1;
                    const pageSize = value.pageData || 20;
                    dispatch(Paginationmodelaction({
                        current,
                        total,
                        pageSize,
                    }));
                    dispatch(tablemodelaction({ [key]: response.data.data, loading: false }));
                }
            }
        }).catch((e) => {
            console.log(e);
        });
};


/**
 *作者: 唐峰
 *功能描述: 本地数据请求
 *参数说明: @name 名称  @value 值   @returnName 返回的数据键值名  @dispatch() redux方法
 *时间: 2018/4/4 9:44
 */
const fetchcitysPosts = ({ name, value, returnName }) => (dispatch, getState) => axios(`http://localhost:3333/testApi/citys?${name}=${value}`)
    .then((response) => {
        if (response.status == 200) {
            if (response.data.state == '000001') {
                // dispatch(baseInfoForm({[returnName]: response.data.data,}))
            }
        }
    }).catch((e) => {
        console.log(e);
    });

/**
 *作者: 唐峰
 *功能描述: 渠道标记列表数据请求
 *参数说明:@key 用于存返回的数据  @value 页码数据
 *时间: 2018/4/4 9:55
 */
const fetchPosts = ({ key, value }) => (dispatch, getState) => {
    dispatch(tablemodelaction({ loading: true }));
    const current = value.pageNumber || 1;
    const pageSize = value.pageData || 20;
    return axios.post(`${config.api_url}/urc/motan/service/api/IUrcService/getMyDataRuleTempl`, value)
        .then((response) => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const total = response.data.data.total;
                    dispatch(Paginationmodelaction({
                        current,
                        total,
                        pageSize,
                    }));
                    dispatch(tablemodelaction({ [key]: response.data.data, loading: false }));
                }
            }
        }).catch((e) => {
            console.log(e);
        });
};

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

const receiveSysRule = (dispatch, data) => {
    dispatch({
        type: RECEIVE_SYS_RULE,
        data,
    });
};

const loadSysStateRule = params => (dispatch) => {
    fetchPost('/urc/motan/service/api/IUrcService/getDataRuleByUser', params)
        .then((result) => {
            if (result.state == '000001') {
                receiveSysRule(dispatch, result.data);
            }
        });
};

const refreshSysStateRule = params => (dispatch) => {
    fetchPost('/urc/motan/service/api/IUrcService/getDataRuleTemplByTemplId', params, 2)
        .then((result) => {
            if (result.state === '000001') {
            // if(result.data.lstDataRuleSys&&result.data.lstDataRuleSys.length>0){
                // const sysRuleMap = sysRuleArrToMap([result.data.lstDataRuleSys]);
                // this.props.refreshSysStateRule([result.data.lstDataRuleSys]);
                dispatch({
                    type: SET_SYS_RULE,
                    data: parsePlanData(result.data.lstDataRuleSys),
                });
            // }
            }
        });
    // receiveSysRule(dispatch, data);
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
    userlistaction, // 用户列表action
    fetchPosts2,
    fetchcitysPosts,
    fetchPosts,
    loadSysStateArr,
    loadSysStateRule,
    setTempData,
    updateSysRulel,
    addSysRule,
    delSysRule,
    refreshSysStateRule,
    resetData,
};

export default actions;
