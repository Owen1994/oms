import React, { Component } from 'react';
import { Modal, message } from 'antd';

import './index.css';
import { path } from "../../configs";
import { post } from "../../../util/axios";

class App extends Component {
    state = {
        visible: false,
    };

    componentDidMount(){
        this.setState({
            visible: this.props.visible
        })
    }


    // 确定提交
    handleOk = () => {
        const { handleOk } = this.props;
        handleOk(() => {
            message.success('操作成功.');
            this.setState({
                visible: false
            })
        })
    };

    // 取消弹窗
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { component, title, handleOk, handleCancel, width, footer } = this.props;
        const { visible } = this.state
        return (
            <Modal
                maskClosable={ false }
                title={ title }
                visible={ visible }
                onOk={ this.handleOk }
                onCancel={ this.handleCancel }
                width={width}
                footer={footer}
                destroyOnClose={true}
            >
                { component }
            </Modal>
        );
    }
}

export default App;