import React from 'react';
import {
    Pagination,
    Spin,
    Table,
    Button,
    Tooltip,
} from 'antd';
import Functions from '../../../../components/functions';


/**
 * 我收到的消息列表
 */
export default class TableList extends React.Component {

    /**
     * 列表头标签
     * @type {[]}
     */
    columns = [
        {
            title: '异常编码',
            dataIndex: 'abnormalCoding',
            width: 120,
            render: (text, record) => {
                let promptView = null;

                if (record.conversionGiftPrompt) {
                    if (record.conversionGiftPrompt.length > 0) {
                        promptView = (
                            <p className="common_table_prompt">
                                {record.conversionGiftPrompt}
                            </p>
                        )
                    }
                }

                return (
                    <div>
                        <p>
                            {text}
                        </p>
                        {promptView}
                    </div>
                );
            },
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            width: 120,
            render: (text, record) => (
                <div style={{textAlign: 'left'}}>
                    <p>
                        {record.sku}
                    </p>
                    <p style={{wordWrap: 'break-word', wordBreak: 'break-all', overflow: 'hidden'}}>
                        {record.skuName}
                    </p>
                </div>
            ),
        },
        {
            title: '采购',
            dataIndex: 'purchase',
            width: 200,
            render: (text, record) => (
                <div className="buliang_purchase_div">
                    <p>
                        <span className="info-span">采购单号:</span>
                        <span>{record.poNumber}</span>
                    </p>
                    <p>
                        <span className="info-span">供应商:</span>
                        <span>{record.supplier}</span>
                    </p>
                    <p>
                        <span className="info-span">采购员:</span>
                        <span>{record.buyer}</span>
                    </p>
                </div>
            ),
        },
        {
            title: '仓库',
            dataIndex: 'warehouse',
            width: 210,
            render: (text, record) => (
                <div className="buliang_purchase_div">
                    <p>
                        <span className="info-span">收货仓库:</span>
                        <span>{record.receivingWarehouse}</span>
                    </p>
                    <p>
                        <span className="info-span">质检单号:</span>
                        <span>{record.qualityNumber}</span>
                    </p>
                    <p>
                        <span className="info-span">质检时间:</span>
                        <span>{record.qualityTime}</span>
                    </p>
                    <p>
                        <span className="info-span">质检人员:</span>
                        <span>{record.qualityInspector}</span>
                    </p>
                </div>
            ),
        },
        {
            title: '数量',
            dataIndex: 'number',
            width: 200,
            render: (text, record) => (
                <div className="buliang_number_div">
                    <p>
                        <span className="info-span">订货数量:</span>
                        <span>{record.orderNumber}</span>
                    </p>
                    <p>
                        <span className="info-span">收货数量:</span>
                        <span>{record.receivingNumber}</span>
                    </p>
                    <p>
                        <span className="info-span">合格量:</span>
                        <span>{record.qualifiedNumber}</span>
                    </p>
                    <p>
                        <span className="info-span">不合格:</span>
                        <span>{record.noQualified}</span>
                    </p>
                    <p>
                        <span className="info-span">多收合格:</span>
                        <span>{record.moreQualified}</span>
                    </p>
                    <p>
                        <span className="info-span">多收不合格:</span>
                        <span>{record.moreNoQualified}</span>
                    </p>
                </div>
            ),
        },
        {
            title: '处理数量',
            dataIndex: 'handleNumber',
            width: 150,
            render: (text, record) => {

                if (record.handleTypeCode === 'QUALIFIED_EXCEED') {
                    // 处理类型为：多收合格
                    if (record.moreQualified === 0 || record.moreQualified.length === 0) {
                        return (
                            null
                        );
                    } else {
                        return (
                            <div>{`多收合格:${record.moreQualified}`}</div>
                        )
                    }

                } else if (record.handleTypeCode === 'UNQUALIFIED') {
                    // 处理类型为：不良品
                    if (record.abnormalNonconformity === 0|| record.abnormalNonconformity.length === 0) {
                        return (
                            null
                        );
                    } else {
                        return (
                            <div>{`异常不合格:${record.abnormalNonconformity}`}</div>
                        )
                    }
                } else {
                    return (
                        null
                    );
                }
            },
        },
        {
            title: '不良品来源',
            dataIndex: 'source',
            width: 50,
        },
        {
            title: '处理类型',
            dataIndex: 'handleType',
            width: 50,
        },
        {
            title: '处理状态',
            dataIndex: 'handleStateValue',
            width: 50,
        },
        {
            title: '图片',
            dataIndex: 'image',
            width: 80,
            render: (text, record) => (
                record.warehouseImages.length === 0 ? <a>无图片</a> :
                <img src={record.warehouseImages[0]} width="100px" height="100px" alt="图片"  onClick={() => this.props.carouselModal(record)}/>
            ),
        },
        {
            title: '备注',
            dataIndex: 'note',
            width: 70,
            render: (text, record) => {
                return (
                    <Tooltip title={record.note}>
                        <div className="one-ellipsis" style={{width: "100px"}}>{record.note}</div>
                    </Tooltip>
                )
            }
        },
        {
            title: '处理人',
            dataIndex: 'handlePeople',
            width: 150,
            render: (text, record) => (
                <div className="buliang_purchase_div">
                    <p>
                        <span className="info-span">处理人:</span>
                        <span>{record.handlePeople}</span>
                    </p>
                    <p>
                        <span className="info-span">处理时间:</span>
                        <span>{record.handleTime}</span>
                    </p>
                </div>
            ),
        },
        {
            title: '操作',
            dataIndex: 'options',
            width: 80,
            render: (text, record) => {

                let optionsView = null;
                if (record.handleStateCode === 1) {
                    optionsView = (
                        <div>
                            <Functions
                                {...this.props}
                                functionkey="010-000005-000001-002"
                            >
                                <a
                                    onClick={() => this.props.showHandleDPModal(true, record)}
                                >
                                    进入处理
                                </a>
                            </Functions>
                        </div>
                    )
                } else if (record.handleStateCode === 10) {
                    optionsView = (
                        <div>
                            <Functions
                                {...this.props}
                                functionkey="010-000005-000001-004"
                            >
                                <a
                                    onClick={() => this.props.showModifyDPModal(true, record)}
                                >
                                    修改决策
                                </a>
                            </Functions>
                        </div>
                    )
                } else {
                    optionsView = (
                        <div>
                            <a
                                onClick={() => this.props.showHandleDetailModal(true, record)}
                            >
                                查看详情
                            </a>
                        </div>
                    )
                }

                return optionsView;
            },
        }];

