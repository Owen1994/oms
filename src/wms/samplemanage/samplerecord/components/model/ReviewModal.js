import React from 'react';
import {
    Input, Modal, Radio,
} from 'antd';
import { fetchPost } from '../../../../../util/fetch';
import { CHECK } from '../../constants/Api';

/**
 * 审批通过弹框
 */
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
export default class ReviewModal extends React.Component {
    state = {
        isPass: '1',
    };

    onCancel = () => {
        const cancel = this.props.cancel;
        if (cancel) {
            cancel();
        }
    };

    onOk = () => {
        const { reviewRemarks } = this.props.form.getFieldsValue();
        const params = {
            data: {
                type: this.state.isPass,
                remarks: reviewRemarks,
                key: this.props.ReviewKey,
            },
        };
        fetchPost(CHECK, params, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.onCancel();
                }
            });
    };

    onRadioChange = (e) => {
        this.setState({
            isPass: e.target.value || '1',
        });
    };

    render() {
        const {
            visible, remarks,
        } = this.props;
        const { getFieldDecorator } = this.props.form;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <Modal
                title="审核"
                width={430}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                maskClosable={false}
            >
                <RadioGroup size="small" defaultValue={this.state.isPass} onChange={this.onRadioChange}>
                    <Radio style={radioStyle} value="1">审核通过</Radio>
                    <Radio style={radioStyle} value="2">审核未通过</Radio>
                </RadioGroup>
                <div className="margin-ms-left margin-ms-right">
                    {getFieldDecorator('reviewRemarks', {
                        initialValue: remarks,
                    })(
                        <TextArea
                            autosize={{ minRows: 6, maxRows: 6 }}
                            placeholder="请填写审核未通过原因"
                        />,
                    )}
                </div>
            </Modal>
        );
    }
}
