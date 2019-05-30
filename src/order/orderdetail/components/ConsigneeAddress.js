import React, {Component} from 'react';
import {
    Form,
    Input,
    Row,
    Col,
    Tooltip,
    Button,
    message,
} from 'antd'
import '../css/css.css'

const FormItem = Form.Item;

class ConsigneeAddress extends Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    }

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
        const {
            province, city,
        } = this.props.Infos;

        return (
            <div className="newCluenk deliveryParcel padTop10">
                <div className="title">收货人地址信息 
                {/* <Button size="small" className="margin-sm-left" onClick={this.handleCopy}>复制</Button> */}
                </div>
                <div className="content">

                    <Row >

                        <Col span={6}>
                            <FormItem
                                label="收货人"  {...this.formItemLayout} className="widthAll"
                            >
                                <Tooltip title={getFieldValue('consignee')} placement="topLeft">
                                    {getFieldDecorator('consignee', {
                                        rules: [{required: false, message: ''}],
                                    })(
                                        <Input readOnly={true} placeholder="" id="success" maxLength={100}/>
                                    )}
                                </Tooltip>
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="国家全称"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('caCountry', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="国家简称"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('countryAbb', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="邮编"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('zip', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row >

                        <Col span={6}>
                            <FormItem
                                label="固定电话"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('tel', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="移动电话"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('phone', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="买家邮箱"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('email', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="社交账号"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('socialAccount', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    
                    <Row >

                        <Col span={6}>
                            <FormItem
                                label="省/州"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('province', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="市"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('city', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100}/>
                                )}
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
                                        <Input readOnly={true} placeholder="" id="success" maxLength={100}/>
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
                                        <Input readOnly={true} placeholder="" id="success" maxLength={100}/>
                                    )}
                                </Tooltip>
                            </FormItem>
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}

export default ConsigneeAddress
