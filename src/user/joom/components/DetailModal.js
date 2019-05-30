import React from 'react'
import {
    Modal,
    Form,
    Button,
    message,
    Input
} from 'antd'
import { fetchPost } from '@/util/fetch';
import { timestampFromat } from '@/util/baseTool';
import {
    joomDetails
} from '../constants/Api'
const FormItem = Form.Item;

class DetailModal extends React.Component {
    state = {
        loading: false,
    };
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    componentWillReceiveProps(next) {
        if (next.id && next.id !== this.props.id) {
            this.getDetail(next.id)
        }
    }

    // componentDidMount() {
    //     this.getDetail(this.props.id)
    // }

    handleCancel = () => {
        this.props.form.resetFields()
        this.props.closeModal()
    }

    getDetail = (id) => {
        fetchPost(joomDetails, { data: { key: id } })
            .then(result => {
                if (result.state === '000001') {
                    const data = result.data;
                    data.tokenTimePeriod = data.tokenTimePeriod ? timestampFromat(data.tokenTimePeriod, 2) : '--';
                    data.addTime = data.addTime ? timestampFromat(data.addTime, 2) : '--';
                    data.updateTime = data.updateTime ? timestampFromat(data.updateTime, 2) : '--';
                    this.props.form.setFieldsValue(data)
                }
            })
    }

    render() {
        const { loading, data } = this.state;
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={visible}
                title={'查看授权'}
                destroyOnClose={true}
                maskClosable={false}
                width={600}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>关闭</Button>,
                ]}
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
                                })(
                                    <Input disabled />
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
                                })(
                                    <Input disabled />
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
                                })(
                                    <Input disabled />
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
                                })(
                                    <Input disabled />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="Code"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('code', {
                                })(
                                    <Input disabled />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="Token有效期"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('tokenTimePeriod', {
                                })(
                                    <Input disabled />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="添加时间"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('addTime', {
                                })(
                                    <Input disabled />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="更新时间"
                        >
                            {
                                getFieldDecorator('updateTime', {
                                })(
                                    <Input disabled />
                                )
                            }
                        </FormItem>
                    </div>
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(DetailModal)