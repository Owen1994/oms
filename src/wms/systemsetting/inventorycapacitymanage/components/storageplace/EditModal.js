import React from 'react';
import {
    Modal,
    Form,
    Input,
} from 'antd';
import { fetchPost } from '../../../../../util/fetch';
import { strTrim } from '../../../../../util/baseTool';
// import CSelect from '../../../../../components/cselect';
import { EDIT_PLACE_MANAGE } from '../../constants/Api';

const FormItem = Form.Item;

class EditModal extends React.Component {
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
            this.setState({ loading: true });
            if (!err) {
                values.width = strTrim(values.width);
                values.width = strTrim(values.width);
                values.height = strTrim(values.height);
                values.key = this.props.record.key;
                fetchPost(EDIT_PLACE_MANAGE, { data: values }, 1)
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
        this.props.closeModal('3');
    };

    render() {
        const { visible, record } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="wms-modal">
                <Modal
                    visible={visible}
                    title="编辑"
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
                                    getFieldDecorator('warehouseName', {
                                        rules: [{ required: true, message: '仓库名称不能为空' }],
                                        initialValue: record.warehouse,
                                    })(
                                        <Input
                                            type="text"
                                            disabled
                                            style={{ width: 260 }}
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="储位编码"
                            >
                                {
                                    getFieldDecorator('storageNumber', {
                                        rules: [{ required: true, message: '储位编码不能为空' }],
                                        initialValue: record.storageNumber,
                                    })(
                                        // <CSelect
                                        //     code="name" // 列表编码字段
                                        //     name="name" // 列表名称字段
                                        //     url={GET_SP_NUMBER}
                                        //     params={{ searchColumn: 'name' }} // 搜索参数
                                        //     placeholder="请选择储位编码"
                                        //     onChange={() => { this.setState({ loading: false }); }}
                                        //     // apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                        //     // 其它字段同 Select组件配置
                                        // />,
                                        <Input
                                            type="text"
                                            disabled
                                            style={{ width: 260 }}
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="长"
                            >
                                {
                                    getFieldDecorator('length', {
                                        // rules: [{ required: true, message: '货架编号不能为空' }],
                                    })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }}
                                            placeholder="请输入储位长度"
                                            onChange={() => { this.setState({ loading: false }); }}
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="宽"
                            >
                                {
                                    getFieldDecorator('width', {
                                        // rules: [{ required: true, message: '货架编号不能为空' }],
                                    })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }}
                                            placeholder="请输入储位宽度"
                                            onChange={() => { this.setState({ loading: false }); }}
                                        />,
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="高"
                            >
                                {
                                    getFieldDecorator('height', {
                                        // rules: [{ required: true, message: '货架编号不能为空' }],
                                    })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }}
                                            placeholder="请输入储位高度"
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
export default Form.create()(EditModal);
