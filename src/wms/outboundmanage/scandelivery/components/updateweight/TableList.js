import React, { Component } from 'react';
import {
    Spin, Table,
} from 'antd';
import UpdateWeightModal from './model/UpdateWeightModal';
import Functions from '../../../../../components/functions';

class TableList extends Component {
    state = {
        showUpdateWeightModal: false,
    };

    columns = [
        {
            title: '序号',
            width: 100,
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: '仓库名称',
            dataIndex: 'warehouseName',
            width: 100,
        },
        {
            title: '订单号',
            dataIndex: 'orderNumber',
            width: 100,
        },
        {
            title: '运单号',
            dataIndex: 'waybillNo',
            width: 100,
        },
        {
            title: '物流渠道',
            dataIndex: 'logisticsChannel',
            width: 100,
        },
        {
            title: '包裹重量(g)',
            dataIndex: 'packageWeight',
            width: 100,
        },
        {
            title: '扫描人',
            dataIndex: 'scanner',
            width: 100,
        },
        {
            title: '扫描时间',
            dataIndex: 'scanTime',
            width: 100,
        },
        {
            title: '操作',
            width: 100,
            render: (text, record) => (
                <Functions
                    {...this.props}
                    functionkey="012-000006-000004-012"
                >
                    <a onClick={() => {
                        this.setState({
                            updateKey: record.key,
                            showUpdateWeightModal: true,
                        });
                    }}
                    >更新
                    </a>
                </Functions>
            ),
        },
    ];


    render() {
        const {
            partList,
            loadingState,
            loadData,
        } = this.props;
        return (
            <div className="breadcrumb padding-sm margin-ss-top">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={partList.list}
                        pagination={false}
                    />
                </Spin>
                <UpdateWeightModal
                    updateKey={this.state.updateKey}
                    visible={this.state.showUpdateWeightModal}
                    ok={loadData}
                    cancel={() => {
                        this.setState({
                            showUpdateWeightModal: false,
                        });
                    }}
                />
            </div>
        );
    }
}

export default TableList;
