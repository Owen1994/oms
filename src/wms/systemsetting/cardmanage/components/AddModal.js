import React from 'react';
import {
    Modal,
    Form,
    Input,
    Select,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { getLoginmsg } from '../../../../util/baseTool';
import { ADD } from '../constants/Api';
import {
    GET_USER_WAREHOUSE,
} from '../../../common/constants/Api';

const FormItem = Form.Item;

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
                fetchPost(ADD, { data: values }, 1)
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
                                label="卡板编号"
                            >
                                {
                                    getFieldDecorator('cardNumber', {
                                        rules: [{ required: true, message: '卡板编号不能为空' }],
                                    })(
                                        <Input placeholder="请输入" onChange={() => { this.setState({ loading: false }); }} />,
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
export default Form.create()(AddModal);
