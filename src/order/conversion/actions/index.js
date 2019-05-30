/**
*作者: 任贸华
*功能描述: 抓单转换配置事件分发文件
*参数说明:
*时间: 2018/4/16 11:47
*/
import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'
import searchValuesactions from "../../../components/searchValues/actions";
import commonactions from '../../../common/actions/commonactions'

export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'
export const skuprefixTableactionInfo = 'skuprefixTableactionInfo'
export const skuprefixAPPInfo = 'skuprefixAPPInfo'
export const characterInfo = 'characterInfo'

export const logtablemodelInfo = 'logtablemodelInfo'
export const characterAPPInfo = 'characterAPPInfo'
export const editconditionAppInfo = 'editconditionAppInfo'
import {message} from 'antd';
import {datasaddkey} from '../../../util/baseTool';


export const charactertablaction = value => ({
    type: characterInfo,
    payload: value
})

export const logtablemodelaction = value => ({
    type: logtablemodelInfo,
    payload: value
})

const skuprefixAPPaction = value => ({
    type: skuprefixAPPInfo,
    payload: value
})

const characterAPPaction = value => ({
    type: characterAPPInfo,
    payload: value
})

const editconditionAppaction = value => ({
    type: editconditionAppInfo,
    payload: value
})


export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value
})


export const modalmodelaction = value => ({
    type: modalmodelInfo,
    payload: value
})

export const tablemodelaction = value => ({
    type: tablemodelInfo,
    payload: value
})


export const skuprefixTableaction = value => ({
    type: skuprefixTableactionInfo,
    payload: value
})


export const Paginationmodelaction = value => ({
    type: PaginationmodelInfo,
    payload: value
})


export const fetchskuprefixPosts = ({key, value = {}}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    return axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/getOrderGrabConfigAllSkuConfig`, value)
        .then(response => {

            if (response.status === 200) {
                if (response.data.state === '000001') {
                    dispatch(skuprefixTableaction({[key]: response.data.data, loading: false}))
                } else {
                    message.error(response.data.msg)
                }

            }
        }).catch(e => {
            console.log(e);
        })
}


export const fetchPosts = ({key, value = {}}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    value['pageNumber'] = value['pageNumber'] || 1;
    value['pageData'] = value['pageData'] || 20;
    // value['platformname'] = value['platformname'] || 'SM';
//${config.api_url}     mock调完后记得添加回去
    return axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/findRuleOrderGrabConfigList`, value)
        .then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    const total = response.data.total
                    dispatch(Paginationmodelaction({
                        current: value['pageNumber'],
                        total: total,
                        pageSize: value['pageData']
                    }))
                    dispatch(tablemodelaction({[key]: response.data.data, loading: false}))
                } else {
                    message.error(response.data.msg)
                }
            }
        }).catch(e => {
            console.log(e);
        })
}


