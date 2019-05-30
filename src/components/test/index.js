import React from 'react';
import {
    Form,
    Button,
    Icon,
    message
} from 'antd';
import constant from './constant';
import CTags from '../ctags';
import CSelect from '../cselect';
import CCheckbox from '../ccheckbox';
import CTree from '../ctree';
import CUpload from '../cupload';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

/**
 * @author huangjianfeng
 * @description 自定义表单组件测试
 */
class MultipleFormComponent extends React.Component {
    
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
                        label="爱好"
                    >
                        {getFieldDecorator('categories', {
                            initialValue: ['Movies'],
                            // rules: [
                            //     { required: true, message: 'Please select your categories!' },
                            // ],
                        })(
                            <CTags
                                list={constant.LIST_CTAGS}
                                mode='multiple' // 是否支持多选
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="站点"
                    >
                        {getFieldDecorator('site', {
                            initialValue: ['0', '2'],
                            // initialValue: [{id:'0', name:'US'}, {id:'2', name:'CA'}],
                            rules: [
                                { required: true, message: '请选择站点' },
                            ],
                        })(
                            <CSelect
                                list={constant.LIST_CSELECT} // 默认值列表
                                code='id' // 列表编码字段
                                name='name' // 列表名称字段
                                url='/pls/ebay/motan/service/api/IEbayService/ebaySite'
                                mode='multiple' // 是否多选
                                maxCount={3} // 最多选择项数量
                                formType={2}  // 表单数据类型，不填就是默认值，填1返回对象
                                params={{searchColumn: 'name'}} // 搜索参数
                                apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                //其它字段同 Select组件配置
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="水果"
                    >
                        {getFieldDecorator('fruit', {
                            initialValue: [{code:'Apple', name:'苹果'}],
                            rules: [
                                { required: true, message: '请选择水果' },
                            ],
                        })(
                            <CCheckbox
                                code='code' // 数组项编码
                                name='name'// 数组项名称
                                list={constant.LIST_CCHECKBOX} // 源数据 同antd
                                formType={1} // 表单数据类型，不填就是默认值，填1返回对象
                                //其它字段同 CheckboxGroup组件配置
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="地址"
                    >
                        {getFieldDecorator('address', {
                            initialValue: ['ganzhou'],
                        })(
                            <CTree
                                code='code' // 数组项编码
                                name='name'// 数组项名称
                                list={constant.LIST_TREEDATA}
                                formType={1}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="附件"
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
                                config={{ //自定义配置项，同Upload
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
  
export default Form.create()(MultipleFormComponent);