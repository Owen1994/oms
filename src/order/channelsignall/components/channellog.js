import React from 'react';
import {
    Table,
    Button,
    Icon,
    Pagination,
} from 'antd';
import { getUrlParams, timestampFromat } from 'util/baseTool';
import { fetchPost } from 'util/fetch';

export default class ChannelLog extends React.Component {
    
    state = {
        pageNumber: 1,
        pageData: 20,
        logData: [],
        showLog: false,
        loading: false,
    }

    componentDidMount(){
        this.handleQueryLog();
    }

    columns = [
        {
            title: '操作属性',
            dataIndex: 'attribute',
            key: 'attribute',
        },
        {
            title: '描述',
            dataIndex: 'msg',
            key: 'msg',
        },
        {
            title: '操作用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '操作时间',
            dataIndex: 'time',
            key: 'time',
            render: text => timestampFromat(text, 2),
        },
    ];

    // 日志查询
    handleQueryLog = (pageNumber = 1, pageData = 20) => {
        const { orderId } = getUrlParams();
        const params = {
            pageNumber,
            pageData,
            newChannelCode: orderId,
        }
        this.setState({ loading: true });
        fetchPost('/oms/order/manage/motan/IOrderManageConfigApi/queryChannelLog', { data: params }, 2)
            .then(res => {
                if(res.state === '000001') {
                    this.setState({
                        pageNumber,
                        pageData,
                        logData: res.data,
                        loading: false,
                    });
                }
            });
    }

    // 日志展示与隐藏
    handleBtnClick = () => {
        this.setState({ showLog: !this.state.showLog });
    }

    render (){
        const { pageNumber, pageData, logData, showLog, loading } = this.state;
        return(
            <div className="channel-log">
                <Button onClick={this.handleBtnClick}>{showLog ? '隐藏日志' : '展开日志'} <Icon type={showLog ? 'up' : 'down'} /></Button>
                {
                    showLog ? (
                        <div className="margin-ss-top">
                            <Table
                                columns={this.columns}
                                pagination={false}
                                dataSource={logData.data}
                                bordered
                                loading={loading}
                            />
                            <Pagination
                                className="g-rt"
                                showTotal={total => `共 ${total} 条`}
                                pageSizeOptions={['20', '30', '40', '50']}
                                showSizeChanger
                                showQuickJumper={{goButton: true}}
                                current={pageNumber}
                                defaultCurrent={1}
                                total={logData.total}
                                pageSize={pageData}
                                onChange={this.handleQueryLog}
                                onShowSizeChange={this.handleQueryLog}
                                />
                        </div>
                    ) : null
                }
            </div>

        );
    }
}