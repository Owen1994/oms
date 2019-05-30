import React from 'react';
import {
    Button,
    Dropdown,
    Icon,
    Pagination,
    Spin,
    Table,
    Menu,
    message, 
    Tooltip,
} from 'antd';
import { Link } from 'react-router-dom';
import Functions from '../../../../components/functions';
import { fetchPost } from "../../../../util/fetch";
import { Order_Batch_Submit_Api_B } from "../constants/Api";
import PopConfirm from "../../../../common/components/confirm";
import { setPageCache } from '../../../../util/PageCache';
import imgQQ from '../../documentarymanage/img/qq.png';
import imgWangWang from '../../documentarymanage/img/wangwan.png';

/**
 * 我收到的消息列表
 */
export default class TableList extends React.Component {
    /**
     * 列表头标签
     * @type {*[]}
     */
    columns = [
        {
            title: '采购单号',
            dataIndex: 'purchaseNumber',
            width: 130,
            render: (text, record) => {
                const checkUrl = `/pms/purchasemanage/orderquery/detail/?orderNumber=${record.purchaseNumber}`;
                return (
                    <Link to={checkUrl} target="_blank">
                        {text}
                    </Link>
                );
            },
        },
        {
            title: '供应商',
            dataIndex: 'supplier',
            width: 200,
            render: (text, record) => {
                const isShowQQ = record.qq ? (record.qq.length !== 0) : false;
                const isShowWanWan = record.aliwangwang ? (record.aliwangwang.length !== 0) : false;
                const QQ = `tencent://message/?uin=${record.qq}`;
                const WangWang = `https://amos.im.alisoft.com/msg.aw?v=2&uid=${record.aliWangWang}&site=cntaobao&s=2&charset=utf-8`;
                const vQQ = (
                    <a href={QQ} target="_blank" rel="nofollow me noopener noreferrer">
                        <img
                            className="documentary_list_table_img"
                            src={imgQQ}
                            alt="QQ"
                            width="14px"
                            height="14px"
                        />
                    </a>
                );
                const vWangWang = (
                    <a href={WangWang} target="_blank" rel="nofollow me noopener noreferrer">
                        <img
                            className="documentary_list_table_img"
                            src={imgWangWang}
                            alt="WangWang"
                            width="14px"
                            height="14px"
                        />
                    </a>
                );
                return (
                    <div>
                        <span>{record.supplier}</span>
                        {
                            isShowQQ ? vQQ : null
                        }
                        {
                            isShowWanWan ? vWangWang : null
                        }
                    </div>
                );
            },
        },
        {
            title: '采购金额',
            dataIndex: 'purchaseAmount',
            width: 90,
        },
        {
            title: '运费',
            dataIndex: 'freight',
            width: 60,
        },
        {
            title: '目的仓库',
            dataIndex: 'destWarehouse',
            width: 80,
        },
        {
            title: '订货员',
            dataIndex: 'opEmployee',
            width: 100,
        },
        {
            title: '跟单员',
            dataIndex: 'merchandiser',
            width: 100,
        },
        {
            title: '业务线',
            dataIndex: 'businessLine',
            width: 65,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 180,
        },
        {
            title: '打印时间',
            dataIndex: 'printTimes',
            width: 180,
        },
        {
            title: '付款方式',
            dataIndex: 'payType',
            width: 100,
        },
        {
            title: '备注',
            dataIndex: 'remark',
            width: 100,
            render: (text, record) => {
                if (record.shortRemark.length > 0) {
                    return (
                        <Tooltip overlayClassName="orderquery-table-note" placement={"top"} title={record.remark} overlayStyle={{ overflowY: 'scroll', maxHeight: '300px', maxWidth: '400px' }}>
                            {record.shortRemark}
                        </Tooltip>
                    )
                } else {
                    return (
                        <div>{record.remark}</div>
                    )
                }
            }
        },
        {
            title: '状态',
            dataIndex: 'purchaseState',
            width: 65,
            render: text => (<div>{text.name}</div>),
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: 160,
            render: (text, record) => {
                const checkUrlDetail = `/pms/purchasemanage/orderquery/detail/?orderNumber=${record.purchaseNumber}`;
                const checkUrlPrint = '/pms/purchasemanage/orderquery/print/';
                const isShowWangPai = record.payTypeCode === 3;
                return (
                    <div>
                        <Functions
                            {...this.props}
                            functionkey="010-000003-000005-004"
                        >
                            <Link
                                to={checkUrlDetail}
                                target="_blank">
                                详情
                            </Link>
                        </Functions>
                        {
                            <Functions
                                {...this.props}
                                functionkey="010-000003-000005-002"
                            >
                                <Link
                                    className="padding-sm-left"
                                    to={checkUrlPrint}
                                    target="_blank"
                                    onClick={() => {
                                        const dataURL = {
                                            purchaseNumber: [record.purchaseNumber],
                                        };
                                        setPageCache(dataURL, "kOrderQueryPrintArray");
                                    }}
                                >
                                    打印
                                </Link>
                            </Functions>
                        }
                        {
                            isShowWangPai ? (

                                <Functions
                                    {...this.props}
                                    functionkey="010-000003-000005-007"
                                >
                                    <a
                                        className="padding-sm-left"
                                        onClick={
                                            () => this.props.showOrCloseRacquetModal(true, {
                                                alOrderNumber: record.alOrderNumber,
                                                tradingNumber: record.tradingNumber,
                                                tradingID: record.tradingID,
                                                key: record.purchaseNumber
                                            })
                                        }
                                    >
                                        网拍
                                    </a>
                                </Functions>
                            ) : null
                        }
                    </div>
                );
            },
        }];

