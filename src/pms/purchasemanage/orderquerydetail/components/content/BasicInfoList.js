import React, { Component } from 'react';
import {
    Col, Form, Input, Row, Tooltip,
} from 'antd';
import CSelect from '../../../../../components/cselect/index';
import {
    orderType, shippingType, isTaxRebate, wareHouse, Rate_Type_List,
} from '../../constants/BasicInfoList';
import {
    LOGISTICS_MODE,
    PUBLICIN_FORM_ATION_COMPANYMAINBODY,
    TRANS_SHIPMENT_WARE_HOUSE,
} from '../../constants/Api';

const FormItem = Form.Item;
const imgVerticalLine = require('../../img/VerticalLine.png');

/**
 * 采购单基本信息
 */
class BasicInfoList extends Component {
    state = {
        freight: null,
    }

    // componentDidMount () {
    //     if (this.props.data.logistics) {
    //         if (this.props.data.logistics.key === 0) {
    //             this.setState ({
    //             freight: 0,
    //             })
    //         } else {
    //         this.setState ({
    //             freight: 1,
    //             })
    //         }
    //     }
       
    // }

   
    // 物流方式事件
    handleLogisticsChange = (value) => {
        if (value === 0) {
            this.setState ({
                freight: 0,
            })
        } else {
            this.setState ({
                freight: 1,
            })
        }
    }

