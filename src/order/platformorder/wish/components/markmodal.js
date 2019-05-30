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
import CSelect from '../../../../components/cselect';
import * as API from '../constants/api'
const FormItem = Form.Item;
const initialVal = [{id: 'CN', name: '大陆 中国'}];

class MarkModal extends React.Component {
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
                values.orderId = this.props.orderId;
                fetchPost(API.WISH_MARK_ORDER, values, 1)
                    .then((result) => {
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
        this.setState({loading: false});
        this.props.form.resetFields();
        this.props.closeModal();
    };
    render() {
        const { visible, orderId } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="wishorder-modal">
                <Modal
                    visible={visible}
                    title={'标记跟踪单号'}
                    destroyOnClose={true}
                    width={500}
                    onCancel={this.handleCancel}
                    // footer={null}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.loading}
                >
                    <Form>
                        <div className="wishorder-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="订单号"
                            >
                                {
                                    getFieldDecorator('orderId',{
                                        rules: [{ required: true, message: '订单号不能为空' }],
                                        initialValue: orderId ? orderId : ''
                                      })(
                                        <Input
                                            style={{ width: 260 }}
                                            onChange={()=>{this.setState({loading: false});}}
                                            disabled={Boolean(orderId)}
                                            // maxLength={50}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="物流渠道"
                                className="wishorder-modal-cselect"
                            >
                                {
                                    getFieldDecorator('shippingProvider',{
                                        rules: [{ required: true, message: '物流渠道不能为空' }],
                                      })(
                                        <CSelect
                                            code='key'
                                            name='label'
                                            url={API.GET_WISH_SHIPPING_PROVIDER}
                                            apiListType={1}
                                            placeholder={'请选择'}
                                            onChange={()=>{this.setState({loading: false});}}
                                        />
                                    )
                                }
                            </FormItem>
                             <FormItem
                                {...this.formItemLayout}
                                label="跟踪号"
                            >
                                {
                                    getFieldDecorator('trackingNumber',{
                                        rules: [{ required: true, message: '跟踪号不能为空' }],
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
                                label="发货国"
                                className="wishorder-modal-cselect"
                            >
                                {
                                    getFieldDecorator('shipCountry',{
                                        // rules: [{ required: true, message: '发货国不能为空' }],
                                        initialValue: 'CN'
                                      })(
                                        <CSelect
                                            list={initialVal}
                                            code='id'
                                            name='name'
                                            url={API.GET_COUNTRY}
                                            params={{ data: { searchColumn: 'name', pageNumber: 1, pageData: 30 } }}
                                            apiListType={2}
                                            placeholder={'请选择'}
                                            localSearch={1}
                                            onChange={()=>{this.setState({loading: false});}}
                                        />
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
export default Form.create()(MarkModal)
