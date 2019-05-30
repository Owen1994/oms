import React from 'react'
import moment from 'moment';

import {
    Modal,
    Form,
    Input,
    message,
    DatePicker,
    Select,
} from 'antd';
import CSelect from '@/components/cselect';
import { fetchPost } from 'util/fetch'
import { api } from '../constants'
import { parseStrToArray } from 'util/StrUtil';
import { strTrim } from 'util/baseTool';
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';

const FormItem = Form.Item;
const Option = Select.Option;

const { RangePicker } = DatePicker;

class MarkModal extends React.Component {
    state = {
        loading: false,
        selectOption: '1',
        batchInputVisible: false,
    };

    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
    };

    // 表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {

                if (values.time) {
                    const dateStart = new Date(values.time[0]);
                    const dateEnd = new Date(values.time[1]);

                    if ((dateEnd - dateStart)/1000 > 86400) {
                        message.error('修改时间跨度最大支持24小时');
                        return;
                    }
                }

                if (values.orderIds) {
                    values.orderIds = parseStrToArray(values.orderIds);
                    if(values.orderIds.length > 30){
                        message.error('最多支持30个平台单号!');
                        return;
                    }
                }


                this.setState({ loading: true });

                const params = {
                    salesAccount: [values.salesAccount],
                    startTime: values.time ? values.time[0].valueOf() : undefined,
                    endTime: values.time ? values.time[1].valueOf() : undefined,
                    orderIds: values.orderIds,
                };

                delete values.textAreaVal;

                fetchPost(api.joomOrderGrabApi, { data: params }, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.setState({ loading: false });
                            this.handleCancel();
                        }
                    })
            }
        })
    };

    // 取消
    handleCancel = () => {
        this.setState({ loading: false });
        this.props.form.resetFields();
        this.props.closeModal();
    };

    handleSelectChange = (value) => {
        this.setState({
            selectOption: value,
            loading: false
        });

    };

    // 批量输入弹窗取消
    handleBatchCancel = () => {
        const { getFieldValue, setFieldsValue, resetFields } = this.props.form;
        const batchModalVal = getFieldValue('textAreaVal');
        let inputVal = '';
        if(batchModalVal){
            inputVal = strTrim(batchModalVal).replace(/\n/g, ',');
        }
        this.setState({ batchInputVisible: false });
        setFieldsValue({
            orderIds: inputVal
        });
        resetFields(['textAreaVal']);
    }

    // 打开批量输入弹窗
    openBatchModal =() => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        const inputVal = getFieldValue('orderIds');
        let batchModalVal = '';
        if(inputVal){
            batchModalVal = inputVal.replace(/(^,*)|(,*$)/g, '').replace(/,/g, '\n');
        }
        this.setState({
            batchInputVisible: true,
            loading: false,
        });
        setFieldsValue({
            textAreaVal: batchModalVal
        });
    }

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { selectOption, batchInputVisible } = this.state;

        const select = (
            <Select defaultValue="1" style={{ width: 105 }} onChange={this.handleSelectChange}>
                <Option value="1">平台订单号</Option>
                <Option value="2">修改时间</Option>
            </Select>
        );

        const platformInput = selectOption === '1' ? (
            getFieldDecorator('orderIds', {
                rules: [{ required: true, message: '平台订单号不能为空' }],
            })(
                <Input
                    style={{ width: 260 }}
                    onChange={() => { this.setState({ loading: false }); }}
                    placeholder="双击可输入多个平台订单号(回车隔开)"
                    onDoubleClick={this.openBatchModal}
                />
            )
        ) : null;

        const updateTime = selectOption === '2' ? (
            getFieldDecorator('time', {
                rules: [{ required: true, message: '修改时间不能为空' }],
            })(
                <RangePicker
                    showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                    }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['开始日期', '结束日期']}
                    style={{ width: 260 }}
                    onChange={() => {this.setState({ loading: false })}}
                />
            )
        ) : null;

        return (
            <div>
                <Modal
                    visible={visible}
                    title="订单抓取"
                    destroyOnClose={true}
                    width={500}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.loading}
                >
                    <Form>
                        <div>
                            <FormItem
                                {...this.formItemLayout}
                                style={{ marginBottom: '10px'}}
                                label="店铺账号"
                            >
                                {
                                    getFieldDecorator('salesAccount', {
                                        rules: [{ required: true, message: '店铺账号不能为空' }]
                                    })(
                                        <CSelect
                                            code='key'
                                            name='label'
                                            url={api.joomSellerId}
                                            params={{
                                                data: {
                                                    searchColumn: 'name',
                                                    pageData: 20,
                                                    pageNumber: 1
                                                }
                                            }}
                                            style={{ width: 260 }}
                                            placeholder={'请选择'}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label={select}
                            >
                                {platformInput}
                                {updateTime}
                            </FormItem>
                        </div>
                    </Form>
                </Modal>
                <OrderCommonSearchModal
                    {...this.props}
                    visible={batchInputVisible}
                    onCancel={this.handleBatchCancel}
                    searchContent="textAreaVal"
                    title='批量输入'
                    count={30}
                />
            </div>
        );
    }
}
export default Form.create()(MarkModal)
