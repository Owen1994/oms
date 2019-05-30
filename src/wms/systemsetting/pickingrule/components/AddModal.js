import React from 'react';
import {
    Modal,
    Form,
    Input,
    Select,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { getLoginmsg, strTrim } from '../../../../util/baseTool';
import { ADD_PRIORITY } from '../constants/Api';
import {
    GET_USER_WAREHOUSE,
} from '../../../common/constants/Api';

const FormItem = Form.Item;
const Option = Select.Option;

class AddModal extends React.Component {
    state = {
        loading: false,
        warehouse: [],
    };

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    componentDidMount() {
        const username = getLoginmsg().userName;
        fetchPost(GET_USER_WAREHOUSE, { data: { username } }, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({ warehouse: result.data });
                }
            });
    }

    // 表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            this.setState({ loading: true });
            if (!err) {
                values.priorityName = strTrim(values.priorityName);
                fetchPost(ADD_PRIORITY, { data: values }, 1)
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
        this.props.closeModal();
    };

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { warehouse } = this.state;
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
                                label="仓库名称"
                            >
                                {
                                    getFieldDecorator('warehouseCode', {
                                        rules: [{ required: true, message: '仓库名称不能为空' }],
                                        initialValue: warehouse.length > 0 ? warehouse[0].warehouseCode : '',
                                    })(
                                        <Select>
                                            {
                                                warehouse.map(v => <Select.Option key={v.warehouseCode} value={v.warehouseCode}>{v.warehouseName}</Select.Option>)
                                            }
                                        </Select>,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="优先级名称"
                            >
                                {
                                    getFieldDecorator('priorityName', {
                                        rules: [{ required: true, message: '优先级名称不能为空' }],
                                    })(
                                        <Input placeholder="请输入" onChange={() => { this.setState({ loading: false }); }} />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="优先级"
                            >
                                {getFieldDecorator('priority', {
                                    rules: [{ required: true, message: '请选择优先级' }],
                                })(
                                    <Select
                                        placeholder="请选择优先级"
                                        onChange={() => { this.setState({ loading: false }); }}
                                    >
                                        <Option value="1">高</Option>
                                        <Option value="2">普通</Option>
                                    </Select>,
                                )}
                            </FormItem>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(AddModal);
