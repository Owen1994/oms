import React from 'react';
import moment from 'moment';
import {
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    message,
    Radio,
} from 'antd';
import { fetchPost } from 'util/fetch';
// import * as API from '../constants/Api'
// import CSelect from '@/components/cselect';
// import { parseStrToArray } from 'util/StrUtil';
// import { strTrim } from 'util/baseTool';
// import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const revokeTypeArr = [
    { value: '1', name: '客服撤单' },
    { value: '2', name: '渠道变更'},
    { value: '3', name: '买家信息变更'},
    { value: '4', name: 'SKU变更' },
    { value: '5', name: 'SKU缺货'},
    { value: '6', name: '超期订单'},
    { value: '7', name: '重量超出渠道限制' },
    { value: '8', name: '亏本撤单'},
    { value: '9', name: '黑名单撤单'},
    { value: '10', name: '无渠道' },
    { value: '11', name: '平台撤单'},
    { value: '12', name: '转仓撤单'},
    { value: '13', name: 'SKU下架' },
    { value: '14', name: '其它'},
]

class AuditModal extends React.Component {
    state = {
        loading: false,
    };

    formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    //表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            this.setState({ loading: true });
            if (!err) {
                const url1 = '/oms/order/manage/motan/ICompanyOrderManageApi/orderBatchVerification';
                const url2 = '/oms/order/manage/motan/ICompanyOrderManageApi/batchCancelOrder';
                const { keysArr, exceptionType } = this.props;
                let url = '';
                let params = {};
                if(values.auditResult === 1){
                    url = url1;
                    params = {
                        exceptionType,
                        orderIdArr: keysArr,
                        isPass: 0,
                    }
                } else if (values.auditResult === 0) {
                    url = url2;
                    params = {
                        orderIds: keysArr,
                        revokeType: values.revokeType,
                    }
                }

                // 审核意见
                if (values.auditRemark) {
                    params.auditRemark = values.auditRemark;
                }
                
                fetchPost(url, params, 1)
                    .then(result => {
                        if (result.state === '000001') {
                            this.setState({ loading: false });
                            this.handleCancel();
                            this.props.handleSubmit();
                        }
                    })
            }
        })
    };

    //取消
    handleCancel = () => {
        this.setState({
            loading: false,
         });
        this.props.form.resetFields();
        this.props.closeModal();
    };

    render() {
        const { visible, ifHidingRadio } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { loading } = this.state;
        return (
            <Modal
                visible={visible}
                title={'审核/批量审核'}
                destroyOnClose={true}
                width={600}
                onCancel={this.handleCancel}
                onOk={this.handleSubmit}
                confirmLoading={loading}
            >
                <Form>
                    <div>
                        <div className="auditmodal-p">
                            <p>请注意：</p>
                            <p>审核通过之后，订单将继续执行后续流程，审核不通过，订单将置为撤单状态！</p>
                        </div>
                        <FormItem
                            {...this.formItemLayout}
                            label="审核结论"
                            className="auditmodal-result"
                        >
                            {
                                getFieldDecorator('auditResult', {
                                    initialValue: ifHidingRadio ? 0 : 1
                                })(
                                    <RadioGroup onChange={() => {this.setState({ loading: false })}}>
                                        {
                                            ifHidingRadio ? null : <Radio key={1} value={1}>通过</Radio>
                                        }
                                        <Radio key={0} value={0}>不通过</Radio>
                                    </RadioGroup>
                                )
                            }
                            {
                                getFieldValue('auditResult') === 0 ?
                                    <div className="auditmodal-div">
                                        <span className="auditmodal-span"></span>
                                        {
                                            getFieldDecorator('revokeType', {
                                                initialValue: '6',
                                                rules: [{ require: true, message: '请选择撤单类型'}],
                                            })(
                                                <Select
                                                    onChange={() => {this.setState({ loading: false })}}
                                                >
                                                    {
                                                        revokeTypeArr.map(v => <Option key={v.value} value={v.value}>{v.name}</Option>)
                                                    }
                                                </Select>
                                            )
                                        }
                                    </div>
                                : null
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="审核意见"
                        >
                            {
                                getFieldDecorator('auditRemark')(
                                    <TextArea rows={4} onChange={() => {this.setState({ loading: false })}} />
                                )
                            }
                        </FormItem>
                    </div>
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(AuditModal)
