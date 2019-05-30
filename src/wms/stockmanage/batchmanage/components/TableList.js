import React, { Component } from 'react';
import {
    Button,
    Pagination, Spin, Table, Tooltip,
} from 'antd';
import CGallery from '../../../../components/cgallery';
import Tableitem from '../../../../components/Tableitem';
import UpLoadModal from './modal/UpLoadModal';
import { downlodFile, fetchPost } from '../../../../util/fetch';
import { EXPORT_DATA, UPDATE_IMAGES } from '../constants/Api';
import Functions from '../../../../components/functions';

const renderContent = (children, record) => ({
    children: children || '--',
    props: {
        rowSpan: record.isFirst ? record.groupSize : 0,
    },
});


class TableList extends Component {
    state = {
        imgs: undefined,
        showUpLoadModal: false,
        editKey: '', // 当前操作上传的条目id
    };

    columnsMap = [
        {
            type: '1',
            columns: [
                {
                    title: '序号',
                    dataIndex: 'key',
                    width: 50,
                    render: (text, record) => renderContent(
                        (this.props.pageNumber - 1) * this.props.pageData + (record.index + 1),
                        record,
                    ),
                },
                {
                    title: '仓库名称',
                    dataIndex: 'warehouse',
                    width: 90,
                    render: renderContent,
                },
                {
                    title: '批次号',
                    dataIndex: 'batchNumber',
                    width: 110,
                    render: renderContent,
                },
                {
                    title: '卡板号',
                    dataIndex: 'cardNumber',
                    width: 90,
                    render: renderContent,
                },
                {
                    title: '采购单号',
                    dataIndex: 'purchaseNumber',
                    width: 100,
                    render: renderContent,
                },
                {
                    title: '是否有送货单',
                    width: 120,
                    render: (text, record) => {
                        if (record.haveImages) {
                            return renderContent((
                                <div
                                    onClick={() => {
                                        this.setState({
                                            imgs: record.images,
                                        });
                                    }}
                                >
                                    <img
                                        className="group-img"
                                        src={record.images[0].src}
                                        alt=""
                                        width="40px"
                                        height="40px"
                                    />
                                </div>
                            ), record);
                        }
                        return renderContent((
                            record.noDeliveryDescription && record.noDeliveryDescription.length > 5
                                ? (
                                    <Tooltip
                                        title={record.noDeliveryDescription}
                                    >
                                        {record.noDeliveryDescription.substr(0, 5)}
                                        <a>{'>>'}</a>
                                    </Tooltip>
                                ) : <div>{record.noDeliveryDescription}</div>
                        ), record);
                    },
                },
                {
                    title: '产品信息',
                    width: 230,
                    render: (text, record) => (
                        <div>
                            <Tableitem
                                left={80}
                                right={80}
                                title="优先级"
                                content={record.priorityLevel ? record.priorityLevel.name : ''}
                            />
                            <Tableitem
                                left={80}
                                title="总箱数(箱)"
                                content={record.boxQuantity}
                            />
                            <Tableitem
                                left={80}
                                title="SKU"
                                content={record.sku}
                            />
                            <Tableitem
                                left={80}
                                title="中文名称"
                                content={record.cnName}
                            />
                        </div>
                    ),
                },
                {
                    title: '产品数量',
                    width: 150,
                    render: (text, record) => (
                        <div>
                            <Tableitem
                                left={88}
                                right={44}
                                title="采购数量"
                                content={record.purchaseQuantity}
                            />
                            <Tableitem
                                left={88}
                                right={44}
                                title="登板数量"
                                content={record.arrivalRegisterQuantity}
                            />
                            <Tableitem
                                left={88}
                                right={44}
                                title="实际收货数量"
                                content={record.arrivalActualQuantity}
                            />
                        </div>
                    ),
                },
                {
                    title: '合格数量',
                    width: 140,
                    render: (text, record) => (
                        <div>
                            <Tableitem
                                left={80}
                                right={40}
                                title="合格量"
                                content={record.qualifiedAmount}
                            />
                            <Tableitem
                                left={80}
                                right={40}
                                title="多数合格"
                                content={record.moreQualified}
                            />
                            <Tableitem
                                left={80}
                                right={40}
                                title="不合格量"
                                content={record.unqualifiedAmount}
                            />
                            <Tableitem
                                left={80}
                                right={40}
                                title="多数不合格"
                                content={record.moreUnqualified}
                            />
                        </div>
                    ),
                },
                {
                    title: '不合格原因',
                    width: 108,
                    dataIndex: 'reasonForFailure',
                    render: text => (<div>{text || '--'}</div>),
                },
                {
                    title: '备注',
                    width: 74,
                    dataIndex: 'remarks',
                    render: text => (<div>{text || '--'}</div>),
                },
                {
                    title: '操作',
                    width: 70,
                    render: (text, record) => renderContent(
                        <Functions
                            {...this.props}
                            functionkey="012-000002-000004-002"
                        >
                            <a onClick={() => {
                                this.showUploadModal(record);
                            }}
                            >
                                上传
                            </a>
                        </Functions>,
                        record,
                    ),
                },
            ],
        },
        {
            type: '2',
            columns: [
                {
                    title: '仓库名称',
                    dataIndex: 'warehouse',
                    width: 100,
                    render: renderContent,
                },
                {
                    title: '批次号',
                    dataIndex: 'batchNumber',
                    width: 100,
                    render: renderContent,
                },
                {
                    title: '采购单号',
                    dataIndex: 'purchaseNumber',
                    width: 100,
                    render: renderContent,
                },
                {
                    title: '箱唛号',
                    dataIndex: 'boxNumber',
                    width: 100,
                    render: renderContent,
                },
                {
                    title: 'SKU',
                    dataIndex: 'sku',
                    width: 100,
                },
                {
                    title: '中文名称',
                    dataIndex: 'cnName',
                    width: 100,
                },
                {
                    title: '采购数量',
                    dataIndex: 'purchaseQuantity',
                    width: 100,
                },
                {
                    title: '实际收货数量',
                    dataIndex: 'actualReceiptQuantity',
                    width: 100,
                },
            ],
        },
        {
            type: '3',
            columns: [
                {
                    title: '序号',
                    dataIndex: 'key',
                    width: 50,
                    render: (text, record) => renderContent(
                        (this.props.pageNumber - 1) * this.props.pageData + (record.index + 1),
                        record,
                    ),
                },
                {
                    title: '仓库名称',
                    dataIndex: 'warehouse',
                    width: 100,
                    render: renderContent,
                },
                {
                    title: '批次号',
                    dataIndex: 'batchNumber',
                    width: 100,
                    render: renderContent,
                },
                {
                    title: '样品申请编码',
                    dataIndex: 'sampleNumber',
                    width: 100,
                    render: renderContent,
                },
                {
                    title: '申请SKU',
                    dataIndex: 'sku',
                    width: 100,
                },
                {
                    title: '中文名称',
                    dataIndex: 'cnName',
                    width: 100,
                },
                {
                    title: '申请数量',
                    dataIndex: 'requestNumber',
                    width: 100,
                },
            ],
        },
        {
            type: '4',
            columns: [
                {
                    title: '序号',
                    dataIndex: 'key',
                    width: 50,
                    render: (text, record) => renderContent(
                        (this.props.pageNumber - 1) * this.props.pageData + (record.index + 1),
                        record,
                    ),
                },
                {
                    title: '仓库名称',
                    dataIndex: 'warehouse',
                    width: 100,
                    render: renderContent,
                },
                {
                    title: '批次号',
                    dataIndex: 'batchNumber',
                    width: 100,
                    render: renderContent,
                },
                {
                    title: '订单号',
                    dataIndex: 'orderNumber',
                    width: 100,
                    render: renderContent,
                },
                {
                    title: '运单号',
                    dataIndex: 'trackingNumber',
                    width: 100,
                    render: renderContent,
                },
                {
                    title: '物流渠道',
                    dataIndex: 'logisticsChannel',
                    width: 100,
                    render: renderContent,
                },
                {
                    title: '产品信息',
                    width: 100,
                    render: (text, record) => (
                        <div>
                            <Tableitem
                                left={120}
                                right={80}
                                title="SKU"
                                content={record.sku}
                            />
                            <Tableitem
                                left={120}
                                title="中文名称"
                                content={record.cnName}
                            />
                            <Tableitem
                                left={120}
                                title="数量"
                                content={record.returnNumber}
                            />
                            <Tableitem
                                left={120}
                                title="实际收货数量"
                                content={record.actualReceiptQuantity}
                            />
                        </div>
                    ),
                },
                {
                    title: '质检结果',
                    width: 100,
                    render: (text, record) => (
                        <div>
                            <Tableitem
                                left={120}
                                right={80}
                                title="合格量"
                                content={record.qualifiedAmount}
                            />
                            <Tableitem
                                left={120}
                                title="不合格量"
                                content={record.unqualifiedAmount}
                            />
                            <Tableitem
                                left={120}
                                title="不合格原因"
                                content={record.reasonForFailure}
                            />
                        </div>
                    ),
                },
                {
                    title: '上架储位',
                    dataIndex: 'groundStorage',
                    width: 100,
                },
            ],
        },
    ];

