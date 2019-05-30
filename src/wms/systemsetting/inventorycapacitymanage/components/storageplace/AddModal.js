import React from 'react';
import {
    Modal,
    Form,
    Input,
} from 'antd';
import { fetchPost } from '../../../../../util/fetch';
import { strTrim } from '../../../../../util/baseTool';
import CSelect from '../../../../../components/cselect';
import { area } from '../../constants/storageplace';
import {
    GET_WAREHOUSE,
    GET_PLACE_TYPE,
    // GET_STORAGE_NUMBER,
} from '../../../../common/constants/Api';
import { ADD_PLACE_MANAGE } from '../../constants/Api';

const FormItem = Form.Item;

class AddModal extends React.Component {
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
                this.setState({ loading: true });
                values.shelfNumber = strTrim(values.shelfNumber);
                values.shelfGroupNumber = strTrim(values.shelfGroupNumber);
                values.shelfLayerNumber = strTrim(values.shelfLayerNumber);
                fetchPost(ADD_PLACE_MANAGE, { data: values }, 1)
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

    shelfCheck = (rule, value, callback) => {
        if (value && !Number(value)) {
            callback('请输入整数');
            return;
        }
        if (value.length > 2) {
            callback('请输入数字,并且不大于2位');
        } else {
            callback();
        }
    };

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
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
                                    })(
                                        <CSelect
                                            code="code" // 列表编码字段
                                            name="name" // 列表名称字段
                                            url={GET_WAREHOUSE}
                                            params={{ searchColumn: 'name' }} // 搜索参数
                                            placeholder="请选择仓库名称"
                                            onChange={() => {
                                                this.setState({ loading: false });
                                            }}
                                            // apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            // 其它字段同 Select组件配置
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="储位类型"
                            >
                                {
                                    getFieldDecorator('storageType', {
                                        rules: [{ required: true, message: '储位类型不能为空' }],
                                    })(
                                        <CSelect
                                            code="code" // 列表编码字段
                                            name="name" // 列表名称字段
                                            url={GET_PLACE_TYPE}
                                            params={{ searchColumn: 'name' }} // 搜索参数
                                            placeholder="请选择储位类型"
                                            onChange={() => {
                                                this.setState({ loading: false });
                                            }}
                                            // apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            // 其它字段同 Select组件配置
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="所属区"
                            >
                                {
                                    getFieldDecorator('area', {
                                        rules: [{ required: true, message: '所属区不能为空' }],
                                    })(
                                        <CSelect
                                            list={area}
                                            code="code" // 列表编码字段
                                            name="code" // 列表名称字段
                                            // url={GET_PLACE_TYPE}
                                            params={{ searchColumn: 'code' }} // 搜索参数
                                            placeholder="请选择所属区"
                                            onChange={() => {
                                                this.setState({ loading: false });
                                            }}
                                            // apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            // 其它字段同 Select组件配置
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="货架编号"
                            >
                                {
                                    getFieldDecorator('shelfNumber', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '货架编号不能为空',
                                            },
                                            {
                                                validator: this.shelfCheck,
                                            },
                                        ],
                                    })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }}
                                            placeholder="请输入货架编号"
                                            onChange={() => {
                                                this.setState({ loading: false });
                                            }}
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="货架组号"
                            >
                                {
                                    getFieldDecorator('shelfGroupNumber', {
                                        rules: [{
                                            required: true,
                                            message: '货架组号不能为空',
                                        }, { validator: this.shelfCheck }],
                                    })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }}
                                            placeholder="请输入货架组号"
                                            onChange={() => {
                                                this.setState({ loading: false });
                                            }}
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="货架层号"
                            >
                                {
                                    getFieldDecorator('shelfLayerNumber', {
                                        rules: [{ required: true, message: '货架层号不能为空' }],
                                    })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }}
                                            placeholder="请输入货架层号"
                                            onChange={() => {
                                                this.setState({ loading: false });
                                            }}
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="储位数"
                            >
                                {
                                    getFieldDecorator('storageNumber', {
                                        rules: [{ required: true, message: '储位数不能为空' }],
                                    })(
                                        // <CSelect
                                        //     code="code" // 列表编码字段
                                        //     name="name" // 列表名称字段
                                        //     url={GET_STORAGE_NUMBER}
                                        //     params={{ searchColumn: 'name' }} // 搜索参数
                                        //     placeholder="请选择储位数"
                                        //     onChange={() => { this.setState({ loading: false }); }}
                                        // // apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                        // // 其它字段同 Select组件配置
                                        // />,
                                        <Input
                                            type="text"
                                            style={{ width: 260 }}
                                            placeholder="请输入储位数"
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
