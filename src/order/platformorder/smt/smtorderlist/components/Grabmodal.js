import React from 'react'
import moment from 'moment';
import {
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    message,
} from 'antd'
import { fetchPost } from 'util/fetch';
import CSelect from '@/components/cselect';
import { parseStrToArray } from 'util/StrUtil';
import { getTimeStamp } from '@/compliance/utils';
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';
import { strTrim } from 'util/baseTool';
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

    // 表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {

            if (!err) {

                if (values.orderTimes) {
                    const dateStart = new Date(values.orderTimes[0]);
                    const dateEnd = new Date(values.orderTimes[1]);

                    if ((dateEnd - dateStart)/1000 > 86400) {
                        message.error('修改时间跨度最大支持24小时');
                        return;
                    }
                }

                if (values.patformOrderNumber) {
                    values.patformOrderNumber = parseStrToArray(values.patformOrderNumber);
                    if(values.patformOrderNumber.length > 30){
                        message.error('最多支持30个平台单号!');
                        return;
                    }
                }

                this.setState({ loading: true });

                if (values.orderTimes) {
                    values.orderTimes = values.orderTimes.map(t => getTimeStamp(t));
                }

                if (values.buyerAccount) {
                    values.buyerAccount = [values.buyerAccount];
                }

                delete values.textAreaVal;

                fetchPost('/oms/order/grab/motan/OrderGrabApi/orderManualGrab', values, 1)
                    .then(result => {
                        if (result.state === '000001') {
                            this.handleCancel();
                        }
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
        this.props.form.resetFields();
        this.props.closeModal();
    };

    handleSelectChange = (value) => {
        this.setState({
            selectOption: value,
            loading: false
        });
    };

    // 用于设置时间的一些数据
    orderTime = {
        range: [],
        flag: true,
        num: 2,
    };

    onCalendarChange = (arr) => {
        this.orderTime.range = arr;
        if (!this.orderTime.flag){
            this.orderTime.num = 1;
        } else {
            this.orderTime.flag = false;
        }
    };

    // 禁用日期范围
    disabledDate = (current) => {
        const { range, num } = this.orderTime;
        if (range.length === 1) {
            return current && (current > moment(range[0]).add(num, "days") || current < moment(range[0]).subtract(1, "days"));
        }
        return current && (current > moment().endOf('day'));
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
            patformOrderNumber: inputVal
        });
        resetFields(['textAreaVal']);
    }

    // 打开批量输入弹窗
    openBatchModal =() => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        const inputVal = getFieldValue('patformOrderNumber');
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
            getFieldDecorator('patformOrderNumber', {
                rules: [{ required: true, message: '平台订单号不能为空' }],
            })(
                <Input
                    style={{ width: 260 }}
                    placeholder="双击可输入多个平台订单号(回车隔开)"
                    onDoubleClick={this.openBatchModal}
                    onChange={() => { this.setState({ loading: false }); }}
                />
            )
        ) : null;

        const updateTime = selectOption === '2' ? (
            getFieldDecorator('orderTimes', {
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
                    onCalendarChange={this.onCalendarChange}
                    disabledDate={this.disabledDate}
                />
            )
        ) : null;

        return (
            <div className="ebayorder-modal">
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
                        <div className="ebayorder-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="销售账号"
                                style={{ marginBottom: '10px'}}
                            >
                                {
                                    getFieldDecorator('buyerAccount', {
                                        rules: [{ required: true, message: '销售账号不能为空' }]
                                    })(
                                        <CSelect
                                            code='id'
                                            name='name'
                                            url='/oms/order/grab/motan/SellStoreAccountApi/findStoreListPublic'
                                            params={{
                                                searchColumn: 'name',
                                                pageData: 20,
                                                pageNumber: 1
                                            }}
                                            apiListType={2}
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
