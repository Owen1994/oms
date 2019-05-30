import React from 'react';
import {
    Form, Select,
    Input, Modal,
} from 'antd';
import CSelect from '../../../../../components/cselect';
import { GET_PLACE_CODE, GET_USER_WAREHOUSE } from '../../../../common/constants/Api';
import { getLoginmsg } from '../../../../../util/baseTool';
import { fetchPost } from '../../../../../util/fetch';
import { INVENTORY_INITVALUE, PLAN_CREATE_INVENTORY } from '../../constants/Api';
import { inventoryType } from '../../constants/search';

/**
 * 审批通过弹框
 */
/**
 * 样品申请
 */
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

class CreatePlanModal extends React.Component {
    state = {
        warehouse: [],
        countType: '',
        defaultDifference: 1,
    };

    componentDidMount() {
        const username = getLoginmsg().userName;
        fetchPost(GET_USER_WAREHOUSE, { data: { username } }, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({ warehouse: result.data });
                }
            });

        fetchPost(INVENTORY_INITVALUE, {}, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        defaultDifference: result.data.firstDiscDifference,
                    });
                }
            });
    }

    onCancel = () => {
        this.props.form.setFieldsValue({
            firstDiscDifference: this.state.defaultDifference,
        });
        const cancel = this.props.cancel;
        if (cancel) {
            cancel();
        }
    };

    onOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    data: {
                        ...values,
                    },
                };
                fetchPost(PLAN_CREATE_INVENTORY, params, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.onCancel();
                            const { ok } = this.props;
                            if (ok) {
                                ok();
                            }
                        }
                    });
            }
        });
    };


    render() {
        const {
            visible,
        } = this.props;
        const { warehouse } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="创建盘点计划"
                width={530}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                maskClosable={false}
            >
                <div className="margin-ms-left margin-ms-right">
                    <FormItem
                        {...formItemLayout}
                        label="仓库名称:"
                    >
                        {
                            getFieldDecorator('warehouseCode', {
                                rules: [{ required: true, message: '仓库名称不能为空' }],
                                initialValue: warehouse.length > 0 ? warehouse[0].warehouseCode : '',
                            })(
                                <Select
                                    disabled
                                >
                                    {
                                        warehouse.map(v => (
                                            <Select.Option
                                                key={v.warehouseCode}
                                                value={v.warehouseCode}
                                            >{v.warehouseName}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>,
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="盘点类型:"
                    >
                        {getFieldDecorator('countType', {
                            rules: [{ required: true, message: '请选择' }],
                        })(
                            <CSelect
                                list={inventoryType}
                                onChange={(value) => {
                                    this.setState({
                                        countType: value,
                                    });
                                }}
                                placeholder="请选择"
                            />,
                        )}
                    </FormItem>
                    {this.state.countType !== 30 ? (
                        <FormItem
                            {...formItemLayout}
                            label="储位区间:"
                        >

                            <div style={{ display: 'flex' }}>
                                {getFieldDecorator('storageInterval[0]', {
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <CSelect
                                        code="code" // 列表编码字段
                                        name="code" // 列表名称字段
                                        url={GET_PLACE_CODE}
                                        params={{ searchColumn: 'content' }}
                                        localSearch={1}
                                        placeholder="请选择"
                                    />,
                                )}
                                <span className="padding-xm-left padding-xm-right">-</span>
                                {getFieldDecorator('storageInterval[1]', {
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <CSelect
                                        code="code" // 列表编码字段
                                        name="code" // 列表名称字段
                                        url={GET_PLACE_CODE}
                                        params={{ searchColumn: 'content' }}
                                        localSearch={1}
                                        placeholder="请选择"
                                    />,
                                )}
                            </div>
                        </FormItem>
                    ) : null}
                    <FormItem
                        {...formItemLayout}
                        label="初盘差异量>:"
                    >
                        {getFieldDecorator('firstDiscDifference', {
                            rules: [{ required: true, message: '请输入' }],
                            initialValue: this.state.defaultDifference,
                        })(
                            <Input
                                placeholder="请输入"
                            />,
                        )}
                    </FormItem>
                </div>
            </Modal>
        );
    }
}

export default Form.create()(CreatePlanModal);
