import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import { businessCode, platformCode, salesDepartCode, name, projectName } from '../../constants/index';
import ItemSelect from '../../../../../common/components/itemSelect'
import * as API from '../../../../constants/Api'

class AddDetail extends Component {
    formItemLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 12 },
    };

    componentDidMount() {       //编辑时显示对应数据
        this.setFormInitial();
    }

    componentWillReceiveProps() {   //点击确定或取消后，再打开弹窗数据更新
        if (!this.props.update) {
            this.setFormInitial();
        }
    }

    handleSelectChange = (e) => {   //选择项目流名称后带出项目流编码
        this.props.form.setFields({
            projectCode: {
                value: e
            },
        })
    }

    setFormInitial = () => {        //编辑时初始化弹窗的值
        if (this.props.item) {
            const { item } = this.props;
            this.props.form.setFields({
                projectName: {
                    value: item.projectName
                },
                projectCode: {
                    value: item.projectCode
                },
                csiDeveloper: {
                    value: item.csiDeveloperName
                },
                csiKConfirm: {
                    value: item.csiKConfirmName
                },
                csiSManager: {
                    value: item.csiSManagerName.split(',')
                },
                faSDirector: {
                    value: item.faSDirectorName
                },
                faSManager: {
                    value: item.faSManagerName
                },
                faSalers: {
                    value: item.faSalersName.split(',')
                },
                hoConfirmation: {
                    value: item.hoConfirmationName
                },
                hoDDirector: {
                    value: item.hoDDirectorName
                },
                hoDManager: {
                    value: item.hoDManagerName
                },
                hoLogistics: {
                    value: item.hoLogisticsName
                },
                hoSDirector: {
                    value: item.hoSDirectorName
                },
                hpaDirector: {
                    value: item.hpaDirectorName.split(',')
                },
                hpaManager: {
                    value: item.hpaManagerName
                },
                npDDirector: {
                    value: item.npDDirectorName
                },
                npDManager: {
                    value: item.npDManagerName
                },
                npSManager: {
                    value: item.npSManagerName
                },
                npDSalers: {
                    value: item.npDSalersName.split(',')
                },
                sDManager: {
                    value: item.sDManagerName
                },
            })
        }
    }


     handleChange2 = (value) => {
            let position = -1;
            value.forEach((v,index)=>{
                if(v==='general_audit'){
                    position = index;
                    return false;
                }
            })
            if(position>=0){
                if(value.length > 1){
                    value.splice(0, position)
                    value.splice(1, value.length-1)
                }
            }
     }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { item } = this.props;
        const params = {'pageData': 20, 'pageNumber': 1, userType: -1};
        return (
            <div className="npd-audit-adddetail">
                <Form>
                    <FormItem
                        {...this.formItemLayout}
                        label="项目流名称"
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='projectName'
                            name="name"
                            code="code"
                            searchColumn="projectName"
                            params={{'pageData': 20, 'pageNumber': 1}}
                            // dName={item.projectflowInfo}
                            // dValue={item.projectflowCode}
                            url={API.PROJECT_FLOW_LIST_API}
                            onChange={(value) => this.handleSelectChange(value)}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择项目流名称',
                                }],
                              }}
                        />
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="项目流编码"
                    >
                        {getFieldDecorator('projectCode', {
                            rules: [{
                                required: true,
                            }],
                        })(
                            <Input readOnly disabled />   //由项目流名称带出
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="1.热销新品申请---销售主管审核："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='hpaDirector'
                            dName={item&&item.hpaDirector}
                            dValue={item&&item.hpaDirectorName}
                            url={API.USER_LIST_API}
                            onChange={this.handleChange2}
                            params={params}
                            mode="multiple"
                            name="name"
                            code="userName"
                            rules={{
                                rules: [{
                                  required: true, message: '请选择销售主管',
                                }],
                              }}
                        />
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="2.热销新品申请---销售经理审核："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='hpaManager'
                            dName={item&&item.hpaManager}
                            dValue={item&&item.hpaManagerName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            rules={{
                                rules: [{
                                  required: true, message: '请选择销售经理',
                                }]
                              }}
                            params={params}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="3.新品立项列表---开发经理审核："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='npDManager'
                            dName={item&&item.npDManager}
                            dValue={item&&item.npDManagerName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择开发经理',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="4.新品立项列表---开发总监审核："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='npDDirector'
                            dName={item&&item.npDDirector}
                            dValue={item&&item.npDDirectorName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择开发总监',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="5.新品立项列表---销售主管审核："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='npDSalers'
                            dName={item&&item.npDSalers}
                            dValue={item&&item.npDSalersName}
                            url={API.USER_LIST_API}
                            onChange={this.handleChange2}
                            mode="multiple"
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择销售主管',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="6.新品立项列表---销售经理审核："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='npSManager'
                            dName={item&&item&&item.npSManager}
                            dValue={item&&item.npSManagerName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择销售经理',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="7.样品表---开发经理审核："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='sDManager'
                            dName={item&&item&&item.sDManager}
                            dValue={item&&item.sDManagerName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择开发经理',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="8.新品交接表---销售经理审核："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='hoDManager'
                            dName={item&&item.hoDManager}
                            dValue={item&&item.hoDManagerName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择销售经理',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="9.新品交接表---开发总监审核："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='hoDDirector'
                            dName={item&&item.hoDDirector}
                            dValue={item&&item.hoDDirectorName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择开发总监',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="10.新品交接表---产权专员："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='hoConfirmation'
                            dName={item&&item.hoConfirmation}
                            dValue={item&&item.hoConfirmationName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择产权专员',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="11.新品交接表---销售总监复核："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='hoSDirector'
                            dName={item&&item.hoSDirector}
                            dValue={item&&item.hoSDirectorName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择销售总监',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="12.新品交接表---物流专员："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='hoLogistics'
                            dName={item&&item.hoLogistics}
                            dValue={item&&item.hoLogisticsName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择物流专员',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="13.生成SKU---开发确认："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='csiDeveloper'
                            dName={item&&item.csiDeveloper}
                            dValue={item&&item.csiDeveloperName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择开发',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="14.生成SKU---销售主管确认："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='csiSManager'
                            dName={item&&item.csiSManager}
                            dValue={item&&item.csiSManagerName}
                            url={API.USER_LIST_API}
                            onChange={this.handleChange2}
                            mode="multiple"
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择销售主管',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="15.生成SKU---知产确认："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='csiKConfirm'
                            dName={item&&item.csiKConfirm}
                            dValue={item&&item.csiKConfirmName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择知产',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="16.首单申请---销售主管审核："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='faSalers'
                            dName={item&&item.faSalers}
                            dValue={item&&item.faSalersName}
                            url={API.USER_LIST_API}
                            onChange={this.handleChange2}
                            mode="multiple"
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择销售主管',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="17.首单申请---销售经理审核："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='faSManager'
                            dName={item&&item.faSManager}
                            dValue={item&&item.faSManagerName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择销售经理',
                                }],
                              }}
                        />

                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="18.首单申请---销售总监审核："
                        className="oms-itemselect_label_required"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='faSDirector'
                            dName={item&&item.faSDirector}
                            dValue={item&&item.faSDirectorName}
                            url={API.USER_LIST_API}
                            name="name"
                            code="userName"
                            params={params}
                            rules={{
                                rules: [{
                                  required: true, message: '请选择销售总监',
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