/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--异常订单--详情页--收货人地址信息
 *参数说明:
 *时间: 2018/5/29 15:35
 */
import React, {Component} from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    message,
    Tooltip,
} from 'antd'
import '../css/css.css'
import * as config from "util/connectConfig";
import Modalmodel from '@/components/modalmodel';
import axios from "util/axios";
import {functions} from "util/baseTool";

const FormItem = Form.Item;

class ConsigneeAddress extends Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    }
    
    state = {
        isEdit:false,
    }

    handleEdit = ()=>{
        this.setState({
            isEdit:!this.state.isEdit
        })
    }
    /**
     * 作者：魏洁
     * 描述：保存收货人地址信息
     * 时间：2018-4-17
     */
    handleEditsave = ()=>{
        var values = this.props.form.getFieldsValue([
            "city",
            "consignee",
            "caCountry",
            "countryAbb",
            "email",
            "yksOrderNumber",
            "phone",
            "province",
            "street1",
            "street2",
            "tel",
            "socialAccount",
            "zip",
        ])
        var params = {
            ...values,
            orderId:values.yksOrderNumber,
            userName:values.socialAccount
        }
        axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/updateConsigneeMessage`, params)
        .then(response => {
            const state = response.data.state
            if (state == '000001') {
                this.setState({
                    isEdit:!this.state.isEdit
                })
                message.success(`${response.data.msg}`);
            } else {
                message.error(`${response.data.msg}`);
            }
        }).catch(e => {
            console.log(e);
        })
    }
    
    // 复制
    // handleCopy = () => {
    //     const { street1 = '', city = '', province = '', zip = '', countryAbb = '' } = this.props.form.getFieldsValue(['street1', 'city', 'province', 'zip', 'countryAbb']);
    //     const val = `${street1} ${city} ${province} ${zip} ${countryAbb}`;
    //     let oInput = document.createElement('input');
    //     oInput.value = val;
    //     document.body.appendChild(oInput);
    //     oInput.select(); // 选择对象
    //     document.execCommand("copy"); // 执行浏览器复制命令
    //     message.info('已复制到剪切板!');
    //     // oInput.style.display='none';
    //     document.body.removeChild(oInput);
    // }

    render() {

        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { isEditModel } = this.props;
        const {
            province,  city,
        } = this.props.Infos;
        const { isEdit } = this.state;
        const content = (
            <div className={isEdit?"content":"content deliveryParcel"}>
                <Row >

                    <Col span={ 6}  >
                        <FormItem
                            label="收货人"  {...this.formItemLayout} className="widthAll"
                        >
                            <Tooltip title={getFieldValue('consignee')} placement="topLeft">
                                {getFieldDecorator('consignee', {
                                    rules: [{required: false, message: '请输入收货人'}],
                                })(
                                    <Input placeholder={isEdit?"请输入收货人":""} id="success" maxLength={100} disabled={isEdit?false:true}/>
                                )}
                            </Tooltip>
                        </FormItem>
                    </Col>

                    <Col span={ 6}  >
                        <FormItem
                            label="国家全称"  {...this.formItemLayout} className="widthAll"
                        >
                            {getFieldDecorator('caCountry', {
                                rules: [{required: false, message: '请输入国家全称'}],
                            })(
                                <Input placeholder={isEdit?"请输入国家全称":""} id="success" maxLength={100} disabled={isEdit?false:true}/>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={ 6}  >
                        <FormItem
                            label="国家简称"  {...this.formItemLayout} className="widthAll"
                        >
                            {getFieldDecorator('countryAbb', {
                                rules: [{required: false, message: '请输入国家简称'}],
                            })(
                                <Input placeholder={isEdit?"请输入国家简称":""} id="success" maxLength={100} disabled={isEdit?false:true}/>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={ 6}  >
                        <FormItem
                            label="邮编"  {...this.formItemLayout} className="widthAll"
                        >
                            {getFieldDecorator('zip', {
                                rules: [{required: false, message: '请输入邮编'}],
                            })(
                                <Input placeholder={isEdit?"请输入邮编":""} id="success" maxLength={100} disabled={isEdit?false:true}/>
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row >

                    <Col span={ 6}  >
                        <FormItem
                            label="固定电话"  {...this.formItemLayout} className="widthAll"
                        >
                            {getFieldDecorator('tel', {
                                rules: [{required: false, message: '请输入固定电话'}],
                            })(
                                <Input placeholder={isEdit?"请输入固定电话":""} id="success" maxLength={100} disabled={isEdit?false:true}/>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={ 6}  >
                        <FormItem
                            label="移动电话"  {...this.formItemLayout} className="widthAll"
                        >
                            {getFieldDecorator('phone', {
                                rules: [{required: false, message: '请输入移动电话'}],
                            })(
                                <Input placeholder={isEdit?"请输入移动电话":""} id="success" maxLength={100} disabled={isEdit?false:true}/>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={ 6}  >
                        <FormItem
                            label="买家邮箱"  {...this.formItemLayout} className="widthAll"
                        >
                            {getFieldDecorator('email', {
                                rules: [{required: false, message: '请输入邮箱地址'}],
                            })(
                                <Input placeholder={isEdit?"请输入邮箱地址":""} id="success" maxLength={100} disabled={isEdit?false:true}/>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={ 6}  >
                        <FormItem
                            label="社交账号"  {...this.formItemLayout} className="widthAll"
                        >
                            {getFieldDecorator('socialAccount', {
                                rules: [{required: false, message: '请输入社交账号'}],
                            })(
                                <Input placeholder={isEdit?"请输入社交账号":""} id="success" maxLength={100} disabled={isEdit?false:true}/>
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row >

                    <Col span={6}>
                        <FormItem
                            label="省/州"  {...this.formItemLayout} className="widthAll"
                        >
                            <Tooltip title={getFieldValue('province')} placement="topLeft">
                                {getFieldDecorator('province', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input placeholder="" id="success" maxLength={100} disabled={isEdit?false:true}/>
                                )}
                            </Tooltip>
                        </FormItem>
                    </Col>

                    <Col span={6}>
                        <FormItem
                            label="市"  {...this.formItemLayout} className="widthAll"
                        >
                            <Tooltip title={getFieldValue('city')} placement="topLeft">
                                {getFieldDecorator('city', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input placeholder="" id="success" maxLength={100} disabled={isEdit?false:true}/>
                                )}
                            </Tooltip>
                        </FormItem>
                    </Col>

                    <Col span={6}>
                        <FormItem
                            label="街道一"  {...this.formItemLayout} className="widthAll"
                        >
                            <Tooltip title={getFieldValue('street1')} placement="topLeft">
                                {getFieldDecorator('street1', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input placeholder="" id="success" maxLength={200} disabled={isEdit?false:true}/>
                                )}
                            </Tooltip>
                        </FormItem>
                    </Col>

                    <Col span={6}>
                        <FormItem
                            label="街道二"  {...this.formItemLayout} className="widthAll"
                        >
                            <Tooltip title={getFieldValue('street2')} placement="topLeft">
                                {getFieldDecorator('street2', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input placeholder="" id="success" maxLength={200} disabled={isEdit?false:true}/>
                                )}
                            </Tooltip>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
        return (
            <div className="newCluenk exc-address padTop10">
                <div className="title pr">
                    收货人地址信息
                    {/* <Button size="small" className="margin-sm-left" onClick={this.handleCopy}>复制</Button> */}
                    {
                        ((isEditModel.is || this.props.Infos.abnormaltype && this.props.Infos.abnormaltype[0] === 19) && functions(this,'001-000002-000002-000001-003'))?
                        isEdit?
                            <Button className="editable-add-btn" onClick={this.handleEditsave}>{"保存"}</Button>
                            :<Button className="editable-add-btn" onClick={this.handleEdit}>{"修改"}</Button>
                            : null
                    }
                </div>
                {content}
            </div>
        );
    }
}

export default ConsigneeAddress
