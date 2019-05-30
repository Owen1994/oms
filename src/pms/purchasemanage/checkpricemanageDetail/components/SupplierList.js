import React from 'react';
import {
    Form,
    Row,
    Col,
    Input,
    InputNumber,
    Select,
    Button,
    Checkbox,
} from 'antd';
import CSelect from '../../../../components/cselect';
import { orderDetailSupplierListUrl } from '../actions/index';
import { hasPerssion } from '../../../../util/baseTool';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class BeliverDetail extends React.Component {
    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    }

    formItemLayout1 = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    }

    getPaytype = (name) => {
        if (name === undefined) return;
        const {
            paymentMethod,
        } = this.props;
        if (paymentMethod && paymentMethod.length) {
            const result = paymentMethod.find(v => v.label === name);
            if (result) return result.key;
        }
    }

    render() {
        const {
            addSupplier,
            removeSupplie,
            supplierArray,
            paymentMethod,
            handleChangeSupplie,
        } = this.props;
        const isShwoPermission = !hasPerssion('010-000003-000002-000001-005', this.props);
        const { getFieldDecorator } = this.props.form;
        const content = supplierArray.map((data) => {
            const {
                key,
                isOrigin,
                aliWangWang,
                checkCount,
                checkPrice,
                checkRemark,
                contact,
                delivery,
                dissolveRelationship,
                minCount,
                name,
                packageSpecification,
                payType,
                price,
                qq,
                taxPoint,
                telNumber,
                tennisRacketLink,
            } = data;

            return (
                <div key={key} className="checkpricemanage-supplier-list bgcfff padding-sm margin-ms-top">
                    <Row className="margin-ss-top">
                        {
                            isOrigin ? (
                                <Col span={8}>
                                    <FormItem
                                        label="供应商名称"
                                        {...this.formItemLayout}
                                    >
                                        {getFieldDecorator(`supplierArray[${key}][name]`, {
                                            rules: [{ required: true, message: '供应商名称必填' }],
                                            initialValue: name || undefined,
                                        })(
                                            <Input disabled />,
                                        )}
                                    </FormItem>
                                </Col>
                            ) : (
                                <Col span={8}>
                                    <FormItem
                                        label="供应商名称"
                                        {...this.formItemLayout}
                                    >
                                        {getFieldDecorator(`supplierArray[${key}][name]`, {
                                            rules: [{ required: true, message: '供应商名称必填' }],
                                            initialValue: name || undefined,
                                        })(
                                            <CSelect
                                                code="code" // 列表编码字段
                                                name="name" // 列表名称字段
                                                url={orderDetailSupplierListUrl}
                                                onChange={value => handleChangeSupplie(key, value)}
                                                placeholder="请输入供应商名称"
                                                formType={1}
                                                params={{
                                                    data: {
                                                        searchColumn: 'name',
                                                        state: '已审核',
                                                        pageData: 20,
                                                        pageNumber: 1,
                                                    },
                                                }} // 搜索参数
                                                // params={{ searchColumn: 'name', state: '已审核' }} // 搜索参数
                                                style={{ width: '100%' }}
                                            />,
                                        )}
                                    </FormItem>
                                </Col>
                            )
                        }
                        <Col span={8}>
                            <FormItem
                                label="核查价格"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator(`supplierArray[${key}][checkPrice]`, {
                                    rules: [{ required: true, message: '核查价格必填' }],
                                    initialValue: checkPrice,
                                })(
                                    <InputNumber
                                        disabled={isShwoPermission}
                                        style={{ width: '100%' }}
                                        min={0}
                                        precision={2}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="付款方式"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator(`supplierArray[${key}][payType]`, {
                                    rules: [{ required: true, message: '付款方式必选' }],
                                    initialValue: payType && this.getPaytype(payType),
                                })(
                                    <Select style={{ width: '100%' }} 
                                    disabled={isShwoPermission}
                                    >
                                        {
                                            paymentMethod.map(v => (<Option key={key} value={v.key}>{v.label}</Option>))
                                        }
                                    </Select>,
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="margin-ms-top">
                        <Col span={8}>
                            <FormItem
                                label="核查数量"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator(`supplierArray[${key}][checkCount]`, {
                                    rules: [{ required: true, message: '核查数量必填' }],
                                    initialValue: checkCount,
                                })(
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        min={0}
                                        precision={0}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="含税价格"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator(`supplierArray[${key}][price]`, {
                                    rules: [{ required: true, message: '含税价格必填' }],
                                    initialValue: price,
                                })(
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        min={0}
                                        precision={2}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="联系人"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator(`supplierArray[${key}][contact]`, {
                                    initialValue: contact,
                                })(
                                    <Input />,
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="margin-ms-top">
                        <Col span={8}>
                            <FormItem
                                label="供应商起订量"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator(`supplierArray[${key}][minCount]`, {
                                    rules: [{ required: true, message: '供应商起订量必填' }],
                                    initialValue: minCount,
                                })(
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        min={0}
                                        precision={0}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="税点（%）"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator(`supplierArray[${key}][taxPoint]`, {
                                    rules: [{ required: true, message: '税点必填' }],
                                    initialValue: taxPoint,
                                })(
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        min={0}
                                        precision={2}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="QQ"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator(`supplierArray[${key}][qq]`, {
                                    initialValue: qq,
                                })(
                                    <Input />,
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="margin-ms-top">
                        <Col span={8}>
                            <FormItem
                                label="货期(天)"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator(`supplierArray[${key}][delivery]`, {
                                    rules: [{ required: true, message: '货期必填' }],
                                    initialValue: delivery,
                                })(
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        min={0}
                                        precision={0}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="包装规格"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator(`supplierArray[${key}][packageSpecification]`, {
                                    initialValue: packageSpecification,
                                })(
                                    <Input />,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="手机"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator(`supplierArray[${key}][telNumber]`, {
                                    initialValue: telNumber,
                                })(
                                    <Input />,
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className="margin-ms-top">
                        <Col span={16}>
                            <FormItem
                                label="网拍链接"
                                {...this.formItemLayout1}
                            >
                                {getFieldDecorator(`supplierArray[${key}][tennisRacketLink]`, {
                                    initialValue: tennisRacketLink,
                                })(
                                    <Input />,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="旺旺"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator(`supplierArray[${key}][aliWangWang]`, {
                                    initialValue: aliWangWang,
                                })(
                                    <Input />,
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className="margin-ms-top">
                        <Col span={16}>
                            <FormItem
                                label="核查备注"
                                {...this.formItemLayout1}
                            >
                                {getFieldDecorator(`supplierArray[${key}][checkRemark]`, {
                                    initialValue: checkRemark,
                                })(
                                    <TextArea
                                        style={{ width: '100%' }}
                                        autosize={{ minRows: 3, maxRows: 3 }}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="margin-ms-top">
                        {
                            isShwoPermission ? '' :
                            <Col span={16}>
                                <FormItem
                                    label="解除供货关系"
                                    {...this.formItemLayout1}
                                >
                                    {getFieldDecorator(`supplierArray[${key}][dissolveRelationship]`, {
                                        initialValue: !!dissolveRelationship, valuePropName: 'checked',
                                    })(
                                        <Checkbox />,
                                    )}
                                    <span style={{ fontSize: '12px' }} className="margin-sm-left red">勾选之后，会将此供应商下的当前SKU禁用</span>
                                </FormItem>
                            </Col>
                        }
                    </Row>
                    {
                        !isOrigin ? (
                            <div className="margin-ms-top text-right" style={{ width: '97.22222%' }}>
                                <Button onClick={() => removeSupplie(key)} className="margin-ss-right">取消添加此供应商</Button>
                                <Button onClick={addSupplier} icon="plus">添加供应商</Button>
                            </div>
                        ) : null
                    }
                </div>
            );
        });
        return (
            content
        );
    }
}

export default BeliverDetail;
