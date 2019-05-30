import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import ItemSelect from '../../../../../common/components/itemSelect'
import * as API from '../../../../constants/Api'
import { businessCode2,
    //  platformCode2, 
     salesDepartCode 
    } from '../../constants/index';

/**
 * 仓库关系页面新增弹窗form表单
 */
let projectObj = {
    businessCode: " ",
    platformCode: " ",
    salesDepartCode: " "
}
let projectName = "";
class AddDetail extends Component {
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
                projectflowCode: {
                    value: item.name
                },
                businessCode: {
                    value: parseInt(item.businessCode) ? parseInt(item.businessCode) :"" 
                },
                platformCode: {
                    value: item.platformCode
                },
                salesDepartCode: {
                    value: item.sdName
                }
            })
            projectObj = {
                businessCode: item.businessName,
                platformCode: item.platformName,
                salesDepartCode: item.sdName
            }
        }
    }

    componentWillMount(){
        // this.props.list_fetch3({name: 'userGroup_data', value: {pageNumber: 1, pageData: 20}});
    }

    componentDidMount() {
        this.setFormInitial();
    }

    componentWillReceiveProps() {
        if (!this.props.update) {
            this.setFormInitial();
        }
    }

    handleSelectChange1 = (value, options) => {
        projectObj["businessCode"] = options.props.children;
        projectName = projectObj.businessCode + "-" + projectObj.platformCode + "-" + projectObj.salesDepartCode;
        this.props.form.setFields({
            projectflowCode: {
                value: projectName
            }
        })
    }

    handleSelectChange2 = (value, options) => {
        projectObj["platformCode"] = options.children;
        projectName = projectObj.businessCode + "-" + projectObj.platformCode + "-" + projectObj.salesDepartCode;
        this.props.form.setFields({
            projectflowCode: {
                value: projectName
            }
        })
    }

    handleSelectChange3 = (value, options) => {
        projectObj["salesDepartCode"] = options.children;
        projectName = projectObj.businessCode + "-" + projectObj.platformCode + "-" + projectObj.salesDepartCode;
        this.props.form.setFields({
            projectflowCode: {
                value: projectName
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { userGroup_data, platform_data } = this.props.list_reducer;
        const { item } = this.props;
        return (
            <div className="npd-project-adddetail">
                <Form>
                    <FormItem
                        {...this.formItemLayout}
                        label="项目流编码"
                    >
                        {getFieldDecorator('code')(
                            <Input readOnly disabled />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="新品项目名称"
                    >
                        {getFieldDecorator('projectflowCode', {
                            rules: [{
                                required: false, message: '请输入新品项目名称.',
                            }],
                        })(
                            <Input readOnly disabled />
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
                            <Select placeholder="请选择业务线" onChange={this.handleSelectChange1} >
                                {
                                    businessCode2.map((item, index) => (
                                        <Option value={item.id + 1} key={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="平台"
                        className="oms-itemselect_label_required"
                    >
                        {/* {getFieldDecorator('platformCode', {
                            rules: [
                                { required: true, message: '请选择平台' },
                            ],
                        })(
                            <Select placeholder="请选择平台" onChange={this.handleSelectChange2}>
                                {
                                    platform_data.map((item, index) => (
                                        <Option value={item.code} key={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )} */}
                         <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            dName={item && item.platformName}
                            dValue={item && item.platformCode}
                            formName="platformCode"
                            url={API.PLATFORM_LIST_API}
                            code="code"
                            name="name"
                            onChange={this.handleSelectChange2}
                            params={{'pageData': 20, 'pageNumber': 1}}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择平台',
                                }],
                              }}
                        />
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="销售部门"
                        className="oms-itemselect_label_required"
                    >
                        {/* {getFieldDecorator('salesDepartCode', {
                            rules: [
                                { required: true, message: '请选择销售部门' },
                            ],
                        })(
                            <Select placeholder="请选择销售部门" onChange={this.handleSelectChange3}>
                                {
                                    userGroup_data.map((item, index) => (
                                        <Option value={item.code} key={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )} */}
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName="salesDepartCode"
                            dName={item && item.sdName}
                            dValue={item && item.sdCode}
                            url={API.USER_GROUP_LIST_API}     
                            code="code"
                            name="name"
                            onChange={this.handleSelectChange3}
                            params={{'pageData': 20, 'pageNumber': 1}}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择销售部门',
                                }],
                              }}
                        />
                    </FormItem>

                </Form>
            </div>
        );
    }
}

export default Form.create()(AddDetail);