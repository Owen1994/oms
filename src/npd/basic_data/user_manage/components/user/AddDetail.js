import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import ItemSelect from '../../../../../common/components/itemSelect'
import { post } from '../../../../../util/axios';
const FormItem = Form.Item;
const Option = Select.Option;
import * as API from '../../../../constants/Api'
import * as CONSTANTS from '../../constants/index';

var userNameInput;
class AddDetail extends Component {
    constructor(props) {
        super(props);
        // this.setFormInitial();
        // this.state = {
        //     all_user_data: this.props.list_reducer.all_user_data
        // }
    }
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    handleChange = (value, option) => {
        this.props.list_fetch4({name: 'all_user_data', value: {pageNumber: 1, pageData: 20, name: value}});
        /**
         * TODO : 带出用户姓名
         */
        const { all_user_data } = this.props.list_reducer;
        let nameArr = all_user_data.filter(item => item.userName === value);
        if(nameArr.length > 0){
            this.props.form.setFields({
                name: {
                    value: nameArr[0].name
                },
            });
        }
        // console.log(this.props.list_reducer.all_user_data)
    }

    setFormInitial = () => {
        const { getFieldDecorator } = this.props.form;
        const { user_data } = this.props.list_reducer;
        // console.log(this.props.item)
        if (this.props.item) {
            const { item } = this.props;
            this.props.form.setFields({
                userName: {
                    value: item.userName
                },
                name: {
                    value: item.name
                },
                positionCode: {
                    value: parseInt(item.positionCode) ? parseInt(item.positionCode) : ""
                },
                businessLineCode: {
                    value: parseInt(item.businessCode) ? parseInt(item.businessCode) : ""
                },
                platformCode: {
                    value: item.platformCode
                },
                userGroupCode: {
                    value: item.userGroupCode
                },
                superiorUserName: {
                    value: item.superiorUserName
                }
            })
        }
    }

    componentWillMount(){
        if(this.props.list_fetch1 && this.props.list_reducer.user_data.length < 1){
            this.props.list_fetch1({name: 'user_data', value: {pageNumber: 1, pageData: 20}});
            this.props.list_fetch3({name: 'userGroup_data', value: {pageNumber: 1, pageData: 20}});
            // this.props.list_fetch4({name: 'all_user_data', value: {pageNumber: 1, pageData: 20}});
        }
    }
    componentDidMount() {
        this.setFormInitial();
    }

    componentWillReceiveProps() {
        if (!this.props.update) {
            this.setFormInitial();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { platform_data } = this.props.list_reducer2;
        const { user_data, all_user_data } = this.props.list_reducer;
        const { userGroup_data } = this.props.list_reducer3;
        if(this.props.item){
            userNameInput = (
                <FormItem
                    {...this.formItemLayout}
                    label="用户名"
                >
                    {getFieldDecorator('userName')(
                        <Input readOnly style={{ border: "none", boxShadow: "none" }} />
                    )}
                </FormItem>
            )
        }else{
            userNameInput = (
                <FormItem
                    {...this.formItemLayout}
                    label="用户名"
                >
                    {getFieldDecorator('userName', {
                        rules: [{
                            required: true, message: '请选择用户名',
                        }],
                    })(
                        //    <Input onChange={this.handleChange} />
                        // <ItemSelect
                        //     url={API.ALL_USER_LIST_API}     //所有用户接口
                        //     code="name"
                        //     name="name"
                        //     onChange={this.handleChange}
                        // />
                        <Select placeholder="请选择用户" mode="combobox" onChange={this.handleChange}>
                                {
                                    all_user_data.map((item, index) => (
                                        <Option value={item.userName} key={item.userName}>{item.userName}</Option>
                                    ))
                                }
                            </Select>
                    )}
                </FormItem>
            )
        }
        return (
            <div>
                <Form>
                    {userNameInput}
                    <FormItem
                        {...this.formItemLayout}
                        label="名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input readOnly style={{ border: "none", boxShadow: "none" }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="职位"
                    >
                        {getFieldDecorator('positionCode', {
                            rules: [{
                                required: true, message: '请选择职位.',
                            }],
                        })(
                            <Select placeholder="请选择职位">
                                {
                                    CONSTANTS.positionName.map((item, index) => (
                                        <Option value={item.id + 1} key={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="业务线"
                    >
                        {getFieldDecorator('businessLineCode', {
                            rules: [
                                { required: true, message: '请选择业务线' },
                            ],
                        })(
                            <Select placeholder="请选择业务线">
                                {
                                    CONSTANTS.businessCode.map((item, index) => (
                                        <Option value={item.id+1} key={index}>{item.name}</Option>
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
                        {getFieldDecorator('userGroupCode', {
                            rules: [
                                { required: true, message: '请输入用户组' },
                            ],
                        })(
                            <Select placeholder="请选择用户组">
                                {
                                    userGroup_data.map((item, index) => (
                                        <Option value={item.code} key={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="上级"
                    >
                        {getFieldDecorator('superiorUserName', {
                            rules: [
                                { required: false, message: '请输入上级名称' },
                            ],
                        })(
                            <Select placeholder="请选择上级名称">
                                {
                                    user_data.map((item, index) => (
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

export default Form.create()(AddDetail);