import React from 'react';
import {
    Modal,
    Form,
    Input,
    Select,
} from 'antd';
import { fetchPost } from '../../../../../util/fetch';
import { strTrim, getLoginmsg } from '../../../../../util/baseTool';
import { ADD_SKU_INVENTORY } from '../../constants/Api';
import {
    GET_PRODUCT_NAME,
    GET_USER_WAREHOUSE,
} from '../../../../common/constants/Api';

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
            if (!err) {
                this.setState({ loading: true });
                values.sku = strTrim(values.sku);
                values.storageLocation = strTrim(values.storageLocation);
                values.storageStock = strTrim(values.storageStock);
                fetchPost(ADD_SKU_INVENTORY, { data: values }, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.handleCancel();
                            this.props.handleSubmit();
                        } else {
                            this.setState({ loading: false });
                        }
                    });
            }
        });
    };

    // 取消
    handleCancel = () => {
        this.setState({ loading: false });
        this.props.form.resetFields();
        this.props.closeModal('1');
    };

    // 根据sku获取产品中文名
    handleSkuBlur = (e) => {
        const { setFieldsValue } = this.props.form;
        fetchPost(GET_PRODUCT_NAME, { data: { sku: strTrim(e.target.value) } }, 2)
            .then((result) => {
                if (result.state === '000001') {
                    setFieldsValue({ productName: result.data.productName });
                }
            });
    }

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { warehouse } = this.state;
        return (
            <div className="wms-modal">
                <Modal
                    visible={visible}
                    title="添加"
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
                                                warehouse.map(v => (
                                                    <Select.Option
                                                        key={v.warehouseCode}
                                                        value={v.warehouseCode}
                                                    >{v.warehouseName}
                                                    </Select.Option>
                                                ))
                                            }
                                        </Select>,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="SKU"
                            >
                                {
                                    getFieldDecorator('sku', {
                                        rules: [{ required: true, message: 'sku不能为空' }],
                                    })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }}
                                            placeholder="请输入sku"
                                            onChange={() => {
                                                this.setState({ loading: false });
                                            }}
                                            onBlur={this.handleSkuBlur}
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="中文名称"
                            >
                                {
                                    getFieldDecorator('productName', {
                                        rules: [{ required: true, message: '中文名称不能为空' }],
                                    })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }}
                                            disabled
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="所在储位"
                            >
                                {
                                    getFieldDecorator('storageLocation', {
                                        rules: [{ required: true, message: '所在储位不能为空' }],
                                    })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }}
                                            placeholder="请输入储位编码"
                                            onChange={() => {
                                                this.setState({ loading: false });
                                            }}
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="储位库存"
                            >
                                {
                                    getFieldDecorator('storageStock', {
                                        rules: [{ required: true, message: '储位库存不能为空' }],
                                    })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }}
                                            placeholder="请输入储位库存"
                                            onChange={() => {
                                                this.setState({ loading: false });
                                            }}
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
