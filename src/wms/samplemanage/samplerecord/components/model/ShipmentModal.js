import React from 'react';
import {
    Form, Input,
    Modal, Radio,
} from 'antd';
import { fetchPost } from '../../../../../util/fetch';
import { SHIPMENT } from '../../constants/Api';

/**
 *  装车发运
 */
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

class SampleRequestModal extends React.Component {
    state = {
        type: 1,
    };

    onCancel = () => {
        const cancel = this.props.cancel;
        if (cancel) {
            cancel();
        }
    };

    onOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    data: {
                        ...values,
                        key: this.props.shipmentKey,
                        isCourier: this.state.type,
                    },
                };
                fetchPost(SHIPMENT, params, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.onCancel();
                        }
                    });
            }
        });
    };

    render() {
        const {
            visible,
        } = this.props;
        const { getFieldDecorator } = this.props.form;
        const form1 = (
            <div>
                <FormItem
                    {...formItemLayout}
                    label="司机姓名:"
                >
                    {getFieldDecorator('driverName', {
                        rules: [{ required: this.state.type === 2, message: '请输入' }],
                    })(
                        <Input
                            placeholder="请输入司机姓名"
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="车牌号:"
                >
                    {getFieldDecorator('carNumber', {
                        rules: [{ required: this.state.type === 2, message: '请输入' }],
                    })(
                        <Input
                            placeholder="请输入车牌号"
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="司机电话:"
                >
                    {getFieldDecorator('driverPhone', {
                        rules: [{ required: this.state.type === 2, message: '请输入司机电话' }],
                    })(
                        <Input
                            placeholder="请输入"
                        />,
                    )}
                </FormItem>
            </div>
        );
        const form2 = (
            <div>
                <FormItem
                    {...formItemLayout}
                    label="快递信息:"
                >
                    {getFieldDecorator('remarks', {})(
                        <TextArea />,
                    )}
                </FormItem>
            </div>
        );
        const type = (
            <FormItem
                {...formItemLayout}
                label="是否用快递公司:"
            >
                <RadioGroup
                    defaultValue={this.state.type}
                    onChange={(e) => {
                        this.setState({
                            type: e.target.value,
                        });
                    }}
                >
                    <Radio value={1}>是</Radio>
                    <Radio value={2}>否</Radio>
                </RadioGroup>
            </FormItem>
        );
        return (
            <Modal
                title="装车发运"
                width={500}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                maskClosable={false}
            >
                <div className="margin-ms-left margin-ms-right">
                    {type}
                    {this.state.type === 1 ? form2 : form1}
                </div>
            </Modal>
        );
    }
}

export default Form.create()(SampleRequestModal);
