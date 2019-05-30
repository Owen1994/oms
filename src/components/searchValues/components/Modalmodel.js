/**
 *作者: 任贸华
 *功能描述: 弹窗组件
 *参数说明:
 *时间: 2018/4/16 11:01
 */
import React, {Component} from 'react'
import {Modal, Button} from 'antd';

class Modalmodel extends React.Component {
    render() {
        return (
            <div>
                <Modal {...this.props}>
                    <div className={'tl'}>{this.props.ModalContent}</div>
                </Modal>
            </div>
        );
    }
}

export default Modalmodel
