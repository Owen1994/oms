import React from 'react';
import {
    Modal,
} from 'antd';

class ContentModal extends React.PureComponent {
    state = {
        content: '',
    }

    componentWillReceiveProps(next) {
        const { getSendDetialAsync, id } = next;
        if (next.visible && !this.props.visible && id) {
            getSendDetialAsync({ key: id })
                .then((content) => {
                    if (content) {
                        this.setState({
                            content,
                        });
                    }
                });
        }
    }

    handleCancel = () => {
        const {
            handleCancel,
        } = this.props;
        if (handleCancel) {
            this.setState({
                content: '',
            });
            handleCancel();
        }
    }

    render() {
        let { content } = this.state;
        content = content || '暂无数据';
        const {
            visible,
        } = this.props;
        return (
            <Modal
                visible={visible}
                title="发送内容详情"
                destroyOnClose
                maskClosable={false}
                width={700}
                footer={null}
                onCancel={this.handleCancel}
            >
                <div style={{ minHeight: 300 }}>
                    {
                        content
                    }
                </div>
            </Modal>
        );
    }
}

export default ContentModal;
