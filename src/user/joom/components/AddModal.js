import React from 'react'
import {
    Modal,
    Form,
    Button,
    message,
    Input
} from 'antd'
import { fetchPost } from '@/util/fetch';
import {
    joomSellerId,
    joomAddAuth
} from '../constants/Api'
import CSelect from '@/components/cselect';
const FormItem = Form.Item;

class AddNewAuthorization extends React.Component {
    state = {
        loading: false,
    };
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    //表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                fetchPost(joomAddAuth, { data: values }, 2)
                    .then(result => {
                        if (result.state === '000001') {
                            message.success(result.msg)
                            this.handleCancel()
                        }
                    })
                    .catch(() => {
                        this.setState({
                            loading: false
                        });
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
    render() {
        const { loading } = this.state;
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={visible}
                title={'新增授权'}
                destroyOnClose={true}
                width={600}
                onCancel={this.handleCancel}
                okText={'保存'}
                onOk={this.handleSubmit}
                confirmLoading={loading}
            >
                <Form>
                    <div className="authorization-modal-form">
                        <FormItem
                            {...this.formItemLayout}
                            label="店铺账号"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('shopName', {
                                    rules: [{ required: true, message: '店铺账号 不能为空' }]
                                })(
                                    <Input placeholder="请输入店铺账号" />
                                    // <CSelect
                                    //     code='key' // 列表编码字段
                                    //     name='label' // 列表名称字段
                                    //     url={joomSellerId}
                                    //     params={{ data: { searchColumn: 'name', pageData: 30, pageNumber: 1 } }} // 搜索参数
                                    //     placeholder={'请选择'}
                                    //     onChange={() => { this.setState({ loading: false }) }}
                                    // />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="client ID"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('clientId', {
                                    rules: [{ required: true, message: 'client ID 不能为空' }]
                                })(
                                    <Input placeholder="请输入" />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="client secret"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('clientSecret', {
                                    rules: [{ required: true, message: 'client secret 不能为空' }]
                                })(
                                    <Input placeholder="请输入" />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="URL"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('url', {
                                    rules: [{ required: true, message: 'URL 不能为空' }]
                                })(
                                    <Input placeholder="请输入" />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="Code"
                        >
                            {
                                getFieldDecorator('code', {
                                    rules: [{ required: true, message: 'Code 不能为空' }]
                                })(
                                    <Input placeholder="请输入" />
                                )
                            }
                        </FormItem>
                    </div>
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(AddNewAuthorization)