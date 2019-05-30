import React, { Component } from 'react';
import { Table, Pagination, Row, Col, Spin, Tooltip } from 'antd';

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
                title: '项目流信息',
                dataIndex: 'projectFlow',
                key: 'projectFlow',
                render: (text, record) => {
                    return (
                        <div className="npd-audit-info">
                            <div className="npd-clear">
                                <div className="npd-title2">编码：</div>
                                <div className="npd-content2">{record.projectCode}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title2">名称：</div>
                                <div className="npd-content2">{record.projectName}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '热销新品申请',
                dataIndex: 'rxNewprojects',
                key: 'rxNewprojects',
                align: 'center',
                // width: 170,
                render: (text, record) => {
                    return (
                        <div className="npd-audit-info">
                            <div className="npd-clear">
                                <div className="npd-title">销售主管审核：</div>
                                <Tooltip placement="bottom" title={record.hpaDirector}>
                                    <div className="npd-content-ellipsis">{record.hpaDirector}</div>
                                </Tooltip>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">销售经理审核：</div>
                                <div className="npd-content">{record.hpaManager}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '新品立项列表',
                dataIndex: 'buildNewprojects',
                key: 'buildNewprojects',
                align: 'center',
                // width: 170,
                render: (text, record) => {
                    return (
                        <div className="npd-audit-info">
                            <div className="npd-clear">
                                <div className="npd-title">开发经理审核：</div>
                                <div className="npd-content">{record.npDManager}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">开发总监审核：</div>
                                <div className="npd-content">{record.npDDirector}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">销售主管审核：</div>
                                <Tooltip placement="bottom" title={record.npDSalers}>
                                    <div className="npd-content-ellipsis">{record.npDSalers}</div>
                                </Tooltip>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">销售经理审核：</div>
                                <div className="npd-content">{record.npSManager}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '样品表',
                dataIndex: 'sampleList',
                key: 'sampleList',
                align: 'center',
                width: 140,
                render: (text, record) => {
                    return (
                        <div className="npd-audit-info">
                            <div className="npd-clear">
                                <div className="npd-title">开发经理审核：</div>
                                <div className="npd-content">{record.sDManager}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '新品交接表',
                dataIndex: 'newProjectConnectList',
                key: 'newProjectConnectList',
                align: 'center',
                // width: 140,
                render: (text, record) => {
                    return (
                        <div className="npd-audit-info">
                            <div className="npd-clear">
                                <div className="npd-title">开发总监审核：</div>
                                <div className="npd-content">{record.hoDDirector}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">销售经理审核：</div>
                                <div className="npd-content">{record.hoDManager}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">产权确认：</div>
                                <div className="npd-content">{record.hoConfirmation}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">销售总监审核：</div>
                                <div className="npd-content">{record.hoSDirector}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">物流专员：</div>
                                <div className="npd-content">{record.hoLogistics}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '生成SKU列表',
                dataIndex: 'skuList',
                key: 'skuList',
                align: 'center',
                // width: 170,
                render: (text, record) => {
                    return (
                        <div className="npd-audit-info">
                            <div className="npd-clear">
                                <div className="npd-title">开发确认：</div>
                                <div className="npd-content">{record.csiDeveloper}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">销售主管确认：</div>
                                <Tooltip placement="bottom" title={record.csiSManager}>
                                    <div className="npd-content-ellipsis">{record.csiSManager}</div>
                                </Tooltip>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">知产确认：</div>
                                <div className="npd-content">{record.csiKConfirm}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '首单申请表',
                dataIndex: 'firstApplyList',
                key: 'firstApplyList',
                align: 'center',
                // width: 170,
                render: (text, record) => {
                    return (
                        <div className="npd-audit-info">
                            <div className="npd-clear">
                                <div className="npd-title">销售主管审核：</div>
                                <Tooltip placement="bottom" title={record.faSalers}>
                                    <div className="npd-content-ellipsis">{record.faSalers}</div>
                                </Tooltip>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">销售经理审核：</div>
                                <div className="npd-content">{record.faSManager}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">销售总监审核：</div>
                                <div className="npd-content">{record.faSDirector}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '添加信息',
                dataIndex: 'createInfo',
                key: 'createInfo',
                align: 'center',
                width: 220,
                sortOrder: 'descend',
                render: (text, record) => {
                    return (
                        <div className="npd-audit-info">
                            <div className="npd-clear">
                                <div className="npd-title4">添加人：</div>
                                <div className="npd-content4">{record.createName}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title4">添加时间：</div>
                                <div className="npd-content4">{timestampFromat(record.createTime, "yyyy-mm-dd hh:MM:ss")}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                align: 'center',
                width: 60,
                render: (text, record) => {
                    return text === 1 ? "启用" : <span style={{ color: "red" }}>禁用</span>
                }
            }, {
                title: '操作',
                dataIndex: 'options',
                key: 'options',
                align: 'center',
                width: 80,
                render: (text, record) => {
                    const { list_reducer, list_fetch2, list_fetch3 } = this.props;
                    return (
                        <Options item={record} 
                                listFetch={this.props.listFetch} 
                                list_fetch3={list_fetch3} 
                                list_reducer={list_reducer} 
                                list_fetch2={list_fetch2}
                                {...this.props}
                        />
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
                <div className="npd-audit-table">
                    <Spin spinning={this.props.list_reducer.loading}>
                        <Table
                            bordered
                            size="small"
                            scroll={{x: 1860}}
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                            rowKey={(record, index) => (index)}
                        />
                    </Spin>
                </div>
                <div>
                    <Pagination className="pull-right"
                        showTotal={total => `共 ${total} 条`}
                        showSizeChanger                             // 是否可以改变 pageSize
                        current={current}
                        showQuickJumper={{goButton: true}}                             // 是否可以快速跳转至某页
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
