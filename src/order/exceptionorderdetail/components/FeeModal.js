import React from 'react'
import moment from 'moment';
import {
    Modal,
    Form,
    Input,
    DatePicker,
} from 'antd';
import { fetchPost } from 'util/fetch';
const FormItem = Form.Item;

class FeeModal extends React.Component {
    state = {
        loading: false,
    };

    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
    };

    //表单提交
    handleSubmit = () => {
        this.setState({ loading: true });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.freightChargesAmount){
                    values.freightChargesAmount = parseFloat(values.freightChargesAmount);
                }
                values.buyerPaymentAmount = parseFloat(values.buyerPaymentAmount);
                values.payDt = values.payDt.valueOf();
                values.yksOrderId = this.props.yksOrderId;
                fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/updateOrderFee', {data: values}, 1)
                    .then(result => {
                        if (result.state === '000001') {
                            this.setState({ loading: false });
                            this.handleCancel();
                        }
                    })
            }
        })
    };

    //取消
    handleCancel = () => {
        this.setState({
            loading: false,
         });
        this.props.form.resetFields();
        this.props.closeModal();
    };

    // 金额输入校验
    addpriceHandle = (rule, value, callback) => {
        const numreg = /^(\d+)(\.\d{1,2})?$/;
        if (value && !numreg.test(value)) {
            callback('请输入正数金额,小数点不超过两位')
        } else if (value && !parseFloat(value)){
            callback('请输入正数金额,小数点不超过两位')
        } else {
            callback()
        }
    }

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="ebayorder-modal">
                <Modal
                    visible={visible}
                    title={'费用维护'}
                    destroyOnClose={true}
                    width={500}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.loading}
                >
                    <Form>
                        <div>
                            <FormItem
                                {...this.formItemLayout}
                                label="买家实付运费(USD)"
                            >
                                {
                                    getFieldDecorator('freightChargesAmount', {
                                        rules: [{ validator: this.addpriceHandle }]
                                    })(
                                        <Input placeholder="请输入" onChange={() => {this.setState({loading: false})}} />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="买家实付金额(USD)"
                            >
                                {
                                    getFieldDecorator('buyerPaymentAmount', {
                                        rules: [{ validator: this.addpriceHandle }, {required: true, message: '请输入买家实付金额'}]
                                    })(
                                        <Input placeholder="请输入" onChange={() => {this.setState({loading: false})}} />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="付款时间"
                            >
                                {
                                    getFieldDecorator('payDt', {
                                        rules: [{required: true, message: '请选择付款时间'}],
                                        initialValue: moment(new Date())
                                    })(
                                        <DatePicker
                                            showTime
                                            allowClear={false}
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder={'选择日期'}
                                            style={{ width: '100%' }}
                                            onChange={() => {this.setState({ loading: false })}}
                                        />
                                    )
                                }
                            </FormItem>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(FeeModal)
