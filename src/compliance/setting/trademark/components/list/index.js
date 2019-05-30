import React, { Component } from 'react';
import { Table, Pagination, message, Row, Col } from 'antd';

import Options from './options';
import { page } from '../../../../configs';
import { getStateName, timestampFromat } from '../../../../utils';
import { useState, active, grade } from '../../../../data';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.list_reducer.data,
        };
        this.columns = [
            {
                title: '商标商品分类代码',
                dataIndex: 'code',
                key: 'code',
                align: 'center'
            }, {
                title: '商标商品分类',
                dataIndex: 'name',
                key: 'name',
                align: 'center'
            }, {
                title: '基础资料分类',
                dataIndex: 'class',
                key: 'class',
                align: 'center',
                render: (text, record) => (
                    <span>{text ? text : '--'}</span>
                )
            }, {
                title: '最新修改人员',
                dataIndex: 'editions',
                key: 'editions',
                align: 'center',
                render: (text, record) => (
                    <span>{text ? text : '--'}</span>
                )
            }, {
                title: '最新修改时间',
                dataIndex: 'editTime',
                key: 'editTime',
                align: 'center',
                render: (text, record) => (
                    <span>{text ? timestampFromat(text, 'yyyy-mm-dd hh:MM:ss') : '--'}</span>
                )
            }, {
                title: '操作',
                dataIndex: 'options',
                key: 'options',
                width: 120,
                render: (text, record) => {
                    return (
                        <Options {...this.props} listFetch={this.props.listFetch} id={ record.id } code={ record.code } />
                    )
                }
            }
        ]
    }

    componentDidMount() {
        this.props.listFetch();
    };

    render() {
        const { data } = this.props.list_reducer;
        const columns = this.columns;
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listFetch } = this.props;
        return (
            <div>
                <div className="table">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        rowKey={(record, index) => (index)}
                        size="small" />
                </div>
                <div className="pagination">
                    <Pagination className="pull-right"
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={page.pageSizeOptions}    // 指定每页可以显示多少条
                        showSizeChanger                             // 是否可以改变 pageSize
                        defaultCurrent={page.defaultCurrent}      // 默认的当前页数
                        current={current}
                        showQuickJumper                             // 是否可以快速跳转至某页
                        total={total}                             // 数据总数
                        pageSize={pageSize}                       // 每页条数
                        onChange={listFetch}                // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={listFetch}        // pageSize 变化的回调
                    />
                </div>
            </div>
        );
    }
}

export default List;
