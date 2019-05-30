import React, { Component } from 'react';
import {
    Button,
    Pagination, Spin, Table,
} from 'antd';
import Tableitem from '../../../../components/Tableitem';
import Tableoption from '../../../../components/Tableoption';
import SampleRequestModal from './model/SampleRequestModal';
import ShipmentModal from './model/ShipmentModal';
import PrintModal from './model/PrintModal';
import ReviewModal from './model/ReviewModal';
import PopConfirm from '../../../../common/components/confirm';
import { fetchPost } from '../../../../util/fetch';
import {
    OVER, PREBACK, CANCEL, PRT,
} from '../constants/Api';
import { getLoginmsg } from '../../../../util/baseTool';
import { GET_USER_WAREHOUSE } from '../../../common/constants/Api';
import Functions from '../../../../components/functions';

class TableList extends Component {
    state = {
        showUpLoadModal: false,
        showShipmentModal: false,
        showReviewModal: false,
        showPrintModal: false,
        printInfo: {},
        ReviewKey: '',
        shipmentKey: '',
        userWarehouse: {},
    };

    columns = [
        {
            title: '序号',
            key: 'index',
            render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
        },
        {
            title: '仓库名称',
            dataIndex: 'warehouse',
        },
        {
            title: '样品申请编码',
            dataIndex: 'sampleCode',
        },
        {
            title: '状态',
            dataIndex: 'status',
        },
        {
            title: '申请信息',
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={100}
                        right="auto"
                        title="申请人"
                        content={record.submittedBy}
                    />
                    <Tableitem
                        left={100}
                        right="auto"
                        title="申请时间"
                        content={record.requestTime}
                    />
                    <Tableitem
                        left={100}
                        right="auto"
                        title="目的地"
                        content={record.destination}
                    />
                    <Tableitem
                        left={100}
                        right="auto"
                        title="申请理由"
                        content={record.requestRemarks}
                    />
                    <Tableitem
                        left={100}
                        right="auto"
                        title="期望收货日期"
                        content={record.expectedReceiptDate}
                    />
                    <Tableitem
                        left={100}
                        right="auto"
                        title="使用时长"
                        content={record.usePeriod}
                    />
                </div>
            ),
        },
        {
            title: '发运信息',
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={100}
                        right="auto"
                        title="司机姓名"
                        content={record.driverName}
                    />
                    <Tableitem
                        left={100}
                        right="auto"
                        title="车牌号"
                        content={record.carNumber}
                    />
                    <Tableitem
                        left={100}
                        right="auto"
                        title="司机电话"
                        content={record.driverPhone}
                    />
                    <Tableitem
                        left={100}
                        right="auto"
                        title="发货备注"
                        content={record.remarks}
                    />
                </div>
            ),
        },
        {
            title: '操作',
            render: (text, record) => {
                const moreOptions = [
                    {
                        name: '审核',
                        funcId: '012-000008-000001-003',
                        onChange: () => {
                            this.optionsAction(record, 'review');
                        },
                        subs: [],
                    },
                    {
                        name: '装车发运',
                        funcId: '012-000008-000001-004',
                        onChange: () => {
                            this.optionsAction(record, 'shipment');
                        },
                        subs: [],
                    },
                    {
                        name: '归还',
                        funcId: '012-000008-000001-005',
                        subs: [],
                        onChange: () => {
                            this.optionsAction(record, 'return');
                        },
                    },
                    {
                        name: '确认完结',
                        funcId: '012-000008-000001-006',
                        onChange: () => {
                            this.optionsAction(record, 'confirm');
                        },
                        subs: [],
                    },
                    {
                        name: '取消',
                        funcId: '012-000008-000001-007',
                        onChange: () => {
                            this.optionsAction(record, 'cancel');
                        },
                        subs: [],
                    },
                    {
                        name: '打印',
                        funcId: '012-000008-000001-008',
                        onChange: () => {
                            this.optionsAction(record, 'print');
                        },
                        subs: [],
                    },
                ];
                return (
                    <Tableoption
                        {...this.props}
                        options={moreOptions.filter(item => !item.invisible)}
                    />
                );
            },
        },
    ];

    componentDidMount() {
        const username = getLoginmsg().userName;
        fetchPost(GET_USER_WAREHOUSE, { data: { username } }, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({ userWarehouse: result.data[0] });
                }
            });
    }

    expandedColumns = (record) => {
        const skuInfo = record.skuInfo;
        return skuInfo ? skuInfo.map((item, index) => (
            <div style={{ display: 'flex' }} key={index.toString()}>
                <Tableitem
                    left="auto"
                    right="auto"
                    title="申请SKU"
                    content={item.sku}
                />
                <Tableitem
                    right="auto"
                    title="数量"
                    content={item.number}
                />
                <Tableitem
                    left={100}
                    right="auto"
                    title="中文名称"
                    content={item.name}
                />
            </div>
        )) : null;
    };

    optionsAction = (record, type) => {
        if (type === 'shipment') {
            this.setState({
                shipmentKey: record.key,
                showShipmentModal: true,
            });
            return;
        }
        if (type === 'print') {
            const params = {
                data: {
                    key: record.key,
                },
            };
            fetchPost(PRT, params, 1)
                .then((result) => {
                    if (result.state === '000001') {
                        this.setState({
                            printInfo: result.data,
                            showPrintModal: true,
                        });
                    }
                });
            return;
        }
        if (type === 'review') {
            this.props.form.setFieldsValue({
                reviewRemarks: '',
            });
            this.setState({
                ReviewKey: record.key,
                showReviewModal: true,
            });
            return;
        }
        if (type === 'return') {
            PopConfirm('归还', '您确定要归还吗？', () => this.optionsRequest(PREBACK, record.key));
        }
        if (type === 'confirm') {
            PopConfirm('确认完结', '您确定要完结吗？', () => this.optionsRequest(OVER, record.key));
        }
        if (type === 'cancel') {
            PopConfirm('取消', '您确定要取消吗？', () => this.optionsRequest(CANCEL, record.key));
        }
    };

    optionsRequest = (url, key) => {
        const params = {
            data: {
                key,
            },
        };
        fetchPost(url, params, 1)
            .then((result) => {
                if (result.state === '000001') {
                    const {
                        pageNumber,
                        pageData,
                        onChangeListener,
                    } = this.props;
                    onChangeListener(pageNumber, pageData);
                }
            });
    };

    render() {
        const {
            partList,
            loadingState,
            pageNumber,
            pageData,
            onChangeListener,
        } = this.props;
        return (
            <div className="breadcrumb padding-sm margin-ss-top">
                <div className="text-right margin-sm-bottom margin-ts-top">
                    <Functions
                        {...this.props}
                        functionkey="012-000008-000001-002"
                    >
                        <Button
                            type="default"
                            onClick={() => {
                                this.setState({
                                    showUpLoadModal: true,
                                });
                            }}
                        >样品申请
                        </Button>
                    </Functions>
                </div>
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={partList.list}
                        pagination={false}
                        expandedRowRender={this.expandedColumns}
                    />
                    <Pagination
                        pageSizeOptions={['100']}
                        showTotal={t => `共${t}条`}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        total={partList.total}
                        current={pageNumber}
                        pageSize={pageData}
                        onChange={onChangeListener}
                    />
                </Spin>
                <SampleRequestModal
                    cancel={() => {
                        this.setState({
                            showUpLoadModal: false,
                        });
                    }}
                    visible={this.state.showUpLoadModal}
                    warehouse={this.state.userWarehouse}
                />
                <ShipmentModal
                    cancel={() => {
                        this.setState({
                            showShipmentModal: false,
                        });
                    }}
                    shipmentKey={this.state.shipmentKey}
                    visible={this.state.showShipmentModal}
                />
                <PrintModal
                    {...this.props}
                    printInfo={this.state.printInfo}
                    cancel={() => {
                        this.setState({
                            showPrintModal: false,
                        });
                    }}
                    visible={this.state.showPrintModal}
                />
                <ReviewModal
                    {...this.props}
                    cancel={() => {
                        this.setState({
                            showReviewModal: false,
                        });
                    }}
                    ReviewKey={this.state.ReviewKey}
                    visible={this.state.showReviewModal}
                />
            </div>
        );
    }
}

export default TableList;
