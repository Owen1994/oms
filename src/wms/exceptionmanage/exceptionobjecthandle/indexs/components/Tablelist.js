import React from 'react';
import {
    Spin,
    Table,
    Pagination,
    Tooltip, Button,
} from 'antd';
import { downlodFile, fetchPost } from '../../../../../util/fetch';
import { EDIT_COURIER_NUMBER, EXPORT_DATA } from '../constants/Api';
import Functions from '../../../../../components/functions';
import EditableCell from '../../../../../common/components/editable/EditableCell';
import PrintSkuLabelModal from '../../../../common/components/modal/PrintSkuLabelModal';
import PrintBoxLabelModal from '../../../../common/components/modal/PrintBoxLabelModal';
import CGallery from '../../../../../components/cgallery';
import ReceiveSaveModal from './modal/ReceiveSaveModal';
import Tableitem from '../../../../../components/Tableitem';

// 二级级
const renderContent = (text, rowSpan = -1, colSpan = -1) => {
    const obj = {
        children: text,
        props: {},
    };
    if (rowSpan >= 0) {
        obj.props.rowSpan = rowSpan;
    }
    if (colSpan >= 0) {
        obj.props.colSpan = colSpan;
    }
    return obj;
};

export default class Tablelist extends React.Component {
    state = {
        showPrintSKU: false,
        showPrintBox: false,
        showReceiveSave: false,
        printSkuModel: {
            printSum: 0,
        },
        // printBoxKey: '',
        // childId: '',
        printBoxModel: {},
        receiveSaveModel: {},
        defaultSum: '',
        imgs: undefined,
    };

