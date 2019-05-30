import React from 'react';
import {
    Form, Row, Col
} from 'antd';

import { GET_DOMESTIC_DETAIL } from '../constants';
import { fetchPost } from '../../../../util/fetch';

class EditDrawer extends React.Component {
    state = {
        currency: '',
        basisData: {},
        chargeData: {}
    }

    basisFieldData1 = [
        {
            label: '平台',
            field: 'platform'
        }, {
            label: '站点',
            field: 'siteId'
        }, {
            label: '规则名称',
            field: 'ruleName'
        }
    ]

    basisFieldData2 = [
       {
            label: '销售币种',
            field: 'currency'
        }, {
            label: '发货仓库',
            field: 'warehouse'
        }, {
            label: '发货渠道',
            field: 'channel'
        }
    ]

    chargeFieldData = [
        {
            label: '利润率(%)',
            field: 'profitsRate'
        }, {
            label: '刊登费',
            field: 'pageCharge'
        }, {
            label: '成交费率(%)',
            field: 'payRate'
        }
    ]

    componentDidMount() {
        this.getDetail();
    }

    componentDidUpdate(preProps) {
        const { viewVisible } = this.props;
        const preVisible = preProps.viewVisible;
        if (viewVisible && viewVisible !== preVisible) {
            this.getDetail();
        }
    }

    getDetail = () => {
        const { basisId } = this.props.record;
        fetchPost(GET_DOMESTIC_DETAIL, {data: { basisId }}, 2)
            .then((res) => {
                if (res && res.state === '000001') {
                    const data = res.data;
                    this.setState({
                        basisData: data.basis,
                        currency: data.basis.currency[0].key,
                        chargeData: data.charge,
                    });
                }
            })
    }

    // 获取个字段的label字段显示
    getLabel = (fieldValue) => {
        if (fieldValue instanceof Array) {
            if (fieldValue.length === 1) {
                return fieldValue[0].label;
            } else if (fieldValue.length > 1) {
                const label = fieldValue.map(item => item.label);
                return label.join('，');
            }
        }
        return fieldValue || '--';
    }

    skuRuleOperate = (data) => {
        if (data) {
            const matchRule = data.split('=');
            if (matchRule.length <= 1) {
                return '无';
            }
            const headerText = matchRule[0];
            const headerFix = matchRule[1];
            const headStr = headerText === 'prefix' ? '前缀为' : '后缀为';
            return `${headStr}${headerFix}`;
        }
        return '';
    }

    render() {
        const { basisData, chargeData, currency } = this.state;
        return (
            <div className='view-rule-drawer'>
                <div className="rule-chunk">
                    <div className='chunk-header'>基础信息</div>
                    <Row type="flex" align="middle">
                        {
                            this.basisFieldData1.map(item => (
                                <Col span={8} key={item.label}>
                                    <Col span={8}>
                                        <div className='view-isRequired rule-view-label'>{item.label}</div>
                                    </Col>
                                    <Col span={14}>
                                        <div>{this.getLabel(basisData[item.field])}</div>
                                    </Col>
                                </Col>
                            ))
                        }
                    </Row>
                    <Row type="flex" align="middle">
                        {
                            this.basisFieldData2.map(item => {
                                const clsName = item.label === '发货渠道' ? 'rule-view-label' : 'view-isRequired rule-view-label';
                                return (
                                    <Col span={8} key={item.label}>
                                        <Col span={8}>
                                            <div className={clsName}>{item.label}</div>
                                        </Col>
                                        <Col span={14}>
                                            <div>{this.getLabel(basisData[item.field])}</div>
                                        </Col>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    <Row type="flex" align="middle">
                        <Col span={8}>
                            <Col span={8}>
                                <div className='view-isRequired rule-view-label'>SKU匹配规则</div>
                            </Col>
                            <Col span={14}>
                                <div>{this.skuRuleOperate(basisData.matchRule)}</div>
                            </Col>
                        </Col>
                        <Col span={8}>
                            <Col span={8}>
                                <div className='view-isRequired rule-view-label'>货品发往国家</div>
                            </Col>
                            <Col span={14}>
                                <div>{this.getLabel(basisData.destination)}</div>
                            </Col>
                        </Col>
                    </Row>
                </div>
                <div className="rule-chunk">
                    <div className='chunk-header'>费用设置</div>
                    <Row type="flex" align="middle">
                        {
                            this.chargeFieldData.map(item => {
                                const currencyAfter = item.label === '刊登费' ? ` ${currency}` : '';
                                return (
                                    <Col span={8} key={item.label}>
                                        <Col span={8}>
                                            <div className='view-isRequired rule-view-label'>{item.label}</div>
                                        </Col>
                                        <Col span={14}>
                                            <div>{chargeData[item.field]}{currencyAfter}</div>
                                        </Col>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    <Row type="flex" align="middle">
                        <Col span={8}>
                            <Col span={8}>
                                <div className='view-isRequired rule-view-label'>订单均摊费</div>
                            </Col>
                            <Col span={14}>
                                <div>{`SKU成本价 * ${chargeData.orderApportionCoefficient} + ${chargeData.orderApportionCharge} CNY`}</div>
                            </Col>
                        </Col>
                        <Col span={8}>
                            <Col span={8}>
                                <div className='view-isRequired rule-view-label'>退款率(%)</div>
                            </Col>
                            <Col span={14}>
                                <div>{chargeData.refundRate}</div>
                            </Col>
                        </Col>
                        <Col span={8}>
                            <Col span={8}>
                                <div className='view-isRequired rule-view-label'>Paypal费用</div>
                            </Col>
                            <Col span={16}>
                                <div>{`临界值：${chargeData.paypalPointValue} ${currency}`}</div>
                            </Col>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle">
                        <Col span={8} offset={16}>
                            <Col span={8}></Col>
                            <Col span={16}>
                                <div>{`大Paypal费率：${chargeData.paypalLargeRate} 固定费用：${chargeData.paypalLargeCharge} ${currency}`}</div>
                            </Col>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle">
                        <Col span={8} offset={16}>
                            <Col span={8}></Col>
                            <Col span={16}>
                                <div>{`小Paypal费率：${chargeData.paypalSmallRate} 固定费用：${chargeData.paypalSmallCharge} ${currency}`}</div>
                            </Col>
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
            </div>
        );
    }
}
export default Form.create()(EditDrawer);
