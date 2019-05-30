import React from 'react';
import { Modal } from 'antd';

export default class KeyWordModal extends React.Component {
    render() {
        const {visible, keyword} = this.props;
        return (
            <Modal
                destroyOnClose={true}
                title="关键字"
                width={800}
                visible={visible}
                onCancel={this.props.onCancel}
                footer={null}
            >
                <div>
                    {keyword}
                </div>
            </Modal>
        )
    }
}
