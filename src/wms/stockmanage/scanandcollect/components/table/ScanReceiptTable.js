import React, { Component } from 'react';
import {
    Button,
    Form, Input, Spin, Table, message,
} from 'antd';
import PopConfirm from '../../../../../common/components/confirm';
import { fetchPost } from '../../../../../util/fetch';
import { CONFIRM_RECEIPT } from '../../constants/Api';
import { UPLOAD_URL } from '../../../../../constants';
import PhotoUpload from '../../../../../compliance/common/components/PhotoUpload';
import { getUrlParams } from '../../../../../util/baseTool';
import EditTableCell from '../../../../../common/components/editable/EditableCell';
import Functions from '../../../../../components/functions';
import {
    TYPE_1_PURCHASE_GOODS,
    TYPE_2_RECEIPT_PACKAGING,
    TYPE_3_SAMPLE_RECEIPT,
    TYPE_4_SALE_ORDER_BACK,
} from '../../constants';
import PrintModal from '../modal/PrintModal';


const FormItem = Form.Item;
const TextArea = Input.TextArea;


/**
 * 扫描采购单
 */
class ScanReceiptTable extends Component {
    state = {
        isSubmitLoading: false,
        showPrintModal: false,
        showPrintData: {
            list: [],
        },
    };

    columns = [
        {
            title: '样品申请编码',
            dataIndex: 'sampleNumber',
        },
        {
            title: '运单号',
            dataIndex: 'trackingNumber',
        },
        {
            title: '订单号',
            dataIndex: 'purchaseOrderNo',
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
            title: '申请数量',
            width: 100,
            dataIndex: 'requestNumber',
        },
        {
            title: '到货数量',
            width: 100,
            dataIndex: 'arrivalQuantity',
            render: (text, record, index) => (
                <EditTableCell
                    fkey="012-000002-000001-003"
                    {...this.props}
                    type="number"
                    isEditable
                    value={text}
                    name={record.key}
                    onChange={value => this.changArrivalQuantity(value, index)}
                />
            ),
        },
        {
            title: '实际收货数量',
            width: 100,
            dataIndex: 'arrivalQuantity',
            render: (text, record, index) => (
                <EditTableCell
                    fkey="012-000002-000001-003"
                    {...this.props}
                    type="number"
                    isEditable
                    value={text}
                    name={record.key}
                    onChange={value => this.changArrivalQuantity(value, index)}
                />
            ),
        },
        {
            title: '数量', // 销售退货数量
            width: 100,
            dataIndex: 'returnNumber',
        },
        {
            title: '操作',
            render: (text, record) => (
                <a onClick={() => {
                    PopConfirm('是否确认要删除？', '', () => {
                        this.deleteItem(record.key);
                    });
                }}
                >
                    删除
                </a>
            ),
        },
    ];

    /**
     * 删除/更新本地列表数据
     * @param key
     */
    deleteItem = (key) => {
        const { scanReceiptParts } = this.props;
        const newList = scanReceiptParts.list.filter(item => (item.key !== key));
        this.props.scanReceiptPartList({
            list: newList,
        });
    };

    /**
     * 修改到货数量
     * @param name
     * @param value
     * @param dataIndex
     */
    changArrivalQuantity = (value, dataIndex) => {
        if (value <= 0) {
            message.error('输入的数量必须大于0');
            return false;
        }
        const { scanReceiptParts } = this.props;
        scanReceiptParts.list[dataIndex].arrivalQuantity = value;
        this.props.scanReceiptPartList(scanReceiptParts);
    };

    /**
     * 确认收货
     */
    onSubmit = () => {
        const { receivingType } = this.props;
        const validateList = ['cardNumber', 'imageList', 'remarks'];
        if (receivingType === TYPE_4_SALE_ORDER_BACK) { // 销售退货
            validateList.push('reasonCode');
        }
        this.props.form.validateFields(validateList, (err, values) => {
            if (!err) {
                const list = this.props.scanReceiptParts.list;
                if (!list || list.length <= 0) {
                    message.error('无提交数据');
                    return;
                }
                const newList = list.map(item => ({// 精简列表数据
                    arrivalQuantity: item.arrivalQuantity,
                    key: item.key,
                    sku: item.sku,
                    trackingNumber: item.trackingNumber,
                }));
                const { cardNumber } = values;
                const isCheckPictureAdd = cardNumber === getUrlParams('').cardNumber ? '1' : '2';// 1.是对图过来的新增货物,2.否.

                this.setState({
                    isSubmitLoading: true,
                });
                fetchPost(CONFIRM_RECEIPT, {
                    data: {
                        list: newList, // 图片地址集合
                        ...values,
                        isCheckPictureAdd,
                        receivingType: this.props.receivingType,
                    },
                }, 1).then((result) => {
                    this.setState({
                        isSubmitLoading: false,
                    });
                    if (result.state !== '000001') {
                        return;
                    }
                    // 清空当前数组
                    this.props.scanReceiptPartList({
                        list: [],
                    });
                    this.props.form.setFieldsValue({
                        remarks: '',
                        imageList: undefined,
                    });

                    if (receivingType === TYPE_2_RECEIPT_PACKAGING) {
                        this.setState({
                            showPrintModal: true,
                            showPrintData: result.data,
                        });
                    }
                });
            }
        });
    };


