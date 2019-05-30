import React from 'react';
import { Modal, Input, Form } from 'antd';

const TextArea = Input.TextArea;
/**
 * 审批驳回弹框
 */
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
const FormItem = Form.Item;
export default class ApprovalDismissalModal extends React.Component {
    render() {
        const {
            visible, ok, cancel, isRequired,
        } = this.props;

        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title="审批驳回"
                width={600}
                visible={visible}
                onOk={ok}
                onCancel={cancel}
            >
                <FormItem
                    {...formItemLayout}
                    label="请输入驳回意见:"
                >
                    {getFieldDecorator('OpinionRejected', {
                        rules: [{ required: isRequired, message: '请填写驳回意见' }],
                    })(
                        <TextArea />,
                    )}
                </FormItem>
            </Modal>
        );
    }
}
