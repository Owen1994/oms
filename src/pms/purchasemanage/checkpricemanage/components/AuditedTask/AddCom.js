import React from 'react';

import {
    Modal,
    Button,
    Form,
    Row,
    Col,
    Input,
    message,
} from 'antd';

import CSelect from '../../../../../components/cselect';
import { inquireOPEmployeeUrl, procurementRoleSkuUrl } from '../../constants/Api';
// import { debounce } from '../../../../../util/baseTool';

const FormItem = Form.Item;
// const Option = Select.Option;

class logisticsCom extends React.Component {
    state = {
        procurement: {},
    }


    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    getcgmc = (sku) => {
        if (sku && sku.length) {
            this.setState({
                procurement: sku[0],
            });
        }
    }

    saveHandle = () => {
        const { validateFields } = this.props.form;
        const formParams = [
            'checkPerson',
            'sku',
            'purchaseName',
            'businessLine',
        ];
        validateFields(formParams, (err, value) => {
            if (err) {
                return message.error(err[Object.keys(err)[0]].errors[0].message);
            }
            const param = { ...value };
            if (param.sku) {
                param.sku = this.state.procurement.key;
            }
            const data = {
                data: { ...param },
            };
            this.props.getPriceManagementAddNewTaskAsync(data)
                .then((result) => {
                    if (result) {
                        message.success(result.msg);
                        this.modalCancel();
                    } else {
                        message.error(result.msg);
                    }
                });
        });
    }


    modalCancel = () => {
        this.props.onCancel();
    }

    render() {
        const { procurement } = this.state;
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const content = (
            <Form>
                <Row className="sides-wrap">
                    <Col className="left-sides ant-form-item-required" span={5}>核查任务编号：</Col>
                    <Col span={19}>
                        <Input placeholder="自动生成" disabled style={{ width: '85%' }} />
                    </Col>
                </Row>
                <FormItem
                    className="margin-sm-top"
                    label="核价员"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'checkPerson',
                        {
                            rules: [{ required: true, message: '核价员为必填' }],
                            initialValue: undefined,
                        },
                    )(
                        <CSelect
                            code="key" // 列表编码字段
                            name="label" // 列表名称字段
                            url={inquireOPEmployeeUrl}
                            params={{
                                data: {
                                    searchColumn: 'name',
                                    procurementType: 4,
                                    pageData: 20,
                                    pageNumber: 1,
                                },
                            }} // 搜索参数
                            style={{ width: '85%' }}
                        />,
                    )}
                </FormItem>
                <FormItem
                    className="margin-sm-top"
                    label="SKU"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'sku',
                        {
                            rules: [{ required: true, message: 'SKU为必填' }],
                            initialValue: undefined,
                        },
                    )(
                        <CSelect
                            code="key" // 列表编码字段
                            name="label" // 列表名称字段
                            url={procurementRoleSkuUrl}
                            formType={1}
                            onChange={this.getcgmc}
                            params={{
                                data: {
                                    searchColumn: 'label',
                                    pageData: 20,
                                    pageNumber: 1,
                                },
                            }} // 搜索参数
                            style={{ width: '85%' }}
                        />,
                    )}
                </FormItem>
                <Row className="sides-wrap margin-sm-top">
                    <Col className="left-sides ant-form-item-required" span={5}>采购名称：</Col>
                    <Col span={19}>
                        <Input value={procurement.purchaseName || undefined} disabled placeholder="自动带出" style={{ width: '85%' }} />
                    </Col>
                </Row>
                <FormItem>
                    {getFieldDecorator(
                        'purchaseName',
                        {
                            initialValue: procurement.purchaseName,
                        },
                    )(
                        <Input type="hidden" />,
                    )}
                </FormItem>
                <Row className="sides-wrap margin-sm-top">
                    <Col className="left-sides ant-form-item-required" span={5}>业务线：</Col>
                    <Col span={19}>
                        <Input placeholder="国内仓" disabled style={{ width: '85%' }} />
                    </Col>
                </Row>

                <FormItem>
                    {getFieldDecorator(
                        'businessLine',
                        {
                            initialValue: 1,
                        },
                    )(
                        <Input type="hidden" />,
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
                title="新增核价任务"
                width={600}
                destroyOnClose
                visible={visible}
                footer={footer}
                maskClosable={false}
                onCancel={this.modalCancel}
            >
                {content}
            </Modal>
        );
    }
}

export default Form.create()(logisticsCom);
