import React from 'react'
import moment from 'moment';
import {
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    message,
} from 'antd';
import { fetchPost } from 'util/fetch';
import { GET_SELLER_ACCOUNT, GRAP_ORDER } from '../constants/Api'
import CSelect from '@/components/cselect';
import { parseStrToArray } from 'util/StrUtil';
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

    //表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {

                if (values.modifyTime) {
                    const dateStart = new Date(values.modifyTime[0]);
                    const dateEnd = new Date(values.modifyTime[1]);

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

                if(values.modifyTime){
                    values.modifyTime = [new Date(values.modifyTime[0]).getTime(), new Date(values.modifyTime[1]).getTime()];
                }

                values.sellerIds = [values.sellerIds];

                delete values.textAreaVal;

                fetchPost(GRAP_ORDER, {data: values}, 1)
                    .then(result => {
                        if (result.state === '000001') {
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
            selectOption: '1',
        });
        this.props.closeModal();
    };


    handleSelectChange = (value) => {
        this.setState({
            selectOption: value,
            loading: false
        });
    }

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
                <Option value="1">平台单号</Option>
                <Option value="2">修改时间</Option>
            </Select>
        );
        const platformInput = selectOption === '1' ? (
            getFieldDecorator('platformOrderNumber', {
                rules: [{ required: true, message: '平台单号不能为空' }],
            })(
                <Input
                    style={{ width: 260 }}
                    placeholder="双击可输入多个平台订单号(回车隔开)"
                    onDoubleClick={this.openBatchModal}
                    onChange={() => { this.setState({ loading: false }); }}
                />
            )
        ):null;
        const updateTime = selectOption === '2' ? (
            getFieldDecorator('modifyTime', {
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
        ):null;
        return (
            <div className="mymallorder-modal">
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
                        <div className="mymallorder-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="销售账号"
                            >
                                {
                                    getFieldDecorator('sellerIds', {
                                        rules: [{ required: true, message: '销售账号不能为空' }]
                                    })(
                                        <CSelect
                                            code='label'
                                            name='label'
                                            url={GET_SELLER_ACCOUNT}
                                            params={{
                                                data: {
                                                    searchColumn: 'name',
                                                    pageData: 30,
                                                    pageNumber: 1
                                                }
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
