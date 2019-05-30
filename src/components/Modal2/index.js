import React, { Component } from 'react';
import { Modal } from 'antd';

class App extends Component {
    render() {
        const {maskClosable, component, title, handleOk, visible, handleCancel, width, footer, confirmLoading, className, okText } = this.props;
        return (
            <Modal
                maskClosable={ !!maskClosable }
                title={title}
                visible={ visible }
                okText={ okText }
                onOk={ handleOk }
                onCancel={ handleCancel }
                width={width}
                footer={footer}
                destroyOnClose={true}
                confirmLoading={confirmLoading}
                className={className}
            >
                <div>
                    {component}
                </div>
            </Modal>
        );
    }
}

export default App;