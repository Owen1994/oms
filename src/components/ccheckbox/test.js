import React from 'react';
import {
    Form,
    Button,
} from 'antd';
import CCheckbox from './index';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const LIST_CCHECKBOX = [
    { label: '苹果', value: 'Apple' },
    { label: '梨', value: 'Pear' },
    { label: '桔子', value: 'Orange' },
    { label: '香蕉', value: 'banana' },
    { label: '菠萝', value: 'pineapple' },
]

class TestCCheckbox extends React.Component {
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{backgroundColor: '#fff'}}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="Fruit"
                    >
                        {getFieldDecorator('fruit', {
                            initialValue: [{code:'Apple', name:'苹果'}],
                            rules: [
                                { required: true, message: '请选择水果' },
                            ],
                        })(
                            <CCheckbox
                                code='code' // 参数编码
                                name='name' // 参数名称
                                list={LIST_CCHECKBOX}
                                formType={1} // 表单数据类型，不填就是默认值，填1返回对象
                                //其它字段同 CheckboxGroup组件配置
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
  
export default Form.create()(TestCCheckbox);