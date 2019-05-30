import React, {Component} from 'react'
import {
    Table,
    Pagination,
} from 'antd'
import '../css/css.css'
import { getUrlParams, timestampFromat } from 'util/baseTool';


class WarehouseOrder extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        pageNumber: 1,
        pageData: 20,
    }
    
    // 分页变化
    handlePaginationChange = (pageNumber, pageData) => {
        const { orderId } = getUrlParams('');
        const params = {
            orderId,
            pageNumber,
            pageData,
        };
        this.setState({ pageNumber, pageData });
        this.props.queryLog(params);
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'No',
            render: text => text,
            width: 50,
        }, {
            title: '操作属性',
            className: 'column-order',
            dataIndex: 'attribute',
            render: text => text,
            width: 120,
        }, {
            title: '描述',
            dataIndex: 'msg',
            render: text => text,
        },
        {
            title: '用户ID',
            dataIndex: 'userId',
            render: text => text,
            width: 120
        },
        {
            title: '操作时间',
            dataIndex: 'time',
            render: text => timestampFromat(text, 2),
            width: 150,
        }];


    render() {

        const {data} = this.props.tablemodel5;
        const columns = this.columns;
        const {
            pageNumber,
            pageData,
        } = this.state;

        return (
            <div className="newCluenk oms-order-log" style={{marginBottom: 50}}>
                <div className="title">订单日志</div>
                <div className="content">
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={data.data}
                        bordered
                    />
                    <Pagination
                        className="g-rt"
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        showQuickJumper={{goButton: true}}
                        current={pageNumber}
                        defaultCurrent={1}
                        total={data.total}
                        pageSize={pageData}
                        onChange={this.handlePaginationChange}
                        onShowSizeChange={this.handlePaginationChange}
                        />
                </div>
            </div>
        );
    }
}

export default WarehouseOrder
