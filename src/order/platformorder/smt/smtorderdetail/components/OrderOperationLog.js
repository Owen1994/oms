/**
 * 作者: pzt
 * 描述: 速卖通详情页订单操作日志组件
 * 时间: 2018/4/18 20:29
 **/
import React, {Component} from 'react';
import {
    Table,
    Pagination
} from 'antd';
import '../css/css.css';
import { timestampFromat } from 'util/baseTool';


class OrderOperationLog extends Component {

    handlePaginationChange = (pageNumber, pageData) => {
        const { orderId } = this.props.Infos;
        const params = {
            orderId,
            pageNumber,
            pageData,
        };
        this.props.querySmtLog(params);
    }

    render() {
        const { data, total, pageNumber, pageData} = this.props.newOperationLogModel;
        const columns = [
            {
                title: '操作属性',
                dataIndex: 'attribute',
                key: 'attribute',
                width: 120,
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
                width: 140,
            },
            {
                title: '描述',
                dataIndex: 'operDesc',
                key: 'operDesc',
                width: 100,
            },
            {
                title: '操作时间',
                dataIndex: 'time',
                key: 'time',
                width: 150,
                render: text => timestampFromat(text, 2),
            }];
        
        return (
            <div className="newCluenk noborderCluenk">
                <div className="title" id='operation-log' ref={'operationLog'}>订单操作日志</div>
                <div className="content">
                    <Table
                        className={'operation-log'}
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        bordered
                        />
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        showQuickJumper={{goButton: true}}
                        current={pageNumber}
                        defaultCurrent={1}
                        total={total}
                        pageSize={pageData}
                        onChange={this.handlePaginationChange}
                        onShowSizeChange={this.handlePaginationChange}
                        />
                </div>
            </div>
        )
    }
}

export default OrderOperationLog;
