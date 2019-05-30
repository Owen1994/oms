/**
 * 作者: 陈林
 * 描述: 分仓订单详情模块父组件
 * 时间: 2018/4/18 0018 下午 8:52
 **/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import FailureInfo from '../components/FailureInfo';    // 失败原因
import BasicInfo from '../components/BasicInfo';        // 基础信息
import AmountInfo from '../components/AmountInfo';      // 金额信息
import DeliverInfo from '../components/DeliverInfo';    // 实际发货信息
import ConsigneeInfo from '../components/ConsigneeInfo';    // 收货人信息
import ProductInfo from '../components/ProductInfo';    // 产品信息
import OrderLog from '../components/OrderLog';          // 订单日志
import AuditModal from '../components/AuditModal';      // 审核弹窗
// import Remarks from '../components/Remarks';            // 买家备注
import {
    Form,
    Button,
    Row,
    message,
    Spin,
    Input,
} from 'antd';
import '../css/css.css';
import axios from 'util/axios';
import * as config from 'util/connectConfig';
import { datasaddkey, timestampFromat,closeCurrentPage, getUrlParams, functions, getLoginmsg, } from 'util/baseTool';
import {fetchPost} from "util/fetch";
import {api_url} from "util/connectConfig";
import PopConfirm from "@/common/components/confirm";

