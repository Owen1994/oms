import React, { Component } from 'react';
import { Table, Pagination, message, Row, Col } from 'antd';

import Options from './options';
import { page } from '../../../../configs';
import { getStateName } from '../../../../utils';
import { useState, grade, getSinsitiveReason } from '../../../../data';
import Tableitem from '../../../../components/Tableitem';

class List extends Component {
    componentDidMount() {
        this.props.listFetch();
    };

    columns = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            align: 'center',
            width: 120
        },{
            title: '是否敏感',
            dataIndex: 'isSensitive',
            key: 'isSensitive',
            align: 'center',
            width: 100
        },  {
            title: '产品信息',
            dataIndex: 'productInfo',
            key: 'productInfo',
            width: 240,
            render: (text, record) => {

                return (
                    <div className="colon-separate">
                        <p><span>SPU：</span>{record.spu}</p>
                        <p><span>产品中文名称：</span>{record.skuName}</p>
                        <p><span>使用状态：</span>{getStateName(record.useState, useState)}</p>
                    </div>
                )
            }
        }, {
            title: '知产代码',
            dataIndex: 'intellectualCode',
            key: 'intellectualCode',
            width: 100
        }, {
            title: '禁售信息',
            key: 'disableInfo',
            dataIndex: 'disableInfo',
            width: 240,
            render: (t) => {
                return (
                    <div className="colon-separate">
                        {
                            t && Array.isArray(t) && t.map((v,index) => <p key={index}><span>{v.sensitiveLayer}：</span>{v.platformSite}</p>)
                        }
                    </div>
                )
            }
        }, {
            title: '敏感原因',
            dataIndex: 'reason',
            key: 'reason',
            width: 240,
            render: (t) => {
                return (
                    <div className="colon-separate">
                        {
                            t && Array.isArray(t) && t.map((v, index) => <p key={v.id}><span>{getSinsitiveReason[v.id].name}：</span>{v.remarks}</p>)
                        }
                    </div>
                )
                // 
            }
        }, {
            title: '操作',
            dataIndex: 'options',
            key: 'options',
            width: 120,
            render: (text, record) => {
                return (
                    <Options {...this.props} item={record} listFetch={this.props.listFetch} />
                )
            }
        }
    ]

    render() {
        const { data } = this.props.list_reducer;
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listFetch } = this.props;
        return (
            <div>
                <div className="table">
                    <Table
                        rowSelection={this.props.rowSelection}
                        bordered
                        columns={this.columns}
                        dataSource={data}
                        pagination={false}
                        rowKey={(record, index) => (record.id)}
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
