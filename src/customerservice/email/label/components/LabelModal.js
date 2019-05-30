import React from 'react';
import {
    Form, Input, InputNumber, Select, Row, Col, Radio,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class LabelMadal extends React.Component {
    // 组件顶部tab切换回调
    handlePlatformChange = (platformId) => {
        this.props.form.setFieldsValue({ platformId });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const { getFieldDecorator } = this.props.form;
        const { tagRecord, platformlistReducer } = this.props;
        return (
            <div className="add-content">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="平台"
                    >
                        {getFieldDecorator('platformId', {
                            rules: [{ required: true, message: '请输入平台' }],
                            initialValue: tagRecord ? tagRecord.platform.key : undefined,
                        })(
                            tagRecord ? (
                                <div className="one">
                                    <Select placeholder="请选择平台" defaultValue={tagRecord.platform.label} onChange={this.handlePlatformChange}>
                                        {platformlistReducer.platformList.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
                                    </Select>
                                </div>
                            ) : (
                                <Select placeholder="请选择平台">
                                    {platformlistReducer.platformList.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
                                </Select>
                            ),
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="标签名称"
                        className="mt12"
                    >
                        {getFieldDecorator('tagName', {
                            rules: [{ required: true, message: '请输入标签名称' }],
                            initialValue: tagRecord ? tagRecord.tagName : '',
                        })(
                            <Input placeholder="请输入标签名称" />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="排序"
                        className="mt12"
                    >
                        {getFieldDecorator('tagSort', {
                            rules: [{ required: true, message: '请输入排序值' }],
                            initialValue: tagRecord ? tagRecord.tagSort : '99',
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
                    <FormItem
                        {...formItemLayout}
                        label="买家邮件"
                        className="mt12"
                    >
                        {getFieldDecorator('isBuyerEmail', {
                            rules: [{ required: true, message: '请输入排序值' }],
                            initialValue: tagRecord ? tagRecord.isBuyerEmail : 0,
                        })(
                            <RadioGroup>
                                <Radio value={0}>否</Radio>
                                <Radio value={1}>是</Radio>
                            </RadioGroup>,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(LabelMadal);
