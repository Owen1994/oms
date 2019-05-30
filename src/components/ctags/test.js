import React from 'react';
import {
    Form,
    Button,
} from 'antd';
import CTags from './index';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const LIST_CTAGS = [
    {code: 1, name: 'Movies'}, 
    {code: 2, name: 'Books'},
    {code: 3, name: 'Music'},
    {code: 4, name: 'Sports'},
];

/**
 * @author huangjianfeng
 * @description 自定义下拉框组件测试
 */
class TestCTags extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    /**
     * tag选择变化监听
     */
    handleChange = (values) => {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{backgroundColor: '#fff'}}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="Categories"
                    >
                        {getFieldDecorator('categories', {
                            initialValue: ['Movies'],
                            rules: [
                                { required: true, message: 'Please select your categories!' },
                            ],
                        })(
                            <CTags
                                list={LIST_CTAGS}
                                handleChange={this.handleChange} // 选择监听变化
                            />
                        )}
                    </FormItem>
                    <FormItem
                        wrapperCol={{ span: 12, offset: 6 }}
                    >
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                </Form>
        </div>
        );
    }
}
  
export default Form.create()(TestCTags);