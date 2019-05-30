import React from 'react';
import {
    Form, Input, Select, Row, Col
} from 'antd';
import CSelect from '@/components/cselect';

import { COMMON_QUERY, GET_CURRENCY, GET_WAREHOUSE_INFO, GET_CHANNEL_INFO, GET_COUNTRY_INFO, GET_DOMESTIC_DETAIL } from '../constants';
import { fetchPost } from '../../../../util/fetch';

const FormItem = Form.Item;
const Option = Select.Option;

class EditDrawer extends React.Component {
    state = {
        currency: '',
        headerFix: 'empty',
        basisData: {},
        chargeData: {},
    }

    componentDidMount() {
        const { modalTitle } = this.props;
        if (modalTitle === '新增') {
            this.ruleInit();
        } else {
            this.getDetail();
        }
    }

    componentDidUpdate(preProps) {
        const { editVisible, modalTitle } = this.props;
        const preVisible = preProps.editVisible;
        if (editVisible && editVisible !== preVisible) {
            if (modalTitle === '新增') {
                this.ruleInit();
            } else {
                this.getDetail();
            }
        }
    }

    // 初始化
    ruleInit = () => {
        this.setState({
            currency: '',
            skuRule: '',
            apportionCharge: '',
            apportionCoefficient: '',
            pointValue: '',
            largeCharge: '',
            largeRate: '',
            smallCharge: '',
            smallRate: '',
            headerFix: 'empty',
            basisData: {},
            chargeData: {},
        });
        this.props.rulesStateInit();
        this.props.form.resetFields();
    }

    // 编辑时获取规则详情
    getDetail = () => {
        const { basisId } = this.props.record;
        fetchPost(GET_DOMESTIC_DETAIL, {data: { basisId }}, 2)
            .then((res) => {
                if (res && res.state === '000001') {
                    const data = res.data;
                    const basisData = data.basis;
                    const chargeData = data.charge;
                    const matchRule = basisData.matchRule.split('=');
                    const headerFix = matchRule.length > 1 ? matchRule[0] : 'empty';
                    const skuRule = matchRule.length > 1 ? matchRule[1] : '';
                    const channel = basisData.channel ? basisData.channel.map(item => item.key) : undefined;
                    this.setState({
                        basisData,
                        chargeData,
                        headerFix: headerFix,
                        currency: basisData.currency[0].key,
                        skuRule: skuRule,
                        apportionCharge: chargeData.orderApportionCharge,
                        apportionCoefficient: chargeData.orderApportionCoefficient,
                        pointValue: chargeData.paypalPointValue,
                        largeCharge: chargeData.paypalLargeCharge,
                        largeRate: chargeData.paypalLargeRate,
                        smallCharge: chargeData.paypalSmallCharge,
                        smallRate: chargeData.paypalSmallRate,
                    });
                    this.props.form.setFieldsValue({
                        'headerFix': headerFix,
                        'skuRule': skuRule,
                        'basis.channel': channel,
                        'basis.currency': basisData.currency[0].key,
                        'basis.destination': basisData.destination[0].key,
                        'basis.platform': basisData.platform[0].key,
                        'basis.siteId': basisData.siteId[0].key,
                        'basis.warehouse': basisData.warehouse[0].key,
                        'basis.ruleName': basisData.ruleName,
                        'charge.orderApportionCharge': chargeData.orderApportionCharge,
                        'charge.orderApportionCoefficient': chargeData.orderApportionCoefficient,
                        'charge.pageCharge': chargeData.pageCharge,
                        'charge.payRate': chargeData.payRate,
                        'charge.paypalLargeCharge': chargeData.paypalLargeCharge,
                        'charge.paypalLargeRate': chargeData.paypalLargeRate,
                        'charge.paypalPointValue': chargeData.paypalPointValue,
                        'charge.paypalSmallCharge': chargeData.paypalSmallCharge,
                        'charge.paypalSmallRate': chargeData.paypalSmallRate,
                        'charge.profitsRate': chargeData.profitsRate,
                        'charge.refundRate': chargeData.refundRate,
                    });
                    this.props.rulesStateInit(data);
                }
            })
    }

    platformChange = (value) => {
        this.setState({
            platformCode: value,
        });
    }

    onCurrencyChange = (value) => {
        this.setState({ currency: value });
    }

    // sku匹配规则选择前后缀
    skuRuleSelect = (value) => {
        if (value === 'empty') {
            this.setState({ skuRule: '' });
        }
        this.setState({ headerFix: value });
        this.props.form.setFieldsValue({ headerFix: value });
    }

    // sku匹配规则输入
    skuRuleChange = (e) => {
        const value = e.target.value;
        this.setState({ skuRule: value });
        this.props.form.setFieldsValue({ skuRule: value });
    }

