import React from 'react'
import {
    Modal,
    Form,
    Button,
    Input,
    message,
} from 'antd'
import { fetchPost } from '@/util/fetch';
import { strTrim } from '@/util/baseTool';
import * as API from '../constants/api'
const FormItem = Form.Item;

class AuthorizationModal extends React.Component {
    state = {
        loading: false,
        details: undefined,
    };
    formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 },
    };
    //表单提交
    handleSubmit = () => { 
        this.props.form.validateFields((err, values) => {
            this.setState({loading: true});
            values.type = this.props.sellerId ? 1 : 0;
            if (!err) {
                fetchPost(API.ADD_OR_EDIT_WISH_ACCOUNT, values, 1)
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
            details: undefined,
        });
        this.props.form.resetFields();
        this.props.closeModal();
    };
    //请求详情数据
    componentWillReceiveProps(nextProps){
        const sellerId = this.props.sellerId;
        const nextSellerId = nextProps.sellerId;
        if(sellerId !== nextSellerId && nextSellerId){
            fetchPost(API.GET_WISH_ACCOUNT_DETAIL, {sellerId: nextSellerId}, 2)
                .then(result => {
                    if (result.state === '000001') {
                        this.setState({details: result.data});
                    }
                })
        }
    }
    render() {
        const { visible, sellerId } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { details } = this.state;
        return (
            <div className="authorization-modal">
                <Modal
                    visible={visible}
                    title={sellerId ? '授权账号' : '修改'}
                    destroyOnClose={true}
                    width={500}
                    onCancel={this.handleCancel}
                    okText={'保存'}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.loading}
                    // footer={null}
                >
                    <Form>
                        <div className="authorization-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="销售账号"
                            >
                                {
                                    getFieldDecorator('sellerId',{
                                        rules: [{ required: true, message: '销售账号不能为空' }],
                                        initialValue: sellerId ? sellerId : ''
                                      })(
                                        <Input
                                            style={{ width: 260 }}
                                            onChange={()=>{this.setState({loading: false});}}
                                            disabled={sellerId}
                                            // maxLength={50}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="Client_id"
                            >
                                {
                                    getFieldDecorator('clientId',{
                                        rules: [{ required: true, message: 'Client_id不能为空' }],
                                        initialValue: details ? details.clientId : ''
                                      })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }} 
                                            // maxLength={12}
                                            onChange={()=>{this.setState({loading: false});}}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="Client_Secret"
                            >
                                {
                                    getFieldDecorator('clientSecret',{
                                        rules: [{ required: true, message: 'Client_Secret不能为空' }],
                                        initialValue: details ? details.clientSecret : ''
                                      })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }} 
                                            // maxLength={12}
                                            onChange={()=>{this.setState({loading: false});}}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="Code"
                            >
                                {
                                    getFieldDecorator('code',{
                                        rules: [{ required: true, message: 'Code不能为空' }],
                                        initialValue: details ? details.code : ''
                                      })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }} 
                                            // maxLength={12}
                                            onChange={()=>{this.setState({loading: false});}}
                                        />
                                    )
                                }
                            </FormItem>
                            <p>提示：相关信息可在wish商户后台-API设置中获取</p>
                        </div>
                        {/*<div className="authorization-submitBtn">*/}
                            {/*<Button onClick={this.handleCancel}>取消</Button>*/}
                            {/*<Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>保存</Button>*/}
                        {/*</div>*/}
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(AuthorizationModal)