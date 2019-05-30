import React from 'react';
import {
    Form,
    Row,
    Col,
    Input,
    Select,
    Button,
} from 'antd';
import SkuCom from './SkuCom';
import { timestampFromat } from '../../../../util/baseTool';
import { checkPriceTypeArr, statusArr } from '../constants/index';

const Option = Select.Option;
const FormItem = Form.Item;

class BeliverDetail extends React.Component {
    state = {
        skuComVisible: false,
    }

    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    }

    showSkuCom = () => {
        this.setState({
            skuComVisible: true,
        });
    }

    getState = (id) => {
        if (id === undefined) return '';
        for (let i = 0; i < statusArr.length; i++) {
            if (statusArr[i].id === id) {
                return statusArr[i].name;
            }
        }
        return '';
    }

    getCheckType = (name) => {
        const obj = checkPriceTypeArr.find(v => v.name === name);
        return obj && obj.id;
    }

    render() {
        const { skuComVisible } = this.state;
        const { getFieldDecorator } = this.props.form;
        const { basicInfo, skuHistoricalPurchaseOrderAsync } = this.props;
        return (
            <div className="checkpricemanage-detail-basicinfo bgcfff padding-sm">
                <SkuCom
                    onCancel={() => this.setState({ skuComVisible: false })}
                    visible={skuComVisible}
                    sku={basicInfo.sku}
                    skuHistoricalPurchaseOrderAsync={skuHistoricalPurchaseOrderAsync}
                />
                <Row>
                    <Col span={8}>
                        <FormItem
                            label="核查任务编号"
                            {...this.formItemLayout}
                        >
                            {getFieldDecorator('checkNumber', {
                                initialValue: basicInfo.checkNumber,
                            })(
                                <Input type="hidden" />,
                            )}
                            <span className="pms-lowerShelf_span">{basicInfo.checkNumber}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="任务创建时间"
                            {...this.formItemLayout}
                        >
                            <span className="limit-lineheight pms-lowerShelf_span">{timestampFromat(Number(basicInfo.createTime), 1)}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="SKU日均销量"
                            {...this.formItemLayout}
                        >
                            <span className="limit-lineheight pms-lowerShelf_span">{basicInfo.averageSales}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            label="SKU"
                            {...this.formItemLayout}
                        >
                            <span className="pms-lowerShelf_span">{basicInfo.sku}</span>
                            <Button size="small" className="margin-sm-left pms-lowerShelf_span" onClick={this.showSkuCom}>历史订单</Button>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="采购名称"
                            {...this.formItemLayout}
                        >
                            <span className="limit-lineheight pms-lowerShelf_span">{basicInfo.purchaseName}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="核价类型"
                            {...this.formItemLayout}
                        >
                            {getFieldDecorator('checkType', {
                                initialValue: this.getCheckType(basicInfo.checkType),
                            })(
                                <Select style={{ width: '100%' }}>
                                    {
                                        checkPriceTypeArr.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)
                                    }
                                </Select>,
                            )}

                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            label="推送核查备注"
                            {...this.formItemLayout}
                        >
                            <span className="pms-lowerShelf_span">{basicInfo.checkRemark}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="状态"
                            {...this.formItemLayout}
                        >
                            <span className="limit-lineheight pms-lowerShelf_span">{basicInfo.stateValue}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="销售代表处理意见"
                            {...this.formItemLayout}
                        >
                            <span className="limit-lineheight pms-lowerShelf_span">{basicInfo.sallerSuggest}</span>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BeliverDetail;
