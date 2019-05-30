import React, { Component } from 'react';
import {
    Modal,
} from 'antd';
import { printDiv } from '../../../../../common/util';
import SimpleBarcode from '../../../../../common/components/SimpleBarcode';
import { print100x100LabelStyle } from '../../../../../common/util/printUtils';


/**
 * 打印集货袋标签弹框
 */

class CollectGoodsPrintModal extends Component {
    onOk = () => {
        printDiv(this.printRef, 100, 150);
        const { ok } = this.prop;
        if (ok) {
            ok();
        }
    };

    render() {
        const {
            visible, cancel, printData = {},
        } = this.props;
        const content = (
            <div style={{
                padding: '2.5mm',
                border: '#000 solid 0.5mm',
                height: '148mm',
                width: '98mm',
            }}
            >
                <div style={print100x100LabelStyle.title}>
                    <div style={{ fontSize: '5mm' }}>集货袋标签</div>
                    {
                        <SimpleBarcode
                            className="margin-ss-top"
                            height={60}
                            width={1.5}
                            label={printData.label}
                        />
                    }
                </div>
                <div>
                    <div style={print100x100LabelStyle.contentItem}>
                        <div style={print100x100LabelStyle.textLabel}>Cargo bag Number:</div>
                        <div style={print100x100LabelStyle.textContent}>{printData.label}</div>
                    </div>
                    <div style={print100x100LabelStyle.contentItem}>
                        <div style={print100x100LabelStyle.textLabel}>包裹总数:</div>
                        <div style={print100x100LabelStyle.textContent}>{printData.PackageNumber}</div>
                    </div>
                    <div style={print100x100LabelStyle.contentItem}>
                        <div style={print100x100LabelStyle.textLabel}>包裹净重(g):</div>
                        <div style={print100x100LabelStyle.textContent}>{printData.packageNetWeight}</div>
                    </div>
                    <div style={print100x100LabelStyle.contentItem}>
                        <div style={print100x100LabelStyle.textLabel}>包裹毛重(g):</div>
                        <div style={print100x100LabelStyle.textContent}>{printData.wrapWeight}</div>
                    </div>
                    <div style={print100x100LabelStyle.contentItem}>
                        <div style={print100x100LabelStyle.textLabel}>物流渠道(g):</div>
                        <div style={print100x100LabelStyle.textContent}>{printData.logisticsChannel}</div>
                    </div>
                    <div style={print100x100LabelStyle.contentItem}>
                        <div style={print100x100LabelStyle.textLabel}>仓库(g):</div>
                        <div style={print100x100LabelStyle.textContent}>{printData.warehouseName}</div>
                    </div>
                    <div style={print100x100LabelStyle.contentItem}>
                        <div style={print100x100LabelStyle.textLabel}>扫描员:</div>
                        <div style={print100x100LabelStyle.textContent}>{printData.scanner}</div>
                    </div>
                    <div style={print100x100LabelStyle.contentItem}>
                        <div style={print100x100LabelStyle.textLabel}>扫描日期:</div>
                        <div style={print100x100LabelStyle.textContent}>{printData.scanTime}</div>
                    </div>
                </div>
            </div>
        );
        return (
            <Modal
                title="打印集货袋标签"
                visible={visible}
                onOk={this.onOk}
                onCancel={cancel}
                okText="打印"
                maskClosable={false}
            >
                <div ref={ref => this.printRef = ref} style={{ textAlign: '-webkit-center' }}>
                    {content}
                </div>
            </Modal>
        );
    }
}

export default CollectGoodsPrintModal;
