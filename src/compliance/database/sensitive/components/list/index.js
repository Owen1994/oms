import React, { Component } from 'react';
import { Table, Pagination, message, Row, Col } from 'antd';

import Options from './options';
import { page, config } from '../../../../../constants';
import { getStateName, angentPicUrl } from '../../../../../utils';
import { popUpImage } from '../../../../../util/baseTool';
import { useState, active, grade } from '../../../../data';
import Tableitem from '../../../../../components/Tableitem';

class List extends Component {
    componentDidMount() {
        this.props.listFetch();
    };

    columns = [
        {
            title: '商标名',
            dataIndex: 'sensitive',
            key: 'sensitive',
            align: 'center',
            width: 60,
        }, {
            title: '禁售信息',
            dataIndex: 'disableInfo',
            align: 'center',
            width: 140,
            render: (text, record) => {
                return (
                    <div className='disableInfo separate'>
                        <p><span>知产代码：</span>{record.intellectualCode}</p>
                        {
                            record.disableInfo ?
                                record.disableInfo.map((item, index) => {
                                    return (
                                        <p key={index}><span>{item.sensitiveLayer}：</span>{item.platformSite}</p>
                                    )
                                }) : null
                        }
                    </div>
                )
            }
        }, {
            title: '注册信息',
            dataIndex: 'sensitiveInfo',
            key: 'sensitiveInfo',
            algin: 'left',
            width: 150,
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p className="breakwrod" style={{textIndent:'2em'}}>注册国家：{record.country}</p>
                        <p className="breakwrod" style={{textIndent:'3em'}}>权利人：{record.obligee}</p>
                        <p className="breakwrod" style={{textIndent:'3em'}}>商标号：{record.trademarkNumber}</p>
                        <p className="breakwrod">商标商品分类：{record.trademark}</p>
                    </div>
                )
            }
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            width: 100,
            render: (text, record) => {
                return (
                    <div className="separate">
                        <p><span>活跃状态：</span>{getStateName(record.activeState, active)}</p>
                        <p><span>使用状态：</span>{getStateName(record.useState, useState)}</p>
                    </div>
                )
            }
        }, {
            title: '其他信息',
            dataIndex: 'trademarkInfo',
            key: 'trademarkInfo',
            width: 120,
            render: (text, record) => {
                let infringementsEvading;
                switch (record.infringementsEvading) {
                    case 1:
                        infringementsEvading = "删除";
                        break;
                    case 2:
                        infringementsEvading = "增加前缀";
                        break;
                    case 3:
                        infringementsEvading = "替换";
                        break;
                }

                return (
                    <div>
                        <Tableitem
                            title="是否授权"
                            content={record.isInfringements == 1 ? "已授权" : "未授权"}
                            left={70}
                            right={70}
                        />
                        <Tableitem
                            title="侵权规避"
                            content={infringementsEvading}
                            left={70}
                            right={70}
                        />
                        <Tableitem
                            title="来源"
                            content={record.source}
                            left={70}
                            right={70}
                        />
                        <div className="clear"></div>
                    </div>
                )
            }
        }, {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            align: 'center',
            width: 80,
            render: (text, record) => {
                let defaultUrl = config.defaultImg;
                const src = text ? angentPicUrl(text) : defaultUrl;
                return (
                    <img className="pointer" onClick={()=>popUpImage(src,true)} src={src} width={58} height={50}
                        onError={() => {
                            record.figureLogoPic = defaultUrl
                            this.forceUpdate()
                        }}
                    />
                )
            }
        }, {
            title: '图片类型',
            dataIndex: 'imgType',
            key: 'imgType',
            align: 'center',
            width: 60,
            render: (text, record) => (
                <span>{text ? text : '--'}</span>
            )
        }, {
            title: '操作',
            dataIndex: 'options',
            key: 'options',
            width: 70,
            render: (text, record) => {
                return (
                    <Options {...this.props} useState={this.useState} listFetch={this.props.listFetch} item={record} />
                )
            }
        }
    ]

    render() {
        const { data } = this.props.list_reducer;
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listFetch, rowSelection } = this.props;
        return (
            <div>
                <div className="table">
                    <Table
                        rowSelection={rowSelection}
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
