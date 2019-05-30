import React from 'react';
import { Button, Table, Tooltip } from 'antd';
import Functions from '../../../../components/functions';

export default class TableList extends React.Component {
    columns = [
        {
            title: '采购单号',
            dataIndex: 'purchaseOrderNo',
            render: (text, record) => {
                const spanColor = record.iColorType === 0 ? (
                    <span className="documentary_detail_table_cell_span_blue">
                        {record.purchaseOrderNo}
                    </span>
                ) : (
                    <span className="documentary_detail_table_cell_span_red">
                        {record.purchaseOrderNo}
                    </span>
                );
                return spanColor;
            },
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            render: (text, record) => (
                <div>
                    <div className="documentary_detail_table_cell_div_text_left">
                        {record.sku}
                    </div>
                    <div className="documentary_detail_table_cell_div_text_left">
                        {record.skuName}
                    </div>
                </div>
            ),
        },
        {
            title: 'SKU状态',
            dataIndex: 'skuStatus',
        },
        {
            title: '数量',
            dataIndex: 'number',
            render: (text, record) => (
                <div className="documentary_detail_table_cell_number_div">
                    <div>
                        <span className="documentary_detail_table_cell_number_span">采购数量：</span>
                        <span>{record.purchaseQuantity}</span>
                    </div>
                    <div>
                        <span className="documentary_detail_table_cell_number_span">已送货数量：</span>
                        <span>{record.deliveryQuantity}</span>
                    </div>
                    <div>
                        <span className="documentary_detail_table_cell_number_span">在途数量：</span>
                        <span>{record.transitQuantity}</span>
                    </div>
                </div>
            ),
        },
        {
            title: '时间',
            dataIndex: 'time',
            render: (text, record) => {
                const spanColor = record.iColorType === 0 ? (
                    <span>
                        {record.remainingDays} (天)
                    </span>
                ) : (
                    <span className="documentary_detail_table_cell_span_red">
                        {record.remainingDays} (天)
                    </span>
                );

                return (
                    <div className="documentary_detail_table_cell_number_div">
                        <div>
                            <span className="documentary_detail_table_cell_time_span">采购下单时间：</span>
                            <span>{record.purchaseOrderTime}</span>
                        </div>
                        <div>
                            <span className="documentary_detail_table_cell_time_span">预计入库时间：</span>
                            <span>{record.estimatedStorageTime}</span>
                        </div>
                        <div>
                            <span className="documentary_detail_table_cell_time_span">剩余入库天数：</span>
                            {spanColor}
                        </div>
                    </div>
                );
            },
        },
        {
            title: '跟进',
            dataIndex: 'followUpTime',
            render: (text, record) => (
                <div className="documentary_detail_table_cell_number_div">
                    <div>
                        <span className="documentary_detail_table_cell_followUpTime_span">最早跟进时间：</span>
                        <span>{record.earliestFollowUpTime}</span>
                    </div>
                    <div>
                        <span className="documentary_detail_table_cell_followUpTime_span">最新跟进时间：</span>
                        <span>{record.latestFollowUpTime}</span>
                    </div>
                </div>
            ),
        },
        {
            title: '跟进结果',
            dataIndex: 'followUpResults',
            render: (value) => {
                let showMore = false;
                let keyWord = '';
                if (value) {
                    if (value.length > 6) {
                        showMore = true;
                        keyWord = value.substring(0, 6) + '...';
                    }
                }
                return showMore ? (
                    <div>
                        <span className="documentary-detail-state-key-word">
                            <Tooltip overlayClassName="documentary-detail-state-bounced" placement={"top"} title={value} overlayStyle={{overflowY:'scroll', maxHeight: '300px', maxWidth: '400px'}}>
                                {keyWord}
                            </Tooltip>
                        </span>
                    </div>
                ) : (
                    <div>
                        <span className="documentary-detail-state-key-word">{value}</span>
                    </div>
                )
            },
        },
        {
            title: '物流单号',
            dataIndex: 'shipmentNumber',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            render: (value) => {
                let showMore = false;
                let keyWord = '';
                if (value) {
                    if (value.length > 6) {
                        showMore = true;
                        keyWord = value.substring(0, 6) + '...';
                    }
                }
                return showMore ? (
                    <div>
                        <span className="documentary-detail-state-key-word">
                            <Tooltip overlayClassName="documentary-detail-state-bounced" placement={"top"} title={value} overlayStyle={{overflowY:'scroll', maxHeight: '300px', maxWidth: '400px'}}>
                                {keyWord}
                            </Tooltip>
                        </span>
                    </div>
                ) : (
                    <div>
                        <span className="documentary-detail-state-key-word">{value}</span>
                    </div>
                )
            },
        },
        {
            title: '人员',
            dataIndex: 'people',
            render: (text, record) => (
                <div className="documentary_detail_table_cell_number_div">
                    <div>
                        <span className="documentary_detail_table_cell_people_span">订货员：</span>
                        <span>{record.orderer}</span>
                    </div>
                    <div>
                        <span className="documentary_detail_table_cell_people_span">跟单员：</span>
                        <span>{record.merchandiser}</span>
                    </div>
                </div>
            ),
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (test, record) => (
                <Functions
                    {...this.props}
                    functionkey="010-000003-000003-000001-003"
                >
                    <div>
                        <a onClick={() => this.props.showEditorFollowUpModal(record.key, record)}>
                            编辑跟进
                        </a>
                    </div>
                </Functions>
            ),
        },
    ];

    render() {
        const {
            documentaryDetailData,
            showAKeyExpediteOrderModal,
        } = this.props;
        const list = documentaryDetailData.list;
        return (
            <div className="white margin-sm-top">
                <Functions
                    {...this.props}
                    functionkey="010-000003-000003-000001-002"
                >
                    <Button className="margin-sm-top pull-right margin-sm-right margin-sm-bottom" onClick={() => { showAKeyExpediteOrderModal(); }}>一键跟催</Button>
                </Functions>

                <div className="padding-ss-left padding-ss-right padding-ss-bottom documentary_detail_table">
                    <Table
                        columns={this.columns}
                        dataSource={list}
                        pagination={false}
                        size="small"
                        rowKey={record => record.key}
                        bordered
                    />
                </div>
            </div>
        );
    }
}
