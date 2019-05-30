/**
*作者: 任贸华
*功能描述: 全局下拉框分发处理事件
*参数说明:
*时间: 2018/4/16 10:49
*/
import axios from '../../util/axios'
import {api_url} from "../../util/connectConfig";
import {message} from 'antd'

export const commonSelectDatas = 'commonSelectDatas'


const commonSelectaction = value => ({
    type: commonSelectDatas,
    payload: value
})


const getCommonSelectData = ({url,key,value={}},flag = true) => (dispatch, getState) => {
    value.pageData = value.pageData ? value.pageData : 9999;
    value.pageNumber = value.pageNumber ? value.pageNumber : 1;
    value.salesPlatform = value.salesPlatform ? value.salesPlatform : '';
    return axios.post(`${api_url}${url}`,value)
                .then(response => {
                    if (response.status == 200) {
                        if(response.data.state=='000001'){
                            const data = response.data.data;
                            if(data.length && flag){
                                data.unshift({id:'',name:'全部'})
                            }
                            dispatch(commonSelectaction({[key]: data}))
                        }
                    }
                }).catch(e => {
                    message.error(response.data.msg);
                })
};


const actions = {
    commonSelectaction,
    getCommonSelectData
}

export default actions




