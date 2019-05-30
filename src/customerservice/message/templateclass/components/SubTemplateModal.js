import React from 'react';
import { Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

class SubTemplateModal extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const { getFieldDecorator } = this.props.form;
        const { tagRecord, optionType } = this.props;
        return (
            <div className="add-content">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="父分类名称"
                        className="mt-12"
                    >
                        {getFieldDecorator('tempClassId', {
                            initialValue: optionType === 'addSublabel' ? '' : tagRecord.key,
                        })(
                            <span>
                                { optionType === 'addSublabel' ? tagRecord.title : tagRecord.parentName }
                            </span>,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="平台"
                    >
                        <span>{tagRecord.platform.label || tagRecord.platform}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="排序"
                        className="tp8"
                    >
                        {getFieldDecorator('tempClassSort', {
                            rules: [{ required: true, message: '请输入排序值' }],
                            initialValue: optionType !== 'addSublabel' ? tagRecord.sort : '',
                        })(
                            <InputNumber placeholder="请输入排序值" precision={0} min={0} style={{ width: 240 }} />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="子分类名称"
                        className="mt12"
                    >
                        {getFieldDecorator('tempClassName', {
                            rules: [{ required: true, message: '请输入子分类名称' }],
                            initialValue: optionType !== 'addSublabel' ? tagRecord.title : '',
                        })(
                            <Input placeholder="请输入子分类名称" />,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(SubTemplateModal);
