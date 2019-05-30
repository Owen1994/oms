/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--异常订单--详情页--订单日志
 *参数说明:
 *时间: 2018/5/29 15:49
 */
import React, {Component} from 'react'
import {
    Icon,
    Button,
    Table,
    Pagination,
} from 'antd'
import '../css/css.css'
import { datasaddkey, getUrlParams, timestampFromat } from 'util/baseTool';


class WarehouseOrder extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        flex: false,
        pageNumber: 1,
        pageData: 20,
    }
    flexstyleIcon1 = {
       transform:'rotate(90deg)',
    }
    flexstyleIcon = {
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
            <div className="newCluenk orderlog oms-order-log" style={{marginBottom: 50}}>
                <div className="title pr">
                    订单日志
                    <Button onClick={this.flexClick} className="flex-btn">
                        <Icon type="double-right" style={this.state.flex?this.flexstyleIcon:this.flexstyleIcon1}/>
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