    columns = [
        {
            title: '序号',
            key: 'order',
            width: 50,
            render: (text, record) => {
                const pNum = this.props.pageNumber;
                const pData = this.props.pageData;
                return renderContent(
                    <div>
                        {pNum > 1 ? (pNum - 1) * pData + (record.index + 1) : record.index + 1}
                    </div>, record.groupSize,
                );
            },
        },
        {
            title: '仓库名称',
            dataIndex: 'warehouse',
            key: 'warehouse',
            width: 80,
            render: (text, record) => renderContent(text, record.groupSize),
        },
        {
            title: '异常单据',
            key: 'exceptionInfo',
            width: 200,
            render: (text, record) => renderContent((
                <div className="wms-tablelist-info">
                    <p>
                        <span className="wms-tablelist-span3">异常编码：</span>
                        <span className="wms-tablelist-content">{record.errorcode}</span>
                    </p>
                    <p>
                        <span className="wms-tablelist-span3">所属仓库：</span>
                        <span className="wms-tablelist-content">{record.warehouse}</span>
                    </p>
                    <p>
                        <span className="wms-tablelist-span3">来源采购单：</span>
                        <span className="wms-tablelist-content">{record.purchaseOrderSource}</span>
                    </p>
                    {
                        record.overUnqualifiedNumber
                            ? <p style={{ color: 'red' }}>{`（含多收不良：${record.overUnqualifiedNumber}个）`}</p> : null
                    }
                </div>
            ), record.groupSize),
        },
        {
            title: '异常SKU信息',
            key: 'exceptionSku',
            width: 200,
            render: (text, record) => renderContent(
                <div className="wms-tablelist-info">
                    <p>
                        <span className="wms-tablelist-span ">SKU：</span>
                        <span className="wms-tablelist-content">{record.sku}</span>
                    </p>
                    <p>
                        <span className="wms-tablelist-span">中文名称：</span>
                        <span className="wms-tablelist-content2">{record.skuName}</span>
                    </p>
                    <p>
                        <span className="wms-tablelist-span">异常数量：</span>
                        <span>{record.errorNumber}</span>
                    </p>
                    <Tableitem
                        left={65}
                        right={80}
                        title="异常原因"
                        content={record.reason}
                    />
                    <p>
                        <span className="wms-tablelist-span">状态：</span>
                        <span className="wms-tablelist-content">{record.state}</span>
                    </p>
                    <p>
                        <span className="wms-tablelist-span">类型：</span>
                        <span className="wms-tablelist-content">{record.type}</span>
                    </p>
                </div>, record.groupSize,
            ),
        },
        {
            title: '关联操作记录',
            key: 'operationRecord',
            width: 200,
            render: (text, record) => renderContent(
                <div>
                    <Tableitem
                        left={90}
                        right={80}
                        title="对图人"
                        content={record.contrastUsername}
                    />
                    <Tableitem
                        left={90}
                        right={80}
                        title="异常生成人"
                        content={record.sponsor}
                    />
                    <Tableitem
                        left={90}
                        right={80}
                        title="异常生成时间"
                        content={record.startTime}
                    />
                    <Tableitem
                        left={90}
                        right={80}
                        title="决策人"
                        content={record.decisionMaker}
                    />
                    <Tableitem
                        left={90}
                        right={80}
                        title="决策时间"
                        content={record.decisionTime}
                    />
                </div>, record.groupSize,
            ),
        },
        {
            title: '产品图片',
            width: 50,
            render: (text, record) => {
                if (!record.imageList || record.imageList.length <= 0) {
                    return renderContent(<div>--</div>, record);
                }
                return renderContent(
                    <div
                        onClick={() => {
                            this.setState({
                                imgs: record.imageList,
                            });
                        }}
                    >
                        <img
                            className="group-img"
                            src={record.imageList[0].src}
                            alt=""
                            width="50px"
                            height="50px"
                        />
                    </div>, record.groupSize,
                );
            },
        },
        {
            title: '实物处理',
            key: 'objectHandle',
            children: [
                {
                    title: '总方案',
                    colSpan: 0,
                    dataIndex: 'parentPlan',
                    render: (text, record) => renderContent(text && text.name, record.childSize, record.isSingle ? 0 : 1),
                },
                {
                    title: '方案',
                    width: 100,
                    colSpan: 2,
                    dataIndex: 'plan',
                    render: (text, v) => {
                        const titleEle = this.getTooltip(v);
                        const divEle = (
                            <div>
                                {
                                    text.code === 'ORDER' ? `${text.name}${v.addPurchaseOrder}` : text.name
                                }
                            </div>
                        );
                        const tooltipEle = (
                            <Tooltip title={titleEle}>
                                {divEle}
                            </Tooltip>
                        );
                        return renderContent(text.code !== 'ORDER' ? tooltipEle : divEle, -1, v.isSingle ? 2 : 1);
                    },
                },
                {
                    title: '数量',
                    width: 40,
                    dataIndex: 'quantity',
                    render: text => (
                        <div>
                            {text}
                        </div>
                    ),
                },
                {
                    title: '进度',
                    dataIndex: 'progressStatus',
                    width: 60,
                    render: (text, v) => {
                        const titleEle = this.getTooltip(v);
                        return renderContent(
                            <div>
                                <Tooltip title={titleEle}>
                                    {text.name}
                                </Tooltip>
                            </div>,
                        );
                    },
                }],
        },

        {
            title: '操作',
            key: 'options',
            width: 130,
            render: (text, record) => {
                switch (record.plan.code) {
                case 1:
                case 'GIFT':
                    return (
                        <div>
                            <Functions {...this.props} functionkey="012-000003-000001-002">
                                <a
                                    style={{ display: 'inline-block', marginRight: 10 }}
                                    onClick={() => this.handleClickPrint(record, 'sku')}
                                >
                                        打印SKU
                                </a>
                            </Functions>
                            <Functions {...this.props} functionkey="012-000003-000001-003">
                                <a onClick={() => this.handleClickPrint(record, 'box')}>打印箱唛</a>
                            </Functions>
                        </div>
                    );
                case 'BACK':
                    return (
                        <div>
                            <Functions {...this.props} functionkey="012-000003-000001-004">
                                <EditableCell
                                    {...this.props}
                                    type="string"
                                    name="trackingNumber"
                                    className="pull-left"
                                    value={record.trackingNumber}
                                    onChange={value => this.handleCellChange(value, record.childId)}
                                    fkey="012-000003-000001-004"
                                />
                            </Functions>
                        </div>
                    );
                case 'ORDER':// 原单入库
                case 'ORIGINAL': // 补发采购单
                    return record.progressStatus.code !== 10 ? (
                        <div>
                            <Functions {...this.props} functionkey="012-000003-000001-005">
                                <a
                                    onClick={() => this.showReceiveSave(record)}
                                >
                                        重新收货
                                </a>
                            </Functions>
                        </div>
                    ) : null;
                default:
                    return <div />;
                }
            },
        },

    ]
    ;

    componentWillUnmount() {
        // 离开页面时清除列表数据
        this.props.clearExceptionList();
    }

