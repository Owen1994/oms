/**
 *作者: 唐峰
 *功能描述: 点击删除按钮时弹窗组件
 *参数说明:
 *时间: 2018/4/4 11:12
 */
import React, {Component} from 'react'
import {Modal,} from 'antd';
import '../css/css.css'


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
