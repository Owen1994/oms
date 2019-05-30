import React, { Component } from 'react';
import { Row, Col, Input, Form } from 'antd';

const FormItem = Form.Item

class App extends Component {
    state = {
    }
    
    render() {
        const { item } = this.props    
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }
        return (
            <div className="graph-detail">
                <Row gutter={24}>
                    <Col span={24}>
                        <FormItem
                            {...formItemLayout}
                            label="上级分类"
                        >
                            {
                                item? item.parentCategoryName? <span>{item.parentCategoryName}</span>: '无': '无'
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="分类名称">
                            {getFieldDecorator('figureCategoryName', {
                                initialValue: item? item.currentCategoryName? item.currentCategoryName: '' : '',
                                rules: [
                                    { max: 120, message: '最多输入120个字符' },
                                    { required: true, message: '请填写分类名称', }],
                            })(
                                <Input placeholder="请填写分类名称" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}

 export default Form.create()(App)
