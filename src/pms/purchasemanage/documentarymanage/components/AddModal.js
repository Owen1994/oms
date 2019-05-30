import React from 'react';
import { Modal } from 'antd';

export default class AddModal extends React.Component {
    render() {
        const {
            visible,
            onTaskSubmit,
            onTaskCancel,
            expeditingTemplateData,
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
                <pre>{expeditingTemplateData}</pre>
            </Modal>
        );
    }
}