    /**
     * 显示上传/编辑图片弹框图片
     * @param record
     */
    showUploadModal = (record) => {
        let uploadImgs = record.images.map(item => (item.src));
        if (uploadImgs.length <= 0) {
            uploadImgs = undefined;
        }
        this.props.form.setFieldsValue(({
            uploadImgs,
            uploadRemarks: record.noDeliveryDescription,
        }));
        this.setState({
            showUpLoadModal: true,
            editKey: record.key,
        });
    };

    /**
     * 上传图片/编辑请求
     */
    uploadImgs = () => {
        this.setState({
            showUpLoadModal: false,
        });

        const { uploadImgs, uploadRemarks } = this.props.form.getFieldsValue();
        fetchPost(UPDATE_IMAGES, {
            data: {
                key: this.state.editKey,
                images: uploadImgs,
                remarks: uploadRemarks,
            },
        }, 1).then((result) => {
            if (result.state === '000001') {
                this.props.onChangeListener();
            }
        });
    };

    /**
     *关闭预览图片
     */
    handlePreviewImgClose = () => {
        this.setState({
            imgs: undefined,
        });
    };

    // 销售退货-导出
    returnExport = () => {
        const values = this.props.form.getFieldsValue();
        const { warehouseCode, priority } = values;
        fetchPost(EXPORT_DATA, {
            data: {
                ...values,
                priority: priority[0] || '',
                warehouseCode: warehouseCode[0] || '',
            },
        }, 1).then((result) => {
            if (result.state === '000001') {
                downlodFile(result.data.fileUrl);
            }
        });
    };