    // 订单均摊费相乘系数输入
    apportionCoefficientChange = (e) => {
        const value = e.target.value;
        this.setState({ apportionCoefficient: value });
        this.props.form.setFieldsValue({ 'charge.orderApportionCoefficient': value });
    }

    // 订单均摊费相加系数输入
    apportionChargeChange = (e) => {
        const value = e.target.value;
        this.setState({ apportionCharge: value });
        this.props.form.setFieldsValue({ 'charge.orderApportionCharge': value });
    }

    // paypal参数临界值输入
    pointValueChange = (e) => {
        const value = e.target.value;
        this.setState({ pointValue: value });
        this.props.form.setFieldsValue({ 'charge.paypalPointValue': value });
    }

    // 大Paypal-费率输入
    largeRateChange = (e) => {
        const value = e.target.value;
        this.setState({ largeRate: value });
        this.props.form.setFieldsValue({ 'charge.paypalLargeRate': value });
    }

    // 大Paypal-固定费用输入
    largeChargeChange = (e) => {
        const value = e.target.value;
        this.setState({ largeCharge: value });
        this.props.form.setFieldsValue({ 'charge.paypalLargeCharge': value });
    }

    // 小Paypal-费率输入
    smallRateChange = (e) => {
        const value = e.target.value;
        this.setState({ smallRate: value });
        this.props.form.setFieldsValue({ 'charge.paypalSmallRate': value });
    }

