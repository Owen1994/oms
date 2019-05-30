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
