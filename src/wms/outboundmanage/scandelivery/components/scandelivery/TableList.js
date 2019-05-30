import React, { Component } from 'react';
import {
    Button,
    Spin, Table,
} from 'antd';
import { fetchPost } from '../../../../../util/fetch';
import { CONFIRM, DELETE_ITEM, PRINT_COLLECTING_BAG } from '../../constants/Api';
import Functions from '../../../../../components/functions';
import CollectGoodsPrintModal from '../collectgoods/model/CollectGoodsPrintModal';

class TableList extends Component {
    state = {
        isShowPrintModal: false,
        printData: {},
    };

    columns = [
        {
            title: '订单号',
            dataIndex: 'orderNumber',
        },
        {
            title: '运单号',
            dataIndex: 'waybillNo',
        },
        {
            title: '理论重量(g)',
            dataIndex: 'theoreticalWeight',
        },
        {
            title: '实际重量(g)',
            dataIndex: 'actualWeight',
        },
        {
            title: '扫描人',
            dataIndex: 'scanPeople',
        },
        {
            title: '扫描日期',
            dataIndex: 'scanDate',
        },
        {
            title: '操作',
            render: (text, record) => (
                <Functions
                    {...this.props}
                    functionkey="012-000006-000004-003"
                >
                    <a onClick={() => this.deleteItem(record)}>删除</a>
                </Functions>
            ),
        },
    ];

    deleteItem = (record) => {
        const params = {
            data: {
                key: record.key,
            },
        };
        fetchPost(DELETE_ITEM, params, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.props.onChangeListener();
                }
            });
    };

    /**
     * 获取打印数据
     */
    getPrintData = (key) => {
        const params = {
            data: {
                key,
            },
        };
        fetchPost(PRINT_COLLECTING_BAG, params, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        isShowPrintModal: true,
                        printData: {
                            ...result.data,
                        },
                    });
                }
            });
    };

    /**
     *  确认结袋
     */
    confirm = () => {
        this.props.form.validateFields(['logisticsChannel'], (err, values) => {
            if (!err) {
                const params = {
                    data: {
                        channel: values.logisticsChannel,
                    },
                };
                fetchPost(CONFIRM, params, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.getPrintData(result.data.key);// 直接打印集货袋标签
                            this.props.onChangeListener();
                        }
                    });
            }
        });
    };

    render() {
        const {
            partList,
            loadingState,
        } = this.props;
        const footer = () => (
            <div className="overflow-hidden table-foot-div padding-md-left padding-md-right">
                <div className="pull-left">
                    共:<span>{partList.packageCount}</span>个包裹<span>{partList.vote}</span>票
                </div>
                <div className="pull-right">
                    包裹净重共:<span>{partList.packageNetWeight}</span>g
                    {/* <span /> 毛重共:<span>{partList.grossWeight}</span>g */}
                </div>
            </div>
        );
        return (
            <div className="breadcrumb padding-sm margin-ss-top">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={partList.list}
                        pagination={false}
                        footer={footer}
                    />
                    <Functions
                        {...this.props}
                        functionkey="012-000006-000004-002"
                    >
                        <div style={{ textAlign: 'right' }}>
                            <Button type="primary" className="margin-ss-top" onClick={this.confirm}>确认结袋</Button>
                        </div>
                    </Functions>
                </Spin>
                <CollectGoodsPrintModal
                    visible={this.state.isShowPrintModal}
                    cancel={() => {
                        this.setState({
                            isShowPrintModal: false,
                        });
                    }}
                    printData={this.state.printData}
                />
            </div>
        );
    }
}

export default TableList;
