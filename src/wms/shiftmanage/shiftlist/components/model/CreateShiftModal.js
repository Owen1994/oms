import React from 'react';
import {
    Form,
    Input, Modal,
} from 'antd';
import CSelect from '../../../../../components/cselect';
import { GET_PLACE_CODE, GET_SKUNAME_BY_SKUUNIQUE, MOVE_PLACE_TYPE } from '../../../../common/constants/Api';
import { fetchPost } from '../../../../../util/fetch';
import { LOCK_MOVE_TASK } from '../../constants/Api';

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

class CreateShiftModal extends React.Component {
    state = {
        skuName: '',
    };

    onCancel = () => {
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
                fetchPost(LOCK_MOVE_TASK, params, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.onCancel();
                            if (this.props.ok) {
                                this.props.ok();
                            }
                        }
                    });
            }
        });
    };

    onSkuChange = (e) => {
        const skuCode = e.target.value;
        fetchPost(GET_SKUNAME_BY_SKUUNIQUE, {
            data: {
                skuCode,
            },
        }, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        skuName: result.data.cnName,
                    });
                }
            });
    };

    render() {
        const {
            visible,
        } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="创建移位"
                width={500}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                maskClosable={false}
            >
                <div className="margin-ms-left margin-ms-right">
                    <FormItem
                        {...formItemLayout}
                        label="移动类型:"
                    >
                        {getFieldDecorator('shiftRange', {})(
                            <CSelect
                                url={MOVE_PLACE_TYPE}
                                placeholder="请选择"
                            />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="储位:"
                    >
                        {getFieldDecorator('bin', {
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
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="SKU:"
                    >
                        {getFieldDecorator('sku', {})(
                            <Input
                                placeholder="输入"
                                onChange={this.onSkuChange}
                            />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="中文名称:"
                    >
                        <span style={{ fontSize: 12, display: '-webkit-box' }}>{this.state.skuName}</span>
                    </FormItem>
                </div>
            </Modal>
        );
    }
}

export default Form.create()(CreateShiftModal);
