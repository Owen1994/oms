import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import { businessCode, platformCode } from '../../constants/index';

class AddDetail extends Component {
    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    };

    setFormInitial = () => {
        if(this.props.item){
            const { item } = this.props;
            this.props.form.setFields({
                code: {
                    value: item.code
                },
                name: {
                    value: item.name
                }
            })
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

        return (
            <div className="npd-usermanagement-adddetail">
                <Form>
                    <FormItem
                        {...this.formItemLayout}
                        label="平台编码"
                    >
                        {getFieldDecorator('code', {
                            rules: [{
                                required: true, message: '请输入平台编码.',
                            }],
                        })(
                            <Input maxLength={20} />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="平台名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入平台名称.',
                            }],
                        })(
                            <Input maxLength={30} />
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(AddDetail);