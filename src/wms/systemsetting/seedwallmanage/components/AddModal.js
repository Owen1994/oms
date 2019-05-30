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
        seedTruckType: -1,
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
        this.setState({ loading: false, seedTruckType: -1 });
        this.props.form.resetFields();
        this.props.closeModal();
    };

    // 播种车选择变化
    handleSelectChange =(val) => {
        this.setState({ seedTruckType: val, loading: false });
    }

    // 控制输入框只能输入数字
    handleInputChange = (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        this.setState({ loading: false });
    }

    // 播种车编号输入验证格式
    handleCarNumberChange = (rule, value, callback) => {
        if (!(/^(SW)/.test(value))) {
            callback('播种车编号格式错误：需以SW开头');
        } else {
            callback();
        }
    }

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { warehouse, seedTruckType } = this.state;
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
                                label="播种车类型"
                            >
                                {getFieldDecorator('seedTruckType', {
                                    rules: [{ required: true, message: '播种车类型不能为空' }],
                                })(
                                    <Select
                                        onChange={this.handleSelectChange}
                                        placeholder="请选择"
                                    >
                                        <Option value="10">移动播种车</Option>
                                        <Option value="20">固定播种车</Option>
                                    </Select>,
                                )}
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="播种车编号"
                            >
                                {
                                    getFieldDecorator('seedingCarNumber', {
                                        rules: [{ validator: this.handleCarNumberChange }, { required: true, message: '播种车编号不能为空' }],
                                    })(
                                        <Input placeholder="请输入" />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="位置编号"
                            >
                                {
                                    getFieldDecorator('locationId', {
                                        rules: [{ required: true, message: '位置编号不能为空' }],
                                    })(
                                        <Input placeholder="请输入" onChange={this.handleInputChange} />,
                                    )
                                }
                            </FormItem>
                            {
                                seedTruckType === '20' ? (
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="小容器编号"
                                    >
                                        {
                                            getFieldDecorator('smallContainerNumber', {
                                                rules: [{ required: true, message: '小容器编号不能为空' }],
                                            })(
                                                <Input placeholder="请输入" onChange={this.handleInputChange} />,
                                            )
                                        }
                                    </FormItem>
                                ) : null
                            }
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(AddModal);
