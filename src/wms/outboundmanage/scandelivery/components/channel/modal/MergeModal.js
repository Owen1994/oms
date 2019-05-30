import React from 'react';
import {
    Input, Modal, Form,
} from 'antd';
import { fetchPost } from '../../../../../../util/fetch';
import { CHANNEL_TABLE_MERGE } from '../../../constants/Api';

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
        name: '',
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
                name: this.state.name,
                keys: this.props.keys,
            },
        };
        fetchPost(CHANNEL_TABLE_MERGE, params, 1)
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

    onChange = (e) => {
        this.setState({
            name: e.target.value || '',
        });
    };

    render() {
        const {
            visible,
        } = this.props;
        return (
            <Modal
                title="物流渠道合并"
                width={430}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                maskClosable={false}
            >
                <div className="margin-ms-left margin-ms-right">
                    <FormItem
                        {...formItemLayout}
                        label="合并后渠道名称："
                    >
                        <Input
                            value={this.state.name}
                            placeholder="请输入"
                            onChange={this.onChange}
                        />
                    </FormItem>
                </div>
            </Modal>
        );
    }
}
