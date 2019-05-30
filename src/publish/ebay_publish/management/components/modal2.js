import React from 'react'
import {
    Modal,
    Form,
    Button,
    Input,
    message,
} from 'antd'
import { fetchPost } from '../../../../util/fetch';
import { strTrim } from '../../../../util/baseTool';
import * as API from '../../../common/constants/Api'
const FormItem = Form.Item;

class AddModal2 extends React.Component {
    state = {
        loading: false,
    };
    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    //表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (values.itemId && values.itemId.length < 11) {
                message.error('请填入12位数字的Item ID');
                document.querySelector('#itemId').focus();
                return;
            }
            if (!err) {
                this.setState({ loading: true });
                fetchPost(API.GRAP_PART, values, 1)
                    .then(result => {
                        if (result.state === '000001') {
                            this.handleCancel();
                            this.props.handleSubmit();
                            /**
                             * TODO: 根据返回的状态显示对应提示？ Item ID是否存在
                             */
                        }
                    })
                    .finally(() => {
                        this.setState({ loading: false });
                    })
            }
        })
    };
    //取消
    handleCancel = () => {
        this.setState({ loading: false });
        this.props.form.resetFields();
        this.props.closeModal();
    };
    //规则名称失去焦点过滤前后空格
    handleBlur = (e) => {
        this.props.form.setFieldsValue({
            'autoPartsName': strTrim(e.target.value)
        })
    };
    //校验Item ID
    handleChange = (e) => {
        this.setState({ loading: false });
        let reg = /^[1-9]\d{0,11}$/;
        for (let len = e.target.value.length; len > 0; len--) {
            let val = e.target.value.slice(0, len);
            if (!reg.test(val)) {
                val = val.slice(0, val.length - 1);
                e.target.value = val;
            }
        }

    };
    render() {
        const { title, visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="part-modal">
                <Modal
                    visible={visible}
                    title={title}
                    destroyOnClose={true}
                    okText="保存"
                    width={600}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form>
                        <div className="part-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="档案名称"
                            >
                                {
                                    getFieldDecorator('autoPartsName', {
                                        rules: [{ required: true, message: '档案名称不能为空' }],
                                    })(
                                        <Input
                                            placeholder="请输入档案名称"
                                            style={{ width: 260 }}
                                            onBlur={this.handleBlur}
                                            onChange={() => { this.setState({ loading: false }); }}
                                            maxLength={50}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="Item ID"
                            >
                                {
                                    getFieldDecorator('itemId', {
                                        rules: [{ required: true, message: 'Item ID不能为空' }],
                                    })(
                                        <Input
                                            type="text"
                                            id="itemId"
                                            placeholder="请输入首位不为0的12位数字"
                                            style={{ width: 260 }} maxLength={12}
                                            onChange={this.handleChange}
                                        />
                                    )
                                }
                            </FormItem>
                        </div>
                        <div className="part-submitBtn">
                            <Button onClick={this.handleCancel}>取消</Button>
                            <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>保存</Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(AddModal2)