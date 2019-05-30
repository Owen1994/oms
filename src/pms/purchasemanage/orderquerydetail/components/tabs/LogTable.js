import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { getUrlParams } from '../../../../../util/baseTool';

const columns = [
    {
        title: '操作人',
        dataIndex: 'operator',
        width: 100,
    },
    {
        title: '操作时间',
        dataIndex: 'operateTime',
        width: 100,
    },
    {
        title: '操作动作',
        dataIndex: 'operateDesc',
        width: 100,
        render: (text, record) => {
            return (
                <div style={text === '审核驳回' ? { color: '#f00' } : {}}>{text}</div>
            )
        },
    },
    {
        title: '操作结果',
        dataIndex: 'operateResult',
        width: 100,
        render: (text) => (
            <div style={text === 2 ? { color: '#f00' } : {}}>{text === 2 ? '失败' : '成功'}</div>
        ),
    },
    {
        title: '备注',
        dataIndex: 'remark',
        width: 200,
    },
];

/**
 * 日志信息
 */
class LogTable extends Component {
    componentDidMount() {
        const parameter = { data: { purchaseNumber: getUrlParams('').orderNumber } };
        this.props.getOrderDetailLog(parameter);
    }

    render() {
        const { detailLog } = this.props;
        return (
            <div className="padding-sm white pms-order-query_LogTable_bottom">
                <Spin spinning={false} delay={500} tip="Loading...">
                    <Table
                        rowKey={t => t.key}
                        dataSource={detailLog.list}
                        pagination={false}
                        bordered
                        size="small"
                        columns={columns}
                    />
                </Spin>
            </div>
        );
    }
}

export default LogTable;
