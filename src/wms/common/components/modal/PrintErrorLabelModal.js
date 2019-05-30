import React, { Component } from 'react';
import {
    Modal,
} from 'antd';
import '../../css/index.css';
import { printDiv } from '../../util';
import { printErrorLabel } from '../../util/printUtils';


/**
 * 打印异常标签弹框
 * type:1.质检-多收合格,2.不良品
 */

class PrintErrorLabelModal extends Component {
    state = {
        infoList: [{ type: 1 }],
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.infoList && nextProps.infoList !== this.state.infoList) {
            this.setState({
                infoList: nextProps.infoList,
            });
        }
    }


    onOk = () => {
        printDiv(this.printRef, 100, 100, false);
        const { cancel } = this.props;
        if (cancel) {
            cancel();
        }
    };

    render() {
        const {
            visible, cancel,
        } = this.props;
        const { infoList } = this.state;
        return (
            <Modal
                width={500}
                title="打印异常标签"
                visible={visible}
                onOk={this.onOk}
                onCancel={cancel}
                okText="打印"
                maskClosable={false}
            >
                {visible ? (
                    <div ref={ref => this.printRef = ref} style={{ textAlign: '-webkit-center' }}>
                        {infoList ? infoList.map((item, index) => (
                            printErrorLabel(item, index)
                        )) : null}
                    </div>
                ) : null}
            </Modal>
        );
    }
}

export default PrintErrorLabelModal;
