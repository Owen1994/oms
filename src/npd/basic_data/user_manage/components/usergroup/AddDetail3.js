import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import { businessCode, platformCode } from '../../constants/index';

import ItemSelect from '../../../../../common/components/itemSelect'
import * as API from '../../../../constants/Api'

class AddDetail3 extends Component {
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    setFormInitial = () => {
        if(this.props.item){
            const { item } = this.props;
            this.props.form.setFields({
                code: {
                    value: item.code
                },
                businessCode: {
                    value: item.businessName
                },
                platformCode: {
                    value: item.platformName
                },
                name: {
                    value: item.name
                }
            })
        }
    }

    componentWillMount(){
        if(!this.props.list_reducer2.platform_data){
            this.props.list_fetch2({name: 'platform_data', value: {pageNumber: 1, pageData: 20}});
            // this.props.list_fetch3({name: 'userGroup_data', value: {pageNumber: 1, pageData: 20}});
        }
    }

    componentDidMount(){
        this.setFormInitial();
    }

    componentWillReceiveProps(){
        if(!this.props.update){
            this.setFormInitial();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { platform_data } = this.props.list_reducer2;
        const  userGroup_data  = this.props.list_reducer3.data;
        return (
            <div>
                <Form>
                    <FormItem
                        {...this.formItemLayout}
                        label="部门编码"
                    >
                        {getFieldDecorator('code', {
                            rules: [{
                                required: false, message: '请输入部门编码.',
                                
                            }],
                        })(
                            <Input readOnly style={{border: "none", boxShadow:"none"}} />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="业务线"
                    >
                        {getFieldDecorator('businessCode', {
                            rules: [
                                { required: true, message: '请选择业务线' },
                            ],
                        })(
                            <Select placeholder="请选择业务线">
                                {
                                    businessCode.map((item, index) => (
                                        <Option value={item.id + 1} key={index}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="平台"
                    >
                        {getFieldDecorator('platformCode', {
                            rules: [
                                { required: false, message: '请选择平台' },
                            ],
                        })(
                            <Select placeholder="请选择平台">
                                {
                                    platform_data.map((item, index) => (
                                        <Option value={item.code} key={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="用户组"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入用户组.',
                            }],
                        })(
                            <Select placeholder="请选择用户组">
                                {
                                    userGroup_data.map((item, index) => (
                                        <Option value={item.name} key={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(AddDetail3);