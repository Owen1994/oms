import React from 'react'
import ItemSelect from '../../../../common/components/itemSelect'
import {
    Modal,
    Form,
    Input,
    Checkbox,
    Col,
    Row,
    Radio,
    message,
    Button,
    Select,
} from 'antd'
import { options, allOptions } from '../constants'
import * as API from '../../../common/constants/Api'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;
import { fetchPost } from '../../../../util/fetch';

class AddModal extends React.Component {
    state = {
        platformCode: '',
        siteCode: '',
        checkboxGroupVal: [],   //更新对象  
        details: '',
        loading: false,
        ifExistSite: false,
        disabled: true,
    };
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    //更新对象改变事件
    onChange = (checkboxGroupVal) => {
        this.setState({ checkboxGroupVal });
    };
    //更新对象布局
    createCheckbox = (options) => {
        let cols = options.map((item, index) => {
            let offset = index === 0 ? 5 : 0;
            return <Col offset={offset} span={5} key={item.value}><Checkbox value={item.value}>{item.label}</Checkbox></Col>
        });
        return (
            <CheckboxGroup style={{ width: '100%' }} onChange={this.onChange} value={this.state.checkboxGroupVal}>
                <Row>
                    {cols}
                </Row>
            </CheckboxGroup>
        )
    };
    //平台选择事件
    handlePlatformChange = (value) => {
        this.setState({
            platformCode: value,
            loading: false,
        });
        this.ifExistSite(value);
    };
    //平台是否存在
    ifExistSite = (platformCode) => {
        fetchPost(API.GET_YKS_SITE, { yksPlatformCode: platformCode })
            .then(result => {
                if (result.state === '000001') {
                    if (result.data.list.length > 0) this.setState({ ifExistSite: true });
                    else this.setState({ ifExistSite: false });
                }
            })
    };
    //站点改变事件
    handleSiteChange = (value) => {
        this.setState({
            siteCode: value,
            disabled: false,
        });
    };
    //数据提交
    handleSubmit = () => {
        this.setState({ loading: true });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (Array.isArray(values.updateFieldsArr) && values.updateFieldsArr.length === 0) {
                    delete values.updateFieldsArr;
                } else {
                    values.updateFieldsArr = this.state.checkboxGroupVal;
                }
                //编辑时需要传入ruleId
                if(this.props.ruleId){
                    values.ruleId = this.props.ruleId;
                }
                fetchPost(API.ADD_OR_UPDATE_LISTING, values, 1)
                    .then(result => {
                        if (result.state === '000001') {
                            this.setState({ loading: false });
                            this.props.handleSubmit();
                            this.handleCancel();
                        }else{
                            this.setState({ loading: false });
                        }
                    })
            } else {
                Object.keys(err).some(item => message.error(err[item].errors[0].message))
                this.setState({ loading: false });
            }
        })
    };
    //取消事件
    handleCancel = () => {
        this.setState({
            platformCode: '',
            siteCode: '',
            checkboxGroupVal: [],   //更新对象  
            details: '',
            loading: false,
            ifExistSite: false,
            disabled: true,
        });
        this.props.closeModal();
    };
    componentDidMount() {
        this.props.form.setFieldsValue({
            'updateFieldsArr': this.state.checkboxGroupVal,
        })
    }
    //打开弹窗时加载数据
    componentWillReceiveProps(nextProps) {
        const nextVisible = nextProps.visible;
        const prevVisible = this.props.visible;
        const nextRuleId = nextProps.ruleId;
        if (nextVisible && prevVisible !== nextVisible && nextRuleId) {
            this.queryUpdateDetail(nextRuleId);
        }
    }
    //编辑弹窗数据回显
    queryUpdateDetail = (ruleId) => {
        fetchPost(API.GET_UPDATE_DETAIL, { ruleId })
            .then(result => {
                if (result.state === '000001') {
                    this.setState({
                        details: result.data,
                    });
                        this.setState({ checkboxGroupVal: this.state.details[0].updateFieldsArr });
                        this.props.form.setFieldsValue({
                            'updateFieldsArr': this.state.details[0].updateFieldsArr,
                        })
                }
            })
    }
    render() {
        const { title, visible, ruleId } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { platformCode, siteCode, details } = this.state;
        const params = { 'pageData': 20, 'pageNumber': 1 };
        if (platformCode) {
            params.yksPlatformCode = platformCode;
        }
        if (siteCode) {
            params.yksSiteCode = siteCode;
        }
        const site_add = (
            this.state.ifExistSite ? (
                <FormItem
                    {...this.formItemLayout}
                    label="站点"
                    className="oms-itemselect_label_required update-modal-form"
                >
                    <ItemSelect
                        getFieldDecorator={getFieldDecorator}
                        formName='yksSiteCode'
                        url={API.GET_YKS_SITE}
                        code="yksSiteCode"
                        name="yksSiteName"
                        // searchColumn="yksSiteCode"
                        params={params}
                        onChange={this.handleSiteChange}
                        rules={{
                            rules: [{
                                required: true, message: '站点不能为空',
                            }],
                        }}
                    />
                </FormItem>) : null
        )
        const site_edit = (
            <FormItem
                {...this.formItemLayout}
                label="站点"
                className="oms-itemselect_label_required update-modal-form"
            >
                {getFieldDecorator('yksSiteCode', {
                    initialValue: details && details[0].yksSiteCode
                })(
                    <Input readOnly style={{ border: 'none', boxShadow: 'none' }} />
                )}
            </FormItem>
        )
        return (
            <div className="update-modal">
                <Modal
                    visible={visible}
                    title={title}
                    destroyOnClose={true}
                    okText="保存"
                    onCancel={this.handleCancel}
                    // onOk={this.handleSubmit}
                    footer={null}
                    width={600}
                >
                    <div>
                        <div className="update-modal-baseInfo">
                            <h3><span style={{ color: 'red' }}>*</span>账号信息</h3>
                            <FormItem
                                {...this.formItemLayout}
                                label="平台"
                                className="oms-itemselect_label_required update-modal-form"
                            >
                                {ruleId ? (
                                    getFieldDecorator('yksPlatformCode', {
                                        initialValue: details && details[0].yksPlatformCode
                                    })(
                                        <Input readOnly style={{ border: 'none', boxShadow: 'none' }} />
                                    )
                                ) : (
                                        // <ItemSelect
                                        //     getFieldDecorator={getFieldDecorator}
                                        //     formName='yksPlatformCode'
                                        //     url={API.GET_YKS_PLATFORM}
                                        //     code="yksPlatformCode"
                                        //     name="yksPlatformName"
                                        //     // searchColumn="yksPlatformCode"
                                        //     params={params}
                                        //     onChange={this.handlePlatformChange}
                                        //     rules={{
                                        //         rules: [{
                                        //             required: true, message: '平台不能为空',
                                        //         }],
                                        //     }}
                                        // />

                                        getFieldDecorator('yksPlatformCode', {
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
                                        )
                                    )}
                            </FormItem>
                            {ruleId ? site_edit : site_add}
                            <FormItem
                                {...this.formItemLayout}
                                label="销售账号"
                                className="oms-itemselect_label_required update-modal-form"
                            >
                                {ruleId ? (
                                    getFieldDecorator('sellerId', {
                                        initialValue: details && details[0].sellerId
                                    })(
                                        <Input readOnly style={{ border: 'none', boxShadow: 'none' }} />
                                    )
                                ) : (
                                        <ItemSelect
                                            getFieldDecorator={getFieldDecorator}
                                            formName='sellerId'
                                            url={API.GET_EBAY_ACCOUNT}
                                            code="id"
                                            name="id"
                                            // searchColumn="sellerIdArr"
                                            // params={params}
                                            searchColumn='searchContent'
                                            rules={{
                                                rules: [{
                                                    required: true, message: '销售账号不能为空',
                                                }],
                                            }}
                                            disabled={this.state.disabled}
                                            apiListType={2}
                                        />
                                    )}
                            </FormItem>
                        </div>
                        <div className="update-modal-updateObject">
                            <h3><span style={{ color: 'red' }}>*</span>更新对象</h3>
                            <FormItem>
                                {getFieldDecorator('updateFieldsArr', {
                                    rules: [{
                                        required: true, message: '更新对象不能为空',
                                    }],
                                    initialValue: details && details[0].updateFieldsArr
                                })(
                                    <div>
                                        {this.createCheckbox(options)}
                                    </div>
                                )}
                            </FormItem>
                        </div>
                        <div className="update-submitBtn">
                            <Button onClick={this.handleCancel}>取消</Button>
                            <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>保存</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(AddModal)