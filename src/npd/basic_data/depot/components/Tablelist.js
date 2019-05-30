import React, { Component } from 'react';
import { Table, Pagination, Row, Col, Spin } from 'antd';
import { timestampFromat } from '../../../../util/moment';

import Options from './Options';

class List extends Component {

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
                title: '仓库信息',
                dataIndex: 'depot',
                key: 'depot',
                render: (text, record) => {
                    return (
                        <div className="npd-depot-table-col">
                            <div className="npd-clear">
                                <div className="npd-title2">编码：</div>
                                <div className="npd-content2">{record.code}</div>
                                <div className="npd-title2">性质：</div>
                                <div className="npd-content3">{record.nature}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title2">名称：</div>
                                <div className="npd-content2">{record.name}</div>
                                <div className="npd-title2">分类：</div>
                                <div className="npd-content3">{record.classification}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '国家',
                dataIndex: 'country',
                key: 'country',
                align: 'center',
                // render: (text, record) => {
                //     return (
                //         <div  style={{maxWidth: 80, margin: "0 auto",}}>
                //             {record.country}
                //         </div>
                //     )
                // }
            }, {
                title: '负责人',
                dataIndex: 'uName',
                key: 'uName',
                align: 'center',
                render: (text, record) => {
                    return (
                        <div  style={{maxWidth: 80, margin: "0 auto",}}>
                            {record.uName}
                        </div>
                    )
                }
            }, {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
                align: 'center',
                render: (text, record) => {
                    return (
                        <div  style={{maxWidth: 100, margin: "0 auto", textAlign:'left',wordWrap: 'break-word',wordBreak: 'normal',}}>
                            {record.address}
                        </div>
                    )
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                align: 'center',
                render: (text, record) => {
                    return (
                        <div>
                            {
                                text === 1 ? '启用' : <span style={{ color: "red" }}>禁用</span>
                            }
                        </div>
                    )
                }
            }, {
                title: '新增信息',
                dataIndex: 'createInfo',
                key: 'createInfo',
                width: 200,
                render: (text, record) => {
                    return (
                        <div className="npd-depot-table-col">
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
                        <Options {...this.props} item={record} listFetch={this.props.listFetch} />
                    )
                }
            }
        ]
    }

    // componentDidMount() {
    //     this.props.listFetch();
    // };

    render() {
        const { data } = this.props.list_reducer;
        const columns = this.columns;
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listFetch } = this.props;
        return (
            <div>
                <div className="npd-depot-table">
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
                        showSizeChanger                             // 是否可以改变 pageSize
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

export default List;
