/**
 * 作者: 陈林
 * 描述: 弹窗组件
 * 时间: 2018/4/18 0018 下午 8:43
 **/
import React, {Component} from 'react'
import {Modal, Button} from 'antd';
import {baseInfoForm} from '../actions'

class Modalmodel extends React.Component {
    render() {
        return (
            <div>
                <Modal {...this.props}>
                    <div className="text-center">{this.props.ModalText}</div>
                </Modal>
            </div>
        );
    }
}
export default Modalmodel
