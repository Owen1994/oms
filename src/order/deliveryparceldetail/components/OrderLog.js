/**
 * 作者: 陈林
 * 描述:操作日志组件
 * 时间: 2018/4/18 0018 下午 8:51
 **/
import React, {Component} from 'react'
import {
    Table,
    Button,
    Icon,
    Pagination,
} from 'antd'
import { getUrlParams, timestampFromat } from 'util/baseTool';


class WarehouseOrder extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        flex: false,
        pageNumber: 1,
        pageData: 20,
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
        render: (text, record, index) => ++index + (this.state.pageNumber - 1) * this.state.pageData,
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
            width: 120
        },
        {
            title: '操作时间',
            dataIndex: 'time',
            render: text => timestampFromat(text, 2),
            width: 150,

        }];

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

    render() {

        const {data} = this.props.tablemodel5;
        const columns = this.columns;
        const {
            pageNumber,
            pageData,
        } = this.state;

        return (
            <div className="newCluenk padding-lg-bottom oms-order-log">
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
