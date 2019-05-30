import React from 'react';

import {
    Modal,
    Select,
    Button,
    Form,
    InputNumber,
    message,
    Checkbox,
} from 'antd';

import { LOGISTICS_MODE } from '../constants';
import CSelect from '../../../../components/cselect';
const FormItem = Form.Item;
const Option = Select.Option;

class logisticsCom extends React.Component {
    state = {
        logisticsList: [],
        loading: false,
    }


    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    formItemLayout1 = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    componentWillMount() {
        this.getlogisticsList();
    }

    getlogisticsList = () => {
        this.props.logisticsAsync()
            .then((result) => {
                if (result) {
                    this.setState({
                        logisticsList: result,
                    });
                }
            });
    }

    saveHandle = () => {
        const { data, supplierId } = this.props;
        const params = {
            supplierId,
            keys: data,
        };
        const { getFieldValue } = this.props.form;
        const logisticsType = getFieldValue('logisticsType');
        const expense = getFieldValue('expense');
        if (logisticsType === undefined) return message.warning('请选择物流方式');
        params.logisticsType = logisticsType;
        if (logisticsType === 0) {
            if (expense) {
                params.expense = expense;
            } else {
                return message.warning('请填写运费');
            }
        }
        const isPackageMaterial = getFieldValue('isPackageMaterial');
        params.isPackageMaterial = isPackageMaterial ? 1: 0;
        this.setState({
            loading: true,
        })
        this.props.orderDetailGeneratePoAsync({ data: params })
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        loading: false,
                    })
                    message.success(result.msg);
                    this.modalCancel(true);
                } else {
                    this.setState({
                        loading: false,
                    })
                }
            });
    }

    modalCancel = (flag = false) => {
        this.props.onCancel(flag);
    }
    
    list =  [{key: 1, label: "供应商包邮"}]
    render() {
        const { visible } = this.props;
        const { logisticsList,loading } = this.state;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const logisticsType = getFieldValue('logisticsType');
        // const logisticsListOption = logisticsList.map(v => <Option value={v.key} key={v.key}>{v.label}</Option>);
        const content = (
            <Form>
                <FormItem
                    label="物流方式"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'logisticsType',
                        {
                            rules: [{ required: true, message: '物流方式为必填' }],
                            initialValue: 1,
                        },
                    )(
                        <CSelect
                            code="key" // 列表编码字段
                            name="label" // 列表名称字段
                            url={LOGISTICS_MODE}
                            params={{
                                data: {
                                    searchColumn: 'name',
                                    procurementType: 2,
                                    pageData: 20,
                                    pageNumber: 1,
                                },
                            }} // 搜索参数
                            list={this.list}
                            style={{ width: '80%' }}
                            isNotCache
                        />,
                    )}
                </FormItem>

                {
                    logisticsType === 0 ? (
                        <FormItem
                            className="mt8"
                            label="运费"
                            {...this.formItemLayout}
                        >
                            {getFieldDecorator(
                                'expense',
                                {
                                    rules: [{ required: true, message: '请填写运费' }],
                                    initialValue: undefined,
                                },
                            )(
                                <InputNumber
                                    style={{ width: '80%' }}
                                    min={0}
                                    precision={2}
                                />,
                            )}
                        </FormItem>
                    ) : null
                }
                <FormItem
                    style={{ paddingLeft: 60 }}
                    {...this.formItemLayout}
                >
                    {getFieldDecorator('isPackageMaterial', {
                        initialValue: false,
                    })(
                        <Checkbox>包材下单</Checkbox>
                    )}
                </FormItem>
            </Form>
        );

        const footer = (
            <div>
                <Button onClick={this.modalCancel} >取消</Button>
                <Button onClick={this.saveHandle} loading={loading}>确认</Button>
            </div>
        );

        return (
            <Modal
                title="生成PO选项"
                width={600}
                destroyOnClose
                // centered
                visible={visible}
                footer={footer}
                maskClosable={false}
                onCancel={this.modalCancel}
                className=""
            >
                {content}
            </Modal>
        );
    }
}

export default Form.create()(logisticsCom);
