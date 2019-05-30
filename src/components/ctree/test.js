import React from 'react';
import {
    Form,
    Button,
} from 'antd';
import CTree from './index';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
const LIST_TREEDATA =  [{
    title: '江西',
    key: 'JX',
    children: 
    [
        {
            title: '南昌',
            key: 'nanchan',
            children: [
                { title: '东湖区', key: 'donghuqu' },
                { title: '西湖区', key: 'xihuqu' },
                { title: '赣江新区', key: 'gangjiangxinqu' },
            ],
        }, 
        {
            title: '赣州',
            key: 'ganzhou',
            children: [
                { title: '章贡区', key: 'zhanggongqu' },
                { title: '南康区', key: 'nankangqu' },
                { title: '赣县区', key: 'ganxianqu' },
            ],
        }, 
        {
            title: '九江',
            key: 'jiujiang',
        }
    ],
}, {
    title: '广东',
    key: 'GD',
    children: [
    { title: '广州', key: 'guangzhou' },
    { title: '深圳', key: 'shenzhen' },
    { title: '东莞', key: 'dongguan' },
    ],
}, {
    title: '福建',
    key: 'FJ',
}];

/**
 * @author huangjianfeng
 * @description 自定义树形结构组件测试
 */
class TestCTree extends React.Component {
    
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
                        label="Address"
                    >
                        {getFieldDecorator('address', {
                            initialValue: ['ganzhou'],
                        })(
                            <CTree
                                list={LIST_TREEDATA}
                                formType={1}
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
  
export default Form.create()(TestCTree);