export const filedapi = ({key, value = {}}) => (dispatch, getState) => {
    dispatch(charactertablaction({loading: true}))
    value.platformName = value.platformName || 'SM'
    return axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/getFieldConfigDetail`, value)
        .then(response => {

            if (response.status == 200) {
                if (response.data.state == '000001') {

                    dispatch(charactertablaction({[key]: response.data.data, loading: false}))
                    const resdata = response.data.data
                    const {order_main, order_goods, order_pay_info, order_pay_record, order_receiver_info} = resdata.data

                    const {logArray} = resdata
                    const order_mainarr = datasaddkey(order_main)
                    const newlogArray = datasaddkey(logArray)

                    const neworder_mainarr = order_mainarr.map((v, i) => {
                        return ({
                            key: i+'_',
                            platformfield: {
                                name: 'platformfield' + v.key,
                                message: '平台API字段',
                                placeholder: '平台API字段',
                                readonly: false,
                                initialValue: v.before,
                                datakey: 'selectArray',
                                which: 'beforePlatformFieldConfig'
                            },
                            platformfieldafter: {
                                name: 'platformfieldafter' + v.key,
                                message: '转换后字段',
                                placeholder: '转换后字段',
                                datakey: 'selectArray',
                                initialValue: v.after,
                                which: 'afterPlatformFieldConfig'
                            },
                            Operation: '删除',
                        })
                    })

                    const order_goodsarr = datasaddkey(order_goods)
                    const neworder_goodsarr = order_goodsarr.map((v, i) => {
                        return ({
                            key: i+'_',
                            orderfield: {
                                name: 'orderfield' + v.key,
                                message: '产品API字段',
                                placeholder: '产品API字段',
                                readonly: false,
                                initialValue: v.before,
                                datakey: 'selectArray',
                                which: 'beforeProductFieldConfig'
                            },
                            orderfieldafter: {
                                name: 'orderfieldafter' + v.key,
                                message: '转换后字段',
                                placeholder: '转换后字段',
                                datakey: 'selectArray',
                                initialValue: v.after,
                                which: 'afterProductFieldConfig'
                            },
                            Operation: '删除',
                        })
                    })

                    const order_pay_infoarr = datasaddkey(order_pay_info)
                    const neworder_pay_info = order_pay_infoarr.map((v, i) => {
                        return ({
                            key: i+'_',
                            paymentfield: {
                                name: 'paymentfield' + v.key,
                                message: '支付API字段',
                                placeholder: '支付API字段',
                                readonly: false,
                                initialValue: v.before,
                                datakey: 'selectArray',
                                which: 'beforePayInfoFieldConfig'
                            },
                            paymentfieldafter: {
                                name: 'paymentfieldafter' + v.key,
                                message: '转换后字段',
                                placeholder: '转换后字段',
                                datakey: 'selectArray',
                                initialValue: v.after,
                                which: 'afterPayInfoFieldConfig'
                            },
                            Operation: '删除',
                        })
                    })

                    const order_pay_recordarr = datasaddkey(order_pay_record)
                    const neworder_pay_recordarr = order_pay_recordarr.map((v, i) => {
                        return ({
                            key: i+'_',
                            methodfield: {
                                name: 'methodfield' + v.key,
                                message: '付款记录API字段',
                                placeholder: '付款记录API字段',
                                readonly: false,
                                initialValue: v.before,
                                datakey: 'selectArray',
                                which: 'beforePayRecordFieldConfig'
                            },
                            methodfieldafter: {
                                name: 'methodfieldafter' + v.key,
                                message: '转换后字段',
                                placeholder: '转换后字段',
                                datakey: 'selectArray',
                                initialValue: v.after,
                                which: 'afterPayRecordFieldConfig'
                            },
                            Operation: '删除',
                        })
                    })

                    const order_receiver_infoarr = datasaddkey(order_receiver_info)
                    const neworder_receiver_infoarr = order_receiver_infoarr.map((v, i) => {
                        return ({
                            key: i+'_',
                            customerfield: {
                                name: 'customerfield' + v.key,
                                message: '客户API字段',
                                placeholder: '客户API字段',
                                readonly: false,
                                initialValue: v.before,
                                datakey: 'selectArray',
                                which: 'beforeCustomerFieldConfig'
                            },
                            customerfieldafter: {
                                name: 'customerfieldafter' + v.key,
                                message: '转换后字段',
                                placeholder: '转换后字段',
                                datakey: 'selectArray',
                                initialValue: v.after,
                                which: 'afterCustomerFieldConfig'
                            },
                            Operation: '删除',
                        })
                    })

                    dispatch(charactertablaction({
                        platformdata: neworder_mainarr, platformcount: neworder_mainarr.length + 1,
                        orderdata: neworder_goodsarr, ordercount: neworder_goodsarr.length + 1,
                        paymentdata: neworder_pay_info, paymentcount: neworder_pay_info.length + 1,
                        methoddata: neworder_pay_recordarr, methodcount: neworder_pay_recordarr.length + 1,
                        customerdata: neworder_receiver_infoarr, customercount: neworder_receiver_infoarr.length + 1,
                    }))

                    dispatch(logtablemodelaction({data: newlogArray}))


                } else {
                    message.error(response.data.msg)
                }
            }
        }).catch(e => {
            console.log(e);
        })
}

const actions = {
    ...searchValuesactions,
    ...commonactions,
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    Paginationmodelaction,
    fetchPosts,
    skuprefixTableaction,
    fetchskuprefixPosts,
    skuprefixAPPaction,
    characterAPPaction,
    logtablemodelaction,
    charactertablaction,
    editconditionAppaction,
    filedapi,
}

export default actions
