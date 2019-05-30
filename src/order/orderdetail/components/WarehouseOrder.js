import React, {Component} from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import {
    Form,
    Icon,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    Cascader,
    Upload,
    Table,
    Popconfirm,
    Modal,
    DatePicker,
    message,
    Spin,
} from 'antd'
import '../css/css.css'
import * as config from "../../../util/connectConfig";

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class WarehouseOrder extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {

    }
    columns = [{
        title: '序号',
        dataIndex: 'No',
        render: text => text,
        width: 50,
    }, {
        title: '包裹单号',
        className: 'column-order',
        dataIndex: 'warehouseOrderId',
        render: (text, record) => {
            const url = record.warehouseOrderState === '待审核' ? `/order/deliveryparcellist/deliveryparceldetail/?orderId=${text}&exceptionType=1`
                : `/order/deliveryparcellist/deliveryparceldetail/?orderId=${text}`;
            return <Link className="bcolor pointer" to={url}>{text}</Link>
        },
        width: 160,
    }, {
        title: '分仓订单状态',
        dataIndex: 'warehouseOrderState',
        render: text => text,
        width: 140,
    },
    {
        title: '发货状态',
        dataIndex: 'deliveryState',
        render: text => text,
        width: 140,
    },
    {
        title: '发货仓',
        dataIndex: 'deliveryBay',
        render: text => text,
        width: 140,
    },
    {
        title: '物流渠道',
        dataIndex: 'channelName',
        render: text => text,
        width: 200,

    },
    {
        title: '数量/SKU',
        dataIndex: 'skuNum',
        render: text => {
            if(text instanceof Array && text.length){
                return text.map((v,k)=><p key={k}>{v}</p>)
            }
            return ""
        },
        width: 140,
    },
    {
        title: '重量',
        dataIndex: 'weight',
        render: text => {
            return (text?text:0) + "/g"
        },
        width: 80,
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: 80,
        render: (text, record) => {
            return "--"
            const oldOrderState = this.props.Infos.orderState;
            const OrderState = record.warehouseOrderState;
            const deliveryState = record.deliveryState;
            return (
                <div>
                    {((oldOrderState === '已分仓' || oldOrderState === '部分发货') && (OrderState !== '已核对' || OrderState !== '已发货')) || OrderState !== '已撤单' ?
                        <span
                           className={'text-success cursor-pointer'}
                        >撤单</span>
                    : null }
                    { OrderState === '已撤单' && (deliveryState !== '已确认' || deliveryState !== '已发货') ?
                        <span
                            className={'text-success cursor-pointer'}
                        >恢复订单</span>
                        : null }
                </div>
            )
        },
    }
    ];
    //  根据发货状态/老ERP状态添加  撤单/恢复订单按钮
    render() {
        const {data} = this.props.tablemodel;
        const columns = this.columns;

        return (
            <div className="newCluenk deliveryParcel">
                <div className="title">分仓订单</div>
                <div className="content">

                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={data}
                        bordered
                    />
                </div>
            </div>
        );
    }
}

export default WarehouseOrder
