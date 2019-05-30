import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import moment from 'moment'
import qs from 'qs'
import AddresseeInfo from '../components/AddresseeInfo'
import BasicInfo from '../components/BasicInfo'
import AmountInfo from '../components/AmountInfo'
import DeliverInfo from '../components/DeliverInfo'
import ConsigneeInfo from '../components/ConsigneeInfo'
import ProductInfo from '../components/ProductInfo'
import OrderLog from '../components/OrderLog'
import Modalmodel from '@/components/modalmodel';
import {
    Form,
    Button,
    Row,
    message,
    Radio,
    Spin,
    Input,
    Select,
} from 'antd'
import '../css/css.css'


const {TextArea} = Input;
const FormItem = Form.Item
import axios from 'util/axios'
import * as config from 'util/connectConfig'
import {getUrlParams, datasaddkey, timestampFromat, getLoginmsg, functions, closeCurrentPage} from 'util/baseTool';

const RadioGroup = Radio.Group;
const Option = Select.Option;

// 撤单类型
const revokeTypeArr = [
    { value: '1', name: '客服撤单' },
    { value: '2', name: '渠道变更'},
    { value: '3', name: '买家信息变更'},
    { value: '4', name: 'SKU变更' },
    { value: '5', name: 'SKU缺货'},
    { value: '6', name: '超期订单'},
    { value: '7', name: '重量超出渠道限制' },
    { value: '8', name: '亏本撤单'},
    { value: '9', name: '黑名单撤单'},
    { value: '10', name: '无渠道' },
    { value: '11', name: '平台撤单'},
    { value: '12', name: '转仓撤单'},
    { value: '13', name: 'SKU下架' },
    { value: '14', name: '其它'},
];

class UserForm extends Component {

    state = {
        formloading: true,
        amountInfo: {},
        ifConsigneeInfoEditable: false,
        exceptionInfo: [],
    }    
    
    formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 18}
    };

    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    fileListhanddle = (list) => {
        return list ? list.split('@').map((v, i) => ({
            uid: i,
            name: `${i}`,
            status: 'done',
            url: `${v}`,
        })) : []
    }

    componentDidMount() {

        const orderId = getUrlParams(location.href).orderId ? getUrlParams(location.href).orderId : '';
        // 是否为推送失败、待审核或已撤单这三个状态，若是，允许修改收件人信息
        const ifConsigneeInfoEditable = getUrlParams(location.href).ifConsigneeInfoEditable ? getUrlParams(location.href).ifConsigneeInfoEditable : undefined;
        if (ifConsigneeInfoEditable) {
            this.setState({ ifConsigneeInfoEditable: true });
        }

        if (orderId) {
            axios.post(`${config.api_url}/oms/order/manage/motan/IPackageApi/getPackageDetail`, {
                orderId: orderId
            }).then(response => {

                if (response.status == 200) {
                    if (response.data.state == "000001") {
                        /**
                         * 作者：陈林
                         * 描述：基本信息
                         * 时间：
                         */
                        const {
                            platformOrderNumber, yksOrderNumber, warehouseOrderNumber, name, distribution, logisticsBusiness,
                            orderStatus, trialFreightCurrency, account, isProfit,
                            warehouseOrderState, trackName,remoteFee,
                            isFaraway,  //是否偏远地区
                            grabTime,
                        } = response.data.data.basicinnfo;
                        /**
                         * 金额信息 - 不使用双向绑定，直接用props传入
                         */
                        this.setState({ amountInfo: response.data.data.amountInfo });
                        /**
                         * 作者：陈林
                         * 描述：实际发货信息
                         * 时间：
                         */
                        const {
                            outerOrdersId, state, warehouseDeliver, logisticsNumber, waybillNumber1, waybillNumber2,
                            weight, freight, customerService, logisticsSurface,
                        } = response.data.data.deliverInfo;
                        this.props.Infos.logisticsSurface = logisticsSurface || '';
                        /**
                         * 作者：陈林
                         * 描述：收货人信息
                         * 时间：
                         */
                        const {
                            consignee, email, tel, mobilephone, country, countryAdd, province, city, userName, zip, street2, street1,
                        } = response.data.data.consigneeInfo;
                        const productInfo = response.data.data.goods;
                        const productInfoarr = datasaddkey(productInfo);
                        /**
                         * 异常信息
                         */
                        this.setState({ exceptionInfo: response.data.data.exceptionInfo.map(item => item.exceptionContent).join('、') });

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
                            street2,
                            street1,
                            grabTime: grabTime ? timestampFromat(grabTime, 2) : null,
                        });
                        /**
                         * 作者：陈林
                         * 描述：产品信息
                         * 时间：
                         */
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
                        this.props.tablemodelaction2({data2: newproductInfoarr, count: newproductInfoarr.length + 1,})
                        /**
                         * 作者：陈林
                         * 描述：操作日志
                         * 时间：
                         */
                        const operationlog = response.data.data.operationlog;
                        const newoperationlog = operationlog.length ? operationlog.map((v, i) => {
                            return ({
                                key: v.id,
                                No: ++i + '',
                                attribute: v.attribute,
                                msg: v.msg,
                                userName: v.userId,
                                userId: v.userId,
                                time: timestampFromat(v.time, 2),
                            })
                        }) : []
                        this.props.tablemodelaction5({data: newoperationlog, count: newoperationlog.length + 1,})
                    } else {
                        message.error(response.data.msg);
                    }
                }
                this.setState({formloading: false})
            }).catch(e => {
                this.setState({formloading: false});
            })
        } else {
            this.setState({formloading: false})
        }

    }

    /**
     * 关闭弹窗
     * visible <Boolean> ture显示false隐藏
     */
    handleCancel = (visible) => () => this.props.modalmodelaction({[visible]: false,})

    /**
     * 返回按钮
     */
    returnprev = () => {
        closeCurrentPage();
    }

    /**
     * 显示审核弹窗
     */
    handleAuditModalOpen = () => {
        this.props.modalmodelaction({auditvisible: true,})
    }

    /**
     * 审核
     */
    handleOk = () => {
        const { getFieldsValue, resetFields, getFieldValue } = this.props.form;
        const packageCode = getFieldValue('warehouseOrderNumber');
        const auditData = getFieldsValue(['auditRemark', 'auditStatus', 'revokeType']);
        const value = {
            packageList: [{
                auditPerson: getLoginmsg().name,
                packageCode: packageCode, ...auditData,
            }]
        };
        axios.post(`${config.api_url}/oms/order/manage/motan/IPackageApi/examineDeficitPackage`,
            value
        ).then(response => {

            if (response.status == 200) {
                if (response.data.state == '000001') {
                    message.success(`${response.data.msg}，即将离开本页面`);
                    this.props.modalmodelaction({auditvisible: false,});
                    resetFields(['auditRemark', 'auditStatus', 'revokeType']);
                    setTimeout(() => {
                        location.href = `/order/negativeprofitauditlist/`;
                    }, 1500);
                } else {
                    message.error(`${response.data.msg}`);
                }
            }
        }).catch(e => {
            console.log(e)
        })

    }

    render() {
        const {menuInfos} = this.props
        const shrinkage = menuInfos.shrinkage
        const { getFieldDecorator, getFieldsError, getFieldValue } = this.props.form;
        const {
            formloading,
            exceptionInfo,
            amountInfo,
            ifConsigneeInfoEditable,
        } = this.state;

        const buttons = functions(this, '001-000003-000002-000001-002') ? <FormItem className="padding-md-right">
            <Button onClick={this.handleAuditModalOpen} disabled={this.hasErrors(getFieldsError())}>
                审核
            </Button>
        </FormItem> : null

        const contents = <div className="text-left profit">
            <Row className="profit-title">
                <p className="text-danger">请注意：</p>
                <p className="text-danger">审核通过之后，订单将继续执行后续流程，审核不通过，订单将置为撤单状态！</p>
            </Row>
            <Row>
                <FormItem  {...this.formItemLayout} label="审核结论" className="padding-right auditmodal-result">
                    {
                        getFieldDecorator('auditStatus', {
                            rules: [{
                                required: false,
                                message: `请选择`
                            }], initialValue: 2
                        })(
                            <RadioGroup>
                                <Radio value={2}>通过</Radio>
                                <Radio value={0}>不通过</Radio>
                            </RadioGroup>
                        )
                    }
                    
                    {
                        getFieldValue('auditStatus') === 0 ?
                            <div className="auditmodal-div">
                                <span className="auditmodal-span"></span>
                                {
                                    getFieldDecorator('revokeType', {
                                        initialValue: '6',
                                        rules: [{ require: true, message: '请选择撤单类型'}],
                                    })(
                                        <Select>
                                            {
                                                revokeTypeArr.map(v => <Option key={v.value} value={v.value}>{v.name}</Option>)
                                            }
                                        </Select>
                                    )
                                }
                            </div>
                        : null
                    }
                </FormItem>
            </Row>
            <Row>
                <FormItem
                    label="审核意见"  {...this.formItemLayout} className="width-100">
                    {getFieldDecorator('auditRemark', {
                        rules: [{required: false, message: '请输入审核意见'}],
                    })(
                        <TextArea rows={4} className="width-100" placeholder="请输入审核意见"/>
                    )}
                </FormItem>
            </Row>
        </div>

        return (
            <div className="newClue">
                <div className="newCluewk deliveryParcel">
                    <Spin spinning={formloading} delay={500} tip="Loading...">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            {
                                exceptionInfo.length > 0 ? (
                                    <AddresseeInfo {...this.props} exceptionInfo={exceptionInfo} />
                                ) : null
                            }
                            <BasicInfo {...this.props} />
                            <AmountInfo {...this.props} amountInfo={amountInfo} />
                            <DeliverInfo {...this.props} />
                            <ConsigneeInfo {...this.props} ifConsigneeInfoEditable={ifConsigneeInfoEditable} />
                            <ProductInfo {...this.props} />
                            <OrderLog {...this.props} />
                            <div
                                className={shrinkage ? "submit hover-btn exc-detail-footer" : "submit hover-btn exc-detail-footer exc-detail-footer-full"}>
                                <Row className="exc-detail-footer-content text-right">
                                    {buttons}
                                    <FormItem>
                                        <Button onClick={this.returnprev}>
                                            关闭
                                        </Button>
                                    </FormItem>

                                    {/* 审核弹窗 */}
                                    <Modalmodel
                                        {...{
                                        ...this.props.modalmodel,
                                        visible: this.props.modalmodel.auditvisible,
                                        ModalText: contents,
                                        title: '审核'
                                    }}
                                         onOk={this.handleOk}
                                         confirmLoading={this.props.modalmodel.confirmLoading}
                                         onCancel={this.handleCancel('auditvisible')}/>
                                </Row>
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
