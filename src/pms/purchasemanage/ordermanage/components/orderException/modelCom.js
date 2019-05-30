import React from 'react';

import {
    Modal,
    Row,
    Col,
    Checkbox,
    Select,
    Button,
    Form,
    Input,
    InputNumber,
    message,
    DatePicker,
} from 'antd';

import moment from 'moment';

import { debounce } from '../../../../../util/baseTool';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class modelCom extends React.Component {
    state = {
        supplierActive: {},
        supplierList: [],
    }

    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    formItemLayout1 = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    componentWillReceiveProps(next) {
        if (next.visible && next.data !== this.props.data) {
            this.getDetailSupplierList(next);
        }
    }

    getDetailSupplierList = (props) => {
        const {
            // supplier,
            // supplierCode,
            sku,
        } = props.data;
        this.getorderDetailSupplierList({
            sku,
            // name: supplier,
            // code: supplierCode,
            pageData: 20,
            pageNumber: 1,
        }, true);
    }

    getorderDetailSupplierList = (data1, flag) => {
        this.props.orderDetailSupplierListtAsync({ data: data1 })
            .then((result) => {
                if (result && result.length) {
                    const { supplierActive } = this.state;
                    if (flag) {
                        const { data } = this.props;
                        let active = 0;
                        for (let i = 0; i < result.length; i++) {
                            if (result[i].code === Number(data.supplierCode)) {
                                active = i;
                                break;
                            }
                        }
                        this.setState({
                            supplierActive: result[active],
                            supplierList: result,
                        });
                    } else {
                        this.setState({
                            supplierList: [supplierActive, ...result],
                        });
                    }
                }
            });
    }

    onChange = (value) => {
        const { supplierList } = this.state;
        for (let k = 0; k < supplierList.length; k++) {
            if (supplierList[k].key === value) {
                return this.setState({ supplierActive: supplierList[k] });
            }
        }
    }

    search = (value) => {
        if (!value) return;
        const state = this.state.supplierList[0].state;
        const { sku } = this.props.data;
        this.getorderDetailSupplierList({
            sku,
            state,
            name: value,
        });
    }

    saveHandle = () => {
        const { data, paginatihandle } = this.props;
        const { validateFields } = this.props.form;
        validateFields((err, value) => {
            if (err) {
                return message.error(err[Object.keys(err)[0]].errors[0].message);
            }
            if (!this.state.supplierActive.code) {
                message.success('获取供应商信息错误，请重新刷新页面');
                return;
            }
            if (!this.state.supplierActive.deliveryDay) {
                message.success('获取供应商信息错误，请重新刷新页面');
                return;
            }
            if (value.purchaseCount > data.pendingQuantity) {
                message.warning('采购数量不能大于PR执行数量');
                return false;
            }
            value.supplier = this.state.supplierActive.code;
            value.supplierName = this.state.supplierActive.name;
            value.sku = data.sku;
            value.key = data.key;
            if (!value.deliveryTime) {
                value.deliveryTime = data.deliveryTime.valueOf();
            } else {
                value.deliveryTime = value.deliveryTime.valueOf();
            }
            value.deliveryDay = this.state.supplierActive.deliveryDay;
            value.purchaseName = this.props.data.productDesc;
            delete value.supplierName;
            this.props.orderDetailEditAsync({ data: value })
                .then((result) => {
                    if (result) {
                        message.success(result.msg);
                        this.modalCancel();
                        paginatihandle();
                    } else {
                        message.error(result.msg);
                    }
                });
        });
    }

    modalCancel = () => {
        this.setState({
            supplierActive: {},
            supplierList: [],
        });
        this.props.onCancel();
    }

    render() {
        const { data, visible } = this.props;
        const { supplierList, supplierActive } = this.state;
        const { getFieldDecorator } = this.props.form;
        const supplierListOption = supplierList.map(v => <Option value={v.key} key={v.key}>{v.name}</Option>);
        const content = (
            <Form>
                <FormItem
                    label={<span className="ant-form-item-required">SKU</span>}
                    {...this.formItemLayout}
                >
                    {data.sku}
                </FormItem>
                <FormItem
                    label={<span className="ant-form-item-required">采购名称</span>}
                    {...this.formItemLayout}
                >
                    {data.productDesc}
                </FormItem>
                <FormItem
                    label="供应商名称"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'supplierName',
                        {
                            rules: [{ required: true, message: '供应商为必选' }],
                            initialValue: supplierActive.key || undefined,
                        },
                    )(
                        <Select
                            style={{ width: '80%' }}
                            filterOption={false}
                            showSearch
                            onChange={this.onChange}
                            onSearch={debounce(this.search, 500)}
                        >
                            {supplierListOption}
                        </Select>,
                    )}
                </FormItem>
                {
                    supplierActive && supplierActive.key ? (
                        <div style={{ width: '90%', margin: '0 auto' }}>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="供应商评级"
                                        {...this.formItemLayout1}
                                    >
                                        {supplierActive.level}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="单价"
                                        {...this.formItemLayout1}
                                    >
                                        {supplierActive.price}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="供应商状态"
                                        {...this.formItemLayout1}
                                    >
                                        {supplierActive.state}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="交期"
                                        {...this.formItemLayout1}
                                    >
                                        {getFieldDecorator(
                                            'deliveryDay',
                                            {
                                                initialValue: supplierActive.deliveryDay || 0,
                                            },
                                        )(
                                            <span>{supplierActive.deliveryDay}</span>,
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="支付方式"
                                        {...this.formItemLayout1}
                                    >
                                        {supplierActive.payType}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="起订量"
                                        {...this.formItemLayout1}
                                    >
                                        {supplierActive.minCount}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="供应商备注"
                                        {...this.formItemLayout1}
                                    >
                                        {supplierActive.remark}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="SKU"
                                        {...this.formItemLayout1}
                                    >
                                        {supplierActive.sku}
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                    ) : null
                }
                <FormItem
                    label="采购单价"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'purchaseAmount',
                        {
                            rules: [{ required: true, message: '采购单价为必填' }],
                            initialValue: data.purchaseAmount || 0,
                        },
                    )(
                        <InputNumber min={0} precision={4} style={{ width: '80%' }} />,
                    )}
                </FormItem>
                <FormItem
                    label="采购数量"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'purchaseCount',
                        {
                            rules: [{ required: true, message: '采购数量为必填' }],
                            initialValue: data.purchaseCount || 0,
                        },
                    )(
                        <InputNumber min={0} precision={0} style={{ width: '70%' }} />,
                    )}
                    <span style={{ display: 'inline-block', width: '10%', textAlign: 'center' }}>PCS</span>
                </FormItem>
                <FormItem
                    label="是否拆单"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'isSplit',
                        { initialValue: !!data.isSplit, valuePropName: 'checked' },
                    )(
                        <Checkbox />,
                    )}
                    <span style={{ color: 'red', fontSize: '12px' }}>不勾选此项，则当采购数量少于PR数量时，会关闭剩余的PR申请数量</span>
                </FormItem>
                <FormItem
                    label="取货/交货"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'deliveryTime',
                        {
                            rules: [{ required: true, message: '交期为必填' }],
                            initialValue: data.deliveryTime ? moment(data.deliveryTime) : undefined,
                        },
                    )(
                        <DatePicker style={{ width: '80%' }} />,
                    )}
                </FormItem>
                <FormItem
                    label="备注"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'remark',
                        { initialValue: data.remark || undefined },
                    )(
                        <TextArea rows={4} style={{ width: '80%' }} />,
                    )}
                </FormItem>
                <FormItem
                    label="异常原因"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'abnormalReason',
                        { initialValue: data.abnormalReason || undefined },
                    )(
                        <TextArea rows={4} style={{ width: '80%' }} />,
                    )}
                </FormItem>
            </Form>
        );

        const footer = (
            <div>
                <Button onClick={this.modalCancel}>取消</Button>
                <Button onClick={this.saveHandle}>确认</Button>
            </div>
        );

        return (
            <Modal
                title="编辑"
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

export default Form.create()(modelCom);
