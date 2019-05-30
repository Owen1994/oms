import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import { nature, type, enable } from '../constants/index';      //下拉框数据
import ItemSelect from '../../../../common/components/itemSelect'
import * as API from '../../../constants/Api'
const FormItem = Form.Item;
const Option = Select.Option;

/**
 * 仓库关系页面新增弹窗form表单
 */
class AddDetail extends Component {

    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    };

    setFormInitial = () => {
        if (this.props.item) {
            const { item } = this.props;
            this.props.form.setFields({
                code: {
                    value: item.code
                },
                name: {
                    value: item.name
                },
                natureCode: {
                    value: parseInt(item.natureCode) ? parseInt(item.natureCode) : ""
                },
                classificationCode: {
                    value: parseInt(item.classificationCode) ? parseInt(item.classificationCode) : ""
                },
                country: {
                    value: item.country
                },
                uName: {
                    value: item.uName
                },
                address: {
                    value: item.address
                },
                state: {
                    value: item.state === 1 ? "启用" : "禁用"
                },
            })
        }
    }

    componentDidMount() {
        //点击编辑按钮打开弹窗时自动带入当前行数据
        this.setFormInitial();
    }

    componentWillReceiveProps() {
        if (!this.props.update) {
            //如果上次点击了取消按钮，修改的内容不会保留，再次打开时显示初始数据
            this.setFormInitial();
        }
    }

    handleChange = () => {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { item } = this.props;
        return (
            <div className="npd-depot-adddetail">
                <Form>
                    <FormItem
                        {...this.formItemLayout}
                        label="仓库编码"
                    >
                        {getFieldDecorator('code', {
                            rules: [{
                                required: true, message: '请输入仓库编码.',
                            }],
                        })(
                            <Input maxLength={20} />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="仓库名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入仓库名称.',
                            }],
                        })(
                            <Input maxLength={30} />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="仓库性质"
                    >
                        {getFieldDecorator('natureCode', {
                            rules: [
                                { required: true, message: '请选择仓库性质' },
                            ],
                        })(
                            <Select placeholder="请选择">
                                {
                                    nature.map((item, index) => (
                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="仓库分类"
                    >
                        {getFieldDecorator('classificationCode', {
                            rules: [
                                { required: true, message: '请选择仓库分类' },
                            ],
                        })(
                            <Select placeholder="请选择">
                                {
                                    type.map((item, index) => (
                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="国家"
                    >
                        {getFieldDecorator('country')(
                            <Input maxLength={20} />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="负责人"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='uName'
                            dName={item&&item.uName}
                            dValue={item&&item.uName}
                            url={API.USER_LIST_API}
                            code="name"
                            name="name"
                            params={{'pageData': 20, 'pageNumber': 1}}
                        />
                    </FormItem>

                    <FormItem
                        {...this.formItemLayout}
                        label="地址"
                    >
                        {getFieldDecorator('address')(
                            <Input maxLength={80} />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="启用状态"
                    >
                        {getFieldDecorator('state', {
                            rules: [{
                                required: true, message: '请选择启用状态.',
                            }],
                        })(
                            <Select placeholder="请选择">
                                {
                                    enable.map((item, index) => (
                                        <Option value={item.id} key={index}>{item.name}</Option>
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

export default Form.create()(AddDetail);