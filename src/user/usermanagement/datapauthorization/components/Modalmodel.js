import React, { PureComponent } from 'react';
import { Modal } from 'antd';

class Modalmodel extends PureComponent {
    render() {
        return (
            <div>
                <Modal {...this.props}>
                    <div className={this.props.isAlign ? 'textalign' : ''}>{this.props.ModalText}</div>
                </Modal>
            </div>
        );
    }
}
export default Modalmodel;
