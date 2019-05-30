import React from 'react'
import moment from 'moment';
import {
    Modal,
    Form,
    Input,
    Select,
    DatePicker, message,
} from 'antd';
import { fetchPost } from 'util/fetch';
import * as API from '../constants/Api'
import CSelect from '@/components/cselect';
import { parseStrToArray } from 'util/StrUtil';
import { getTimeStamp } from '@/compliance/utils';
import { strTrim } from 'util/baseTool';
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class GrabModal extends React.Component {
    state = {
        loading: false,
        selectOption: '1',
        batchInputVisible: false,
    };

    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
    };

    // 用于设置时间的一些数据
    orderTime = {
        range: []
    };

    // 禁用日期范围
    disabledDate = (current) => {
        const { range } = this.orderTime;

        if (range.length === 1) {
            let nowRange = moment(range[0]);
            if (current < nowRange.subtract(14, "days")) {
                return true
            }
            nowRange = moment(range[0]);
            if (current > nowRange.add(14, "days")) {
                return true
            }
        }
        return current && current > moment().endOf('day');
    };


    orderTimeChange = (arr) => {
        this.orderTime.range = arr
    };


    // 表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {

            if (!err) {

                if (values.orderTime) {
                    const dateStart = new Date(values.orderTime[0]);
                    const dateEnd = new Date(values.orderTime[1]);

                    if ((dateEnd - dateStart)/1000 > 86400) {
                        message.error('修改时间跨度最大支持24小时');
                        return;
                    }
                }

                if (values.platformOrderNumber) {
                    values.platformOrderNumber = parseStrToArray(values.platformOrderNumber);
                    if(values.platformOrderNumber.length > 30){
                        message.error('最多支持30个平台单号!');
                        return;
                    }
                }

                this.setState({ loading: true });

                if (values.orderTime) {
                    values.orderTime = values.orderTime.map(t => getTimeStamp(t));
                }

                if (values.orderNumbers) {
                    values.orderNumbers = parseStrToArray(values.orderNumbers);
                }

                values.sellerId = [values.sellerId];

                delete values.textAreaVal;

                fetchPost(API.SUBMIT_SHOPEE_GRAB, { data: values }, 1)
                    .then(result => {
                        if (result.state === '000001') {
                            this.handleCancel();
                            this.props.getList();
                        }
                    })
                    .finally(() => {
                        this.setState({ loading: false });
                    })
            }
        })
    };


    //取消
    handleCancel = () => {
        this.setState({
            loading: false,
            selectOption: '1',
        });
        this.orderTime.range = [];
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
            platformOrderNumber: inputVal
        });
        resetFields(['textAreaVal']);
    }

    // 打开批量输入弹窗
    openBatchModal =() => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        const inputVal = getFieldValue('platformOrderNumber');
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
            getFieldDecorator('platformOrderNumber', {
                rules: [{ required: true, message: '平台订单号不能为空' }],
            })(
                <Input
                    style={{ width: 260 }}
                    placeholder="双击可输入多个平台订单号(回车隔开)"
                    onDoubleClick={this.openBatchModal}
                />
            )
        ) : null;

        const updateTime = selectOption === '2' ? (
            getFieldDecorator('orderTime', {
                rules: [{ required: true, message: '修改时间不能为空' }],
            })(
                <RangePicker
                    disabledDate={this.disabledDate}
                    showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                    }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['开始日期', '结束日期']}
                    style={{ width: 260 }}
                    onCalendarChange={this.orderTimeChange}
                />
            )
        ) : null;

        return (
            <div className="shopee-order-modal">
                <Modal
                    visible={visible}
                    title={'订单抓取'}
                    destroyOnClose={true}
                    width={500}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.loading}
                >
                    <Form>
                        <div className="shopee-order-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="销售账号"
                            >
                                {
                                    getFieldDecorator('sellerId', {
                                        rules: [{ required: true, message: '销售账号不能为空' }]
                                    })(
                                        <CSelect
                                            code='label' // 列表编码字段
                                            name='label' // 列表名称字段
                                            url={API.SEARCH_SHOPEE_ACCOUNT}
                                            params={{
                                                data: {
                                                    searchColumn: 'name',
                                                    pageData: 30,
                                                    pageNumber: 1
                                                }
                                            }}
                                            apiListType={0}
                                            placeholder={'请选择'}
                                            style={{ width: 260 }}
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
export default Form.create()(GrabModal)
