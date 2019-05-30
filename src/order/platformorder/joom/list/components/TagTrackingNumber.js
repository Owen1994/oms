import React from 'react'
import {
    Modal,
    Form,
    Button,
    Input,
    message,
    DatePicker
} from 'antd'
import CSelect from '../../../../../components/cselect';
import { fetchPost } from '../../../../../util/fetch'
import { api } from '../constants'
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
class TagTrackingNumber extends React.Component {
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
            if (!err) {
                Object.keys(values).forEach(v => {
                    if (!values[v]) {
                        delete values[v]
                    }
                })
                fetchPost(api.joomMarkTrackingNumber, { data: values }, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.setState({ loading: false });
                            this.handleCancel();
                            // this.props.handleSubmit();
                        }
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
    render() {
        const { visible, orderId, id } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={visible}
                title="标记跟踪号"
                destroyOnClose={true}
                width={500}
                onCancel={this.handleCancel}
                // footer={null}
                onOk={this.handleSubmit}
                confirmLoading={this.state.loading}
            >
                <Form>
                    <div>
                        <FormItem
                            {...this.formItemLayout}
                            label="关联平台单号"
                        >
                            {
                                getFieldDecorator('orderId', {
                                    initialValue: orderId
                                })(
                                    <Input disabled />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="物流渠道名称"
                        >
                            {
                                getFieldDecorator('carrierCode', {
                                    rules: [{ required: true, message: '物流渠道不能为空' }]
                                })(
                                    <CSelect
                                        code='key' // 列表编码字段
                                        name='label' // 列表名称字段
                                        url={api.joomShippingProvider}
                                        // mode='multiple' // 是否多选
                                        // maxCount={5} // 最多选择项数量
                                        placeholder="请选择ebay渠道名称"
                                        // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                        params={{ data: { searchColumn: 'name', pageData: 20, pageNumber: 1 } }} // 搜索参数
                                        // apiListType={1}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                        placeholder={'请选择'}
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
                                    rules: [{ required: true, message: '跟踪号不能为空' }]
                                })(
                                    <Input placeholder="请输入跟踪号" />
                                )
                            }
                        </FormItem>
                    </div>
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(TagTrackingNumber)
