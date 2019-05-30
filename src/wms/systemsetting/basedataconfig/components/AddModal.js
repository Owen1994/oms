import React from 'react';
import {
    Modal,
    Form,
    Input,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { strTrim } from '../../../../util/baseTool';
import { ADD_GROUP } from '../constants/Api';

const FormItem = Form.Item;

class AddModal extends React.Component {
    state = {
        loading: false,
    };

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    // 表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            this.setState({ loading: true });
            if (!err) {
                values.code = strTrim(values.code);
                values.name = strTrim(values.name);
                fetchPost(ADD_GROUP, { data: values }, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.handleCancel();
                            this.props.handleSubmit();
                        }
                    });
            }
        });
    };

    // 取消
    handleCancel = () => {
        this.setState({ loading: false });
        this.props.form.resetFields();
        this.props.closeModal('1');
    };

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="wms-modal">
                <Modal
                    visible={visible}
                    title="新增"
                    destroyOnClose
                    width={500}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.loading}
                >
                    <Form>
                        <div className="wms-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="标识"
                            >
                                {
                                    getFieldDecorator('code', {
                                        rules: [{ required: true, message: '标识不能为空' }],
                                    })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }}
                                            placeholder="请输入标识"
                                            onChange={() => { this.setState({ loading: false }); }}
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="名称"
                            >
                                {
                                    getFieldDecorator('name', {
                                        rules: [{ required: true, message: '名称不能为空' }],
                                    })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }}
                                            placeholder="请输入名称"
                                            onChange={() => { this.setState({ loading: false }); }}
                                        />,
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
export default Form.create()(AddModal);
