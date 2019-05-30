import React, { Component } from 'react';
import { Table, Pagination, Spin } from 'antd';

import Options3 from './Options3';
import { timestampFromat } from '../../../../../util/moment';

class Tablelist_usergroup extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '序号',
                dataIndex: 'sno',
                // key: 'sno',
                align: 'center',
                width: 60,
                render: (text, record, index) => ++index + (this.props.paginationReducer3.current - 1) * this.props.paginationReducer3.pageSize
            }, {
                title: '部门编码',
                dataIndex: 'code',
                key: 'code',
                align: 'center',
            }, {
                title: '业务线',
                dataIndex: 'businessName',
                key: 'businessName',
                align: 'center',
            }, {
                title: '用户组',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
            }, {
                title: '平台',
                dataIndex: 'platformName',
                key: 'platformName',
                align: 'center',
            }, {
                title: '添加信息',
                dataIndex: 'createInfo',
                key: 'createInfo',
                align: 'center',
                // width: 440,
                sortOrder: 'descend',
                render: (text, record) => {
                    return (
                        <div className="npd-usermanagement-info" style={{ marginLeft: "20%" }}>
                            <div className="npd-clear">
                                <div className="npd-title">添加人：</div>
                                <div className="npd-content">{record.createName}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">添加时间：</div>
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
                        <Options3 item={record} {...this.props} />
                    )
                }
            }
        ]
    }

    componentDidMount() {
        this.props.listFetch3();
    };

    render() {
        const { data } = this.props.list_reducer3;
        const columns = this.columns;
        const { total, current, pageSize } = this.props.paginationReducer3;
        const { listFetch3 } = this.props;
        return (
            <div>
                <div className="npd-user_manage_table">
                    <Spin spinning={this.props.list_reducer3.loading}>
                        <Table
                            bordered
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
                        //pageSizeOptions={page.pageSizeOptions}    // 指定每页可以显示多少条
                        showSizeChanger                             // 是否可以改变 pageSize
                        //defaultCurrent={page.defaultCurrent}      // 默认的当前页数
                        current={current}
                        showQuickJumper                             // 是否可以快速跳转至某页
                        total={total}                             // 数据总数
                        pageSize={pageSize}                       // 每页条数
                        onChange={listFetch3}                // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={listFetch3}        // pageSize 变化的回调
                        // size="small"
                    />
                </div>
            </div>
        );
    }
}

export default Tablelist_usergroup;
