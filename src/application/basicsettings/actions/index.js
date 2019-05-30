/**
 *作者: 唐峰
 *功能描述: 渠道列表页方法的action集合
 *参数说明:
 *时间: 2018/4/4 9:26
 */
import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'
import searchValuesactions from '../../../components/searchValues/actions'
import * as types from '../constants/ActionTypes'
export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'  //
export const InventorytablelistInfo = 'InventorytablelistInfo'  //盘点列表 
export const ThresholdtablelistInfo = 'ThresholdtablelistInfo'  //金额阈值 
export const EditthresholdInfo = 'EditthresholdInfo'            //金额阈值--编辑弹窗列表
export const StoretablelistInfo = 'StoretablelistInfo'          //店铺设置列表

/**
 *作者: 唐峰
 *功能描述: 顶部搜索组件的表单信息action
 *参数说明:
 *时间: 2018/4/4 9:28
 */
export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value
})

//店铺列表
export const StoretablelistAction = value => ({
    type: StoretablelistInfo,
    payload: value
})


/**
 *作者: 唐峰
 *功能描述: 金额阈值表格模块表格数据action Thresholdtablelist
 *参数说明:
 *时间: 2018/4/4 9:42
 */
export const ThresholdtablelistAction = value => ({
    type: ThresholdtablelistInfo,
    payload: value
})


/**
 *作者: 唐峰
 *功能描述: 盘点表格模块表格数据action Inventorytablelist
 *参数说明:
 *时间: 2018/4/4 9:42
 */
export const InventorytablelistAction = value => ({
    type: InventorytablelistInfo,
    payload: value
})


/**
 *作者: 唐峰
 *功能描述: 金额阈值弹窗--表格数据action EditthresholdAction
 *参数说明:
 *时间: 2018/4/4 9:42
 */
export const EditthresholdAction = value => ({
    type: EditthresholdInfo,
    payload: value
})

/**
 *作者: 唐峰
 *功能描述: 本地mock数据接口请求
 *参数说明: /mockjsdata/7/urc/motan/service/api/IUrcService/getUsersByUserInfo
 *时间: 2018/4/4 9:43
 */
export const fetchPosts2 = ({key, value}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}));
    return axios.post(`/mockjsdata/7/urc/motan/service/api/IUrcService/getUsersByUserInfo`, value)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const total = response.data.data.total
                    const current = value['pageNumber'] || 1;
                    const pageSize = value['pageData'] || 20;
                    dispatch(Paginationmodelaction({
                        current: current,
                        total: total,
                        pageSize: pageSize
                    }))
                    dispatch(tablemodelaction({[key]: response.data.data, loading: false}))
                }
            }
        }).catch(e => {
            console.log(e);
        })
}


/**
 *作者: 唐峰
 *功能描述: 列表数据请求 
 *参数说明:@key 用于存返回的数据名(常用data)  @value 请求参数(包含页面数据)  @url 请求地址 @tableAction名称(字符串)
 *时间: 2018/4/4 9:55
 */
export const fetchPosts = ({key, value,url,tableAction}) => (dispatch) => {
    function actionS(funcName){
        if(typeof(eval(funcName)) == "function"){        
            dispatch(eval(funcName+"({loading: true});"))
          }
    }
    tableAction && actionS(tableAction);
    const current = value['pageNumber'] || 1;
    const pageSize = value['pageData'] || 20;
    return axios.post(`${url}`, value)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const total = response.data.data.total
                    function actionE(funcName){
                        if(typeof(eval(funcName)) == "function"){        
                            dispatch(eval(funcName+`({[key]: response.data.data, loading: false,current: current,total: total,pageSize: pageSize});`))
                        }
                    }
                    tableAction && actionE(tableAction);
                }
            }
        }).catch(e => {
            console.log(e);
        })
}



//店铺设置启用状态 切换按钮时的
export const getStoreTablelistAction= params => (dispatch)=>{
    dispatch(StoretablelistAction({loading: true}))
    axios.post(types.GET_SHOPACCOUNTSETTINGLIST_API, params).then(data=>{
        if(data && data.state === "000001"){
            data['loading'] = false;
            return dispatch(StoretablelistAction(data));
        }
        // return dispatch({type: types.RECEIVE_DECALARATION_LIST_FAILED})
    })
}

const actions = {
    ...searchValuesactions,
    baseInfoForm,
    fetchPosts,
    StoretablelistAction,       //店铺设置列表
    getStoreTablelistAction,    //店铺设置列表
    InventorytablelistAction,   //盘点列表
    ThresholdtablelistAction,   //金额阈值列表
    EditthresholdAction,        //金额阈值--弹窗列表
}

export default actions




