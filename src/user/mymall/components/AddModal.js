import React from 'react'
import moment from 'moment';
import {
    Modal,
    Form,
    Button,
    Input,
    Radio,
    DatePicker,
} from 'antd'
import { fetchPost } from '@/util/fetch';
import { getTimeStamp } from '@/util/moment';
import {
    GET_MODIFY_DETAIL,
    ADD_OR_MODIFY_AUTH
} from '../constants/Api'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AddOrUpdateModal extends React.Component {

    state = {
        loading: false,
        detailData: '',
    };
    
    componentWillReceiveProps(nextProps){
        const prevVisible = this.props.visible;
        const visible = nextProps.visible;
        if(visible !== prevVisible && visible && nextProps.sellerId) {
            fetchPost(GET_MODIFY_DETAIL, { data: {sellerId: nextProps.sellerId} }, 2)
                .then(result => {
                    if (result.state === '000001') {
                        this.setState({ detailData: result.data });
                    }
                })
        }
    }

    formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 },
    };

    //表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            this.setState({ loading: true });
            if (!err) {
                for(let i in values) {
                    if (i.toLocaleLowerCase().indexOf('time') > -1) {
                        values[i] = getTimeStamp(values[i]);
                    }
                }
                values.type = this.props.sellerId ? 1 : 0;
                fetchPost(ADD_OR_MODIFY_AUTH, { data: values }, 2)
                    .then(result => {
                        if (result.state === '000001') {
                            this.handleCancel();
                            this.props.handleSubmit();
                        }
                    })
            }
        })
    };
    
    //取消
    handleCancel = () => {
        this.setState({
            loading: false,
            detailData: '',
        });
        this.props.form.resetFields();
        this.props.closeModal();
    };

    // 输入内容时改变loading
    handleChange = () => {
        this.setState({ loading: false });
    }
    render() {
        const { visible, sellerId } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { detailData } = this.state;
        return (
            <div className="authorization-modal">
                <Modal
                    visible={visible}
                    title={sellerId ? '修改' : '授权账号'}
                    destroyOnClose={true}
                    width={600}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.loading}
                    maskClosable={false}
                >
                    <Form>
                        <div className="authorization-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="sellerId"
                            >
                                {
                                    getFieldDecorator('sellerId', {
                                        rules: [{ required: true, message: 'please input sellerId' }],
                                        initialValue: detailData ? detailData.sellerId : null 
                                    })(
                                        <Input
                                            placeholder="please input sellerId"
                                            onChange={() => this.handleChange()}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="client_id"
                            >
                                {
                                    getFieldDecorator('clientId', {
                                        rules: [{ required: true, message: 'please input client_id' }],
                                        initialValue: detailData ? detailData.clientId : null 
                                    })(
                                        <Input
                                            placeholder="please input client_id"
                                            onChange={() => this.handleChange()}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="client_secret"
                            >
                                {
                                    getFieldDecorator('clientSecret', {
                                        rules: [{ required: true, message: 'please input client_secret' }],
                                        initialValue: detailData ? detailData.clientSecret : null 
                                    })(
                                        <Input
                                            placeholder="please input client_secret"
                                            onChange={() => this.handleChange()}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="password"
                            >
                                {
                                    getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'please input password' }],
                                        initialValue: detailData ? detailData.pwd : null 
                                    })(
                                        <Input
                                            placeholder="please input password"
                                            onChange={() => this.handleChange()}
                                        />
                                    )
                                }
                            </FormItem>
                            <p>提示：相关信息需要账号管理部授权账号后提供录入</p>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(AddOrUpdateModal)