    // state = {
    //     selectedRowKeys: [],
    //     selectedRows: [],
    // };

    render() {
        const {
            list,
            total,
        } = this.props.mainDataList;

        const {
            pageNumber,
            pageSize,
            loadData,
            handleExport,
        } = this.props;


        /**
         * table选中回调
         */
        // const rowSelection = {
        //     selectedRowKeys: this.state.selectedRowKeys,
        //     selectedRows: this.state.selectedRows,
        //     onChange: (selectedRowKeys, selectedRows) => {
        //         this.setState({
        //             selectedRowKeys,
        //             selectedRows,
        //         });
        //     },
        // };


        return (
            <div className="yks-erp-table">
                <div className="overflow-hidden">
                    <div className="pull-right">
                            <Functions
                                {...this.props}
                                functionkey="010-000005-000001-003"
                            >
                                <Button onClick={handleExport} icon="upload">
                                    数据导出
                                </Button>
                            </Functions>
                        </div>
                </div>
                <div className="margin-ss-top">
                    <Spin spinning={this.props.isLoading} delay={500} tip="Loading...">
                        <Table
                            rowKey={record => record.key}
                            // rowSelection={rowSelection}
                            columns={this.columns}
                            dataSource={list}
                            size="small"
                            pagination={false}
                            bordered
                        />
                        <Pagination
                            showTotal={() => `共 ${total} 条`}
                            current={pageNumber}
                            showQuickJumper={{ goButton: true }}
                            total={total}
                            pageSize={pageSize}
                            onChange={loadData}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}
