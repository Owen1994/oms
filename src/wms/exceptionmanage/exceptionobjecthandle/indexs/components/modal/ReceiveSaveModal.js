import React from 'react';
import {
    Form,
    Input, Modal, Table,
} from 'antd';
import { fetchPost } from '../../../../../../util/fetch';
import { SPECIAL_CASE_RECEIVESAVE } from '../../constants/Api';

/**
 * 重新收货
 */
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
};

class ReceiveSaveModal extends React.Component {
    columns = [
        {
            title: '异常编码',
            dataIndex: 'errorcode',
        },
        {
            title: '补发采购单号',
            dataIndex: 'addPurchaseOrder',
            width: 120,
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            width: 60,
        },
        {
            title: '中文名称',
            dataIndex: 'skuName',
            width: 210,
        },
        {
            title: '异常数量',
            dataIndex: 'quantity',
            width: 100,
        },
    ];

    onCancel = () => {
        const cancel = this.props.cancel;
        if (cancel) {
            cancel();
        }
    };

    onOk = () => {
        const { receiveSaveModel } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {
                    sku, errorcode, childId, addPurchaseOrder, quantity,
                } = receiveSaveModel;
                const params = {
                    data: {
                        ...values,
                        sku,
                        noticeQuantity: quantity,
                        specialSn: errorcode,
                        threadId: childId,
                        arriveOrderSn: addPurchaseOrder,
                    },
                };
                fetchPost(SPECIAL_CASE_RECEIVESAVE, params, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.onCancel();
                            if (this.props.ok) {
                                this.props.ok();
                            }
                        }
                    });
            }
        });
    };


    render() {
        const {
            visible, receiveSaveModel,
        } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="重新收货"
                width={650}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                maskClosable={false}
            >
                <div>
                    <FormItem
                        {...formItemLayout}
                        label="卡板号"
                    >
                        {getFieldDecorator('cardBoardSn', {
                            rules: [{ required: true, message: '请扫描或输入卡板编号' }],
                        })(
                            <Input
                                placeholder="请扫描或输入卡板编号"
                            />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="异常编码"
                    >
                        <div>{receiveSaveModel.errorcode}</div>
                    </FormItem>
                    <div className="wms-ant-table">
                        <Table
                            bordered
                            columns={this.columns}
                            dataSource={[receiveSaveModel]}
                            pagination={false}
                            rowKey={record => record.key}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default Form.create()(ReceiveSaveModal);
