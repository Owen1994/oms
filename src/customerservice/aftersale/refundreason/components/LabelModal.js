import React from 'react';
import {
    Form, Input, InputNumber, Row, Col,
} from 'antd';

const FormItem = Form.Item;

class LabelMadal extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const { getFieldDecorator } = this.props.form;
        const { record } = this.props;
        const hasRecord = Object.keys(record).length > 0;
        return (
            <div className="refund-label-modal">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="标签名称"
                    >
                        {getFieldDecorator('category', {
                            rules: [{ required: true, message: '请输入标签名称' }],
                            initialValue: hasRecord ? record.category : '',
                        })(
                            <Input placeholder="请输入标签名称" />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="排序"
                        className="mt12"
                    >
                        {getFieldDecorator('categorySort', {
                            rules: [{ required: true, message: '请输入排序值' }],
                            initialValue: hasRecord ? record.categorySort : '99',
                        })(
                            <InputNumber placeholder="请输入排序值" precision={0} min={0} style={{ width: 240 }} />,
                        )}
                    </FormItem>
                    <Row>
                        <Col span={8} />
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
                        {getFieldDecorator('categoryId', {
                            initialValue: hasRecord ? record.categoryId : undefined,
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(LabelMadal);
