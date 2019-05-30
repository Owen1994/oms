import React, { Component } from 'react';
import { Table, Pagination, Spin } from 'antd';

import Options from './Options';
import { timestampFromat } from '../../../../../util/moment';

class Tablelist extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '序号',
                dataIndex: 'sno',
                // key: 'sno',
                align: 'center',
                width: 60,
                render: (text, record, index) => ++index + (this.props.paginationReducer.current - 1) * this.props.paginationReducer.pageSize
            }, {
                title: '项目流',
                dataIndex: 'projectFlow',
                key: 'projectFlow',
                render: (text, record) => {
                    return (
                        <div className="npd-project-info">
                            <div className="npd-clear">
                                <div className="npd-title">编码：</div>
                                <div className="npd-content">{record.code}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">名称：</div>
                                <div className="npd-content">{record.name}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '业务线',
                dataIndex: 'businessName',
                key: 'businessName',
                align: 'center',
            }, {
                title: '平台名称',
                dataIndex: 'platformName',
                key: 'platformName',
                align: 'center',
            }, {
                title: '销售部门',
                dataIndex: 'sdName',
                key: 'sdName',
                align: 'center',
                render: (text, record) => {
                    return (
                        <div  style={{maxWidth: 120, margin: "0 auto",}}>
                            {record.sdName}
                        </div>
                    )
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                align: 'center',
                render: (text, record) => {
                    return text ? "启用" : <span style={{ color: "red" }}>禁用</span>
                }
            }, {
                title: '新增信息',
                dataIndex: 'createInfo',
                key: 'createInfo',
                align: 'center',
                // width: 440,
                sortOrder: 'descend',
                render: (text, record) => {
                    return (
                        <div className="npd-project-info">
                            <div className="npd-clear">
                                <div className="npd-title">新增人：</div>
                                <div className="npd-content">{record.createName}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">新增时间：</div>
                                <div className="npd-content">{timestampFromat(record.createTime, "yyyy-mm-dd hh:MM:ss")}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '操作',
                dataIndex: 'options',
                key: 'options',
                align: 'center',
                width: 120,
                render: (text, record) => {
                    return (
                        <Options item={record} listFetch={this.props.listFetch} {...this.props} />
                    )
                }
            }
        ]
    }

    render() {
        const { data } = this.props.list_reducer;
        const columns = this.columns;
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listFetch } = this.props;
        return (
            <div>
                <div className="npd-project-table">
                    <Spin spinning={this.props.list_reducer.loading}>
                        <Table
                            bordered
                            size="small"
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                            rowKey={(record, index) => (index)}
                        />
                    </Spin>
                </div>
                <div className="pagination">
                    <Pagination className="pull-right"
                        showTotal={total => `共 ${total} 条`}
                        //pageSizeOptions={page.pageSizeOptions}    // 指定每页可以显示多少条
                        showSizeChanger                             // 是否可以改变 pageSize
                        //defaultCurrent={page.defaultCurrent}      // 默认的当前页数
                        current={current}
                        showQuickJumper={{ goButton: true }}       // 是否可以快速跳转至某页
                        total={total}                             // 数据总数
                        pageSize={pageSize}                       // 每页条数
                        onChange={listFetch}                // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={listFetch}        // pageSize 变化的回调
                        // size="small"
                    />
                </div>
            </div>
        );
    }
}

export default Tablelist;
