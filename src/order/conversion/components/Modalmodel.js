/**
*作者: 任贸华
*功能描述: 弹窗组件
*参数说明:
*时间: 2018/4/16 11:41
*/
import React, {Component} from 'react'
import {Modal, Button} from 'antd';
import {baseInfoForm} from '../actions'

class Modalmodel extends React.Component {
    render() {
        return (
            <div>
                <Modal {...this.props}>
                    <div className={'tc'}>{this.props.ModalText}</div>
                </Modal>
            </div>
        );
    }
}
export default Modalmodel
