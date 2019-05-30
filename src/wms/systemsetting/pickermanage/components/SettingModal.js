import React from 'react';
import {
    Modal,
    Form,
    Input,
    Select,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { SET_PICKER_GROUP } from '../constants/Api';

const FormItem = Form.Item;
const Option = Select.Option;

class SettingModal extends React.Component {
    state = {
        loading: false,
    };

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    // 表单提交
    handleSubmit = () => {
        const { pageNumber, pageData } = this.props;
        this.props.form.validateFields((err, values) => {
            this.setState({ loading: true });
            if (!err) {
                values.key = this.props.record.key;
                fetchPost(SET_PICKER_GROUP, { data: values }, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.handleCancel();
                            this.props.handleSubmit(pageNumber, pageData);
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
        const { visible, record } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="wms-modal">
                <Modal
                    visible={visible}
                    title="设置"
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
                                <Input disabled value={record.warehouseName} />
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="工号"
                            >
                                <Input disabled value={record.jobNumber} />
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="姓名"
                            >
                                <Input disabled value={record.name} />
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="所属拣货组"
                            >
                                {
                                    getFieldDecorator('affiliatedPickingGroup', {
                                        rules: [{ required: true, message: '所属拣货组不能为空' }],
                                        initialValue: record ? record.affiliatedPickingGroup : '10',
                                    })(
                                        <Select
                                            onChange={() => { this.setState({ loading: false }); }}
                                        >
                                            <Option value="10">单品单件</Option>
                                            <Option value="20">单品多件</Option>
                                            <Option value="30">多品多件</Option>
                                        </Select>,
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
export default Form.create()(SettingModal);
