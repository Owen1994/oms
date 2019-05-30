import React from 'react';
import {
    Modal,
    Row,
    Col,
    Input,
    InputNumber,
    Form,
    message,
} from 'antd';
const FormItem = Form.Item;

export default class EditModal extends React.Component{
    formItemLayout = {
        labelCol: {
            sm: { span: 6 },
        },
        wrapperCol: {
            sm: { span: 16 },
        },
    };
    handleInputEdit = (e, id)=>{
        const { setFieldsValue } = this.props.form;
        if(e.type === 'blur'){
            let val = e.target.value;
            let temp = '';
            const reg = /\d+\.\d{5,}/;
            const reg1 = /(\d+\.\d{4})\d*/;
            if(reg.test(val)){
                temp = Number(val.replace(reg1, "$1"))+ 0.0001;
                temp = temp.toString();
                // temp = temp.substring(0, temp.indexOf('.')+5);
                // console.log(temp)
                setFieldsValue({
                    [id]: temp
                });
            }
        }else{
            let val = e.target.value;
            const reg3 = /^\d+\.?(\d+)?/;
            val = reg3.exec(val);
            if(val && val.length > 0){
                setFieldsValue({
                    [id]: val[0]
                });
                if(val[0].length > 20){
                    setFieldsValue({
                        [id]: val[0].substring(0, 20)
                    });
                    message.info('不能超出20位字符！')
                }
            }else {
                setFieldsValue({
                    [id]: ''
                });
            }


        }
    };

    render(){
        const {
            visible,
            onCancel,
            onOk,
        } = this.props;
        const {getFieldDecorator} = this.props.form;
        getFieldDecorator('params[operationId]');
        return (

                <div>
                    <Modal
                        title="修改"
                        visible={visible}
                        onOk={onOk}
                        onCancel={onCancel}
                        okText="保存"
                        cancelText="取消"
                    >
                        <div className={"edit-modal"}>
                            <Row>
                                <Col span={24}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="SKU"
                                    >
                                        {getFieldDecorator('editData[sku]')(
                                            <Input disabled={true} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={"margin-ss-top"}>
                                <Col span={24}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="平台"
                                    >
                                        {getFieldDecorator('editData[platformCode]')(
                                            <Input disabled={true} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={"margin-ss-top"}>
                                <Col span={24}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="退款率（%）"
                                    >
                                        {getFieldDecorator('params[refundRate]')(
                                            <Input
                                                // type={'number'}
                                                onKeyUp={(e)=>this.handleInputEdit(e, 'params[refundRate]')}
                                                onBlur={(e)=>this.handleInputEdit(e, 'params[refundRate]')}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={"margin-ss-top"}>
                                <Col span={24}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="推广费率（%）"
                                    >
                                        {getFieldDecorator('params[promotionRate]')(
                                            <Input
                                                onKeyUp={(e)=>this.handleInputEdit(e, 'params[promotionRate]')}
                                                onBlur={(e)=>this.handleInputEdit(e, 'params[promotionRate]')}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={"margin-ss-top"}>
                                <Col span={24}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="推广费（USD）"
                                    >
                                        {getFieldDecorator('params[promotionExpense]')(
                                            <Input
                                                onKeyUp={(e)=>this.handleInputEdit(e, 'params[promotionExpense]')}
                                                onBlur={(e)=>this.handleInputEdit(e, 'params[promotionExpense]')}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                    </Modal>
                </div>
        )
    }
}