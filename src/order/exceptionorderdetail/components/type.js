/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--异常订单--详情页--异常明细
 *参数说明:
 *时间: 2018/5/29 15:53
 */
import React from 'react';
import {
    Table,
} from 'antd';
import '../css/css.css';
import {datasaddkey} from 'util/baseTool';


class WarehouseOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    columns = [{
        title: '异常类型',
        className: 'column-order',
        dataIndex: 'typeName',
        render: text => text,
        width: 160,
    }, {
        title: '异常原因',
        dataIndex: 'content',
        render: text => <span className={'redcolor'}>{text}</span>,
    }];


    render() {
        const {data} = this.props.tablemodel6;
        const newdata = datasaddkey(data)
        const columns = this.columns;

        return (
            <div className="newCluenk">
                <div className="title">异常明细</div>
                <div className="content">
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={newdata}
                        bordered
                    />
                </div>
            </div>
        );
    }
}

export default WarehouseOrder
