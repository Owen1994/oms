import React from 'react';
import {
    Modal,
    Row,
    Col,
    Input,
    InputNumber,
    Form,
    Select,
    message,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

export default class EditModal extends React.Component{
    formItemLayout = {
        labelCol: {
            sm: { span: 6 },
        },
        wrapperCol: {
            sm: { span: 16 },
        },
    };
    formItemLayout1 = {
        labelCol: {
            sm: { span: 10 },
        },
        wrapperCol: {
            sm: { span: 8 },
        }
    };
    formItemLayout2 = {
        labelCol: {
            sm: {span: 10},
        },
        wrapperCol: {
            sm: {span: 14},
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
            airTransportData,
            railTransportData,
            seaTransportData,
        } = this.props;
        const {getFieldDecorator} = this.props.form;
        getFieldDecorator('params[transportId]');
        let airTransportElems = null;
        let railTransportElems = null;
        let seaTransportElems = null;
        if(airTransportData && airTransportData.length > 0){
            airTransportElems = airTransportData.map((item,index)=>{
                return (
                    <div key={index} className={"edit-table"}>
                        <FormItem>
                            {getFieldDecorator(`params[airTransport][${index}][fieldCode]`,{
                                initialValue: item.fieldCode
                            })(
                                <Input type={'hidden'} />
                            )}
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout2}
                            label={`${item.fieldDesc}`}
                        >
                            {getFieldDecorator(`params[airTransport][${index}][expense]`,{
                                initialValue: item.expense
                            })(
                                <Input
                                    onKeyUp={(e)=>this.handleInputEdit(e, `params[airTransport][${index}][expense]`)}
                                    onBlur={(e)=>this.handleInputEdit(e, `params[airTransport][${index}][expense]`)}
                                />
                            )}
                        </FormItem>
                    </div>
                )
            })
        }
        if(railTransportData && railTransportData.length > 0){
            railTransportElems = railTransportData.map((item,index)=>{
                return (
                    <div key={index} className={"edit-table"}>
                        <FormItem>
                            {getFieldDecorator(`params[railTransport][${index}][fieldCode]`,{
                                initialValue: item.fieldCode
                            })(
                                <Input type={'hidden'} />
                            )}
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout2}
                            label={`${item.fieldDesc}`}
                        >
                            {getFieldDecorator(`params[railTransport][${index}][expense]`,{
                                initialValue: item.expense
                            })(
                                <Input
                                    onKeyUp={(e)=>this.handleInputEdit(e, `params[railTransport][${index}][expense]`)}
                                    onBlur={(e)=>this.handleInputEdit(e, `params[railTransport][${index}][expense]`)}
                                />
                            )}
                        </FormItem>
                    </div>
                )
            })
        }
        if(seaTransportData && seaTransportData.length > 0){
            seaTransportElems = seaTransportData.map((item,index)=>{
                return (
                    <div key={index} className={"edit-table"}>
                        <FormItem>
                            {getFieldDecorator(`params[seaTransport][${index}][fieldCode]`,{
                                initialValue: item.fieldCode
                            })(
                                <Input type={'hidden'} />
                            )}
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout1}
                            label={`${item.fieldDesc}`}
                        >
                            {getFieldDecorator(`params[seaTransport][${index}][expense]`,{
                                initialValue: item.expense
                            })(
                                <Input
                                    style={{width: 100, marginRight: 10}}
                                    onKeyUp={(e)=>this.handleInputEdit(e, `params[seaTransport][${index}][expense]`)}
                                    onBlur={(e)=>this.handleInputEdit(e, `params[seaTransport][${index}][expense]`)}
                                />
                            )}
                        </FormItem>
                        { item.fieldCode === 'sea_disperse_price' ?
                            <FormItem>
                                {getFieldDecorator(`params[seaTransport][${index}][unit]`,{
                                    initialValue: item.unit
                                })(
                                    <Select style={{width: 100}}>
                                        <Option value="RMB/KG">RMB/KG</Option>
                                        <Option value="RMB/CBM">RMB/CBM</Option>
                                    </Select>
                                )}
                            </FormItem>
                        : null }
                    </div>
                )
            })
        }

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
                                        label="起运港"
                                    >
                                        {getFieldDecorator('editData[shipmentPortName]')(
                                            <Input disabled={true} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={"margin-ss-top"}>
                                <Col span={24}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="目的仓"
                                    >
                                        {getFieldDecorator('editData[depotName]')(
                                            <Input disabled={true} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={"margin-ss-top"}>
                                <Col span={6} className={"text-right"}>海运(RMB/CBM)：</Col>
                                <Col span={18}>{seaTransportElems}</Col>
                            </Row>
                            <Row className={"margin-ss-top"}>
                                <Col span={6} className={"text-right"}>空运(RMB/KG)：</Col>
                                <Col span={18}>{airTransportElems}</Col>
                            </Row>
                            <Row className={"edit-row margin-ss-top"}>
                                <Col span={6} className={"text-right"}>铁运：</Col>
                                <Col span={18}>{railTransportElems}</Col>
                            </Row>
                        </div>
                    </Modal>
                </div>
        )
    }
}