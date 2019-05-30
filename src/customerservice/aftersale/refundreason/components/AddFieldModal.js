import React from 'react';
import {
    Form, Input, InputNumber, Row, Col, Radio,
} from 'antd';
import CSelect from '../../../../components/cselect';
import { GET_FIELDS_TYPE } from '../constants';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

class AddFieldModal extends React.Component {
    state = {
        fieldTypeKey: this.props.record.fieldType ? this.props.record.fieldType : ''
    }

    fieldTypeChange = (v) => {
        this.setState({ fieldTypeKey: v.key });
    }

    render() {
        const { fieldTypeKey } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        };
        const { getFieldDecorator } = this.props.form;
        const { record } = this.props;
        const hasRecord = Object.keys(record).length > 0;
        const labelInValue = true;
        let fieldValuesForm = null;
        if (fieldTypeKey && ['select', 'radio', 'checkbox'].includes(fieldTypeKey)) {
            fieldValuesForm = (
                <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    label="选项值"
                    className="mt12"
                >
                    {getFieldDecorator('fieldOption', {
                        initialValue: hasRecord ? record.fieldOption : '',
                        rules: [
                            { required: false, message: '请填写选项值' },
                        ],
                    })(
                        <TextArea autosize={{ minRows: 6, maxRows: 6 }} placeholder="请输入选项值，选项值请用“|”隔开" disabled={hasRecord} />,
                    )}
                </FormItem>
            )
        }
        return (
            <div className="refund-label-modal">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="字段名称"
                    >
                        {getFieldDecorator('fieldName', {
                            rules: [{ required: true, message: '请输入字段名称' }],
                            initialValue: hasRecord ? record.fieldName : '',
                        })(
                            <Input placeholder="请输入标签名称" />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="字段类型"
                        className="mt6"
                    >
                        {getFieldDecorator('fieldType2', {
                            initialValue: hasRecord ? { key: record.fieldType, label: record.fieldTypeText } : undefined,
                            rules: [
                                { required: true, message: '请选择字段类型' },
                            ],
                        })(
                            <CSelect
                                // list={hasRecord ? [{ key: record.fieldType, label: record.fieldTypeText }] : undefined}
                                code="key"
                                name="label"
                                disabled={hasRecord}
                                url={GET_FIELDS_TYPE}
                                apiListType={1}
                                placeholder="请输入字段类型"
                                labelInValue={labelInValue}
                                handleChange={this.fieldTypeChange}
                            />,
                        )}
                    </FormItem>
                    {fieldValuesForm}
                    <FormItem
                        {...formItemLayout}
                        label="是否必选"
                        className="mt6"
                    >
                        {getFieldDecorator('isRequire', {
                            initialValue: hasRecord ? record.isRequire : 2,
                            rules: [
                                { required: true, message: '请选择是否必选' },
                            ],
                        })(
                            <RadioGroup>
                                <Radio value={2}>是</Radio>
                                <Radio value={1}>否</Radio>
                            </RadioGroup>,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="排序"
                        className="mt6"
                    >
                        {getFieldDecorator('sorts', {
                            rules: [{ required: true, message: '请输入排序值' }],
                            initialValue: hasRecord ? record.sorts : '99',
                        })(
                            <InputNumber placeholder="请输入排序值" precision={0} min={0} style={{ width: 240 }} />,
                        )}
                    </FormItem>
                    <Row>
                        <Col span={6} />
                        <Col span={12}>
                            <p className="sort-tips">从小到大排序</p>
                        </Col>
                    </Row>
                    <FormItem>
                        {getFieldDecorator('group', {
                            initialValue: '1',
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('fieldId', {
                            initialValue: hasRecord ? record.fieldId : undefined,
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(AddFieldModal);
