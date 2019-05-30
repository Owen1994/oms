import React, { Component } from 'react';
import { div, Modal } from 'antd';
import SimpleBarcode from '../SimpleBarcode';
import { printDiv } from '../../util';
import { printBarcodeStyle } from '../../util/printUtils';

/**
 * 简单打印条形码的modal
 */
class PrintSimpleBarcodeModal extends Component {
    onOk = () => {
        printDiv(this.printRef, 100, 50);
    };

    onCancel = () => {
        const { cancel } = this.props;
        if (cancel) {
            cancel();
        }
    };

    render() {
        const { title, visible, labels } = this.props;
        return (
            <Modal
                style={{ textAlign: '-webkit-center' }}
                width="150mm"
                visible={visible}
                title={title}
                onCancel={this.onCancel}
                onOk={this.onOk}
                okText="打印"
                maskClosable={false}
            >
                {visible ? (
                    <div
                        style={printBarcodeStyle.wmsPrintBarcodeContent}
                        ref={ref => this.printRef = ref}
                    >
                        {
                            labels && labels.map((item, index) => (
                                <div
                                    style={printBarcodeStyle.wmsPrintBarcodeRow}
                                    key={`${index.toString()}}`}
                                >
                                    {item ? (
                                        <div
                                            style={printBarcodeStyle.wmsPrintBarcode}
                                        >
                                            <SimpleBarcode
                                                height={80}
                                                width="2"
                                                label={item}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            ))
                        }
                    </div>
                ) : null}
            </Modal>
        );
    }
}

export default PrintSimpleBarcodeModal;