    getTooltip = (v) => {
        const ifShowTooltip = v.badGoodsExporter || v.badGoodsDeliveryTime || v.badGoodsImporter || v.badGoodsStorageTime || v.stockShelf || v.inventoryTme || v.returnInfo;
        const title = ifShowTooltip ? (
            <div>
                {v.badGoodsExporter ? <p><span>不良品出库人：{v.badGoodsExporter}</span></p> : null}
                {v.badGoodsDeliveryTime
                    ? <p><span>不良品出库时间：{v.badGoodsDeliveryTime}</span></p> : null}
                {v.badGoodsImporter ? <p><span>不良品入库人：{v.badGoodsImporter}</span></p> : null}
                {v.badGoodsStorageTime
                    ? <p><span>不良品入库时间：{v.badGoodsStorageTime}</span></p> : null}
                {v.stockShelf ? <p><span>库存上架人：{v.stockShelf}</span></p> : null}
                {v.inventoryTme ? <p><span>库存上架时间：{v.inventoryTme}</span></p> : null}
                {v.returnInfo ? <p><span>供应商信息：{v.returnInfo}</span></p> : null}
            </div>
        ) : null;
        return title;
    };

    // 输入快递单号
    handleCellChange = (value, childId) => {
        const paramsObj = {
            key: childId,
            trackingNumber: value,
        };
        fetchPost(EDIT_COURIER_NUMBER, { data: paramsObj }, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.props.handleSubmit();
                }
            });
    };

    // 点击打印按钮
    handleClickPrint = (record, type) => {
        if (type === 'sku') {
            this.setState({
                showPrintSKU: true,
                printSkuModel: {
                    from: 'SN',
                    key: record.childId,
                    number: record.errorcode,
                    sku: record.sku,
                    printSum: record.quantity,
                },
            });
        } else if (type === 'box') {
            this.setState({
                printBoxModel: {
                    from: 20,
                    key: record.childId,
                },
                defaultSum: record.quantity,
                showPrintBox: true,
            });
        }
    };

    showReceiveSave = (record) => {
        this.setState({
            receiveSaveModel: record,
            showReceiveSave: true,
        });
    };

    errorExport = () => {
        const values = this.props.form.getFieldsValue();
        fetchPost(EXPORT_DATA, {
            data: {
                ...values,
            },
        }, 1).then((result) => {
            if (result.state === '000001') {
                downlodFile(result.data.fileUrl);
            }
        });
    };

    render() {
        const {
            partList,
            pageNumber,
            pageData,
            handleSubmit,
            loadingState,
        } = this.props;
        const total = partList.total;
        return (
            <div className="wms-tablelist breadcrumb">
                <div className="wms-addBtn">
                    <Functions {...this.props} functionkey="012-000003-000001-006">
                        <Button
                            icon="upload"
                            onClick={this.errorExport}
                        >
                            导出
                        </Button>
                    </Functions>
                </div>
                <div className="wms-table">
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            columns={this.columns}
                            dataSource={partList.list}
                            pagination={false}
                            rowKey={record => record.dataIndex}
                        />
                    </Spin>
                </div>
                <div className="pagination">
                    <Pagination
                        className="pull-right"
                        showTotal={total2 => `共 ${total2} 条`}
                        showSizeChanger // 是否可以改变 pageSize
                        current={pageNumber}
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={total} // 数据总数
                        pageSize={pageData} // 每页条数
                        onChange={handleSubmit} // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={handleSubmit} // pageSize 变化的回调
                        // size="small"
                        pageSizeOptions={['10', '30', '50', '100']}
                    />
                </div>
                <PrintSkuLabelModal
                    {...this.props}
                    visible={this.state.showPrintSKU}
                    cancel={() => {
                        this.setState({
                            showPrintSKU: false,
                        });
                    }}
                    params={this.state.printSkuModel}
                    printSum={this.state.printSkuModel.printSum}
                />
                <PrintBoxLabelModal
                    {...this.props}
                    visible={this.state.showPrintBox}
                    cancel={() => {
                        this.setState({
                            showPrintBox: false,
                        });
                    }}
                    params={this.state.printBoxModel}
                    defaultSum={this.state.defaultSum}
                />
                <ReceiveSaveModal
                    visible={this.state.showReceiveSave}
                    cancel={() => {
                        this.setState({
                            showReceiveSave: false,
                        });
                    }}
                    ok={() => handleSubmit(pageNumber, pageData)}
                    receiveSaveModel={this.state.receiveSaveModel}
                />
                <CGallery
                    handleClose={() => {
                        this.setState({
                            imgs: undefined,
                        });
                    }}
                    imgs={this.state.imgs}
                />
            </div>
        );
    }
}
