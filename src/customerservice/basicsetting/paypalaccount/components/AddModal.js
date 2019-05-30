import React from 'react';
import {
    Form, Input, Radio,
} from 'antd';

import { GET_PAYPALACCOUNT_DETAIL } from '../constants';
import { fetchPost } from '../../../../util/fetch';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AddModal extends React.Component {
    state = {
        detailData: {}
    }

    componentDidMount() {
        if (this.props.record) {
            this.getDetail();
        }
    }

    getDetail = () => {
        const { id } = this.props.record;
        fetchPost(GET_PAYPALACCOUNT_DETAIL, {id}, 2)
            .then((res) => {
                if (res && res.state === '000001') {
                    this.setState({ detailData: res.data });
                }
            })
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const { getFieldDecorator } = this.props.form;
        const { record } = this.props;
        const { detailData } = this.state;
        return (
            <div>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="账号"
                        className="customer-mb12"
                    >
                        {getFieldDecorator('account', {
                            rules: [{ required: true, message: '请输入账号' }],
                            initialValue: record ? detailData.account : '',
                        })(
                            <Input placeholder="请输入paypal收款账号" />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="授权ID"
                        className="customer-mb12"
                    >
                        {getFieldDecorator('clientId', {
                            rules: [{ required: true, message: '请输入授权ID' }],
                            initialValue: record ? detailData.clientId : '',
                        })(
                            <Input placeholder="请输入paypal账号对应的授权秘钥" />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="授权秘钥"
                        style={{ marginBottom: 8 }}
                    >
                        {getFieldDecorator('secret', {
                            rules: [{ required: true, message: '请输入授权秘钥' }],
                            initialValue: record ? detailData.secret : '',
                        })(
                            <Input placeholder="请输入paypal账号对应的授权秘钥" />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="状态"
                    >
                        {getFieldDecorator('status', {
                            rules: [{ required: true }],
                            initialValue: record ? detailData.status : 1,
                        })(
                            <RadioGroup>
                                <Radio value={1}>开启</Radio>
                                <Radio value={2}>关闭</Radio>
                            </RadioGroup>,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('id', {
                            initialValue: record ? record.id : undefined,
                        })(
                            <Input type='hidden' />,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(AddModal);
