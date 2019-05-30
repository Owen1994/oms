import React, { Component } from 'react';
import { div, Modal } from 'antd';
import SimpleBarcode from '../SimpleBarcode';
import { printDiv } from '../../util';

const printReturnLabelStyle = {
    content: {
        textAlign: 'center',
        width: '100mm',
        padding: '4mm',
        border: '#EAE9E9 solid 0.3mm',
    },
    title: {
        color: '#333333',
        fontSize: '5mm',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '3mm',
        paddingBottom: '3mm',
    },
    tableItem: {
        fontWeight: 'normal',
        padding: '1.5mm',
        border: '1px solid #e8e8e8',
    },
    tableThead: {
        width: '100%',
        background: '#F3F3F3',
    },
    table: {
        marginTop: '5mm',
        width: '100%',
    },
};

/**
 * 打印回库标签的modal
 */
class PrintReturnLabelModal extends Component {
    onOk = () => {
        printDiv(this.printRef);
    };

    onCancel = () => {
        const { cancel } = this.props;
        if (cancel) {
            cancel();
        }
    };

    render() {
        const { visible, printData } = this.props;
        return (
            <Modal
                width="150mm"
                visible={visible}
                title="打印回库标签"
                onCancel={this.onCancel}
                onOk={this.onOk}
                okText="打印"
                cancelText="取消"
                maskClosable={false}
            >
                <div style={{ textAlign: '-webkit-center' }}>
                    {visible ? (
                        <div
                            style={printReturnLabelStyle.content}
                            ref={ref => this.printRef = ref}
                        >
                            <div style={printReturnLabelStyle.title}>回库标签</div>
                            {printData.specialCaseSn ? (
                                <SimpleBarcode
                                    height={40}
                                    width="1.5"
                                    label={printData.specialCaseSn}
                                    displayValue={false}
                                    labelStyle={{ fontSize: '4mm', marginTop: '1mm' }}
                                />
                            ) : null}
                            <table style={printReturnLabelStyle.table}>
                                <thead style={printReturnLabelStyle.tableThead}>
                                    <tr>
                                        <th style={{ width: '20%', ...printReturnLabelStyle.tableItem }}>
                                            <div>SKU</div>
                                        </th>
                                        <th style={{ width: '40%', ...printReturnLabelStyle.tableItem }}>
                                            <div>中文名称</div>
                                        </th>
                                        <th style={{ width: '20%', ...printReturnLabelStyle.tableItem }}>
                                            <div>产品数量</div>
                                        </th>
                                        <th style={{ width: '20%', ...printReturnLabelStyle.tableItem }}>
                                            <div>推荐储位</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        printData.skuList.map((item, index) => (
                                            <tr key={index.toString()}>
                                                <td style={printReturnLabelStyle.tableItem}>
                                                    <div>{item.sku || '--'}</div>
                                                </td>
                                                <td style={printReturnLabelStyle.tableItem}>
                                                    <div>{item.name || '--'}</div>
                                                </td>
                                                <td style={printReturnLabelStyle.tableItem}>
                                                    <div>{item.quantity || '--'}</div>
                                                </td>
                                                <td style={printReturnLabelStyle.tableItem}>
                                                    <div>{item.placeCode || '--'}</div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                </div>
            </Modal>
        );
    }
}

export default PrintReturnLabelModal;
