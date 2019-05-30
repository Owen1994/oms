import React from 'react';
import { Form, Input, Modal } from 'antd';

const TextArea = Input.TextArea;
/**
 * 审批通过弹框
 */
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
const FormItem = Form.Item;
export default class ApprovalPassModal extends React.Component {
    render() {
        const { visible, ok, cancel } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="审批通过"
                width={600}
                visible={visible}
                onOk={ok}
                onCancel={cancel}
                destroyOnClose
            >
                <FormItem
                    {...formItemLayout}
                    label="请输入同意意见:"
                >
                    {getFieldDecorator('OpinionThrough', {})(
                        <TextArea />,
                    )}
                </FormItem>
            </Modal>
        );
    }
}
