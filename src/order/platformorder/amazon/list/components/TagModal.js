import React from 'react'
import {
    Modal,
    Form,
    Input,
} from 'antd'
const FormItem = Form.Item;

import { fetchPost } from '../../../../../util/fetch';
import * as API from '../constants/Api'
import CSelect from '../../../../../components/cselect';


class TagModal extends React.Component {
    formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 },
    };

    //表单提交
    handleSubmit = () => {
        const params = ['platformOrderNumber', 'logisticsChannel', 'trackingNumber'];
        this.props.form.validateFields(params, (err, values) => {
            const data = {
                ...values
            };
            if (!err) {
                fetchPost(API.Review_Mark_Order_Api, data, 1)
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
        this.props.showModal(false, '');
    };

    render() {
        const { visible, orderNumber } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                visible={visible}
                title={'标记跟踪号'}
                destroyOnClose={true}
                width={600}
                onCancel={this.handleCancel}
                onOk={this.handleSubmit}
            >
                <Form>
                    <div className="amazon-table-grab">
                        <FormItem
                            {...this.formItemLayout}
                            label="订单号"
                        >
                            {
                                getFieldDecorator('platformOrderNumber', {
                                    rules: [{ required: false, message: '' }],
                                    initialValue: orderNumber,
                                })(
                                    <Input
                                        disabled
                                        style={{ width: 260 }}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="物流渠道"
                        >
                            {
                                getFieldDecorator('logisticsChannel', {
                                    rules: [{ required: true, message: '物流渠道不能为空' }],
                                })(
                                    <CSelect
                                        code='key'
                                        name='label'
                                        url={API.Review_Get_Channel_Api}
                                        apiListType={0}
                                        style={{ width: 330 }}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="跟踪号"
                        >
                            {
                                getFieldDecorator('trackingNumber', {
                                    rules: [{ required: true, message: '跟踪号不能为空' }],
                                })(
                                    <Input
                                        style={{ width: 330 }}
                                    />
                                )
                            }
                        </FormItem>
                    </div>
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(TagModal)
