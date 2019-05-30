import React from 'react';
import {
    Icon,
    Table,
    Pagination,
} from 'antd'

import { timestampFromat, getUrlParams } from 'util/baseTool'

export default class Log extends React.Component {
    state = {
        isShow: false,
        pageNumber: 1,
        pageData: 20,
    }
    columns = [
        {
            title: '序号',
            dataIndex: 'key',
            key: 'key',
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: '订单ID',
            dataIndex: 'orderSourceId',
            key: 'orderSourceId',
        },
        {
            title: '操作属性',
            dataIndex: 'operLogger',
            key: 'operLogger',
        },
        {
            title: '操作描述',
            dataIndex: 'operDesc',
            key: 'operDesc',
        },
        {
            title: '操作者',
            dataIndex: 'operator',
            key: 'operator',
        },
        {
            title: '时间',
            dataIndex: 'operatorTime',
            key: 'operatorTime',
            render: (t) => t ? timestampFromat(t, 2) : "--"
        }
    ]
    toggle = () => {
        const { isShow } = this.state;
        if (isShow) {
            this.setState({
                isShow: false
            })
        } else {
            this.setState({
                isShow: true
            })
        }
    }
    
    // 分页变化
    handlePaginationChange = (pageNumber, pageData) => {
        const { id } = getUrlParams(location.href);
        const params = {
            id,
            pageNumber,
            pageData,
        };
        this.setState({ pageNumber, pageData });
        this.props.queryLog(params);
    }
    render() {
        const { columns } = this;
        const { isShow, pageNumber, pageData } = this.state;
        const { list } = this.props;
        return (
            <div className="joom-detail-warp">
                <div className="joom-detail-title" onClick={this.toggle}>
                    操作日志
                    <div className="joom-detail-toggle">
                        {
                            isShow ?
                                <Icon type="up" />
                                :
                                <Icon type="down" />
                        }
                    </div>
                </div>
                {
                    isShow ? <div>
                    <Table
                        size="small"
                        columns={columns}
                        dataSource={list.data}
                        pagination={false}
                        bordered={true}
                    />
                    <Pagination
                        className="g-rt"
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        showQuickJumper={{goButton: true}}
                        current={pageNumber}
                        defaultCurrent={1}
                        total={list.total}
                        pageSize={pageData}
                        onChange={this.handlePaginationChange}
                        onShowSizeChange={this.handlePaginationChange}
                        />
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}