    render() {
        const { data, formItemLayout, isCanEdit,isCanEdit5 } = this.props;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const { freight } = this.state;
        const logisticsDis = getFieldValue('logistics');
        let  freightdis;
        if (logisticsDis == "供应商包邮") {
            freightdis = 1
        } else {
            freightdis = 0
        }
        let isCanEditPurchaseState;
        if (data.purchaseState) {
            isCanEditPurchaseState = (data.purchaseState.code === 4 || data.purchaseState.code === 5) ? true : false;
        }
        let sDestWarehouse = '';
        wareHouse.map(t => {
            if (t.key === data.destWarehouse) {
                sDestWarehouse = t.label;
            }
        });

        let isShowRateType = false;
        if (data.currency) {
            if (data.currency.key) {
                if (data.currency.key === 2 || data.currency.key === 3) {
                    isShowRateType = true;
                }
            }
        }

        return (
            <Form layout="horizontal">
                <div className="grid-list">
                    <img
                        className="group-img"
                        src={imgVerticalLine}
                        alt=""
                        width="3px"
                        height="12px"
                    />
                    <span className="group-label">基础信息</span>
                    <Row>
                        <Col span={7} className="col-required">
                            <FormItem
                                {...formItemLayout}
                                label="采购单号"
                            >
                                <div className="grid-list-item1">{data.purchaseNumber}</div>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="公司主体"
                            >
                                {
                                    getFieldDecorator('company', {
                                        initialValue: data.companyLable ? data.companyLable : '',
                                        rules: [{ required: true, message: '请选择公司主体' }],
                                    })(
                                        isCanEdit ? (
                                            <CSelect
                                                params={{}}
                                                url={PUBLICIN_FORM_ATION_COMPANYMAINBODY}
                                                code="key"
                                                name="label"
                                            />
                                        ) : (
                                                <div className="grid-list-item1">
                                                    {data.companyLable ? data.companyLable : ''}
                                                </div>
                                            ),
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="是否出口退税"
                            >
                                {
                                    getFieldDecorator('isTaxRebate', {
                                        initialValue: data.isTaxRebate,
                                        rules: [{ required: true, message: '请选择是否出口退税' }],
                                    })(
                                        isCanEdit ? (
                                            <CSelect
                                                params={{}}
                                                list={isTaxRebate}
                                            />
                                        ) : (
                                                <div className="grid-list-item1">
                                                    {data.isTaxRebate ? isTaxRebate[data.isTaxRebate - 1].name : ''}
                                                </div>
                                            ),
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7}>
                        <FormItem
                                {...formItemLayout}
                                label="物流方式"
                            >
                                {
                                    getFieldDecorator('logistics', {
                                        initialValue: data.logistics ? data.logistics.label : '',
                                        rules: [{ required: true, message: '请选择物流方式' }],
                                    })(
                                        isCanEdit ? (
                                            <CSelect
                                                params={{}}
                                                url={LOGISTICS_MODE}
                                                code="key"
                                                name="label"
                                                onChange={this.handleLogisticsChange}
                                            />
                                        ) : (
                                                <div className="grid-list-item1">
                                                    {data.logistics ? data.logistics.label : ''}
                                                </div>
                                            ),
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="运费"
                            >
                                {
                                    getFieldDecorator('freight', {
                                        initialValue: freight ? 0 : data.freight,
                                        rules: [
                                            { required: true, message: '请输入运费' },
                                        ],
                                    })(
                                        isCanEdit ? (
                                            <Input
                                              disabled = {(freightdis || freight) ? true : false}
                                            />
                                        ) : (
                                                <div className="grid-list-item1">
                                                    {data.freight}
                                                </div>
                                            ),
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="目的仓库"
                            >
                                {
                                    getFieldDecorator('destWarehouse', {
                                        initialValue: data.destWarehouseName,
                                        rules: [{ required: true, message: '请选择目的仓库' }],
                                    })(
                                        isCanEdit ? (
                                            <Input disabled/>
                                        ) : (
                                                <div className="grid-list-item1">
                                                    {sDestWarehouse}
                                                </div>
                                            ),
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7} className="col-required">
                            <FormItem
                                {...formItemLayout}
                                label="总金额"
                            >
                                <div className="grid-list-item1">{data.totalAmount}</div>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="订单类型"
                            >
                                {
                                    getFieldDecorator('orderType', {
                                        initialValue: data.orderType ? data.orderType : '',
                                        rules: [{ required: true, message: '请选择订单类型' }],
                                    })(
                                        isCanEdit ? (
                                            <CSelect
                                                params={{}}
                                                list={orderType}
                                            />
                                        ) : (
                                                <div className="grid-list-item1">
                                                    {data.orderType ? orderType[data.orderType - 1].name : ''}
                                                </div>
                                            ),
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="转运仓库"
                            >
                                {
                                    getFieldDecorator('transshipWarehouse', {
                                        initialValue: data.transshipWarehouse ? data.transshipWarehouse.label : '',
                                    })(
                                        isCanEdit ? (
                                            <CSelect
                                                params={{}}
                                                url={TRANS_SHIPMENT_WARE_HOUSE}
                                                code="key"
                                                name="label"
                                            />
                                        ) : (
                                                <div className="grid-list-item1">
                                                    {data.transshipWarehouse ? data.transshipWarehouse.label : ''}
                                                </div>
                                            ),
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7} className="col-required">
                            <FormItem
                                {...formItemLayout}
                                label="采购金额"
                            >
                                <div className="grid-list-item1">{data.purchaseAmount}</div>
                            </FormItem>
                        </Col>
                        <Col span={7} className="col-required">
                            <FormItem
                                {...formItemLayout}
                                label="订货员"
                            >
                                <div className="grid-list-item1">{data.opEmployee}</div>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="运输方式"
                            >
                                {
                                    getFieldDecorator('shippingType', {
                                        initialValue: data.shippingType || '',
                                    })(
                                        isCanEdit ? (
                                            <CSelect
                                                params={{}}
                                                list={shippingType}
                                            />
                                        ) : (
                                                <div className="grid-list-item1">
                                                    {data.shippingType ? shippingType[data.shippingType - 1].name : ''}
                                                </div>
                                            ),
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7} className="col-required">
                            <FormItem
                                {...formItemLayout}
                                label="币种"
                            >
                                <div className="grid-list-item1">{data.currency ? data.currency.name : ''}</div>
                            </FormItem>
                        </Col>
                        <Col span={7} className="col-required">
                            <FormItem
                                {...formItemLayout}
                                label="跟单员"
                            >
                                <div className="grid-list-item1">{data.merchandiser}</div>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="备注"
                            >
                                {
                                    getFieldDecorator('basicRemark', {
                                        initialValue: data.basicRemark,
                                    })(
                                        isCanEdit || isCanEditPurchaseState ? (
                                            <Input />
                                        ) : (
                                                data.basicRemark ? (
                                                    data.basicRemark.length < 12 ? (
                                                        <div className="grid-list-item1">
                                                            {data.basicRemark}
                                                        </div>
                                                    ) : (
                                                            <Tooltip placement={"top"} title={data.basicRemark}>
                                                                {data.basicRemark.substring(0, 12) + '...'}
                                                            </Tooltip>
                                                        )
                                                ) : (
                                                        <div className="grid-list-item1">
                                                            {data.basicRemark}
                                                        </div>
                                                    )
                                            ),
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="当前处理人"
                            >
                                <div className="grid-list-item1">{data.currentPersonCn}</div>
                            </FormItem>
                        </Col>
                        <Col span={7} className="col-required">
                            <FormItem
                                {...formItemLayout}
                                label="采购单状态"
                            >
                                {
                                    <div className="grid-list-item1">{
                                        data.purchaseState ? data.purchaseState.name : ''
                                    }
                                    </div>
                                }
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="打印时间"
                            >
                                <div
                                    className="grid-list-item1"
                                >
                                    {data.printTime}
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        {
                            data.payTypeCode === 3 && data.tradingNumber === 10 ? (
                                <Col span={7}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="阿里订单号"
                                    >
                                        <div
                                            className="grid-list-item1"
                                        >
                                            {data.alOrderNumber}
                                        </div>
                                    </FormItem>
                                </Col>
                            ) : null
                        }
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="是否包材"
                            >
                                <div className="grid-list-item1">{data.isPackageMaterial}</div>
                            </FormItem>
                        </Col>
                        {
                            isShowRateType ? (
                                <Col span={7}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="汇率类型"
                                    >
                                        {
                                            getFieldDecorator('rateType', {
                                                initialValue: data.rateType ? data.rateType.key : undefined,
                                                rules: [{ required: true, message: '请选择汇率类型' }],
                                            })(
                                                isCanEdit ? (
                                                    <CSelect
                                                        params={{}}
                                                        list={Rate_Type_List}
                                                        placeholder="请选择"
                                                    />
                                                ) : (
                                                    <div className="grid-list-item1">
                                                        {data.rateType ? data.rateType.name : ''}
                                                    </div>
                                                ),
                                            )
                                        }
                                    </FormItem>
                                </Col>
                            ) : null
                        }

                    </Row>
                </div>
            </Form>
        );
    }
}

export default BasicInfoList;
