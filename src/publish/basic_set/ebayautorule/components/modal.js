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
        indeterminate: false,    //全选样式
        checkAll: true,        //全选控制
        platformCode: '',       //平台
        siteCode: '',           //站点
        loading: false,
        ifExistSite: false,
    };
    formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    //规则条件改变事件
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
    handlePlatformChange = (value) => {
        this.setState({
            platformCode: value,
            loading: false,
        });
        this.ifExistSite(value);
    };
    handleSiteChange = (value) => {
        this.setState({
            siteCode: value,
            loading: false,
        });
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
                // this.setState({ loading: false });
            }
        })
    };
    //点击取消按钮数据复原
    handleCancel = () => {
        this.setState({
            checkboxGroupVal: allOptions,   //产品状态
            indeterminate: false,    //全选样式
            checkAll: true,        //全选控制
            platformCode: '',       //平台
            siteCode: '',           //站点
            loading: false,
            ifExistSite: false,
        });
        this.props.closeModal(1);
    };
    //判断平台是否存在
    ifExistSite = (platformCode) => {
        fetchPost(API.GET_YKS_SITE, { yksPlatformCode: platformCode })
            .then(result => {
                if (result.state === '000001') {
                    if (result.data.list.length > 0) this.setState({ ifExistSite: true });
                    else this.setState({ ifExistSite: false });
                }
            })
    };
    //基础信息创建
    createBaseInfo = (getFieldDecorator, params) => {
        return (
            <div className="auto-modal-baseInfo">
                <FormItem
                    {...this.formItemLayout}
                    label="平台"
                    className="oms-itemselect_label_required auto-modal-form"
                >
                    {getFieldDecorator('yksPlatformCode', {
                        rules: [{
                            required: true,
                            message: '平台不能为空',
                        }],
                    })(
                        <Select
                            style={{ width: 260 }}
                            placeholder="请选择"
                            onChange={this.handlePlatformChange}
                        >
                            <Option value="ebay">ebay</Option>
                        </Select>
                    )}
                </FormItem>
                {this.state.ifExistSite ? (
                    <FormItem
                        {...this.formItemLayout}
                        label="站点"
                        className="oms-itemselect_label_required auto-modal-form"
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='yksSiteCode'
                            url={API.GET_YKS_SITE}
                            code="yksSiteCode"
                            name="yksSiteName"
                            // dValue={details && details.yksSiteCode}
                            // dName={details && details.yksSiteCode}
                            // searchColumn={platformCode}
                            params={{ 'yksPlatformCode': 'ebay' }}
                            onChange={this.handleSiteChange}
                            rules={{
                                rules: [{
                                    required: true, message: '请选择站点',
                                }],
                            }}
                        />
                    </FormItem>) : null}
                <FormItem
                    {...this.formItemLayout}
                    label="销售账号"
                    className="oms-itemselect_label_required auto-modal-form"
                >
                    <ItemSelect
                        getFieldDecorator={getFieldDecorator}
                        formName='sellerId'
                        url={API.GET_EBAY_ACCOUNT}
                        code="id"
                        name="id"
                        // dValue={details && details.sellerId}
                        // dName={"sellerId"}
                        // searchColumn="sellerIdArr"
                        // params={params}
                        searchColumn='searchContent'
                        rules={{
                            rules: [{
                                required: true, message: '请选择销售账号',
                            }],
                        }}
                        disabled={!this.state.siteCode}
                        apiListType={2}
                    />
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
                    })(
                        <Input style={{ width: 330 }} maxLength={80} placeholder="请输入规则名称" />
                    )}
                </FormItem>
            </div>
        )
    };
    render() {
        const { title, visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { platformCode, siteCode } = this.state;
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
                        {this.createBaseInfo(getFieldDecorator, params)}
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
                                    initialValue: allOptions,
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