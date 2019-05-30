import React from 'react';
import {
    Form, Input, Radio, Checkbox,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { GET_SUBLABEL_RULE } from '../constants';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

class SubLabelRuleModal extends React.Component {
    state = {
        labelList: {},
        keywordDisabled: false, // 关键词栏是否禁用的控制参数
        emailDisabled: false, // 邮箱栏是否禁用的控制参数
        defaultChecked: [], // checkbox初始状态
        previousCheckedValue: [], // 存储上一次checkChange的checkedValue值
    }

    componentDidMount() {
        this.labelInfoFetch();
    }

    // 多选框选项改变的回调
    handleCheckboxgroupChange = (checkedValue) => {
        const { previousCheckedValue } = this.state;
        const values = this.props.form.getFieldsValue();
        if (previousCheckedValue.indexOf('keyword') !== -1 && checkedValue.indexOf('keyword') === -1) {
            this.props.form.setFieldsValue({ keyword: { keywordContent: '', keywordType: 0 } });
        } else if (previousCheckedValue.indexOf('keyword') === -1 && checkedValue.indexOf('keyword') !== -1) {
            this.props.form.setFieldsValue({ keyword: { keywordContent: values.keywordContent, keywordType: 1 } });
        }
        if (previousCheckedValue.indexOf('email') !== -1 && checkedValue.indexOf('email') === -1) {
            this.props.form.setFieldsValue({ email: { emailContent: '', emailType: 0 } });
        } else if (previousCheckedValue.indexOf('email') === -1 && checkedValue.indexOf('email') !== -1) {
            this.props.form.setFieldsValue({ email: { emailContent: values.emailContent, emailType: 1 } });
        }
        this.setState({
            previousCheckedValue: checkedValue,
            keywordDisabled: checkedValue.indexOf('keyword') === -1,
            emailDisabled: checkedValue.indexOf('email') === -1,
        });
    }

    // 标签信息请求
    labelInfoFetch() {
        fetchPost(GET_SUBLABEL_RULE, { tagId: this.props.tagRecord.tagId }, 2).then((data) => {
            const { defaultChecked } = this.state;
            if (data && data.state === '000001') {
                if (data.data.keyword.keywordType) {
                    defaultChecked.push('keyword');
                } else {
                    this.setState({ keywordDisabled: true });
                }
                if (data.data.email.emailType) {
                    defaultChecked.push('email');
                } else {
                    this.setState({ emailDisabled: true });
                }
                this.setState({
                    labelList: data.data,
                    defaultChecked,
                    previousCheckedValue: defaultChecked,
                });
            }
        });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        };
        const formItemLayout2 = {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 },
        };
        const { getFieldDecorator } = this.props.form;
        const { tagRecord } = this.props;
        const {
            labelList, keywordDisabled, emailDisabled, defaultChecked,
        } = this.state;
        if (Object.keys(labelList).length <= 0) {
            return false;
        }
        return (
            <div className="set-rules">
                <Form>
                    <div className="info">
                        <div className="form-caption" style={{ paddingTop: 0, paddingBottom: 0 }}>基础信息</div>
                        <FormItem
                            {...formItemLayout}
                            label="规则状态"
                            className="rule-status"
                        >
                            {getFieldDecorator('ruleState', {
                                rules: [{ required: false }],
                                initialValue: labelList.ruleState ? labelList.ruleState : 1,
                            })(
                                <RadioGroup>
                                    <Radio value={1}>开启</Radio>
                                    <Radio value={2}>关闭</Radio>
                                </RadioGroup>,
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="父标签名称"
                        >
                            <span>{labelList.parentTagName}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="子标签名称"
                        >
                            <span>{tagRecord.tagName}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="平台"
                        >
                            <span>{tagRecord.platform}</span>
                        </FormItem>
                        <div className="form-caption"><span style={{ color: 'red', fontSize: 20, verticalAlign: 'middle' }}>*</span>已选条件</div>
                    </div>
                    <div className="select-condition">
                        <CheckboxGroup onChange={this.handleCheckboxgroupChange} defaultValue={defaultChecked} style={{ width: '100%' }}>
                            <div className="label-keyword">
                                <FormItem
                                    {...formItemLayout2}
                                    // label="关键字"
                                >
                                    <Checkbox value="keyword">关键词</Checkbox>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout2}
                                    // label="关键字"
                                >
                                    {getFieldDecorator('keyword.keywordType', {
                                        rules: [{ required: false }],
                                        initialValue: labelList.keyword.keywordType,
                                    })(
                                        <RadioGroup disabled={keywordDisabled}>
                                            <Radio value={1}>全文检索</Radio>
                                            <Radio value={2}>标题检索</Radio>
                                            <Radio value={3}>内容检索</Radio>
                                        </RadioGroup>,
                                    )}
                                </FormItem>
                                <FormItem
                                    style={{ padding: '10px 0' }}
                                >
                                    {getFieldDecorator('keyword.keywordContent', {
                                        rules: [{ required: false }],
                                        initialValue: labelList.keyword.keywordContent ? labelList.keyword.keywordContent : '',
                                    })(
                                        <TextArea
                                            placeholder="请输入关键字，支持多个关键词，多个关键词之间以英文输入法下的','隔开"
                                            autosize={{ minRows: 3, maxRows: 6 }}
                                            disabled={keywordDisabled}
                                        />,
                                    )}
                                </FormItem>
                            </div>
                            <div className="label-email">
                                <FormItem
                                    {...formItemLayout2}
                                    // label="发件人邮箱"
                                >
                                    <Checkbox value="email">发件人邮箱</Checkbox>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout2}
                                >
                                    {getFieldDecorator('email.emailType', {
                                        rules: [{ required: false }],
                                        initialValue: labelList.email.emailType,
                                    })(
                                        <RadioGroup disabled={emailDisabled}>
                                            <Radio value={1}>完整地址</Radio>
                                            <Radio value={2}>地址后缀</Radio>
                                            <Radio value={3}>地址关键字</Radio>
                                        </RadioGroup>,
                                    )}
                                </FormItem>
                                <FormItem
                                    style={{ padding: '10px 0' }}
                                >
                                    {getFieldDecorator('email.emailContent', {
                                        rules: [{ required: false }],
                                        initialValue: labelList.email.emailContent ? labelList.email.emailContent : '',
                                    })(
                                        <TextArea placeholder="请输入信息" autosize={{ minRows: 3, maxRows: 6 }} disabled={emailDisabled} />,
                                    )}
                                </FormItem>
                            </div>
                        </CheckboxGroup>
                    </div>
                </Form>
            </div>
        );
    }
}
export default Form.create()(SubLabelRuleModal);
