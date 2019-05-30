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
        },
        {
            title: '仓库',
            dataIndex: 'warehouse',
            render: (text, record) => (
                <div className="buliang_warehouse_div">
                    <p>
                        <span className="info-span">收货仓库:</span>
                        <span>{record.receivingWarehouse}</span>
                    </p>
                    <p>
                        <span className="info-span">异常生成时间:</span>
                        <span>{record.abnormalTime}</span>
                    </p>
                    <p>
                        <span className="info-span">异常生成人:</span>
                        <span>{record.abnormalGenerator}</span>
                    </p>
                </div>
            ),
        },
        {
            title: '收货人',
            dataIndex: 'consignee',
        },
        {
            title: '物流单号',
            dataIndex: 'logisticsNumber',
        },
        {
            title: '图片',
            dataIndex: 'image',
            render: (text, record) => (

                 record.imageArray.length === 0 ? <a>无图片</a> :
                 <img src={record.imageArray[0]} width="100px" height="100px" alt="图片"  onClick={() => this.props.showImages(record.imageArray)}/>
            ),
        },
        {
            title: '来货备注',
            dataIndex: 'note',
            render: (text, record) => {
                return (
                    <Tooltip title={record.note}>
                        <div className="one-ellipsis" style={{width: "100px"}}>{record.note}</div>
                    </Tooltip>
                )
            }
        },
        {
            title: '状态',
            dataIndex: 'handleStateValue',
        },
        {
            title: '处理人',
            dataIndex: 'handlePeople',
            render: (text, record) => (
                <div className="buliang_handle_people_div">
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
            width: 120,
            render: (text, record) => {

                let optionsView = null;
                if (record.handleStateCode === 1) {
                    optionsView = (
                        <div>
                            <Functions
                                {...this.props}
                                functionkey="010-000005-000002-002"
                            >
                                <a
                                    onClick={() => this.props.showHandleNPModal(true, record)}
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
                                functionkey="010-000005-000002-004"
                            >
                                <a
                                    onClick={() => this.props.showModifyNPModal(true, record)}
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
                                functionkey="010-000005-000002-003"
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