    render() {
        const {
            partList = { total: 10, list: [] },
            loadingState,
            pageNumber,
            pageData,
            onChangeListener,
        } = this.props;
        const queryType = this.props.form.getFieldValue('queryType');

        const filterData = this.columnsMap.filter(t => t.type === queryType)[0];
        return (
            <div className="breadcrumb padding-sm margin-ss-top">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    {queryType === '4' ? ( // 销售退货导出
                        <Functions {...this.props} functionkey="012-000002-000004-003">
                            <div className="wms-addBtn">
                                <Button
                                    icon="upload"
                                    onClick={this.returnExport}
                                >
                                    导出
                                </Button>
                            </div>
                        </Functions>
                    ) : null}
                    <Table
                        bordered
                        size="small"
                        columns={filterData && filterData.columns}
                        dataSource={partList.list}
                        pagination={false}
                    />
                    <Pagination
                        showTotal={t => `共${t}条`}
                        pageSizeOptions={[`${pageData}`]}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        total={partList.total}
                        current={pageNumber}
                        pageSize={pageData}
                        onChange={onChangeListener}
                    />
                </Spin>
                <CGallery
                    handleClose={this.handlePreviewImgClose}
                    imgs={this.state.imgs}
                />
                <UpLoadModal
                    {...this.props}
                    visible={this.state.showUpLoadModal}
                    cancel={() => {
                        this.setState({
                            showUpLoadModal: false,
                        });
                    }}
                    ok={this.uploadImgs}
                />
            </div>
        );
    }
}

export default TableList;
