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

    // 容器编号输入验证格式
    handleInputChange = (rule, value, callback) => {
        if (!(/^C/.test(value))) {
            callback('容器编号格式错误：需以C开头');
        } else {
            callback();
        }
    }

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
                                label="容器类型"
                            >
                                {getFieldDecorator('containerType', {
                                    rules: [{ required: true, message: '容器类型不能为空' }],
                                })(
                                    <Select
                                        onChange={() => { this.setState({ loading: false }); }}
                                        placeholder="请选择"
                                    >
                                        <Option value="10">普通容器</Option>
                                        <Option value="20">小框</Option>
                                        <Option value="30">多品多件大容器</Option>
                                        <Option value="40">移动播种墙</Option>
                                        <Option value="50">多品多件</Option>
                                    </Select>,
                                )}
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="容器编号"
                            >
                                {
                                    getFieldDecorator('containerNumber', {
                                        rules: [{ validator: this.handleInputChange }, { required: true, message: '容器编号不能为空' }],
                                    })(
                                        <Input
                                            placeholder="请输入"
                                            onChange={() => { this.setState({ loading: false }); }}
                                        />,
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
