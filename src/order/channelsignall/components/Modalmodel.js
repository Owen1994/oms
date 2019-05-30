/**
 *作者: 唐峰
 *功能描述: 点击删除按钮弹窗组件
 *参数说明:
 *时间: 2018/4/17 11:08
 */
import React, {Component} from 'react'
import {Modal, Button} from 'antd';
import {baseInfoForm} from '../actions'

class Modalmodel extends React.Component {
    render() {
        return (
            <div>
                <Modal {...this.props}>
                    <div className={'textalign'}>{this.props.ModalText}</div>
                </Modal>
            </div>
        );
    }
}
export default Modalmodel
