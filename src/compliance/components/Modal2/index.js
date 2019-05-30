import React, { Component } from 'react';
import { Modal } from 'antd';

import './index.css';

class App extends Component {
    render() {
        const { component, title, handleOk, visible, handleCancel, width, footer } = this.props;
        return (
            <Modal
                maskClosable={ false }
                title={ title }
                visible={ visible }
                onOk={ handleOk }
                onCancel={ handleCancel }
                width={width}
                footer={footer}
                destroyOnClose={true}
            >
                <div>
                    {component}
                </div>
            </Modal>
        );
    }
}

export default App;