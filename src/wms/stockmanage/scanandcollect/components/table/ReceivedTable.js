import React, { Component } from 'react';
import {
    Button, Pagination, Spin, Table, message,
} from 'antd';
import { fetchPost } from '../../../../../util/fetch';
import { EDIT_ARRIVAL_QUANTITY } from '../../constants/Api';
import CGallery from '../../../../../components/cgallery';
import EditTableCell from '../../../../../common/components/editable/EditableCell';
import { windowPrintDiv } from '../../../../common/util';
import Functions from '../../../../../components/functions';
import {
    TYPE_1_PURCHASE_GOODS,
    TYPE_2_RECEIPT_PACKAGING,
    TYPE_3_SAMPLE_RECEIPT,
    TYPE_4_SALE_ORDER_BACK,
} from '../../constants';

/**
 * 已收货
 */
class ReceivedTable extends Component {
    state = {
        isPrint: false,
        imgs: undefined,
    };

    columnsMap = [
        {
            type: TYPE_1_PURCHASE_GOODS,
            columns: [
                {
                    title: '序号',
                    dataIndex: 'key',
                    render: (text, record, index) => (
                        (this.props.pageNumber - 1) * this.props.pageData + (index + 1)
                    ),
                },
                {
                    title: '供应商',
                    dataIndex: 'supplier',
                },
                {
                    title: '快递单号',
                    dataIndex: 'trackingNumber',
                },
                {
                    title: '采购单号',
                    dataIndex: 'purchaseOrderNo',
                },
                {
                    title: '是否有送货单',
                    render: (text, record) => {
                        if (record.images && record.images.length > 0) {
                            return (
                                <div
                                    onClick={() => this.setState({
                                        imgs: record.images,
                                    })}
                                >
                                    <img
                                        className="group-img"
                                        src={record.images[0].src}
                                        alt=""
                                        width="40px"
                                        height="32px"
                                    />
                                </div>
                            );
                        }
                        return <div>{record.remarks}</div>;
                    },
                },
                {
                    title: '优先级',
                    dataIndex: 'priorityName',
                },
                {
                    title: 'SKU',
                    dataIndex: 'sku',
                },
                {
                    title: '中文名称',
                    dataIndex: 'productName',
                },
                {
                    title: '采购数量',
                    dataIndex: 'purchaseQuantity',
                },
                {
                    title: '到货数量',
                    width: 100,
                    dataIndex: 'arrivalQuantity',
                    render: (text, record, index) => (
                        <EditTableCell
                            fkey="012-000002-000001-003"
                            {...this.props}
                            isEditable
                            type="number"
                            value={text}
                            name={record.key.toString()}
                            onChange={value => this.changArrivalQuantity(value, record.key, index)}
                        />
                    ),
                },
            ],
        },
        {
            type: TYPE_2_RECEIPT_PACKAGING,
            columns: [
                {
                    title: '供应商',
                    dataIndex: 'supplier',
                    width: 100,
                },
                {
                    title: '快递单号',
                    dataIndex: 'trackingNumber',
                    width: 100,
                },
                {
                    title: '采购单号',
                    dataIndex: 'purchaseOrderNo',
                    width: 100,
                },
                {
                    title: 'SKU',
                    dataIndex: 'sku',
                    width: 100,
                },
                {
                    title: '中文名称',
                    dataIndex: 'productName',
                    width: 100,
                },
                {
                    title: '采购数量',
                    dataIndex: 'purchaseQuantity',
                    width: 100,
                },
                {
                    title: '实际收货数量',
                    dataIndex: 'arrivalQuantity',
                    width: 100,
                },
            ],
        },
        {
            type: TYPE_3_SAMPLE_RECEIPT,
            columns: [
                {
                    title: '样品申请编号',
                    dataIndex: 'sampleNumber',
                    width: 100,
                },
                {
                    title: 'SKU',
                    dataIndex: 'sku',
                    width: 100,
                },
                {
                    title: '中文名称',
                    dataIndex: 'productName',
                    width: 100,
                },
                {
                    title: '申请数量',
                    dataIndex: 'requestNumber',
                    width: 100,
                },
                {
                    title: '实际收货数量',
                    dataIndex: 'arrivalQuantity',
                    width: 100,
                },
            ],
        },
        {
            type: TYPE_4_SALE_ORDER_BACK,
            columns: [
                {
                    title: '运单号',
                    dataIndex: 'trackingNumber',
                    width: 100,
                    render: text => text || '--',
                },
                {
                    title: '订单号',
                    dataIndex: 'purchaseOrderNo',
                    width: 100,
                },
                {
                    title: 'SKU',
                    dataIndex: 'sku',
                    width: 100,
                },
                {
                    title: '中文名称',
                    dataIndex: 'productName',
                    width: 100,
                },
                {
                    title: '数量',
                    dataIndex: 'receivingReturnNumber',
                    width: 100,
                },
                {
                    title: '收货员',
                    dataIndex: 'receivingClerk',
                    width: 100,
                },
                {
                    title: '收货日期',
                    dataIndex: 'receivingTime',
                    width: 100,
                },
            ],
        },
    ];

