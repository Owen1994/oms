import React from 'react';
import {
    Form,
    Button,
    Icon
} from 'antd';
import CUpload from './index';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

/**
 * @author huangjianfeng
 * @description 自定义文件上传组件测试
 */
class TestCUpload extends React.Component {
    
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
                        label="Upload"
                    >
                        {getFieldDecorator('upload', {
                            initialValue: [
                                {
                                    name: 'a9d3fd1f4134970aa3f9303e98cad1c8a7865d1c.jpg', 
                                    url: 'https://soter-test.youkeshu.com/yks/file/server/image/a9d3fd1f4134970aa3f9303e98cad1c8a7865d1c_1539065266760.jpg'
                                }
                            ],
                        })(
                            <CUpload
                                config={{ // 自定义配置项，同Upload
                                    name:'logo',
                                    listType: 'picture',
                                    beforeUpload: (file) => {
                                        const reg = /\.(xls|xlsx)$/i;  // excel文件格式校验
                                        if(!reg.test(file.name) || file.size > 2097152){
                                            message.error("请上传不大于2M的Excel文件！")
                                            return false;
                                        }
                                        return true;
                                    }       
                                }}
                            >
                                <Button>
                                    <Icon type="upload" /> Click to upload
                                </Button>
                            </CUpload>
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
  
export default Form.create()(TestCUpload);