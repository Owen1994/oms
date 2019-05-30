/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--异常订单--详情页--分仓订单
 *参数说明:
 *时间: 2018/5/29 15:53
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
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
// datasaddkey
import {
    datasaddkey
} from '../../../util/baseTool'

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class WarehouseOrder extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        flex:false
    }
    
    flexstyleIcon1 = {
       transform:'rotate(90deg)',
    }
    flexstyleIcon = {
        transform:'rotate(-90deg)',
    }
    columns = [
        {
            title: '序号',
            dataIndex: 'No',
            render: text => text,
            width: 50,
        }, 
        {
            title: '包裹单号',
            className: 'column-order',
            // dataIndex: 'warehouseOrderId',
            render: (text, record) => {
                return (
                    <span
                        className="bcolor pointer"
                        onClick={this.goDeliveryparceldetail.bind(this, record)}
                    >
                        {record.warehouseOrderId.initialValue}
                    </span>)
            },
            width: 160,
        },
        {
            title: '分仓订单状态',
            dataIndex: 'warehouseOrderState',
            render: val => val.initialValue,
            width: 140,
        },
        {
            title: '发货状态',
            dataIndex: 'deliveryState',
            render: val => val.initialValue,
            width: 140,
        },
        {
            title: '发货仓',
            dataIndex: 'deliveryBay',
            render: val => val.initialValue,
            width: 140,
        },
        {
            title: '物流渠道',
            dataIndex: 'channelName',
            render: val => val.initialValue,
            width: 200,

        },
        {
            title: '数量/SKU',
            dataIndex: 'skuNum',
            render: val => {
                var text = val.initialValue
                if(text instanceof Array){
                    return text.join("")
                }
                return text
            },
            width: 140,
        },
        {
            title: '重量',
            dataIndex: 'weight',
            render: val => {
                var text = val.initialValue || 0
                return text + " /g"
            },
            width: 80,
        }
    ];

    
    flexClick = (e)=>{
        e.stopPropagation();
        this.setState({
            flex:!this.state.flex
        })
    }
    goDeliveryparceldetail = (record)=>{
        const text = record.warehouseOrderId.initialValue;
        const url = record.warehouseOrderState.initialValue === '待审核' ? `/order/deliveryparcellist/deliveryparceldetail/?orderId=${text}&exceptionType=1`
            : `/order/deliveryparcellist/deliveryparceldetail/?orderId=${text}`;
        window.location.href = url;
    }
    render() {
        const {data} = this.props.tablemodel;
        var newdata = datasaddkey(data)
        const columns = this.columns;

        return (
            <div className="newCluenk deliveryParcel">
                <div className="title pr">
                    分仓订单
                    <Button onClick={this.flexClick} className="flex-btn">
                        <Icon type="double-right" style={this.state.flex?this.flexstyleIcon:this.flexstyleIcon1}/>
                        {
                            this.state.flex
                            ? "收起"
                            : "展开"
                        }
                    </Button>
                </div>
                <div className={ this.state.flex ? 'content exc-flexWrap' : 'content exc-flexWrap exc-isHide' }>

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
