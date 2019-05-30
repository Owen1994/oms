import React from 'react'
import {
    Modal,
    Button,
    Form,
    Input,
    message,
} from 'antd'
const FormItem = Form.Item;

class EditStockModal extends React.Component {
    state = {
        loading: false,
    }

    handleOk = () => {
        const { onOk, onCancel } = this.props;
        const { getFieldValue } = this.props.form;
        const url = getFieldValue("url");
        if (/^https?:\/\/.+\.(jpg|jpeg)$/i.test(url)) {
            onOk && onOk(url)
            onCancel && onCancel()
        } else {
            message.warning("请确认URL格式")
        }
    }

    handleCancel = () => {
        this.props.onCancel && this.props.onCancel();
    }

    render() {
        const { loading } = this.state;
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="上传网络图片"
                visible={visible}
                onCancel={this.handleCancel}
                destroyOnClose={true}
                maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={this.handleOk} loading={loading}>保存</Button>,
                ]}
            >
                <FormItem
                    label="URL"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                >
                    {getFieldDecorator('url', {
                        rules: [
                            { required: true, message: 'URL必填' }
                        ]
                    })(
                        <Input placeholder="请输入URL" />
                    )}
                </FormItem>
            </Modal>
        )
    }
}
export default Form.create()(EditStockModal)