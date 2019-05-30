import React from 'react';
import { Form, Input, Modal } from 'antd';

const TextArea = Input.TextArea;

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 },
};
const FormItem = Form.Item;
export default class WrongReasonModal extends React.Component {
    render() {
        const {
            visible, ok, cancel,
        } = this.props;
        return (
            <Modal
                title="对图问题原因填写"
                width={600}
                visible={visible}
                onOk={ok}
                onCancel={cancel}
                maskClosable={false}
            >
                <FormItem
                    {...formItemLayout}
                    label="对图问题:"
                >
                    {this.props.form.getFieldDecorator('wrongReason', {
                        rules: [{ required: true, message: '请输入问题说明' }],
                    })(
                        <TextArea
                            autosize={{ minRows: 6, maxRows: 6 }}
                            placeholder="请输入问题,字数控制在50个以内"
                        />,
                    )}
                </FormItem>
            </Modal>
        );
    }
}
