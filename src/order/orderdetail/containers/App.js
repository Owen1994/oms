import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import '../css/css.css'
import OrderInfo from '../components/OrderInfo'
import AmountInfo from '../components/AmountInfo'
import Times from '../components/Times'
import ConsigneeAddress from '../components/ConsigneeAddress'
import Remarks from "../components/remarks"
import ProductInfo from '../components/ProductInfo'
import WarehouseOrder from '../components/WarehouseOrder'
import OrderLog from '../components/OrderLog'
import {Link} from 'react-router-dom'
import Modalmodel from '@/components/modalmodel';
import axios from 'util/axios'
import * as config from 'util/connectConfig'
import {
    getUrlParams,
    timestampFromat,
    datasaddkey,
    closeCurrentPage,
} from 'util/baseTool';
import PopConfirm from "@/common/components/confirm";
import { fetchPost } from 'util/fetch';

import {
    Form,
    Button,
    Row,
    message,
    Spin,
} from 'antd';

const FormItem = Form.Item

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        formloading: true,
        ifAllowRecover: 0,
    }

    // fileListhanddle = (list) => {
    //     return list ? list.split('@').map((v, i) => ({
    //         uid: i,
    //         name: `${i}`,
    //         status: 'done',
    //         url: `${v}`,
    //     })) : []
    // }

    componentDidMount() {
        const { orderId } = getUrlParams('');
        if (orderId) {
            axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getOrderDetail`, { orderId })
                .then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {

                        // 根据接口字段判断是否显示恢复按钮
                        this.setState({ ifAllowRecover: response.data.data.ifAllowRecover ? response.data.data.ifAllowRecover : 0 });

                        // 基础资料
                        const {
                            platformOrderId, marketAccount, yksOrderNumber, orderState, orderType, platformName, oiCountryName, oiCountry,  buyerAccount,
                            customerService, logisticsBusiness, trackingNumber, isClickFarming,
                        } = response.data.data.orderInfo;

                        // 金额信息
                        const {
                            orderAmount,saleAmount,freightChargesAmount,buyerPaymentAmount,
                            excellentCostAmount,sellerAdjustAmount,sellerIncomeAmount,platformTradeAmount,
                            sellerIncomeFreight,rate,payway,
                            orderAmountCurrency, saleAmountCurrency, freightChargesAmountCurrency, buyerPaymentAmountCurrency,
                            excellentCostAmountCurrency,sellerAdjustAmountCurrency,sellerIncomeAmountCurrency, platformTradeAmountCurrency,
                            sellerIncomeFreightCurrency	
                        } = response.data.data.amountInfo;

                        // 时间信息
                        const {
                            grabTime, timeImport, timeWarehouse, timeDeliver, timeStateUpdate, timeOrder, timePayment,
                        } = response.data.data.times;

                        // 收货人地址信息
                        const {
                            consignee, caCountry, countryAbb, zip, tel, phone, email, socialAccount, province, city, county, town, address, buyerMessage, street2, street1
                        } = response.data.data.ConsigneeAddress;

                        // 时间格式处理
                        const newgrabTime = grabTime ? timestampFromat(grabTime, 2) : '';
                        const newtimeImport = timeImport ? timestampFromat(timeImport, 2) : null;
                        const newtimeWarehouse = timeWarehouse ? timestampFromat(timeWarehouse, 2) : null;
                        const newtimeDeliver = timeDeliver ? timestampFromat(timeDeliver, 2) : null;
                        const newtimeStateUpdate = timeStateUpdate ? timestampFromat(timeStateUpdate, 2) : null;
                        const newtimeOrder = timeOrder ? timestampFromat(timeOrder, 2) : null;
                        const newtimePayment = timePayment ? timestampFromat(timePayment, 2) : null;

                        // 回显
                        this.props.form.setFieldsValue({
                            platformOrderId,
                            marketAccount,
                            yksOrderNumber,
                            orderState,
                            orderType,
                            platformName,
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
                            logisticsBusiness,
                            trackingNumber,
                            isClickFarming: isClickFarming === 1 ? '是' : (isClickFarming === 0 ? '否' : null),
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
                            city,
                        });

                        // 商品信息
                        const productInfo = response.data.data.productInfo;
                        const productInfoarr = datasaddkey(productInfo)
                        const newproductInfoarr = productInfoarr.length ? productInfoarr.map((v, i) => {
                            return ({
                                key: ++i + '',
                                No: i + '',
                                record: v,
                                upper: productInfoarr,
                                img: {
                                    name: `img${v.key}`,
                                    // initialValue: this.fileListhanddle(v.img.replace(/^http[s]?\:/, '')),
                                    initialValue: v.img,
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
                        this.props.tablemodelaction2({data2: newproductInfoarr, count: newproductInfoarr.length + 1,})
                        this.props.baseInfoForm({orderId: orderId})

                        // 分仓订单
                        const warehouseOrder = response.data.data.warehouseOrder;
                        const warehouseOrderarr = datasaddkey(warehouseOrder)
                        var newwarehouseOrder = warehouseOrderarr.map((v, k) => {
                            v.No = k + 1
                            v.skuNum = v.sku.map(val => {
                                return val.skuNum + " * " + val.skuId
                            })
                            return v
                        })
                        this.props.tablemodelaction({data: newwarehouseOrder, count: newwarehouseOrder.length + 1,})

                        // 买家留言
                        this.props.leaveMessageListAction({
                            data: response.data.data.leaveMessageList,
                            leaveMessage: buyerMessage
                        })

                        // 订单日志
                        const orderLog = response.data.data.orderLog;
                        const neworderLog = orderLog.length ? orderLog.map((v, i) => {

                            return ({
                                key: v.id,
                                No: ++i + '',
                                attribute: v.attribute,
                                msg: v.msg,
                                userName: v.userName,
                                userId: v.userId,
                                time: timestampFromat(v.time, 2),
                            })
                        }) : []
                        this.props.tablemodelaction5({data: neworderLog, count: neworderLog.length + 1,})

                        // 暂时不清楚用在哪里
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
                        this.props.baseInfoForm(allcitys);
                        // 暂时不知道这里有什么用


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

    // 关闭当前页面
    returnprev = () => {
        this.props.history.goBack();
        closeCurrentPage();
    }

    // 提交
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
                    freightCurrency, oiCountry, oiCountryName
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
                        this.setState({
                            loading: false,
                        });
                        if (state == '000001') {
                            message.success(`${response.data.msg}`);
                            setTimeout(() => {
                                this.props.modalmodelaction({auditvisible: false,})
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

    // 点击撤单按钮
    handleNoPass = () => {
        this.props.modalmodelaction({auditvisible: true, title: "撤单", ModalText: "是否确认撤销选中订单？", isPass: 1})
    }

    // 撤单弹窗--取消按钮
    handleCancel = (visible) => () => this.props.modalmodelaction({[visible]: false,})

    // 撤单弹窗--确认按钮
    handleRevoke = () => {
        axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/examineOrder`,
            {
                orderId: this.props.Infos.orderId,
                exceptionType: Number(this.props.Infos.abnormaltype[0]),
                isPass: this.props.modalmodel.isPass
            }
        ).then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    this.props.modalmodelaction({auditvisible: false,})
                    this.props.form.setFieldsValue({content: '', isPass: 0})

                    message.success(response.data.msg)
                    setTimeout(() => {
                        this.props.history.goBack()
                    }, 1500)
                } else {
                    message.error(response.data.msg)
                }
            }
        }).catch(e => {
            console.log(e)
        })
    }

    // 恢复订单
    handleRecover = () => {
        const { orderId } = this.props.Infos;
        fetchPost('/oms/order/manage/motan/ICompanyOrderManageApi/recoverOrder', { data: {orderId} }, 1)
            .then(res => {
                if(res.state === '000001'){
                    // 成功后关闭当前详情页
                    setTimeout(() => {
                        this.props.history.goBack()
                    }, 1500)
                }
            })
    }

    // 产品信息提交
    handleProductSubmit = () => {
        const { orderId } = this.props.Infos;
        const { data2 } = this.props.tablemodel2;
        const newData = data2.map(v => JSON.parse(JSON.stringify(v.record)));   // 对象深拷贝
        newData.map(v => {
            for(var i in v) {
                if(i === 'sku') {
                    v.skuCode = v.sku;
                    delete v.sku;
                }
                if(i === 'name') {
                    v.skuChinese = v.name;
                    delete v.name;
                }
                if(i === 'unit') {
                    v.productSalePrice = v.unit;
                    delete v.unit;
                }
                if(i === 'num') {
                    v.productQuantity = v.num;
                    delete v.num;
                }
                if(i === 'currency') {
                    v.productSaleCurrency = v.currency;
                    delete v.currency;
                }
            }
        })
        const params = {
            companyOrdersId: orderId,
            order_goods: newData,
        }
        fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/readdProduct', { data: params }, 1)
            .then(res => {
                if(res.state === '000001'){
                    // 成功后关闭当前详情页
                    setTimeout(() => {
                        closeCurrentPage();
                    }, 1500)
                }
            })
    }

    render() {
        const {menuInfos, Infos} = this.props
        const orderState = Infos.orderState && Infos.orderState.value ? Infos.orderState.value : null;
        const shrinkage = menuInfos.shrinkage;
        const { ifAllowRecover } = this.state;
        const updateProductFlag = getUrlParams(location.href).updateProductFlag;
        return (
            <div className="newClue exc-clue">
                <div className="newCluewk">
                    <Spin spinning={this.state.formloading} delay={500} tip="Loading...">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            
                            <OrderInfo {...this.props} />
                            <AmountInfo {...this.props} />
                            <Times {...this.props} />
                            <ConsigneeAddress {...this.props} />
                            <Remarks {...this.props} />
                            <ProductInfo {...this.props} updateProductFlag={updateProductFlag} />
                            <WarehouseOrder {...this.props} />
                            <OrderLog {...this.props} />

                            <div className={shrinkage ? "submit hover-btn exc-detail-footer" : "submit hover-btn exc-detail-footer exc-detail-footer-full"}>
                                <Row className="exc-detail-footer-content textRight">

                                    { orderState === '待确认' || orderState === '待分仓' || Number(updateProductFlag) === 1 ?
                                        <FormItem>
                                            <Button className="margin-md-left" onClick={Number(updateProductFlag) === 1 ? this.handleProductSubmit : this.handleSubmit}>
                                                提交
                                            </Button>
                                        </FormItem> : null
                                    }

                                    { orderState === '已分仓' || orderState === '待确认' || orderState === '待分仓' || orderState === '已撤单' ? null :
                                        <FormItem>
                                            <Button className="margin-md-left" onClick={this.handleNoPass}>
                                                撤单
                                            </Button>
                                        </FormItem>
                                    }

                                    { ifAllowRecover === 0 ? null :
                                        <FormItem>
                                            <Button className="margin-md-left" onClick={() => PopConfirm('是否恢复此订单？', '', this.handleRecover)}>
                                                恢复订单
                                            </Button>
                                        </FormItem>
                                    }

                                    <FormItem>
                                        <Button className="margin-md-left" onClick={this.returnprev}>
                                            关闭
                                        </Button>
                                    </FormItem>

                                </Row>

                                {/* 撤单弹窗 */}
                                <Modalmodel  {...{
                                    ...this.props.modalmodel,
                                    visible: this.props.modalmodel.auditvisible,
                                }}
                                             style={{marginTop: "120px"}}
                                             onOk={this.handleRevoke}
                                             confirmLoading={this.props.modalmodel.confirmLoading}
                                             onCancel={this.handleCancel('auditvisible')}/>

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