    // 小Paypal-固定费用输入
    smallChargeChange = (e) => {
        const value = e.target.value;
        this.setState({ smallCharge: value });
        this.props.form.setFieldsValue({ 'charge.paypalSmallCharge': value });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 10 },
        };
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const {
            skuRule,
            currency,
            headerFix,
            platformCode,
            apportionCharge,
            apportionCoefficient,
            pointValue,
            largeCharge,
            largeRate,
            smallCharge,
            smallRate,
            basisData,
        } = this.state;
        const { channelInit, currencyInit, destinationInit, platformInit, warehouseInit, siteInit } = this.props.rulesInitReducer;
        const { record } = this.props;
        return (
            <div>
                <Form>
                    <div className="rule-chunk">
                        <div className='chunk-header'>基础信息</div>
                        <Row type="flex" align="middle">
                            <Col span={10}>
                                <FormItem
                                    {...formItemLayout}
                                    label="平台"
                                >
                                    {getFieldDecorator('basis.platform', {
                                        rules: [{ required: true, message: '请选择平台' }],
                                        initialValue: (basisData.platform && basisData.platform.length) ? basisData.platform[0].key : undefined,
                                    })(
                                        <CSelect
                                            list={platformInit}
                                            // handleFilter={this.completeCallback}
                                            code="code" // 列表编码字段
                                            name="name" // 列表名称字段
                                            url={COMMON_QUERY}
                                            params={{ 
                                                data: {
                                                    modelName: 'platformList',
                                                    searchColumn: "name"
                                                }
                                            }} // 搜索参数
                                            apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            onChange={this.platformChange}
                                            placeholder="请选择平台"
                                            localSearch={1}
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={14}>
                                <FormItem
                                    {...formItemLayout}
                                    label="站点"
                                >
                                    {getFieldDecorator('basis.siteId', {
                                        rules: [{ required: true, message: '请选择站点' }],
                                        initialValue: (basisData.siteId && basisData.siteId.length) ? basisData.siteId[0].key : undefined,
                                    })(
                                        <CSelect
                                            list={siteInit}
                                            disabled={!getFieldValue('basis.platform')}
                                            // handleFilter={this.completeCallback}
                                            code="code" // 列表编码字段
                                            name="name" // 列表名称字段
                                            url={COMMON_QUERY}
                                            params={{
                                                data: {
                                                    platformCode,
                                                    modelName: 'siteList',
                                                    searchColumn: "name"
                                                }
                                            }} // 搜索参数
                                            apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            placeholder="请选择站点"
                                            localSearch={1}
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle">
                            <Col span={10}>
                                <FormItem
                                    {...formItemLayout}
                                    label="规则名称"
                                >
                                    {getFieldDecorator('basis.ruleName', {
                                        rules: [{ required: true, message: '请输入规则名称' }]
                                    })(
                                        <Input placeholder='请输入规则名称' maxLength={25} />,
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={14}>
                                <FormItem
                                    {...formItemLayout}
                                    label="销售币种"
                                >
                                    {getFieldDecorator('basis.currency', {
                                        rules: [{ required: true, message: '请选择销售币种' }],
                                        initialValue: (basisData.currency && basisData.currency.length) ? basisData.currency[0].key : undefined,
                                    })(
                                        <CSelect
                                            list={currencyInit}
                                            // handleFilter={this.completeCallback}
                                            code="key" // 列表编码字段
                                            name="label" // 列表名称字段
                                            url={GET_CURRENCY}
                                            // params={{}} // 搜索参数
                                            apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            placeholder="请选择销售币种"
                                            localSearch={1}
                                            onChange={this.onCurrencyChange}
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle">
                            <Col span={10}>
                                <FormItem
                                    {...formItemLayout}
                                    label="发货仓库"
                                >
                                    {getFieldDecorator('basis.warehouse', {
                                        rules: [{ required: true, message: '请选择发货仓库' }],
                                        initialValue: (basisData.warehouse && basisData.warehouse.length) ? basisData.warehouse[0].key : undefined,
                                    })(
                                        <CSelect
                                            list={warehouseInit}
                                            // handleFilter={this.completeCallback}
                                            code="key" // 列表编码字段
                                            name="label" // 列表名称字段
                                            url={GET_WAREHOUSE_INFO}
                                            // params={{}} // 搜索参数
                                            apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            placeholder="请选择发货仓库"
                                            localSearch={1}
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={14}>
                                <FormItem
                                    {...formItemLayout}
                                    label="发货渠道"
                                >
                                    {getFieldDecorator('basis.channel', {
                                        initialValue: (basisData.channel && basisData.channel.length) ? basisData.channel[0].key : undefined,
                                    })(
                                        <CSelect
                                            list={channelInit}
                                            // handleFilter={this.completeCallback}
                                            code="key" // 列表编码字段
                                            name="label" // 列表名称字段
                                            url={GET_CHANNEL_INFO}
                                            mode='multiple'
                                            // params={{}} // 搜索参数
                                            apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            placeholder="请选择发货渠道"
                                            localSearch={1}
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle">
                            <Col span={10}>
                                <div className="ant-row ant-form-item">
                                    <div className="ant-col-6 ant-form-item-label">
                                        <label className="ant-form-item-required">SKU匹配规则</label>
                                    </div>
                                    <div className="ant-col-10 ant-form-item-control-wrapper" style={{ display: 'flex', paddingTop: 4 }}>
                                        <Select style={{ flex: 1 }} defaultValue='empty' onChange={this.skuRuleSelect} value={headerFix}>
                                            <Option value='empty'>无</Option>
                                            <Option value='prefix'>前缀为</Option>
                                            <Option value='suffix'>后缀为</Option>
                                        </Select>
                                        <Input
                                            value={skuRule}
                                            disabled={getFieldValue('headerFix') === 'empty'}
                                            style={{ flex: 2, marginLeft: 10 }}
                                            placeholder='请输入'
                                            onChange={this.skuRuleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col span={14}>
                                <FormItem
                                    {...formItemLayout}
                                    label="货品发往国家"
                                >
                                    {getFieldDecorator('basis.destination', {
                                        rules: [{ required: true, message: '请选择货品发往国家' }],
                                        initialValue: (basisData.destination && basisData.destination.length) ? basisData.destination[0].key : undefined,
                                    })(
                                        <CSelect
                                            list={destinationInit}
                                            // handleFilter={this.completeCallback}
                                            code="key" // 列表编码字段
                                            name="label" // 列表名称字段
                                            url={GET_COUNTRY_INFO}
                                            // params={{}} // 搜索参数
                                            apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            placeholder="请选择货品发往国家"
                                            localSearch={1}
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div className="rule-chunk">
                        <div className='chunk-header'>费用设置</div>
                        <Row type="flex" align="middle">
                            <Col span={10}>
                                <FormItem
                                    {...formItemLayout}
                                    label="利润率(%)"
                                >
                                    {getFieldDecorator('charge.profitsRate', {
                                        rules: [{ required: true, message: '请输入利润率' }]
                                    })(
                                        <Input type='number' placeholder='请输入利润率' />,
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={14}>
                                <FormItem
                                    {...formItemLayout}
                                    label="刊登费"
                                >
                                    {getFieldDecorator('charge.pageCharge', {
                                        rules: [{ required: true, message: '请输入刊登费' }]
                                    })(
                                        <Input type='number' placeholder='请输入刊登费' style={{ width: 150 }} />,
                                    )}
                                </FormItem>
                                <div className='rule-currency fix-cny-currency'>CNY</div>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle">
                            <Col span={10}>
                                <FormItem
                                    {...formItemLayout}
                                    label="成交费率(%)"
                                >
                                    {getFieldDecorator('charge.payRate', {
                                        rules: [{ required: true, message: '请输入成交费率' }]
                                    })(
                                        <Input type='number' placeholder='请输入成交费率' />,
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={14}>
                                <div className="ant-row ant-form-item">
                                    <div className="ant-col-6 ant-form-item-label">
                                        <label className="ant-form-item-required">订单均摊费</label>
                                    </div>
                                    <div className="ant-col-18 pdt3 son-all-float">
                                        <div className='pd5'>总成本价 *</div>
                                        <div style={{ width: 80 }}>
                                            <Input type='number' placeholder='请输入' onChange={this.apportionCoefficientChange} value={apportionCoefficient} />
                                        </div>
                                        <div className='pd5'>+</div>
                                        <div style={{ width: 80 }}>
                                            <Input type='number' placeholder='请输入' onChange={this.apportionChargeChange} value={apportionCharge} />
                                        </div>
                                        <div className='rule-currency'>{currency}</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle">
                            <Col span={10}>
                                <FormItem
                                    {...formItemLayout}
                                    label="退款率"
                                >
                                    {getFieldDecorator('charge.refundRate', {
                                        rules: [{ required: true, message: '请输入退款率' }]
                                    })(
                                        <Input type='number' placeholder='请输入退款率' />,
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={14}>
                                <div className="ant-row ant-form-item">
                                    <div className="ant-col-6 ant-form-item-label">
                                        <label className="ant-form-item-required">Paypal参数</label>
                                    </div>
                                    <div className="ant-col-18 pdt3 son-all-float">
                                        <div className='pd5 prnone'>临界值：</div>
                                        <div>
                                            <Input type='number' placeholder='请输入' onChange={this.pointValueChange} value={pointValue} />
                                        </div>
                                        <div className='rule-currency'>{currency}</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle">
                            <Col span={10}></Col>
                            <Col span={14}>
                                <div className="ant-row ant-form-item">
                                    <div className="ant-col-6 ant-form-item-label"></div>
                                    <div className="ant-col-18 pdt3 son-all-float">
                                        <div className='pd5 prnone'>大Paypal费率(%)：</div>
                                        <div>
                                            <Input type='number' placeholder='请输入' style={{ width: 80 }} onChange={this.largeRateChange} value={largeRate} />
                                        </div>
                                        <div className='pd5 prnone'>固定费用：</div>
                                        <div>
                                            <Input type='number' placeholder='请输入' style={{ width: 80 }} onChange={this.largeChargeChange} value={largeCharge} />
                                        </div>
                                        <div className='rule-currency'>{currency}</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle">
                            <Col span={10}></Col>
                            <Col span={14}>
                                <div className="ant-row ant-form-item">
                                    <div className="ant-col-6 ant-form-item-label"></div>
                                    <div className="ant-col-18 pdt3 son-all-float">
                                        <div className='pd5 prnone'>小Paypal费率(%)：</div>
                                        <div>
                                            <Input type='number' placeholder='请输入' style={{ width: 80 }} onChange={this.smallRateChange} value={smallRate} />
                                        </div>
                                        <div className='pd5 prnone'>固定费用：</div>
                                        <div>
                                            <Input type='number' placeholder='请输入' style={{ width: 80 }} onChange={this.smallChargeChange} value={smallCharge} />
                                        </div>
                                        <div className='rule-currency'>{currency}</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="rule-chunk">
                        <div className='chunk-header'>计算公式</div>
                        <div className='cal-ways'>
                            <div>建议售价=（总成本价+理论运费+刊登费+Paypal固定费用+订单均摊费）/（1-成交费率-退款率-Paypal费率-利润率）</div>
                            <div>正推边际利润=建议售价*（1-退款率）-刊登费-Paypal费-建议售价*成交费率-总成本价-理论运费-订单均摊费</div>
                            <div>正推边际利润率=正推边际利润/建议售价</div>
                        </div>
                    </div>
                    {/* 需提交的表单项 */}
                    <FormItem>
                        {getFieldDecorator('headerFix')(
                            <Input type='hidden' />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('skuRule')(
                            <Input type='hidden' />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('charge.orderApportionCharge')(
                            <Input type='hidden' />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('charge.orderApportionCoefficient')(
                            <Input type='hidden' />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('charge.paypalPointValue')(
                            <Input type='hidden' />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('charge.paypalLargeRate')(
                            <Input type='hidden' />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('charge.paypalLargeCharge')(
                            <Input type='hidden' />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('charge.paypalSmallRate')(
                            <Input type='hidden' />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('charge.paypalSmallCharge')(
                            <Input type='hidden' />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('basis.basisId', {
                            initialValue: record.basisId ? record.basisId : undefined
                        })(
                            <Input type='hidden' />,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(EditDrawer);
