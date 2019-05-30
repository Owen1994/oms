/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--异常订单--详情页--基础资料
 *参数说明:
 *时间: 2018/5/29 15:47
 */
import React from 'react'
import {selectValues} from '../../../util/baseTool'
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    message,
} from 'antd'
import '../css/css.css'

const FormItem = Form.Item

class OrderInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        isEdit:false
    }
    formItemLayout = {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    }

    formItemLayout2 = {
        labelCol: {span: 0},
        wrapperCol: {span: 24}
    }
    handleEditsave =()=>{

        var {logisticsAmendAction,isEditModel} = this.props;
        var { getFieldsValue } = this.props.form
        var data = getFieldsValue(["logisticsBusiness","yksOrderNumber","trackingNumber"])
        let type = isEditModel.type ;
        if(isEditModel.type === 12 && !data.trackingNumber){
            return message.warning("请输入正确物流追踪号")
        }
        if(isEditModel.type === 9 && !data.logisticsBusiness){
            return message.warning("请选择正确物流渠道")
        }
        var params = {
            // logisticsName:data.logisticsBusiness,
            orderId:data.yksOrderNumber,
            type,
        }
        if(type === 9){
            params.logisticsName = data.logisticsBusiness
        }else if(type === 12) {
            params.trackingNumber = data.trackingNumber
        }
        logisticsAmendAction(params)
        .then(result=>{
            if(result){
                this.setState({
                    isEdit:false
                })
            }
        })
    }
    handleEdit =()=>{
        this.setState({
            isEdit:true
        })
    }
    render() {

        const {getFieldDecorator} = this.props.form;
        const {isEditModel} = this.props
        var edit = false
        var {isEdit} = this.state
        return (
            <div className="newCluenk deliveryParcel padTop10">
                <div className="title pr">
                    基础资料
                    {
                        isEditModel.type === 9 || isEditModel.type === 12 ?
                        isEdit?
                        <Button className="editable-add-btn" onClick={this.handleEditsave}>{"保存"}</Button>
                        :<Button className="editable-add-btn" onClick={this.handleEdit}>{"修改"}</Button>
                        :null
                    }
                </div>
                <div className="content">
                    <Row>
                        <Col span={6}>

                            <FormItem
                                label="平台单号"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('platformOrderId', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input disabled placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>

                            <FormItem {...this.formItemLayout}
                                      label="销售账号" className="widthAll"
                            >
                                {getFieldDecorator('marketAccount', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input  disabled placeholder="" id="success" maxLength={100}/>
                                )}

                            </FormItem>
                        </Col>
                        <Col span={6}  >
                            <FormItem
                                label="YKS单号" disabled  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('yksOrderNumber', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input disabled placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        {/* <Col span={6}  >

                            <FormItem
                                label="买家邮箱"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('buyerEmail', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input disabled={!edit} placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col> */}
                        <Col span={6}>
                            <FormItem {...this.formItemLayout}
                                    label="订单状态" className="widthAll"
                            >
                                {getFieldDecorator('orderStateName', {
                                        rules: [{required: false, message: ''}],
                                    },
                                )(
                                    <Input disabled readOnly placeholder={``} onClick={selectValues({
                                        obj:this,
                                        url: '/oms/order/manage/motan/ICompanyOrderManageApi/getState',
                                        title: '订单状态',
                                        name: 'orderStateName',
                                        id: 'orderState'
                                    })}
                                        maxLength={100}/>
                                )}
                            </FormItem>
                            <FormItem {...this.formItemLayout}
                            >
                                {getFieldDecorator('orderState')(
                                    <Input disabled maxLength={100} type="hidden"/>
                                )}
                            </FormItem>
                            </Col>
                    </Row>
                    <Row>

                        <Col span={6}>

                            <FormItem {...this.formItemLayout}
                                      label="订单来源" className="widthAll"
                            >
                                {getFieldDecorator('orderTypename', {
                                        rules: [{required: false, message: ''}],
                                    },
                                )(
                                    <Input  disabled readOnly placeholder={``} onClick={selectValues({
                                        obj:this,
                                        url: '/oms/order/manage/motan/ICompanyOrderManageApi/getType',
                                        title: '订单来源',
                                        name: 'orderTypename',
                                        id: 'orderType'
                                    })}
                                           maxLength={100}/>
                                )}
                            </FormItem>
                            <FormItem {...this.formItemLayout}>
                                {getFieldDecorator('orderType')(
                                    <Input readOnly maxLength={100} type="hidden"/>
                                )}

                            </FormItem>
                        </Col>
                        <Col span={6} >
                            <FormItem
                                label="销售平台"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('platformName', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input disabled placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>


                        <Col span={6}>

                            <FormItem {...this.formItemLayout}
                                      label="国家" className="widthAll"
                            >
                                {getFieldDecorator('oiCountryName', {
                                        rules: [{required: false, message: ''}],
                                    },
                                )(
                                    <Input disabled={!edit}   readOnly placeholder={``} onClick={()=>{
                                       edit &&  selectValues({
                                            obj:this,
                                            url: '/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData',
                                            title: '国家',
                                            name: 'oiCountryName',
                                            id: 'oiCountry'
                                        })()
                                    }}
                                    maxLength={100}/>
                                )}
                            </FormItem>

                            <FormItem {...this.formItemLayout}>
                                {getFieldDecorator('oiCountry')(
                                    <Input readOnly maxLength={100} type="hidden"/>
                                )}

                            </FormItem>
                        </Col>
                        <Col span={6}  >
                            <FormItem
                                label="买家账号"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('buyerAccount', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input disabled placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}  >
                            <FormItem
                                label="客服人员"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('customerService', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input disabled={!edit} placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}  >
                            <FormItem {...this.formItemLayout} label="物流渠道" className="widthAll">


                                {getFieldDecorator('logisticsBusiness', {
                                        rules: [{required: false, message: '请选择物流渠道名称'}],
                                    },
                                )(
                                    <Input readOnly className={isEdit && isEditModel.type === 9?"border":""}
                                        onClick={
                                            isEdit && isEditModel.type === 9?
                                            selectValues({
                                                obj: this,
                                                url: '/oms/order/grab/motan/OrderBadgeApi/getListLogisticsService',
                                                title: '物流渠道名称',
                                                name: 'logisticsBusiness',
                                                id: 'deliveryPlace',
                                                transformData:(data)=>{
                                                    data.forEach(v=>{
                                                        v.id = v.value
                                                    })
                                                    return data
                                                }
                                            })
                                            :()=>{}
                                        }
                                        />
                                )}
                                {getFieldDecorator('deliveryPlace')(
                                    <Input readOnly maxLength={100} type="hidden"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}  >
                            <FormItem
                                label="物流追踪号"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('trackingNumber', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input className={isEdit && isEditModel.type === 12?"border":""} disabled={!(isEdit && isEditModel.type === 12)} placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="海神订单"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('isClickFarming')(
                                    <Input readOnly maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default OrderInfo
