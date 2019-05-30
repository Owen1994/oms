import React from 'react';
import {
    Form, Input, InputNumber, Select, Row, Col,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class TemplateModal extends React.Component {
    handlePlatformChange = (platform) => {
        this.props.form.setFieldsValue({ platformId: platform });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const { getFieldDecorator } = this.props.form;
        const { tagRecord, platformlistReducer, editable } = this.props;
        return (
            <div className="add-content">
                <Form>
                    <FormItem>
                        {
                            getFieldDecorator('tempClassId', {
                                initialValue: tagRecord ? tagRecord.key : '',
                            })(<Input type="hidden" />)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="平台"
                        className="mt-5"
                    >
                        {getFieldDecorator('platformId', {
                            rules: [{ required: true, message: '请输入平台' }],
                            initialValue: tagRecord ? tagRecord.platform.key : undefined,
                        })(
                            // 编辑情况
                            tagRecord ? (
                                <div>
                                    <Select
                                        placeholder="请选择平台"
                                        defaultValue={tagRecord ? tagRecord.platform.label : ''}
                                        onChange={this.handlePlatformChange}
                                        disabled={!!editable}
                                    >
                                        {platformlistReducer.platformList.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
                                    </Select>
                                </div>
                            )
                            // 新增
                                : (
                                    <Select placeholder="请选择平台">
                                        {platformlistReducer.platformList.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
                                    </Select>
                                ),
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="分类名称"
                        className="mt12"
                    >
                        {getFieldDecorator('tempClassName', {
                            rules: [{ required: true, message: '请输入分类名称' }],
                            initialValue: tagRecord ? tagRecord.title : '',
                        })(
                            <Input placeholder="请输入分类名称" />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="排序"
                        className="mt12"
                    >
                        {getFieldDecorator('tempClassSort', {
                            rules: [{ required: true, message: '请输入排序值' }],
                            initialValue: tagRecord ? tagRecord.sort : '',
                        })(
                            <InputNumber placeholder="请输入排序值" precision={0} min={0} style={{ width: 240 }} />,
                        )}
                    </FormItem>
                    <Row>
                        <Col span={8} />
                        <Col span={12}>
                            <p style={{ color: 'red', fontSize: 12, paddingTop: 5 }}>从小到大排序</p>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
export default Form.create()(TemplateModal);
