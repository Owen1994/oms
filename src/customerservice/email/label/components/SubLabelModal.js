import React from 'react';
import {
    Form, Input, InputNumber, Row, Col,
} from 'antd';

const FormItem = Form.Item;

class SubLabelMadal extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const { getFieldDecorator } = this.props.form;
        const { tagRecord } = this.props;
        return (
            <div className="add-content">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="父标签名称"
                    >
                        <span>
                            {!tagRecord.children && tagRecord.parentId !== undefined ? tagRecord.parentTagName : tagRecord.tagName}
                        </span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="平台"
                    >
                        {getFieldDecorator('platformId', {
                            initialValue: !tagRecord.children && tagRecord.parentId !== undefined ? tagRecord.platformId : tagRecord.platform.key,
                        })(
                            <span>{tagRecord.platform.label || tagRecord.platform}</span>,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="排序"
                        className="mt8"
                    >
                        {getFieldDecorator('tagSort', {
                            rules: [{ required: true, message: '请输入排序值' }],
                            initialValue: !tagRecord.children && tagRecord.parentId !== undefined ? tagRecord.tagSort : '99',
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
                        label="子标签名称"
                        className="mt12"
                    >
                        {getFieldDecorator('tagName', {
                            rules: [{ required: true, message: '请输入子标签名称' }],
                            initialValue: !tagRecord.children && tagRecord.parentId !== undefined ? tagRecord.tagName : undefined,
                        })(
                            <Input placeholder="请输入子标签名称" />,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(SubLabelMadal);
