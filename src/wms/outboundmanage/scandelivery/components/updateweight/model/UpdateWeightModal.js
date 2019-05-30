import React from 'react';
import {
    InputNumber, Modal, Form,
} from 'antd';
import { fetchPost } from '../../../../../../util/fetch';
import { UPDATE_BAG_WEIGHT } from '../../../constants/Api';

/**
 * 审批通过弹框
 */
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};

export default class MergeModal extends React.Component {
    state = {
        weight: 1,
    };

    onCancel = () => {
        const cancel = this.props.cancel;
        if (cancel) {
            cancel();
        }
    };

    onOk = () => {
        const params = {
            data: {
                key: this.props.updateKey,
                weight: this.state.weight,
            },
        };
        fetchPost(UPDATE_BAG_WEIGHT, params, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.onCancel();
                    const ok = this.props.ok;
                    if (ok) {
                        ok();
                    }
                }
            });
    };

    onChange = (value) => {
        this.setState({
            weight: value || 1,
        });
    };

    render() {
        const {
            visible,
        } = this.props;
        return (
            <Modal
                title="更新包裹重量"
                width={430}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                maskClosable={false}
            >
                <div className="margin-ms-left margin-ms-right">
                    <FormItem
                        {...formItemLayout}
                        label="新重量(g)："
                    >
                        <InputNumber
                            min={1}
                            value={this.state.weight}
                            placeholder="请输入"
                            onChange={this.onChange}
                        />
                    </FormItem>
                </div>
            </Modal>
        );
    }
}
