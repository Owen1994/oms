import React from 'react'
import StandardFormRow from '../../../../components/StandardFormRow';
import ItemSelect from '../../../../common/components/itemSelect'
import {
    Modal,
    Form,
    Button,
    Input,
    Select,
    message,
    Checkbox,
    Col,
    Row,
    Radio,
} from 'antd'
import { options, allOptions } from '../constants'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
import { fetchPost } from '../../../../util/fetch';
import * as API from '../../../common/constants/Api'
const Option = Select.Option;

var flag = false;//区别checkbox选中项为0时是页面刚加载还是手动取消
class AddModal extends React.Component {
    state = {
        checkboxGroupVal: allOptions,   //产品状态
        indeterminate: true,    //全选样式
        checkAll: false,        //全选控制
        details: '',
        loading: false,
    };
    formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    //规则条件多选框改变事件
    onChange = (checkboxGroupVal) => {
        flag = this.state.checkboxGroupVal.length === 0 ? true : false;
        this.setState({
            checkboxGroupVal,
            indeterminate: !!checkboxGroupVal.length && (checkboxGroupVal.length < allOptions.length),
            checkAll: checkboxGroupVal.length === allOptions.length,
            loading: false,
        });
    };
    //全选
    handleAllCheck = (event) => {
        this.setState({
            checkboxGroupVal: event.target.checked ? allOptions : [],
            indeterminate: false,
            checkAll: event.target.checked,
            loading: false,
        });
    };
    //规则条件布局
    createCheckbox = (options) => {
        let cols = options.map((item, index) => {
            if ((index + 1) % 4 === 0) {
                return <Col span={6} key={item.value}><Checkbox value={item.value}>{item.label}</Checkbox></Col>
            } else {
                return <Col span={5} key={item.value}><Checkbox value={item.value}>{item.label}</Checkbox></Col>
            }
        });
        return (
            <CheckboxGroup style={{ width: '100%' }} onChange={this.onChange} value={this.state.checkboxGroupVal}>
                <Row>
                    {cols}
                </Row>
            </CheckboxGroup>
        )
    };
    //数据提交
    handleSubmit = () => {
        this.setState({ loading: true });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //产品状态
                if (Array.isArray(values.skuStatusArr) && values.skuStatusArr.length === 0) {
                    delete values.skuStatusArr;
                } else {
                    values.skuStatusArr = this.state.checkboxGroupVal;
                }
                //编辑需要传ruleId
                values.ruleId = this.props.ruleId;
                fetchPost(API.ADD_OR_UPDATE_AUTO_FIX, values, 1)
                    .then(result => {
                        if (result.state === '000001') {
                            this.setState({ loading: false });
                            this.props.handleSubmit();
                            this.handleCancel();
                        }
                    })
            } else {
                Object.keys(err).some(item => message.error(err[item].errors[0].message));
            }
        })
    };
    //关闭弹窗
    handleCancel = () => {
        this.setState({
            checkboxGroupVal: [],
            details: '',
        });
        this.props.closeModal(2);
    }
    //打开弹窗后请求数据
    componentWillReceiveProps(nextProps) {
        const nextVisible = nextProps.visible;
        const prevVisible = this.props.visible;
        const nextRuleId = nextProps.ruleId;
        if (nextVisible && prevVisible !== nextVisible && nextRuleId) {
            this.queryRuleDetail(nextRuleId);
        }
    }
    //编辑弹窗数据回显
    queryRuleDetail = (ruleId) => {
        fetchPost(API.GET_AUTO_FIX_DETAIL, { ruleId: ruleId.toString() })
            .then(result => {
                if (result.state === '000001') {
                    this.setState({
                        details: result.data,
                    });
                    if (!flag) {
                        this.setState({ checkboxGroupVal: this.state.details.skuStatusArr });
                        this.props.form.setFieldsValue({
                            'skuStatusArr': this.state.details.skuStatusArr,
                        })
                    }
                }
            })
    };
    createBaseInfo = (getFieldDecorator, details) => {
        return (
            <div className="auto-modal-baseInfo">
                <FormItem
                    {...this.formItemLayout}
                    label="平台"
                    className="oms-itemselect_label_required auto-modal-form"
                >
                    {getFieldDecorator('yksPlatformCode', {
                        initialValue: details && details.yksPlatformCode
                    })(
                        <Input readOnly style={{ border: 'none', boxShadow: 'none' }} />
                    )}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="站点"
                    className="oms-itemselect_label_required auto-modal-form"
                >
                    {getFieldDecorator('yksSiteCode', {
                        initialValue: details && details.yksSiteCode
                    })(
                        <Input readOnly style={{ border: 'none', boxShadow: 'none' }} />
                    )}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="销售账号"
                    className="oms-itemselect_label_required auto-modal-form"
                >
                    {getFieldDecorator('sellerId', {
                        initialValue: details && details.sellerId
                    })(
                        <Input readOnly style={{ border: 'none', boxShadow: 'none' }} />
                    )}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="规则名称"
                    className="oms-itemselect_label_required auto-modal-form"
                >
                    {getFieldDecorator('ruleName', {
                        rules: [{
                            required: true, message: '请输入规则名称',
                        }],
                        initialValue: details && details.ruleName,
                    })(
                        <Input style={{ width: 330 }} maxLength={80} placeholder="请输入规则名称" />
                    )}
                </FormItem>
            </div>
        )
    }
    render() {
        const { title, visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { platformCode, siteCode, details } = this.state;
        const params = {};
        if (platformCode) {
            params.yksPlatformCode = platformCode;
        }
        if (siteCode) {
            params.yksSiteCode = siteCode;
        }
        return (
            <div className="auto-modal">
                <Modal
                    visible={visible}
                    title={title}
                    destroyOnClose={true}
                    okText="保存"
                    width={870}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form>
                        {this.createBaseInfo(getFieldDecorator, details)}
                        <div className="auto-modal-ruleCondition">
                            <h4>规则条件</h4>
                            <FormItem
                                {...this.formItemLayout}
                                label="产品状态"
                                className="oms-itemselect_label_required"
                            >
                                {getFieldDecorator('skuStatusArr', {
                                    rules: [{
                                        required: true, message: '请选择产品状态',
                                    }],
                                    initialValue: details.skuStatusArr,
                                })(
                                    <div>
                                        <div>
                                            <Checkbox
                                                onChange={this.handleAllCheck}
                                                indeterminate={this.state.indeterminate}
                                                checked={this.state.checkAll}
                                            >
                                                全部
                                            </Checkbox>
                                        </div>
                                        {this.createCheckbox(options)}
                                    </div>
                                )}
                            </FormItem>
                        </div>
                        <div className="auto-modal-ruleResult">
                            <h4>规则结果</h4>
                            <FormItem
                                {...this.formItemLayout}
                                label="执行结果"
                                className="oms-itemselect_label_required"
                            >
                                {getFieldDecorator('ruleRslt', {
                                    rules: [{
                                        required: true, message: '请选择执行结果',
                                    }],
                                    initialValue: 0,
                                })(
                                    <Radio defaultChecked={true}>按listing原始库存补数</Radio>
                                )}
                                <p>注：“listing原始库存”表示用户在刊登系统最后一次修改的库存值，若无则使用listing在刊登系统的初始库存值</p>
                            </FormItem>
                        </div>
                        <div className="auto-submitBtn">
                            <Button onClick={this.handleCancel}>取消</Button>
                            <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>保存</Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(AddModal)