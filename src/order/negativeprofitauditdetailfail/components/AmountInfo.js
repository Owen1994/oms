/**
 * 作者：陈文春
 * 描述：包裹详情金额信息组件
 * 时间：2019年1月8日08:47:42
 */
import React from 'react';
import {render} from 'react-dom';
import {
    Form,
    Input,
    Row,
    Col,
} from 'antd'

const FormItem = Form.Item

export default class AmountInfo extends React.Component {

    formItemLayout = {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    }

    render() {
        const {
            orderSum, orderSumCcy, sellerIncomeAmount, sellerIncomeAmountCcy, sellerIncomeAmountShippingFee, sellerIncomeAmountShippingFeeCcy,
            skuTotalCost, skuTotalCostCcy, trialShippingFeeCost, trialShippingFeeCostCcy, trialPackageCostPrice, trialPackageCostPriceCcy,
            trialPackageSalePrice, trialPackageSalePriceCcy, trialPackageProfit, trialPackageProfitCcy,
            factShippingFeeCost, factShippingFeeCostCcy, factPackageCostPrice, factPackageCostPriceCcy,
            factPackageSalePrice, factPackageSalePriceCcy, factPackageProfit, factPackageProfitCcy,
            platformTradingFee, platformTradingFeeCcy,  // 平台交易费及币种（2019年3月19日09:40:49）
        } = this.props.amountInfo;

        return (
            <div className="newCluenk cl-warehouse">
                <div className="title pr">金额信息</div>
                <div className="content">
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="订单总金额"  
                                {...this.formItemLayout}
                                className="widthAll"
                            >
                                <Input readOnly="true" maxLength="100" value={ orderSum ? `${orderSumCcy} ${orderSum}` : null}/>
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="卖家实收金额"
                                {...this.formItemLayout}
                                className="widthAll"
                            >
                                <Input readOnly="true" maxLength="100" value={ sellerIncomeAmount ? `${sellerIncomeAmountCcy} ${sellerIncomeAmount}` : null}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="卖家实收运费"
                                {...this.formItemLayout}
                                className="widthAll"
                            >
                                <Input readOnly="true" maxLength="100" value={ sellerIncomeAmountShippingFee ? `${sellerIncomeAmountShippingFeeCcy} ${sellerIncomeAmountShippingFee}` : null}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="SKU包裹总成本"
                                {...this.formItemLayout}
                                className="widthAll"
                            >
                                <Input readOnly="true" maxLength="100" value={ skuTotalCost ? `${skuTotalCostCcy} ${skuTotalCost}` : null}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="试算运费成本"
                                {...this.formItemLayout}
                                className="widthAll"
                            >
                                <Input readOnly="true" maxLength="100" value={ trialShippingFeeCost ? `${trialShippingFeeCostCcy} ${trialShippingFeeCost}` : null}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="试算包裹成本价"
                                {...this.formItemLayout}
                                className="widthAll"
                            >
                            <Input readOnly="true" maxLength="100" value={ trialPackageCostPrice ? `${trialPackageCostPriceCcy} ${trialPackageCostPrice}` : null}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="试算包裹销售价"
                                {...this.formItemLayout}
                                className="widthAll"
                            >
                            <Input readOnly="true" maxLength="100" value={ trialPackageSalePrice ? `${trialPackageSalePriceCcy} ${trialPackageSalePrice}` : null}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="试算包裹利润"
                                {...this.formItemLayout}
                                className="widthAll"
                            >
                            <Input readOnly="true" maxLength="100" value={ trialPackageProfit ? `${trialPackageProfitCcy} ${trialPackageProfit}` : null}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="实际运费成本"
                                {...this.formItemLayout}
                                className="widthAll"
                            >
                            <Input readOnly="true" maxLength="100" value={ factShippingFeeCost ? `${factShippingFeeCostCcy} ${factShippingFeeCost}` : null}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="实际包裹成本价"
                                {...this.formItemLayout}
                                className="widthAll"
                            >
                            <Input readOnly="true" maxLength="100" value={ factPackageCostPrice ? `${factPackageCostPriceCcy} ${factPackageCostPrice}` : null}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="实际包裹销售价"
                                {...this.formItemLayout}
                                className="widthAll"
                            >
                            <Input readOnly="true" maxLength="100" value={ factPackageSalePrice ? `${factPackageSalePriceCcy} ${factPackageSalePrice}` : null}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="实际包裹利润"
                                {...this.formItemLayout}
                                className="widthAll"
                            >
                            <Input readOnly="true" maxLength="100" value={ factPackageProfit ? `${factPackageProfitCcy} ${factPackageProfit}` : null}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="平台交易费"
                                {...this.formItemLayout}
                                className="widthAll"
                            >
                            <Input readOnly="true" maxLength="100" value={ platformTradingFee ? `${platformTradingFeeCcy} ${platformTradingFee}` : null}/>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