const { TextArea } = Input;
const FormItem = Form.Item

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        formloading: true,
        cancelRecoverOptFlag: null,
        amountInfo: {},
        ifConsigneeInfoEditable: false,
        ifAllowRecover: 0,
        exceptionType: null,    // 异常类型，用于判断是否显示失败原因组件
        exceptionInfo: [],  // 失败原因组件数据
        auditVisible: false,    // 审核弹窗开关
    }

    fileListhanddle = (list) => {
        return list ? list.split('@').map((v, i) => ({
            uid: i,
            name: `${i}`,
            status: 'done',
            url: `${v}`,
        })) : []
    }


    componentDidMount() {
        const urlParams = getUrlParams(location.href);
        const orderId = urlParams.orderId ? urlParams.orderId : '';
        // 是否为推送失败、待审核或已撤单这三个状态，若是，允许修改收件人信息
        const ifConsigneeInfoEditable = urlParams.ifConsigneeInfoEditable ? urlParams.ifConsigneeInfoEditable : undefined;
        const exceptionType = urlParams.exceptionType;
        if (ifConsigneeInfoEditable) {
            this.setState({
                ifConsigneeInfoEditable: true
            });
        }
        if (exceptionType) {
            this.setState({
                exceptionType,
            });
        }

        if (orderId) {
            axios.post(`${config.api_url}/oms/order/manage/motan/IPackageApi/getPackageDetail`, {
                orderId: orderId
            }).then(response => {

                if (response.status == 200) {
                    if (response.data.state == "000001") {

                        // 失败原因
                        this.setState({ exceptionInfo: response.data.data.exceptionInfo.map(item => item.exceptionContent).join('、') });
                        
                        // 基本信息取值
                        const {
                            platformOrderNumber, yksOrderNumber, warehouseOrderNumber, name, distribution, logisticsBusiness,
                            orderStatus, account, isProfit, warehouseOrderState, trackName, cancelRecoverOptFlag,
                            isFaraway,  //是否偏远地区
                            trialFreightCurrency,
                            remoteFee,  // 附加费
                            grabTime,
                        } = response.data.data.basicinnfo;

                        // 是否允许撤单标识
                        const { ifAllowRecover } = response.data.data;

                        this.setState({ cancelRecoverOptFlag, ifAllowRecover });

                        // 金额信息 - 不使用双向绑定，直接用props传入
                        this.setState({ amountInfo: response.data.data.amountInfo });
                        // 实际发货信息取值
                        const {
                            outerOrdersId, state, warehouseDeliver, logisticsNumber, waybillNumber1, waybillNumber2,
                            weight, freight, customerService, logisticsSurface,
                        } = response.data.data.deliverInfo;
                        this.props.Infos.logisticsSurface = logisticsSurface || '';
                        // 收货人信息取值
                        const {
                            consignee, email, tel, mobilephone, country, countryAdd, province, city, userName, zip, street1, street2, 
                            // buyerMessage,
                        } = response.data.data.consigneeInfo;

                        // 买家备注
                        // const {leaveMessageList = []} = response.data.data
                        // leaveMessageList.sort((a, b) => (b.createDate - a.createDate))
                        // const leaveMessageListarr = datasaddkey(leaveMessageList)
                        // this.props.tablemodelaction7({data: leaveMessageListarr})

                        // 所有信息模块字段赋值
                        this.props.form.setFieldsValue({
                            platformOrderNumber,
                            yksOrderNumber,
                            warehouseOrderNumber,
                            name,
                            distribution,
                            logisticsBusiness,
                            basicinnfoLogisticsNumber: response.data.data.basicinnfo.logisticsNumber,
                            orderStatus,
                            account,
                            isProfit,
                            isFaraway,  //是否偏远地区
                            remoteFee: `${trialFreightCurrency} ${remoteFee}`, // 附加费
                            paymentTime: timestampFromat(response.data.data.basicinnfo.paymentTime, 2),
                            warehouseOrderState,
                            trackName,
                            outerOrdersId,
                            state,
                            logisticsBusinessa: response.data.data.deliverInfo.logisticsBusiness,
                            logisticsNumber,
                            warehouseDeliver,
                            waybillNumber1,
                            waybillNumber2,
                            weight: `${weight === undefined ? "0" : weight}g`,
                            freight,
                            customerService,
                            deliverTime: timestampFromat(response.data.data.deliverInfo.deliverTime, 2),
                            consignee,
                            email,
                            tel,
                            mobilephone,
                            country,
                            countryAdd,
                            province,
                            city,
                            userName,
                            zip,
                            street1,
                            street2,
                            grabTime: grabTime ? timestampFromat(grabTime, 2) : null,
                            // buyerMessage,
                        });
                        /**
                         * 作者：陈林
                         * 描述：产品信息
                         * 时间：
                         */
                        const productInfo = response.data.data.goods;
                        const productInfoarr = datasaddkey(productInfo);
                        const newproductInfoarr = productInfoarr.length ? productInfoarr.map((v, i) => {
                            return ({
                                key: ++i + '',
                                No: i + '',
                                record: v,
                                upper: productInfoarr,
                                logisticsProperty: v.logisticsProperty,
                                image: {
                                    name: `image${v.key}`,
                                    initialValue: this.fileListhanddle(v.image.replace(/^http[s]?\:/, '')),
                                    message: '请上传图片',
                                    placeholder: '',
                                },
                                sku: {
                                    name: `sku${v.key}`,
                                    initialValue: v.sku,
                                    message: '请输入sku',
                                    placeholder: '',
                                },
                                costPrice: {
                                    name: `costPrice${v.key}`,
                                    initialValue: `CNY ${v.costPrice}`,
                                    message: '请输入成本价',
                                    placeholder: '',
                                },
                                weight: {
                                    name: `weight${v.key}`,
                                    initialValue: `${v.weight}g`,
                                    message: '请输入净重',
                                    placeholder: '',
                                },
                                productsPlace: {
                                    name: `productsPlace${v.key}`,
                                    initialValue: v.productsPlace,
                                    message: '请输入储位',
                                    placeholder: '',
                                },
                                salePrice: {
                                    name: `salePrice${v.key}`,
                                    initialValue: `${v.salePriceCurrency} ${v.salePrice}`,
                                    message: '请输入销售单价',
                                    placeholder: '',
                                },
                                salenum: {
                                    name: `salenum${v.key}`,
                                    initialValue: v.salenum,
                                    message: '请输入销售数量',
                                    placeholder: '',
                                },
                                totalMoney: {
                                    name: `totalMoney${v.key}`,
                                    initialValue: `${v.salePriceCurrency} ${v.totalMoney.toFixed(2)}`,
                                    message: '请输入总销售金额',
                                    placeholder: '',
                                }
                            })
                        }) : []

                        this.props.tablemodelaction2({ data2: newproductInfoarr, count: newproductInfoarr.length + 1, })
                        /**
                         * 作者：陈林
                         * 描述：操作日志
                         * 时间：
                         */
                        // const operationlog = response.data.data.operationlog;
                        // const newoperationlog = operationlog.length ? operationlog.map((v, i) => {

                        //     return ({
                        //         key: v.id,
                        //         No: ++i + '',
                        //         attribute: v.attribute,
                        //         msg: v.msg,
                        //         userName: v.userId,
                        //         userId: v.userId,
                        //         time: timestampFromat(v.time, 2),
                        //     })
                        // }) : []
                        // this.props.tablemodelaction5({ data: newoperationlog, count: newoperationlog.length + 1, })

                    } else {
                        message.error(response.data.msg);
                    }
                }
                this.setState({
                    formloading: false,
                })
            }).catch(e => {
                this.setState({ formloading: false });
            })

            // 请求日志信息
            const params = {
                orderId,
                pageNumber: 1,
                pageData: 20,
            };
            this.props.queryLog(params);
        } else {
            this.setState({ formloading: false })
        }

    }


    /**
     * 返回按钮
     */
    returnprev = () => {
        this.props.history.goBack();
        closeCurrentPage();
    }
    /**
     * 恢复订单
     **/
    changePackage = (type, code)=>{
        const params = {packageCode: code};
        if(type === 'recoverPackage'){
            return fetchPost(`${api_url}/oms/order/manage/motan/IPackageApi/recoverPackage`, params, 2)
                .then(res=>{
                    if(res && res.state === "000001"){
                        message.success(res.msg);
                        location.href = '/order/deliveryparcellist/'
                    }
                })
        }
    }

    /**
     * 审核
     * type存在   待审包裹、渠道异常、缺货包裹的审核
     * type不存在   其他分仓订单状态的审核
     */
    handleAudit = () => {
        const { getFieldsValue, resetFields, getFieldValue } = this.props.form;
        const packageCode = getFieldValue('warehouseOrderNumber');
        const auditData = getFieldsValue(['auditRemark', 'auditStatus', 'revokeType']);
        const value = {
            packageList: [{
                auditPerson: getLoginmsg().name,
                packageCode: packageCode,
                ...auditData,
            }]
        };
        const url = '/oms/order/manage/motan/IPackageApi/examineDeficitPackage';
        axios.post(`${config.api_url}${url}`, value ).then(response => {
            if (response.status == 200) {
                if (response.data.state == '000001') {
                    message.success(`${response.data.msg}，即将离开本页面`);
                    this.props.modalmodelaction({auditvisible: false,});
                    resetFields(['auditRemark', 'auditStatus', 'revokeType']);
                    setTimeout(() => {
                        location.href = `/order/deliveryparcellist/`;
                    }, 1500);
                } else {
                    message.error(`${response.data.msg}`);
                }
            }
        }).catch(e => {
            console.log(e)
        })
    }

    // 打开审核弹窗
    openAuditModal = () => {
        this.setState({ auditVisible: true })
    }

    // 关闭审核弹窗
    closeAuditModal = () => {
        this.setState({ auditVisible: false })
    }

    render() {
        const { menuInfos } = this.props
        const { getFieldValue } = this.props.form
        const warehouseOrderNumber = getFieldValue("warehouseOrderNumber");
        const warehouseOrderState = getFieldValue('warehouseOrderState');
        const shrinkage = menuInfos.shrinkage;
        const {
            cancelRecoverOptFlag,
            amountInfo,
            ifConsigneeInfoEditable,
            formloading,
            ifAllowRecover,
            exceptionType,
            exceptionInfo,
            auditVisible,
        } = this.state;
        const auditFlag = exceptionType && Number(exceptionType) !== 0;
        return (
            <div className="newClue">
                <div className="newCluewk deliveryParcel margin-bottom-60">
                    <Spin spinning={formloading} delay={500} tip="Loading...">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            {
                                // 只要exceptionType不是null或者0，都显示失败原因组件
                                auditFlag ? <FailureInfo {...this.props} exceptionInfo={exceptionInfo} /> : null
                            }
                            <BasicInfo {...this.props} />
                            <AmountInfo {...this.props} amountInfo={amountInfo} />
                            <DeliverInfo {...this.props} />
                            <ConsigneeInfo {...this.props} ifConsigneeInfoEditable={ifConsigneeInfoEditable} />
                            {/* <Remarks {...this.props} /> */}
                            <ProductInfo {...this.props} />
                            <OrderLog {...this.props} />
                            <div
                                className={shrinkage ? "submit hover-btn exc-detail-footer" : "submit hover-btn exc-detail-footer exc-detail-footer-full"}>
                                <Row className="exc-detail-footer-content text-right">
                                    <FormItem>

                                        {/* 待审包裹的审核按钮 */}
                                        {
                                            warehouseOrderState === '待审核' ?    //  && functions(this, '001-000003-000001-000001-003') ? 
                                                <Button
                                                    className="margin-ms-right"
                                                    onClick={() => this.openAuditModal()}>
                                                    审核
                                                </Button>
                                                : null
                                        }

                                        {/* 其他分仓订单状态的撤单按钮 */}
                                        {
                                            cancelRecoverOptFlag === 1 ?
                                                <Button
                                                    className="margin-ms-right"
                                                    onClick={() => this.openAuditModal()}>
                                                    撤单
                                                </Button>
                                                : null
                                        }

                                        {
                                            Number(ifAllowRecover) === 1 ?
                                                <Button className="margin-ms-right" onClick={() => PopConfirm('是否需要恢复订单？', '',() => this.changePackage('recoverPackage', warehouseOrderNumber))}>
                                                    恢复订单
                                                </Button>
                                                : null
                                        }

                                        <Button onClick={this.returnprev}>
                                            关闭
                                        </Button>
                                    </FormItem>
                                </Row>
                            </div>
                            <AuditModal
                                {...this.props}
                                visible={auditVisible}
                                closeModal={this.closeAuditModal}
                                handleAudit={this.handleAudit}
                                auditFlag={auditFlag}
                            />
                        </Form>
                    </Spin>
                </div>
            </div>
        );
    }
}


export default connect(state => ({ ...state }), dispatch => bindActionCreators(actions, dispatch))(
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