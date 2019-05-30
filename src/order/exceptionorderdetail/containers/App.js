import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import moment from 'moment'
import qs from 'qs'
import OrderInfo from '../components/OrderInfo'
import AmountInfo from '../components/AmountInfo'
import Times from '../components/Times'
import ConsigneeAddress from '../components/ConsigneeAddress'
import ProductInfo from '../components/ProductInfo'
import WarehouseOrder from '../components/WarehouseOrder'
import OrderLog from '../components/OrderLog'
import Type from '../components/type'
import Remarks from '../components/remarks'
import DevanningAPP from '../components/devanningAPP'
import Modalmodel from '@/components/modalmodel';
import AuditModal from '../components/AuditModal';

import {
    Form,
    Button,
    Radio,
    Row,
    message,
    Spin,
    Input
} from 'antd'
import '../css/css.css'

const {TextArea} = Input;
const FormItem = Form.Item
import axios from 'util/axios'
import * as config from 'util/connectConfig'
import {
    timestampFromat,
    datasaddkey,
    functions,
    closeCurrentPage,
    getUrlParams,
} from 'util/baseTool';

import SearchValues from '@/components/searchValues/containers/App';
import FeeModal from '../components/FeeModal';
// import { fetchPost } from '../../../util/fetch';

const RadioGroup = Radio.Group;

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        readonly: true,
        formloading: true,
        //可编辑状态
        editArr: ["待处理", "分仓失败"],
        loading: false,
        feeVisible: false,  // 费用维护弹窗visible
    }

    hasErrors = (fieldsError) => {
        const arr = ['channelCodeId', 'warehouseCodeId']
        Object.keys(fieldsError).filter(v => {
            arr.forEach(j => {
                if (v.match(j)) {
                    return true
                } else {
                    return false
                }
            })
        }).some(field => fieldsError[field]);
    }
    /**
     * 拆分图片
     */
    fileListhanddle = (list) => {
        return list ? list.split('@').map((v, i) => ({
            uid: i,
            name: `${i}`,
            status: 'done',
            url: `${v}`,
        })) : []
    }

    componentDidMount() {
        this.props.getCommonSelectData({url: '/oms/order/manage/motan/IPackageApi/getPackageWarehouse', key: 'commomwarehouseCode'})
        this.props.getCommonSelectData({url: '/oms/order/manage/motan/IPackageApi/getLogisticsChannel', key: 'commomlogisticsChannelCode'})
        this.props.getCommonSelectData({
            url: '/oms/order/manage/motan/ICompanyOrderManageApi/getSkuDecorationSelect',
            key: 'commomSkuDecorationSelectCode'
        })
        /**
         * 获取orderId
         */
        const { orderId } = getUrlParams('');

        if (orderId) {
            axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getOrderDetail`, {
                orderId: orderId
            }).then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        /**
                         * 设置 基础信息
                         */
                        const {
                            platformOrderId, marketAccount, yksOrderNumber, orderState, orderType,
                            platformName, oiCountry, oiCountryName,
                              buyerAccount,
                            customerService,
                            logisticsBusiness,
                            trackingNumber,
                            isClickFarming,
                        } = response.data.data.orderInfo
                        /**
                         * 金额信息
                        */
                        const {
                            orderAmount,saleAmount,freightChargesAmount,buyerPaymentAmount,
                            excellentCostAmount,sellerAdjustAmount,sellerIncomeAmount,platformTradeAmount,
                            sellerIncomeFreight,rate,payway,
                            orderAmountCurrency, saleAmountCurrency, freightChargesAmountCurrency, buyerPaymentAmountCurrency,
                            excellentCostAmountCurrency,sellerAdjustAmountCurrency,sellerIncomeAmountCurrency, platformTradeAmountCurrency,
                            sellerIncomeFreightCurrency
                        } = response.data.data.amountInfo
                        /**
                         * 设置 时间信息
                         */
                        const {
                            grabTime, timeImport, timeWarehouse, timeDeliver, timeStateUpdate, timeOrder, timePayment,
                        } = response.data.data.times;
                        /**
                         * 设置 收货人地址信息
                         */
                        const {
                            consignee, caCountry, countryAbb, zip, tel, phone, email, socialAccount, province, city, address, buyerMessage, street2, street1
                        } = response.data.data.ConsigneeAddress;

                        /**
                         * 设置 收货人地址信息
                         */
                        const {abnormal} = response.data.data
                        const abnormalarr = datasaddkey(abnormal)
                        this.props.tablemodelaction6({data: abnormalarr})

                        if (this.state.editArr.includes(orderState)) {
                            this.props.isEditAction({
                                is: true,
                                state: orderState,
                                type: (abnormal && abnormal[0] && abnormal[0].type) || ""
                            })
                        } else {
                            this.props.isEditAction({
                                is: false,
                                state: orderState,
                                type: (abnormal && abnormal[0] && abnormal[0].type) || ""
                            })
                        }

                        /**
                         * 买家备注
                         */
                        const {leaveMessageList} = response.data.data
                        leaveMessageList.sort((a, b) => (b.createDate - a.createDate))
                        const leaveMessageListarr = datasaddkey(leaveMessageList)
                        this.props.tablemodelaction7({data: leaveMessageListarr})

                        const productInfo = response.data.data.productInfo;
                        const productInfoarr = datasaddkey(productInfo)
                        const skuInfoarr = datasaddkey(productInfo)
                        const newgrabTime = grabTime ? timestampFromat(grabTime, 2) : null;
                        const newtimeImport = timeImport ? timestampFromat(timeImport, 2) : null;
                        const newtimeWarehouse = timeWarehouse ? timestampFromat(timeWarehouse, 2) : null;
                        const newtimeDeliver = timeDeliver ? timestampFromat(timeDeliver, 2) : null;
                        const newtimeStateUpdate = timeStateUpdate ? timestampFromat(timeStateUpdate, 2) : null;
                        const newtimeOrder = timeOrder ? timestampFromat(timeOrder, 2) : null;
                        const newtimePayment = timePayment ? timestampFromat(timePayment, 2) : null;

                        this.props.form.setFieldsValue({
                            platformOrderId,
                            marketAccount,
                            yksOrderNumber,
                            orderState,
                            orderStateName: orderState,
                            orderTypename: orderType,
                            orderType,
                            platformName,
                            oiCountry,
                            oiCountryName,
                            street2,
                            street1,
                            buyerAccount,
                            customerService,
                            orderAmount: `${orderAmountCurrency} ${orderAmount}`,
                            saleAmount: `${saleAmountCurrency} ${saleAmount}`,
                            freightChargesAmount: `${freightChargesAmountCurrency} ${freightChargesAmount}`,
                            buyerPaymentAmount: `${buyerPaymentAmountCurrency} ${buyerPaymentAmount}`,
                            excellentCostAmount: `${excellentCostAmountCurrency} ${excellentCostAmount}`,
                            sellerAdjustAmount: `${sellerAdjustAmountCurrency} ${sellerAdjustAmount}`,
                            sellerIncomeAmount: `${sellerIncomeAmountCurrency} ${sellerIncomeAmount}`,
                            platformTradeAmount: `${platformTradeAmountCurrency} ${platformTradeAmount}`,
                            sellerIncomeFreight: `${sellerIncomeFreightCurrency} ${sellerIncomeFreight}`,
                            rate,
                            payway,
                            buyerMessage,
                            logisticsBusiness,
                            grabTime: newgrabTime,
                            timeImport: newtimeImport,
                            timeWarehouse: newtimeWarehouse,
                            timeDeliver: newtimeDeliver,
                            timeStateUpdate: newtimeStateUpdate,
                            timeOrder: newtimeOrder,
                            timePayment: newtimePayment,
                            consignee,
                            caCountry,
                            countryAbb,
                            zip,
                            tel,
                            phone,
                            email,
                            socialAccount,
                            province: province,
                            city: city,
                            address: address,
                            trackingNumber, // mymall平台新增的追踪码字段
                            isClickFarming: isClickFarming === 1 ? '是' : (isClickFarming === 0 ? '否' : null),
                        });
                        var skuArr = []
                        const newproductInfoarr = productInfoarr.length ? productInfoarr.map((v, i) => {
                            skuArr.push(v.sku)
                            return ({
                                key: ++i + '',
                                No: i + '',
                                id: v.id,
                                itemId: v.itemId,
                                record: v,
                                upper: productInfoarr,
                                onlineSkuCode: v.onlineSkuCode,
                                name: v.name,
                                img: {
                                    name: `img${v.key}`,
                                    initialValue: this.fileListhanddle(v.img.replace(/^http[s]?\:/, '')),
                                    message: '请上传图片',
                                    placeholder: '请上传图片',
                                    num: 0,
                                },
                                sku: {
                                    name: `sku${v.key}`,
                                    initialValue: v.sku,
                                    message: '请输入规格',
                                    placeholder: '规格',
                                },
                                unit: {
                                    name: `unit${v.key}`,
                                    initialValue: v.unit,
                                    message: '请输入销售单价',
                                    placeholder: '销售单价',

                                },
                                num: {
                                    name: `num${v.key}`,
                                    initialValue: v.num,
                                    message: '请输入销售数量',
                                    placeholder: '销售数量',

                                },
                                amount: {
                                    name: `amount${v.key}`,
                                    initialValue: v.amount,
                                    message: '请输入销售金额',
                                    placeholder: '销售金额',

                                },
                                Operation: '删除',
                            })
                        }) : []
                        this.props.amendSkuArrAction(skuArr)
                        this.props.tablemodelaction2({
                            data2: newproductInfoarr,
                            count: newproductInfoarr.length + 1,
                            upper: productInfoarr
                        })
                        this.props.skuTableAction(skuInfoarr)
                        const abnormaltype = abnormal.map(v => v.type)

                        this.props.baseInfoForm({orderId: orderId, abnormaltype: abnormaltype})

                        const warehouseOrder = response.data.data.warehouseOrder;
                        const warehouseOrderarr = datasaddkey(warehouseOrder)
                        const newwarehouseOrder = warehouseOrderarr.length ? warehouseOrderarr.map((v, i) => {

                            return ({
                                key: ++i + '',
                                No: i + '',
                                warehouseOrderId: {
                                    name: `warehouseOrderId${v.key}`,
                                    initialValue: v.warehouseOrderId,
                                    message: '请输入包裹单号',
                                    placeholder: '请输入包裹单号',
                                    isNegative: v.isNegative,
                                },
                                warehouseOrderState: {
                                    name: `warehouseOrderState${v.key}`,
                                    initialValue: v.warehouseOrderState,
                                    message: '请输入分仓订单状态',
                                    placeholder: '请输入分仓订单状态',
                                },
                                deliveryState: {
                                    name: `deliveryState${v.key}`,
                                    initialValue: v.deliveryState,
                                    message: '请输入发货状态',
                                    placeholder: '请输入发货状态',

                                },
                                deliveryBay: {
                                    name: `deliveryBay${v.key}`,
                                    initialValue: v.deliveryBay,
                                    message: '请输入发货仓',
                                    placeholder: '请输入发货仓',

                                },
                                channelName: {
                                    name: `channelName${v.key}`,
                                    initialValue: v.channelName,
                                    message: '请输入物流渠道',
                                    placeholder: '请输入物流渠道',

                                },
                                skuNum: {
                                    name: `skuNum${v.key}`,
                                    initialValue: v.sku.map(k => `${k.skuNum}*${k.skuId}`).join(','),
                                    message: '请输入SKU/数量',
                                    placeholder: '请输入SKU/数量',

                                },
                                weight: {
                                    name: `weight${v.key}`,
                                    initialValue: v.weight,
                                    message: '请输入重量',
                                    placeholder: '请输入重量',

                                },
                                Operation: '删除',
                            })
                        }) : []

                        this.props.tablemodelaction({data: newwarehouseOrder, count: newwarehouseOrder.length + 1,})


                        // const orderLog = response.data.data.orderLog;
                        // const neworderLog = orderLog.length ? orderLog.map((v, i) => {
                        //     return ({
                        //         key: v.id,
                        //         No: ++i + '',
                        //         attribute: v.attribute,
                        //         msg: v.msg,
                        //         userName: v.userName,
                        //         userId: v.userId,
                        //         time: timestampFromat(v.time, 2),
                        //     })
                        // }) : []

                        // this.props.tablemodelaction5({data: neworderLog, count: neworderLog.length + 1,})

                    } else {
                        message.error(response.data.msg)
                    }
                }
                this.setState({formloading: false})
            }).catch(e => {
                this.setState({formloading: false});
            })

            // 请求日志信息
            const params = {
                orderId,
                pageNumber: 1,
                pageData: 20,
            };
            this.props.queryLog(params);
        } else {
            this.setState({formloading: false})
        }

    }

    /**
     * 作者：魏洁
     * 描述：黑名单弹窗展示
     * 时间：2018-4-17
     */
    addBlacklist = () => {
        this.props.modalmodelaction({blacklistvisible: true, title: "加入黑名单"})
    }

    /**
     * 作者：魏洁
     * 描述：加入黑名单
     * 时间：2018-4-17
     */
    handleblacklist = () => {
        var {getFieldValue} = this.props.form
        var params = {
            buyerAccount: getFieldValue("buyerAccount"), // 买家账号
            buyerName: getFieldValue("consignee"), // 收货人
            buyerEmail: getFieldValue("email"), // 邮箱地址
            orderId: getFieldValue("yksOrderNumber"), // YKS单号
            remark: getFieldValue("blacklistContent"),   // 原因
            platformName: getFieldValue('platformName'),    // 销售平台
        }
        axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/setBuyerInBlackList`, params
        ).then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    this.props.modalmodelaction({blacklistvisible: false,})
                    this.props.form.setFieldsValue({blacklistContent: ''})

                    message.success(response.data.msg)
                    setTimeout(() => {
                        closeCurrentPage();
                    }, 1500)
                } else {
                    message.error(response.data.msg)
                }

            }
        }).catch(e => {
            console.log(e)
        })

    }

    // 审核不通过
    handleNoPass = (params) => {
        this.setState({
            loading: true
        })
        axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/examineOrder`,
            {
                ...{
                    orderId: this.props.Infos.orderId,
                    exceptionType: Number(this.props.Infos.abnormaltype[0]),
                    isPass: 1
                }, ...params
            }
        ).then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    this.props.modalmodelaction({auditvisible: false,})
                    message.success(response.data.msg)
                    setTimeout(() => {
                        closeCurrentPage();
                    }, 1500)
                } else {
                    message.error(response.data.msg)
                }
                this.setState({
                    loading: false
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }

    formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 20}
    }

    handleCancel = (visible) => () => this.props.modalmodelaction({[visible]: false,})

    // 审核通过
    handleSubmit = (e) => {
        typeof e == 'object' && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    loading: true,
                });
                const {
                    caCountry, city, consignee, countryAbb, customerService, discount, freight, orderPayment, payment,
                    phone, platformCommission, platformFee, province, socialAccount, street1, street2, tel, yksOrderNumber, zip,
                    email, platformCommissionCurrency, platformFeeCurrency, orderPaymentCurrency, discountCurrency, paymentCurrency,
                    freightCurrency, oiCountry, oiCountryName, auditRemark
                } = values
                const obj = {
                    caCountry,
                    city,
                    consignee,
                    countryAbb,
                    customerService,
                    discount,
                    freight,
                    orderPayment,
                    payment,
                    phone,
                    platformCommission,
                    platformFee,
                    province,
                    socialAccount,
                    street1,
                    street2,
                    tel,
                    yksOrderNumber,
                    zip,
                    email,
                    oiCountry,
                    oiCountryName,
                    auditRemark,
                    exceptionType: this.props.Infos.abnormaltype[0],
                    platformCommissionCurrency: platformCommissionCurrency || '',
                    platformFeeCurrency: platformFeeCurrency || '',
                    orderPaymentCurrency: orderPaymentCurrency || '',
                    discountCurrency: discountCurrency || '',
                    paymentCurrency: paymentCurrency || '',
                    freightCurrency: freightCurrency || '',
                };

                axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/updateAndSubmitOrderMessage`, obj)
                    .then(response => {
                        const state = response.data.state
                        if (state == '000001') {
                            this.setState({
                                loading: false,
                            });
                            message.success(`${response.data.msg}`);
                            this.props.modalmodelaction({auditvisible: false,})
                            setTimeout(() => {
                                closeCurrentPage();
                            }, 1500)
                        } else {
                            message.error(`${response.data.msg}`);
                        }
                    }).catch(e => {
                    console.log(e);
                })
            }
        });
    }

    /**
     * 返回上一页
     */
    returnprev = () => {
        // this.props.history.goBack();
        closeCurrentPage();
    }

    /**
     * 手工分仓
     */
    devanning = () => {
        const companyOrderId = this.props.form.getFieldValue('yksOrderNumber');
        const platformOrderId = this.props.form.getFieldValue('platformOrderId');
        this.props.devanningAPPaction({visible: true})
        return axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/sumProduct`, {companyOrderId, platformOrderId})
            .then(response => {
                if (response && response.data.state === '000001') {
                    const datas = response.data.order_separate;
                    let separateGoodsData = datas[0].separate_goods;
                    this.props.tablemodelaction2({
                        upper: separateGoodsData
                    })

                    let separate_goodsarr = datasaddkey(datas);
                    separate_goodsarr = separate_goodsarr.map(v => {
                        v.skuCode = v.separate_goods.map(k => k.skuCode)
                        v.skuCount = v.separate_goods.map(k => k.skuCount)
                        v.skuAffix = v.separate_goods.map(k => k.skuAffix)
                        // v.skuAffixType = v.separate_goods.map(k => k.skuAffixType)
                        return v
                    })
                    const newseparate_goodsarr = separate_goodsarr.length ? separate_goodsarr.map((v, i) => ({
                        key: v.key,
                        No: ++i,
                        // record: v,
                        warehouseCode: {
                            name: `warehouseCode${v.key}`,
                            message: '发货仓',
                            initialValue: v.warehouseCode,
                            placeholder: '发货仓',
                            readonly: false
                        },
                        channelCode: {
                            name: `channelCode${v.key}`,
                            message: '物流渠道',
                            initialValue: v.channelCode,
                            placeholder: '物流渠道',
                        },
                        skuCode: {
                            name: `skuCode${v.key}`,
                            message: '产品',
                            initialValue: v.skuCode,
                            placeholder: '产品',
                        },
                        skuCount: {
                            name: `skuCount${v.key}`,
                            message: '数量',
                            initialValue: v.skuCount,
                            placeholder: '数量',
                        },
                        recommend: {
                            name: `recommend${v.key}`,
                            message: '优选推荐',
                            initialValue: true,
                            placeholder: '优选推荐',
                        },
                        skuAffix: {
                            name: `skuAffix${v.key}`,
                            message: '前后缀',
                            initialValue: v.skuAffix,
                            placeholder: '前后缀',
                        },
                        Operation: '删除',
                    })) : []


                    this.props.devanningTableaction({
                        data: newseparate_goodsarr,
                        count: newseparate_goodsarr.length + 1
                    })


                    newseparate_goodsarr.forEach((v, i) => {
                        const num = v.warehouseCode.name.replace(/.*?(\d+)/g, '$1')
                        const skuCodevalue = v.skuCode.initialValue
                        const skuCountvalue = v.skuCount.initialValue || []
                        const skuAffixvalue = v.skuAffix.initialValue || []

                        const skuCode = v.skuCode.name
                        const skuCount = v.skuCount.name
                        const skuAffix = v.skuAffix.name
                        skuCountvalue.forEach((v, i) => {
                            const newskuCode = skuCode + '_' + i;
                            const newskuCount = skuCount + '_' + i;
                            const newskuAffix = skuAffix + '_' + i;
                            this.props.form.setFieldsValue({
                                [newskuCode]: skuCodevalue[i],
                                [newskuCount]: skuCountvalue[i],
                                [newskuAffix]: skuAffixvalue[i],
                            })
                        })
                        this.props.form.setFieldsValue({
                            [v.warehouseCode.name]: '',
                            [v.channelCode.name]: '',
                            ['channelCodeId' + num]: '',
                            ['warehouseCodeId' + num]: ''
                        })
                    })

                } else {
                    message.error(response.data.msg)
                }
            }).catch(e => {
                console.log(e);
            })
    }

    componentWillUnmount() {
        this.props.form.resetFields()
    }

    // 打开审核弹窗
    openAuditModal = () => {
        this.props.modalmodelaction({auditvisible: true,})
    }

    // 关闭审核弹窗
    closeAuditModal = () => {
        this.props.modalmodelaction({auditvisible: false,})
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const {isEditModel, menuInfos} = this.props
        const { loading } = this.state;
        var shrinkage = menuInfos.shrinkage
        const abnormaltypes = this.props.Infos ? this.props.Infos.abnormaltype : ''
        /**
         * 依据状态设置按钮
         */

        const buttons = (

            // 撤单恢复待审核状态的数据显示所有操作按钮 2019年4月27日15:51:34
            <Row className="exc-detail-footer-content" style={{textAlign: 'right'}}>
            
                {
                    isEditModel.is || abnormaltypes && abnormaltypes.includes(19) ?
                        <FormItem>
                            <Button
                                loading={loading}
                                className="margin-md-left"
                                onClick={this.openAuditModal}
                                disabled={this.hasErrors(getFieldsError())}>
                                审核
                            </Button>
                        </FormItem>
                        : null
                }

                {/* {
                    isEditModel.is && isEditModel.type != 9 || abnormaltypes && abnormaltypes.includes(19) ?
                        <FormItem>
                            <Button
                                loading={loading}
                                className="margin-md-left"
                                onClick={this.handleSubmit}
                                disabled={this.hasErrors(getFieldsError())}>
                                提交
                            </Button>
                        </FormItem>
                        : null
                }

                {
                    (isEditModel.is || abnormaltypes && abnormaltypes.includes(19)) && functions(this,'001-000002-000002-000001-002') ?
                        <FormItem>
                            <Button className="margin-md-left"
                                    onClick={this.handleNoPass}
                                    disabled={this.hasErrors(getFieldsError())}>
                                撤单
                            </Button>
                        </FormItem>
                        : null
                } */}

                {
                    (isEditModel.state === "分仓失败") && functions(this,'001-000002-000002-000001-007')?
                        <FormItem>
                            <Button
                                className="margin-md-left"
                                onClick={this.devanning}>手工分仓</Button>
                        </FormItem>
                        : null
                }

                {
                    abnormaltypes && abnormaltypes.includes(6) ?
                        <FormItem>
                            <Button
                                className="margin-md-left"
                                onClick={this.addBlacklist}>加入黑名单</Button>
                        </FormItem>
                        : null
                }

                {
                    abnormaltypes && abnormaltypes.includes(13) ?
                        <FormItem>
                            <Button className="margin-md-left"  onClick={() => {this.setState({feeVisible: true})}}>
                                费用维护
                            </Button>
                        </FormItem>
                        : null
                }

                <FormItem>
                    <Button className="margin-md-left"  onClick={this.returnprev}>
                        关闭
                    </Button>
                </FormItem>
            </Row>
        )

        /**
         * 黑名单弹窗
         */
        const blacklistContent = (
            <Row>
                <FormItem style={{"width": "100%"}}
                >
                    {getFieldDecorator('blacklistContent', {
                        rules: [{required: false, message: '请输入审核意见'}],
                    })(
                        <TextArea rows={4} style={{width: '100%'}} placeholder="请备注 加入黑名单的原因..."/>
                    )}
                </FormItem>
            </Row>
        )

        return (
                <div className="newClue exc-clue">
                    <div className="newCluewk">
                        <Spin spinning={this.state.formloading} delay={500} tip="Loading...">
                            <Form layout="inline">
                                <Type {...this.props} />
                                <OrderInfo {...this.props} />
                                <AmountInfo {...this.props} />
                                <ConsigneeAddress {...this.props} />
                                <Remarks {...this.props} />
                                <ProductInfo {...this.props} />
                                <DevanningAPP handleSubmitApp={this.handleSubmit} {...this.props}/>
                                <WarehouseOrder {...this.props} />
                                <Times {...this.props} />
                                <OrderLog {...this.props} />
                                <SearchValues {...this.props}/>

                                <div
                                    className={shrinkage ? "submit hover-btn exc-detail-footer" : "submit hover-btn exc-detail-footer exc-detail-footer-full"}>

                                    {buttons}

                                    {/* 黑名单弹窗 */}
                                    <Modalmodel  {...{
                                        ...this.props.modalmodel,
                                        visible: this.props.modalmodel.blacklistvisible,
                                        ModalText: blacklistContent
                                    }}
                                                 style={{marginTop: "120px"}}
                                                 onOk={this.handleblacklist}
                                                 confirmLoading={this.props.modalmodel.confirmLoading}
                                                 onCancel={this.handleCancel('blacklistvisible')}/>

                                    {/* 费用维护弹窗 */}
                                    <FeeModal
                                        visible={this.state.feeVisible}
                                        yksOrderId={this.props.Infos.orderId}
                                        closeModal={() => {this.setState({feeVisible: false})}}
                                    />
                                    <AuditModal
                                        {...this.props}
                                        visible={this.props.modalmodel.auditvisible}
                                        closeModal={this.closeAuditModal}
                                        handleSubmit={this.handleSubmit}
                                        handleNoPass={this.handleNoPass}
                                    />
                                </div>
                            </Form>
                        </Spin>
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

