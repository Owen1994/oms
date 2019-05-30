/**
 *作者: 任贸华
 *功能描述: 暂未用到
 *参数说明:
 *时间: 2018/4/16 11:15
 */
import React, {Component} from 'react'
import {Modal, Button} from 'antd';

class Modalmodel extends React.Component {
    render() {
        return (
            <div>
                <Modal {...this.props}>
                    <div style={{textAlign:'left'}}>{this.props.ModalContent}</div>
                </Modal>
            </div>
        );
    }
}
export default Modalmodel
