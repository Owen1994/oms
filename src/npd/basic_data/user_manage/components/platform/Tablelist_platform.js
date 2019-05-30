import React, { Component } from 'react';
import { Table, Pagination, Spin } from 'antd';

import Options2 from './Options2';
import { timestampFromat } from '../../../../../util/moment';

class Tablelist_platform extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '序号',
                dataIndex: 'sno',
                // key: 'sno',
                align: 'center',
                width: 60,
                render: (text, record, index) => ++index + (this.props.paginationReducer2.current - 1) * this.props.paginationReducer2.pageSize
            }, {
                title: '平台编码',
                dataIndex: 'code',
                key: 'code',
                align: 'center',
            }, {
                title: '平台名称',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
            }, {
                title: '添加人',
                dataIndex: 'createName',
                key: 'createName',
                align: 'center',
            }, {
                title: '添加时间',
                dataIndex: 'createTime',
                key: 'createTime',
                align: 'center',
                render: (text, record) => {
                    return timestampFromat(record.createTime, "yyyy-mm-dd hh:MM:ss")
                }
            }, {
                title: '操作',
                dataIndex: 'options',
                key: 'options',
                align: 'center',
                width: 120,
                render: (text, record) => {
                    return (
                        <Options2 item={record} listFetch2={this.props.listFetch2}  {...this.props}/>
                    )
                }
            }
        ]
    }

    componentDidMount() {
        this.props.listFetch2();
    }

    render() {
        const { data } = this.props.list_reducer2;
        const columns = this.columns;
        const { total, current, pageSize } = this.props.paginationReducer2;
        const { listFetch2 } = this.props;
        return (
            <div>
                <div className="npd-user_manage_table">
                    <Spin spinning={this.props.list_reducer2.loading}>
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
                        onChange={listFetch2}                // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={listFetch2}        // pageSize 变化的回调
                        // size="small"
                    />
                </div>
            </div>
        );
    }
}

export default Tablelist_platform;
