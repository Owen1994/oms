/**
 * 作者: pzt
 * 描述: 速卖通详情页父组件
 * 时间: 2018/4/18 20:30
 **/
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions, {tablemodelaction3} from '../actions'
import qs from 'qs'

import AsideRight from '../components/AsideRight'
import OrderInfo from '../components/OrderInfo'
import LogisticInfo from '../components/LogisticInfo'
import OrderDetail from '../components/OrderDetail'
import CapitalDetail from '../components/CapitalDetail'
import TimesRecord from '../components/TimesRecord'
import ProductInfo from '../components/ProductInfo'
import MessageInfo from '../components/MessageInfo'
import OrderOperationLog from '../components/OrderOperationLog'


import {
    Form,
    Row,
    Col,
    Spin,
} from 'antd';
import '../css/css.css';
import axios from 'util/axios';
import * as config from 'util/connectConfig';
import {getUrlParams,timestampFromat} from 'util/baseTool';
import { fetchPost } from 'util/fetch';

class UserForm extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        formloading: true,
        orderInfo: {},
    }

    componentDidMount() {
        const orderId = getUrlParams(location.href).platformNumber ? getUrlParams(location.href).platformNumber : '';
        if (orderId) {

            // 请求smt订单详情页数据
            axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabApi/getOrderDetail`, {
                    orderId: orderId
            }).then(response => {
                if (response.status == 200) {
                    const orderState = response.data.data.orderState;
                    const symbol = response.data.data.capitalDetail.symbol;

                    const valFormatting = (val, s = symbol) => {
                        let value = val ? (s + val) : undefined;
                        return value;
                    }
                    const {
                        platform,
                        platformOrderNumber,
                        platformAccount,
                        orderStateName,
                        deliveryTime,
                        orderStateId,
                    } = response.data.data.orderInfo;
                    const {
                        address,
                        tel,
                        fax,
                        zip,
                        phone,
                        consignee,
                        buyer,
                    } = response.data.data.orderDetail;

                    const {
                        deliver,
                        payment,
                        create,
                        lastGrabTime,
                        grabTime,
                    } = response.data.data.time;

                    const {
                        productPrice,
                        freight,
                        priceAdjustment,
                        discount,
                        sum,
                        transactionFee,
                        estimate,
                        meet,
                        paid,
                        payWay,
                        paymentTime,
                        paymentd,
                    } = response.data.data.capitalDetail;
                    const {
                        emptyIdentifier,
                    } = response.data.data.message === null ? "后台返回空值": "null";
                    const {
                        profits,
                        orderSum,
                        freightSum,
                        remarks,
                        productSum,
                    } = response.data.data.goods;
                    this.props.form.setFieldsValue({
                        platform,
                        platformOrderNumber,
                        platformAccount,
                        orderStateName,
                        deliveryTime: timestampFromat(deliveryTime, 2),
                        orderStateId,
                        address,
                        tel,
                        fax,
                        zip,
                        phone,
                        consignee,
                        buyer: buyer.grade + ' '+ buyer.name,
                        deliver,
                        payment,
                        create,
                        lastGrabTime,
                        grabTime: timestampFromat(grabTime, 2),
                        productPrice:  valFormatting(productPrice),
                        freight: valFormatting(freight),
                        priceAdjustment: valFormatting(priceAdjustment),
                        discount: valFormatting(discount),
                        sum: valFormatting(sum),
                        transactionFee: valFormatting(transactionFee),
                        estimate:valFormatting(estimate),
                        meet: valFormatting(meet),
                        paid,
                        payWay,
                        paymentTime,
                        payment1: valFormatting(response.data.data.capitalDetail.payment),
                        emptyIdentifier,
                        profits: valFormatting(response.data.data.goods.estimate),
                        orderSum: valFormatting(orderSum),
                        freightSum: valFormatting(response.data.data.goods.freight),
                        remarks,
                        productSum: valFormatting(productSum),
                        memo:undefined,
                    });

                    this.props.baseInfoForm({orderId: orderId, orderState: orderState,})
                    // 物流信息 start
                    const logisticsInfo = response.data.data.logistics;
                    let logisticsInfoArr = [];
                    logisticsInfoArr.push(logisticsInfo);
                    const newlogisticsInfo = logisticsInfoArr.length ? logisticsInfoArr.map((v,i) => {
                        return ({
                            key: i,
                            No: ++i + '',
                            detail: [
                                // {
                                //     content: v.smtorderdetail[0].content,
                                //     time: v.smtorderdetail[0].time,
                                // }
                            ],
                            way: v.way,
                            waybillNumber: v.waybillNumber,
                        })
                    }) : [];
                    this.props.tablemodelaction({data: newlogisticsInfo, count: newlogisticsInfo.length + 1,})
                    // 物流信息 end
                    // 产品信息 start
                    const productInfo =  response.data.data.goods.data;

                    const newProductInfo = productInfo.length ? productInfo.map((v,i) => {
                        return ({
                            key:i,
                            No: ++i +'',
                            image: v.image.replace(/^http[s]?/,'https'),
                            isPhone: v.isPhone,
                            unit: valFormatting(v.unit),
                            number: v.number,
                            name: v.name,
                            sum: symbol + v.sum,
                            num: v.num,
                            state: v.state,
                        })
                    }) : [{
                        key:1,
                        No: '1',
                        image: "https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKDrtfnWuAEQygcY-gEyCABcuwBJ80Ai",
                        isPhone: 1,
                        unit: 1,
                        number: "USR&A301_CD",
                        name: "U-Kiss 16 Tips Ear Cleaner Earpick Swab Easy Earwax Removal Remove Soft Spiral Cleaner Prevent Ear-pick Clean Tools Ear Care Kit",
                        sum: 13.9,
                        num: 1,
                        state: "测试内容718u",
                    }];
                    this.props.tablemodelaction3({data: newProductInfo, count: newProductInfo.length + 1,})
                    // 产品信息 end

                    // 订单操作日志 start
                    // const OrderOperationLog = response.data.data.log;
                    // const newOperationLog = OrderOperationLog.length ? OrderOperationLog.map((v,i) => {
                    //     return ({
                    //         key: i,
                    //         No: i++ + '',
                    //         attribute: v.attribute,
                    //         msg: v.msg,
                    //         userName: v.userName,
                    //         // userId: v.userId,
                    //         operDesc: v.operDesc,
                    //         time: v.time,
                    //     })
                    // }) : [
                    //     {
                    //         key: 1,
                    //         No: 1 ,
                    //         attribute: 'caozuoshuxing',
                    //         msg: 'caozuoxinxi',
                    //         userName: 'yonghuming',
                    //         userId: 'yonghuid',
                    //         time: 'caozuoshijian',
                    //     }
                    // ];
                    // this.props.OrderOperationLogaction({data: newOperationLog, count: newOperationLog.length + 1,})
                    // 订单操作日志 end


                    const orderLog = response.data.data.log;
                    const neworderLog = orderLog.length ? orderLog.map((v, i) => {
                        return ({
                            key: v.id,
                            No: ++i + '',
                            attribute: v.attribute,
                            msg: v.msg,
                            userName: v.userName,
                            // userId: v.userId,
                            operDesc: v.operDesc,
                            time: timestampFromat(v.time, 2),
                        })
                    }) : []


                    this.props.tablemodelaction5({data: neworderLog, count: neworderLog.length + 1,})
                    this.setState({
                        orderInfo: response.data.data.orderInfo,
                        formloading: false
                    })
                    

                    // 暂时不知道这里有什么用
                    var allcitys = {}
                    var allcitysarr = [['Harea', harea], ['Hvenue', hvenue], ['Hfloor', hfloor], ['Hdistrict', hdistrict], ['provincebase', provincebase], ['citybase', citybase], ['countybase', countybase], ['townbase', townbase]]

                    var allcitysarrlen = allcitysarr.length;
                    for (let i = 0; i < allcitysarrlen; i++) {
                        if (allcitysarr[i][1]) {
                            allcitys[allcitysarr[i][0]] = {
                                name: allcitysarr[i][0],
                                value: {key: allcitysarr[i][1], label: allcitysarr[i][1]}
                            }
                        }
                    }
                    this.props.baseInfoForm(allcitys)
                    // 暂时不知道这里有什么用


                }
            }).catch(e => {
                this.setState({formloading: false});
            })

            // 请求日志信息
            const params = {
                orderId,
                pageData: 20,
                pageNumber: 1,
            };
            this.props.querySmtLog(params);
        } else {
            this.setState({formloading: false})
        }

    }

    componentDidUpdate(nextProps, nextState) {

    }

    render() {
        const { orderInfo } = this.state;
        return (
            <div className="newClue smt-details">
                <div className="newCluewk smtorder-detail">
                    <Row style={{display: 'flex'}}>
                        <Col span={22} style={{flex: 1}}>
                            <Spin spinning={this.state.formloading} delay={500} tip="Loading...">
                                <Form layout="inline">
                                    <OrderInfo {...this.props} orderInfo={orderInfo} />
                                    <LogisticInfo {...this.props} />
                                    <OrderDetail {...this.props} />
                                    <CapitalDetail {...this.props} />
                                    <TimesRecord {...this.props} />
                                    <ProductInfo {...this.props} />
                                    <MessageInfo {...this.props} />
                                    <OrderOperationLog {...this.props} />
                                </Form>
                            </Spin>
                        </Col>
                        <Col span={2} style={{width: '95px'}}>
                            <AsideRight {...this.props} />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

}


export default connect(state => ({...state}), dispatch => bindActionCreators(actions, dispatch))(
    Form.create({
        mapPropsToFields(props) {
            const Infos = {}
            for (let i in props.Infos) {
                if (props.Infos[i].name) {
                    Infos[i] = Form.createFormField(props.Infos[i])
                }
            }
            return Infos
        },
        onFieldsChange(props, fields) {
            props.baseInfoForm(fields)

        },
    })(UserForm));