    componentDidUpdate() {
        if (this.state.isPrint) {
            windowPrintDiv(document.querySelector('.print'));
        }
    }

    handleImgClose = () => {
        this.setState({
            imgs: undefined,
        });
    };

    /**
     * 修改到货数量
     * @param value
     * @param key
     * @param index
     */
    changArrivalQuantity = (value, key, index) => {
        if (value <= 0) {
            message.error('输入的数量必须大于0');
            return false;
        }
        const receivedParts = this.props.receivedParts;
        receivedParts.list[index].arrivalQuantity = value;
        this.props.notifyReceivePartList(receivedParts);
        fetchPost(EDIT_ARRIVAL_QUANTITY, {
            data: {
                arrivalQuantity: value,
                key,
            },
        }, 1).then(() => {
            this.props.onChangeListener();
        });
    };

    /**
     * 打印,获取列表所有数据
     */
    printList = () => {
        this.props.form.validateFields(['cardNumber'], (err, values) => {
            if (!err) {
                const { cardNumber } = values;
                const pageData = this.props.receivedParts.total;
                this.props.queryPartList({
                    data: {
                        pageNumber: 1,
                        pageData,
                        cardNumber,
                    },
                }, (result) => {
                    if (result.state === '000001') {
                        this.setState({
                            isPrint: true,
                        });
                    }
                });
            }
        });
    };


    render() {
        const {
            receivedParts,
            receivedLoadingState,
            pageNumber,
            pageData,
            onChangeListener,
            receivingType,
        } = this.props;
        const columnsObj = this.columnsMap.filter(item => item.type === receivingType)[0];// 通过receivingType查找对应的columns.
        return (
            <div className="padding-sm ">
                <Spin spinning={receivedLoadingState} delay={500} tip="Loading...">
                    <div className="print">
                        <div style={{ textAlign: 'center' }}>
                            <Table
                                bordered
                                size="small"
                                columns={columnsObj && columnsObj.columns}
                                dataSource={receivedParts.list}
                                pagination={false}
                            />
                        </div>
                    </div>
                    <Pagination
                        showTotal={t => `共${t}条`}
                        pageSizeOptions={['50']}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        total={receivedParts.total}
                        current={pageNumber}
                        pageSize={pageData}
                        onChange={onChangeListener}
                    />
                    {receivingType === TYPE_1_PURCHASE_GOODS ? (
                        <Functions
                            {...this.props}
                            functionkey="012-000002-000001-004"
                        >
                            <div style={{ textAlign: 'right' }} className="border-top-1-ddd">
                                <Button
                                    onClick={this.printList}
                                    type="primary"
                                >
                                    打印
                                </Button>
                            </div>
                        </Functions>
                    ) : null}
                </Spin>
                <CGallery
                    handleClose={this.handleImgClose}
                    imgs={this.state.imgs}
                />
            </div>
        );
    }
}

export default ReceivedTable;
