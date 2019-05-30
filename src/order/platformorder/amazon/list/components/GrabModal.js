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
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

import { fetchPost } from 'util/fetch';
import * as API from '../constants/Api'
import CSelect from '@/components/cselect';
import {getTimeStamp} from "@/compliance/utils";
import { parseStrToArray } from 'util/StrUtil';
import { strTrim } from 'util/baseTool';
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';


class GrabModal extends React.Component {
    state = {
        selectOption: '1',
        batchInputVisible: false,
    };

    formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 },
    };

    // 表单提交
    handleSubmit = () => {
        const params = ['platformOrderNumber', 'modifyTime', 'sellerIds', 'country'];
        this.props.form.validateFields(params, (err, values) => {

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


            const modifyTime = values.modifyTime ? values.modifyTime.map(t => getTimeStamp(t)) : undefined;

            const sellerIds = [values.sellerIds];

            const data = {
                ...values,
                sellerIds,
                modifyTime,
            };

            delete values.textAreaVal;

            if (!err) {
                fetchPost(API.Review_Order_Grab_Api, data, 1)
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
        this.props.showModal(false);
    };

    handleSelectChange = (value) => {
        this.setState({
            selectOption: value,
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
        });
        setFieldsValue({
            textAreaVal: batchModalVal
        });
    }


    render() {
        const { visible, searchModalContent } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { selectOption, batchInputVisible } = this.state;
        const select = (
            <Select defaultValue="1" style={{ width: 95 }} onChange={this.handleSelectChange}>
                <Option value="1">平台单号</Option>
                <Option value="2">修改时间</Option>
            </Select>
        );

        const platformInput = selectOption === '1' ? (
            getFieldDecorator('platformOrderNumber', {
                rules: [{ required: true, message: '平台单号不能为空' }],
                initialValue: searchModalContent,
            })(
                <Input
                    style={{ width: 330 }}
                    placeholder="双击可输入多个平台订单号(回车隔开)"
                    onDoubleClick={this.openBatchModal}
                />
            )
        ):null;

        const updateTime = selectOption === '2' ? (
            getFieldDecorator('modifyTime', {
                rules: [{ required: true, message: '最后修改时间不能为空' }],
            })(
                <RangePicker
                    showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                    }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['开始日期', '结束日期']}
                    style={{ width: 330 }}
                />
            )
        ):null;

        return (
            <div>
                <Modal
                visible={visible}
                title={'订单抓取'}
                destroyOnClose={true}
                width={600}
                onCancel={this.handleCancel}
                onOk={this.handleSubmit}
                >
                    <Form>
                        <div className="amazon-table-grab">
                            <FormItem
                                {...this.formItemLayout}
                                label="销售账号"
                            >
                                {
                                    getFieldDecorator('sellerIds', {
                                        rules: [{ required: true, message: '销售账号不能为空' }],
                                    })(
                                        <CSelect
                                            code='key'
                                            name='label'
                                            url={API.Review_Get_Account_Api}
                                            params={{
                                                data: {
                                                    searchColumn: 'name',
                                                    pageNumber: 1,
                                                    pageData: 20
                                                }
                                            }}
                                            apiListType={2}
                                            placeholder={'请选择'}
                                            style={{ width: 330 }}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="国家"
                            >
                                {
                                    getFieldDecorator('country', {
                                        rules: [{ required: true, message: '国家不能为空' }],
                                    })(
                                        <CSelect
                                            code='key'
                                            name='label'
                                            url={API.Review_Get_Country_Api}
                                            apiListType={2}
                                            style={{ width: 330 }}
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