    /**
     * 根据receivingType状态,显示需要的列.
     * @returns {*[]}
     */
    tableColFilter = () => {
        const type = this.props.receivingType;
        let titleList = [];
        if (type === TYPE_1_PURCHASE_GOODS) {
            titleList = ['供应商', '快递单号', '采购单号', '优先级', 'SKU', '中文名称', '采购数量', '到货数量', '操作'];
        }
        if (type === TYPE_2_RECEIPT_PACKAGING) {
            titleList = ['供应商', '快递单号', '采购单号', 'SKU', '中文名称', '采购数量', '实际收货数量', '操作'];
        }
        if (type === TYPE_3_SAMPLE_RECEIPT) {
            titleList = ['样品申请编码', 'SKU', '中文名称', '申请数量', '实际收货数量', '操作'];
        }
        if (type === TYPE_4_SALE_ORDER_BACK) {
            titleList = ['运单号', '订单号', 'SKU', '中文名称', '数量', '收货员', '收货日期'];
        }
        return this.columns.filter(item => titleList.indexOf(item.title) !== -1);
    };

    render() {
        const {
            scanReceiptParts,
            scanReceiptLoadingState,
            receivingType,
        } = this.props;
        const { getFieldDecorator } = this.props.form;

        const upload = (
            <div className="upload">
                <div style={{ display: 'flex' }}>
                    {getFieldDecorator('imageList')(
                        <PhotoUpload
                            action={UPLOAD_URL}
                            maxLength={5}
                            beforeUpload={(file) => {
                                const isRightType = file.type === 'image/jpeg' || file.type === 'image/jpg';
                                if (!isRightType) {
                                    message.error('文件格式必须为Jpg/Jpeg格式');
                                    return false;
                                }
                                const isSizeOk = file.size / 1024 / 1024 < 1;
                                if (!isSizeOk) {
                                    message.error('上传文件不能大于1M');
                                    return false;
                                }
                                return true;
                            }}
                        />,
                    )}
                </div>
                <div>注：最多只能上传5张图片，仅限JPG/JPEG,在800*800以内，单张大小不能超过1M</div>
                <div
                    className="margin-ms-top margin-ts-bottom"
                >
                    备注
                    <FormItem
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('remarks', {})(
                            <TextArea
                                placeholder="如无送货单，请在此写明原因"
                                autosize={{ minRows: 2, maxRows: 5 }}
                            />,
                        )}
                    </FormItem>
                </div>
            </div>
        );
        const columns = this.tableColFilter();
        return (
            <div className="padding-sm">
                <Spin spinning={scanReceiptLoadingState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        size="small"
                        columns={columns}
                        dataSource={scanReceiptParts.list}
                        pagination={false}
                        rowClassName={record => (record.priorityLevel && record.priorityLevel.code === '3' ? 'wms-tablelist-outofstock-row' : '')}
                    />
                </Spin>
                {receivingType === TYPE_1_PURCHASE_GOODS ? upload : null}
                <Functions
                    {...this.props}
                    functionkey="012-000002-000001-002"
                >
                    <Button
                        onClick={this.onSubmit}
                        type="primary"
                        loading={this.state.isSubmitLoading}
                        className="margin-sm-top margin-sm-bottom pull-right"
                    >
                        确认收货
                    </Button>
                </Functions>
                <PrintModal
                    cancel={() => {
                        this.setState({
                            showPrintModal: false,
                        });
                    }}
                    printData={this.state.showPrintData}
                    visible={this.state.showPrintModal}
                />
            </div>
        );
    }
}

export default ScanReceiptTable;
