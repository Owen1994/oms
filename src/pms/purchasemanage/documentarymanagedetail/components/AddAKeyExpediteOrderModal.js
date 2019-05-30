import React from 'react';
import { Modal } from 'antd';

export default class AddAKeyExpediteOrderModal extends React.Component {
    render() {
        const {
            visible,
            onTaskSubmit,
            onTaskCancel,
            ExpeditingTemplateData,
        } = this.props;
        return (
            <Modal
                title="催货内容"
                width={800}
                visible={visible}
                onCancel={onTaskCancel}
                onOk={() => { onTaskSubmit(); }}
                cancelText="关闭"
                okText="复制并关闭"
            >
                <pre>{ExpeditingTemplateData}</pre>
            </Modal>
        );
    }
}
