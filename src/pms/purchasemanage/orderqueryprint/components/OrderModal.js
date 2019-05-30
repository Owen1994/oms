import React from 'react';
import { Modal } from 'antd';
import OrderView from './OrderView';
import { randNum } from '@/util/baseTool';

export default class OrderModal extends React.Component {

    render() {
        const {
            visible, onOK, onCancel, arrayOrderPrintInfo,
        } = this.props;

        return (
            <Modal
                title="打印确认页"
                width={750}
                visible={visible}
                onOk={onOK}
                onCancel={onCancel}
                okText="打印"
                destroyOnClose
            >
                <div className="print_modal_view">
                    {
                        arrayOrderPrintInfo.map((t) => {
                            return (
                                <div key={randNum()}>
                                    <OrderView
                                        isShowButton={false}
                                        info={t.info}
                                        skuList={t.skuList}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </Modal>
        );
    }
}
