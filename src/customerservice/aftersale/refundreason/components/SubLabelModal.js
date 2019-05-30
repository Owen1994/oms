import React from 'react';
import {
    Form, Input, InputNumber, Row, Col,
} from 'antd';

const FormItem = Form.Item;

class SubLabelMadal extends React.Component {
    cateCodeChange = (e) => {
        let cateCode = e.target.value;
        const reg = /([^0-9a-zA-Z])/g;
        cateCode = cateCode.replace(reg, '');
        if (cateCode.length > 20) {
            cateCode = cateCode.slice(0, cateCode.length - 1)
        }
        e.target.value = cateCode;
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const { getFieldDecorator } = this.props.form;
        const { record } = this.props;
        return (
            <div className="sub-label-modal">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="父类名称"
                    >
                        <span>
                            {record.parentId !== undefined ? record.parentCategoryName : record.category}
                        </span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="排序"
                        className="mt12"
                    >
                        {getFieldDecorator('categorySort', {
                            rules: [{ required: true, message: '请输入排序值' }],
                            initialValue: record.parentId !== undefined ? record.categorySort : '99',
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
                    <FormItem
                        {...formItemLayout}
                        label="子标签名称"
                        className="mt12"
                    >
                        {getFieldDecorator('category', {
                            rules: [{ required: true, message: '请输入子标签名称' }],
                            initialValue: record.parentId !== undefined ? record.category : undefined,
                        })(
                            <Input placeholder="请输入子标签名称" />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="编号"
                        className="mt12"
                    >
                        {getFieldDecorator('cateCode', {
                            rules: [{ required: true, message: '请输入编号' }],
                            initialValue: record.parentId !== undefined ? record.cateCode : undefined,
                        })(
                            <Input placeholder="由数字和字母组成,且不超过20个字符" onChange={this.cateCodeChange} />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('parentId', {
                            initialValue: record.parentId !== undefined ? record.parentId : record.categoryId,
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('categoryId', {
                            initialValue: record.parentId !== undefined ? record.categoryId : undefined,
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('group', {
                            initialValue: '1',
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(SubLabelMadal);
