/**
*作者: 任贸华
*功能描述: 操作日志模块
*参数说明:
*时间: 2018/4/16 11:40
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
import Modalmodel from '../../../components/modalmodel'
import {skuprefixTableaction} from "../actions";
import axios from "../../../util/axios";
import {datasaddkey,timestampFromat} from "../../../util/baseTool";


const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class WarehouseOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    columns = [{
        title: '序号',
        dataIndex: 'No',
        render: (text,record,index) => record.key,
        width: 50,
    }, {
        title: '操作属性',
        className: 'column-order',
        dataIndex: 'operateContent',
        render: text => text,
        width: 120,
    }, {
        title: '描述',
        dataIndex: 'description',
        render: text => text,
    },
        {
            title: '用户名',
            dataIndex: 'userName',
            render: text => text,
            width: 120
        },
        {
            title: '用户ID',
            dataIndex: 'loginName',
            render: text => text,
            width: 120
        },
        {
            title: '操作时间',
            dataIndex: 'createDate',
            render: text => timestampFromat(text,2),
            width: 150,

        }];

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        const {data} = this.props.logtablemodel;
        const newlogdata = datasaddkey(data)
        const columns = this.columns;

        return (
            <div className="newCluenk">
                <div className="title">操作日志</div>
                <div className="content">
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={newlogdata}
                        bordered scroll={{  y: 217 }}
                    />
                </div>
            </div>
        );
    }
}

export default WarehouseOrder
