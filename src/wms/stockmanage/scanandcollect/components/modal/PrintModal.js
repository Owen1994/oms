import React from 'react';
import {
    Modal,
} from 'antd';
import SimpleBarcode from '../../../../common/components/SimpleBarcode';
import '../../css/index.css';
import { printDiv } from '../../../../common/util';
import { printBoxLabelStyle } from '../../../../common/util/printUtils';

/**
 *  打印
 */

export default class PrintModal extends React.Component {
    onCancel = () => {
        const cancel = this.props.cancel;
        if (cancel) {
            cancel();
        }
    };

    onOk = () => {
        printDiv(this.boxRef);
        this.onCancel();
    };

    createItem = item => (
        <div key={item.sku} style={printBoxLabelStyle.wmsPrintBox}>
            <div style={{ ...printBoxLabelStyle.title, marginTop: '5.5mm' }}>
                <SimpleBarcode
                    label={item.boxNumber}
                    height="45"
                    width="1.5"
                    displayValue={false}
                    labelStyle={{ fontSize: '4mm', marginTop: '1mm' }}
                />
            </div>
            <div>
                <div style={printBoxLabelStyle.contentItem}>
                    <div style={printBoxLabelStyle.textLabel}>SKU:</div>
                    <div style={printBoxLabelStyle.textContent}>{item.sku}</div>
                </div>
                <div style={printBoxLabelStyle.contentItem}>
                    <div style={printBoxLabelStyle.textLabel}>中文名称:</div>
                    <div style={printBoxLabelStyle.textContent}>{item.cnName}</div>
                </div>
                <div style={printBoxLabelStyle.contentItem}>
                    <div style={printBoxLabelStyle.textLabel}>实际收货数量:</div>
                    <div style={printBoxLabelStyle.textContent}>{item.arrivalQuantity}</div>
                </div>
                <div style={printBoxLabelStyle.contentItem}>
                    <div style={printBoxLabelStyle.textLabel}>推荐储位:</div>
                    <div style={printBoxLabelStyle.textContent}>{item.storage}</div>
                </div>
                <div style={printBoxLabelStyle.contentItem}>
                    <div style={printBoxLabelStyle.textLabel}>采购员:</div>
                    <div style={printBoxLabelStyle.textContent}>{item.buyer}</div>
                </div>
                <div style={printBoxLabelStyle.contentItem}>
                    <div style={printBoxLabelStyle.textLabel}>质检员:</div>
                    <div style={printBoxLabelStyle.textContent}>{item.qualityInspecto}</div>
                </div>
                <div style={printBoxLabelStyle.contentItem}>
                    <div style={printBoxLabelStyle.textLabel}>操作日期:</div>
                    <div style={printBoxLabelStyle.textContent}>{item.time}</div>
                </div>
            </div>
        </div>
    );

    render() {
        const {
            visible,
        } = this.props;
        const {
            printData = {
                list: [],
            },
        } = this.props;
        return (
            <Modal
                title="箱唛打印"
                width={500}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                okText="打印"
                maskClosable={false}
            >
                <div className="wms-print-box-group">
                    <div className="print display-inline-block">
                        <div ref={ref => this.boxRef = ref}>
                            {printData.list.map(item => this.createItem(item))}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
