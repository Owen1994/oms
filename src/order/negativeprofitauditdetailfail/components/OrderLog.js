import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Table,
    Button,
    Icon,
} from 'antd'
import {datasaddkey} from '../../../util/baseTool';


class WarehouseOrder extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        flex:false
    }
    flexstyleIconUp = {
        transform:'rotate(90deg)',
    }
    flexstyleIconDown = {
        transform:'rotate(-90deg)',
    }
    flexClick = (e)=>{
        e.stopPropagation();
        if(!this.state.flex){
            this.setState({
                flex:true
            })
        }else {
            this.setState({
                flex:false
            })
        }
    }

    columns = [{
        title: '序号',
        dataIndex: 'No',
        render: text => text,
        width: 50,
    }, {
        title: '操作属性',
        className: 'column-order',
        dataIndex: 'attribute',
        render: text => text,
        width: 140,
    }, {
        title: '描述',
        dataIndex: 'msg',
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
            dataIndex: 'userId',
            render: text => text,
            width: 120
        },
        {
            title: '操作时间',
            dataIndex: 'time',
            render: text => text,
            width: 150,

        }];


    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        const {data} = this.props.tablemodel5;
        const newdata = datasaddkey(data)
        const columns = this.columns;

        
        return (
            <div className="newCluenk padding-md-bottom oms-order-log" style={{marginBottom: 50}}>
                <div className="title pr">
                    订单日志
                    <Button onClick={this.flexClick} className="flex-btn">
                        <Icon type="double-right" style={this.state.flex?this.flexstyleIconDown:this.flexstyleIconUp}/>
                        {
                            this.state.flex ?
                                "收起"
                                :
                                "展开"
                        }
                    </Button>
                </div>
                <div className={ this.state.flex ? 'content' : 'content exc-isHide' }>
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
