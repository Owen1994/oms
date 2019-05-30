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
        this.state = {
            name: ''
        }
    }
    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    };

    handleChange = (value) => {
        this.setState({ name: value });
        this.props.list_fetch4({ name: 'all_user_data', value: { pageNumber: 1, pageData: 20, name: value } });
    }

    setFormInitial = () => {
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

    componentWillMount() {
        if (this.props.list_fetch1 && this.props.list_reducer.user_data.length < 1) {
            this.props.list_fetch1({ name: 'user_data', value: { pageNumber: 1, pageData: 20 } });
            this.props.list_fetch3({ name: 'userGroup_data', value: { pageNumber: 1, pageData: 20 } });
            // this.props.list_fetch4({name: 'all_user_data', value: {pageNumber: 1, pageData: 20}});
        }
    }
    componentDidMount() {
        this.setFormInitial();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.update) {
            this.setFormInitial();
        }
        if (!this.props.item) {       //新增窗口输入用户名带出中文姓名
            const reducer1 = this.props.list_reducer;
            const reducer2 = nextProps.list_reducer;
            if (reducer2 && reducer1 !== reducer2) {
                const { all_user_data } = reducer2;
                if (all_user_data && all_user_data !== []) {
                    let nameArr = all_user_data.filter(item => item.userName === this.state.name);
                    if (nameArr.length > 0) {
                        this.props.form.setFields({
                            name: {
                                value: nameArr[0].name
                            },
                        });
                    } else {
                        this.props.form.setFields({
                            name: {
                                value: ''
                            },
                        });
                    }
                }
            }
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { user_data, all_user_data } = this.props.list_reducer;
        const { item } = this.props;
        if (this.props.item) {
            userNameInput = (
                <FormItem
                    {...this.formItemLayout}
                    label="用户名"
                >
                    {getFieldDecorator('userName')(
                        <Input readOnly disabled />
                    )}
                </FormItem>
            )
        } else {
            userNameInput = (
                <FormItem
                    {...this.formItemLayout}
                    label="用户名"
                >
                    {getFieldDecorator('userName', {
                        rules: [{
                            required: true, message: '请输入用户名',
                        }],
                    })(
                        <Select placeholder="请选择用户" mode="combobox" onChange={this.handleChange} >
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
            <div className="npd-usermanagement-adddetail">
                <Form>
                    {userNameInput}
                    <FormItem
                        {...this.formItemLayout}
                        label="名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                            }],
                        })(
                            <Input readOnly disabled />
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
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            dName={item && item.platformName}
                            dValue={item && item.platformCode}
                            formName="platformCode"
                            url={API.PLATFORM_LIST_API}
                            code="code"
                            name="name"
                            params={{'pageData': 20, 'pageNumber': 1}}
                        />
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="用户组"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName="userGroupCode"
                            dName={item && item.userGroupName}
                            dValue={item && item.userGroupCode}
                            url={API.USER_GROUP_LIST_API}     
                            code="code"
                            name="name"
                            params={{'pageData': 20, 'pageNumber': 1}}
                        />
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="上级"
                    >
                        {/* {getFieldDecorator('superiorUserName', {
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
                        )} */}
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            dName={item && item.superiorUserName}
                            dValue={item && item.superiorUserName}
                            formName="superiorUserName"
                            url={API.USER_LIST_API}
                            code="name"
                            name="name"
                            params={{'pageData': 20, 'pageNumber': 1}}
                        />
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(AddDetail);
