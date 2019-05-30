import React, { Component } from 'react';
import { Table, Pagination, Spin } from 'antd';

import Options from './Options';
import { timestampFromat } from '../../../../../util/moment';

class Tablelist_user extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '序号',
                dataIndex: 'sno',
                // key: 'sno',
                align: 'center',
                width: 60,
                render: (text, record, index) => index+1
            }, {
                title: '用户信息',
                dataIndex: 'userInfo',
                key: 'userInfo',
                render: (text, record) => {
                    return (
                        <div className="npd-usermanagement-info">
                            <div className="npd-clear">
                                <div className="npd-title">用户名：</div>
                                <div className="npd-content">{record.userName}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">姓名：</div>
                                <div className="npd-content">{record.name}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">职位：</div>
                                <div className="npd-content">{record.positionName}</div>
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
                title: '平台组',
                dataIndex: 'platformName',
                key: 'platformName',
                align: 'center',
            }, {
                title: '用户组',
                dataIndex: 'userGroupName',
                key: 'userGroupName',
                align: 'center',
            }, {
                title: '上级',
                dataIndex: 'superiorUserName',  //这是上级用户名字段，上级姓名是superiorName
                key: 'superiorUserName',
                align: 'center',
            }, {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                align: 'center',
                render: (text, record) => {
                    return (text === 1) ? "启用" : <span style={{ color: "red" }}>禁用</span>
                }
            }, {
                title: '修改信息',
                dataIndex: 'createInfo',
                key: 'createInfo',
                align: 'center',
                // width: 440,
                sortOrder: 'descend',
                render: (text, record) => {
                    return (
                        <div className="npd-usermanagement-info" style={{ marginLeft: "20%" }}>
                            <div className="npd-clear">
                                <div className="npd-title">修改人：</div>
                                <div className="npd-content">{record.createName}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">修改时间：</div>
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
                        <Options item={record} listFetch1={this.props.listFetch1} {...this.props} />
                    )
                }
            }
        ]
    }

    render() {
        const columns = this.columns;
        const { page, pageSize, userDatas, onSearch } = this.props;
        const total = userDatas.data.total || 0;
        return (
            <div className="white margin-ss-top padding-xm">
                <div>
                    <Spin spinning={userDatas.loading}>
                        <Table
                            bordered
                            columns={columns}
                            dataSource={userDatas.data.list}
                            pagination={false}
                            rowKey={(record, index) => (index)}
                        />
                    </Spin>
                </div>
                <div>
                    <Pagination className="pull-right"
                        showTotal={total => `共 ${total} 条`}
                        current={page}
                        total={total}                             // 数据总数
                        pageSize={pageSize}                       // 每页条数
                        onChange={(page, pageSize) => onSearch(page, pageSize)}                // 页码改变的回调，参数是改变后的页码及每页条数
                        // size="small"
                    />
                </div>
            </div>
        );
    }
}

export default Tablelist_user;
