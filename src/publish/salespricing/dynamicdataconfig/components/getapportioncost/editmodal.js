import React from 'react';
import {
    Modal,
    Row,
    Col,
    Input,
    InputNumber,
    Form,
} from 'antd';
import {message} from "antd/lib/index";
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
        getFieldDecorator('editData[apportionId]');
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
                                        label="仓库"
                                    >
                                        {getFieldDecorator('editData[depotName]')(
                                            <Input disabled={true} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={"edit-row margin-ss-top"}>
                                <Col span={24}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="销售人工变动单位订单分摊（RMB）"
                                    >
                                        {getFieldDecorator('editData[sellerOrderApportion]')(
                                            <Input
                                                onKeyUp={(e)=>this.handleInputEdit(e, 'editData[sellerOrderApportion]')}
                                                onBlur={(e)=>this.handleInputEdit(e, 'editData[sellerOrderApportion]')}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={"edit-row margin-ss-top"}>
                                <Col span={24}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="销售人工变动单位料本分摊（RMB）"
                                    >
                                        {getFieldDecorator('editData[sellerMaterialsApportion]')(
                                            <Input
                                                onKeyUp={(e)=>this.handleInputEdit(e, 'editData[sellerMaterialsApportion]')}
                                                onBlur={(e)=>this.handleInputEdit(e, 'editData[sellerMaterialsApportion]')}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={"edit-row margin-ss-top"}>
                                <Col span={24}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="仓储人工变动订单分摊（RMB）"
                                    >
                                        {getFieldDecorator('editData[storekerOrderApportion]')(
                                            <Input
                                                onKeyUp={(e)=>this.handleInputEdit(e, 'editData[storekerOrderApportion]')}
                                                onBlur={(e)=>this.handleInputEdit(e, 'editData[storekerOrderApportion]')}
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