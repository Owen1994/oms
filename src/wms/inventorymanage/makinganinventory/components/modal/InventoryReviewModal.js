import React from 'react';
import {
    Input, Modal, Radio,
} from 'antd';

/**
 * 审批通过弹框
 */
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
export default class CreatePlanModal extends React.Component {
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
        this.onCancel();
    };

    onRadioChange = (e) => {
        this.state.setState({
            isPass: e.target.value || '1',
        });
    };

    render() {
        const {
            visible,
        } = this.props;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <Modal
                title="盘点审核"
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
                    <TextArea
                        autosize={{ minRows: 6, maxRows: 6 }}
                        placeholder="请填写审核未通过原因"
                    />
                </div>
            </Modal>
        );
    }
}