    state = {
        selectedRowKeys: [],
        selectedRows: [],
    };

    /**
     * 第一次初始化视图,加载数据
     */
    componentDidMount() {
        this.props.loadData();
    }

    /**
     * 处理批量提交
     */
    handleBatchSubmission = () => {
        if (this.state.selectedRowKeys.length === 0) {
            message.warning("请勾选订单后再进行批量提交的操作！");
            return;
        }
        PopConfirm('提交订单', '确认提交当前选中订单？', this.httpBatchSubmission, this.cancel);
    };

    cancel = () => {
        this.props.btnLoading({btnLoadingList: false});
    }
    httpBatchSubmission = () => {
        const parameter = { data: { keys: this.state.selectedRowKeys } };
        fetchPost(Order_Batch_Submit_Api_B, parameter, 2).then((result) => {
            if (result.state === '000001') {
                this.props.loadData();
            } else {
                message.error(result.msg)
                this.props.loadData();
            }
        });
    };

    /**
     * 处理批量打印
     */
    handleBatchPrint = () => {
        if (this.state.selectedRowKeys.length === 0) {
            message.warning("请勾选订单后再进行批量打印的操作！");
            return;
        }
        const dataURL = {
            purchaseNumber: this.state.selectedRowKeys,
        };
        setPageCache(dataURL, "kOrderQueryPrintArray");
        window.open('/pms/purchasemanage/orderquery/print/', '_blank');
    };

    /**
     * 处理批量修改跟单员
     */
    handleBatchModify = () => {
        if (this.state.selectedRowKeys.length === 0) {
            message.warning("请勾选订单后再进行批量修改跟单员的操作！");
            return;
        }
        this.props.showOrCloseModifyModal(true, this.state.selectedRowKeys);
    };

    /**
     * 处理批量同步供应商账号
     */
    handleBatchSyncSupplier = () => {
        if (this.state.selectedRowKeys.length === 0) {
            message.warning("请勾选订单后再进行批量修改跟单员的操作！");
            return;
        } 
        this.props.showOrCloseSyncSupplierModal(true, this.state.selectedRowKeys);
    };

    render() {
        const {
            orderList,
            isLoading,
            pageNumber,
            pageSize,
            loadData,
            showImport,
        } = this.props;

        /**
         * table选中回调
         */
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            selectedRows: this.state.selectedRows,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows,
                });
            },
            // getCheckboxProps: record => ({
            //     disabled: record.purchaseState.code !== 2,
            // }),
        };

        const menu = (
            <Menu>

                <Menu.Item>
                    <Functions
                        {...this.props}
                        functionkey="010-000003-000005-008"
                    >
                        <a onClick={this.handleBatchSubmission}>批量提交</a>
                    </Functions>

                </Menu.Item>

                <Menu.Item>
                    <Functions
                        {...this.props}
                        functionkey="010-000003-000005-011"
                    >
                        <a onClick={this.handleBatchPrint}>批量打印</a>
                    </Functions>

                </Menu.Item>

                <Menu.Item>
                    <Functions
                        {...this.props}
                        functionkey="010-000003-000005-009"
                    >
                        <a onClick={this.handleBatchModify}>批量修改跟单员</a>
                    </Functions>
                </Menu.Item>

                <Menu.Item>
                    <Functions
                        {...this.props}
                        functionkey="010-000003-000005-010"
                    >
                        <a onClick={this.handleBatchSyncSupplier}>批量同步供应商账号</a>
                    </Functions>
                </Menu.Item>

            </Menu>
        );
        return (
            <div>
                <div className="list-table margin-ss-top padding-sm ">
                    <div className="overflow-hidden">
                        <div className="pull-left">
                            <Dropdown overlay={menu} >
                                <Button>批量操作<Icon type="down" /></Button>
                            </Dropdown>
                        </div>
                        <div className="pull-right">
                        <Functions
                            {...this.props}
                            functionkey="010-000003-000005-012"
                        >
                            <Button
                                icon="download"
                                className="margin-sm-right"
                                onClick={showImport}
                            >
                                导入更换跟单员
                        </Button>
                        </Functions>
                        </div>
                    </div>
                    <div className="margin-ss-top">
                        <Spin spinning={isLoading} delay={500} tip="Loading...">
                            <Table
                                rowSelection={rowSelection}
                                columns={this.columns}
                                dataSource={orderList.list}
                                size="small"
                                pagination={false}
                                bordered
                                selections={true}
                            />
                        </Spin>
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            current={pageNumber}
                            showQuickJumper={{ goButton: true }}
                            total={orderList.total}
                            pageSize={pageSize}
                            onChange={loadData}
                        />
                    </div>
                </div>
            </div>);
    }
}
