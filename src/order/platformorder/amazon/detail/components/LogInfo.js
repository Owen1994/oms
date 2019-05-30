import React, { Component } from 'react';
import { Table, Icon, Pagination } from 'antd';
import { timestampFromat, getUrlParams } from 'util/baseTool'
const imgVerticalLine = require('../img/VerticalLine.png');

/**
 * 订单信息
 */
class LogInfo extends Component {
    state={
        logIconType: 'down',
        pageNumber: 1,
        pageData: 20,
    }
    //日志
    columns_log = [
        {
            title: '序号',
            dataIndex: 'orderNum',
            key: 'orderNum',
            align: 'center',
            render: (text, record, index) => {
                return index + 1;
            }
        }, {
            title: '操作属性',
            dataIndex: 'property',
            key: 'property',
            align: 'center',
        }, {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
        }, {
            title: '描述',
            dataIndex: 'operDesc',
            key: 'operDesc',
            align: 'center',
        }, {
            title: '操作时间',
            dataIndex: 'operateTime',
            key: 'operateTime',
            align: 'center',
            render: (text) => {
                return timestampFromat(text, 2);
            }
        }];

    showLogInfo = () => {
        const { logIconType } = this.state;
        if(logIconType === 'down') {
            this.setState({logIconType: 'up'});
        }else{
            this.setState({logIconType: 'down'});
        }
    }
    
    // 分页变化
    handlePaginationChange = (pageNumber, pageData) => {
        const { orderNumber } = getUrlParams('');
        const params = {
            pageNumber,
            pageData,
            platformOrderNumber: orderNumber,
        };
        this.setState({ pageNumber, pageData });
        this.props.queryAmazonDetailLog({ data: params });
    }

    render() {
        const { amazonLogData } = this.props;
        const { logIconType, pageNumber, pageData } = this.state;
        return (
            <div className="amazon-detail-log-info">
                <p onClick={this.showLogInfo} style={{ marginBottom: 0}}>
                    <img
                        className="amazon-detail-head-img"
                        src={imgVerticalLine}
                        alt=""
                        width="3px"
                        height="12px"
                    />
                    <span className="amazon-detail-head-label">订单日志</span>
                    <Icon style={{float: 'right', margin: '5px 12px 0 0'}} type={logIconType} />
                </p>
                {
                    logIconType === 'up' ? (
                        <div>
                            <Table
                                className="amazon-detail-goods-info-table"
                                columns={this.columns_log}
                                dataSource={amazonLogData.data}
                                pagination={false}
                                bordered
                                size="small"
                                rowKey={(record, index) => index}
                            />
                            <Pagination
                                className="g-rt"
                                showTotal={total => `共 ${total} 条`}
                                pageSizeOptions={['20', '30', '40', '50']}
                                showSizeChanger
                                showQuickJumper={{goButton: true}}
                                current={pageNumber}
                                defaultCurrent={1}
                                total={amazonLogData.total}
                                pageSize={pageData}
                                onChange={this.handlePaginationChange}
                                onShowSizeChange={this.handlePaginationChange}
                                />
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default LogInfo;
