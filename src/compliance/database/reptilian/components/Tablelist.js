import React, { Component } from 'react';

import { Table, Pagination, Spin} from 'antd';

import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';

import { page } from '../../../../constants';
import { getStateName, timestampFromat } from '../../../../utils';


import {options} from "../../../data";

class App extends Component {
    componentDidMount() {
        this.props.listFetch();
    };

    columns = [
        {
            title: '处理人员',
            dataIndex: 'options',
            align: 'center'
        },{
            title: '处理时间',
            dataIndex: 'optionTime',
            align: 'center',
            render: (text, record) => {
                return (
                    <span>{timestampFromat(text, 'yyyy-mm-dd hh:MM:ss')}</span>
                )
            }
        },{
            title: '处理状态',
            dataIndex: 'state',
            align: 'center',
            render: (text, record) => {
                return (
                    <span>{getStateName(record.state, options)}</span>
                )
            }
        },{
            title: '获取数量',
            dataIndex: 'getSum',
            align: 'center'
        },{
            title: '处理完成时间',
            dataIndex: 'optionCompleteTime',
            align: 'center',
            render: (text, record) => {
                return (
                    <span>{timestampFromat(text, 'yyyy-mm-dd hh:MM:ss')}</span>
                )
            }
        },{
            title: '失败原因',
            dataIndex: 'optionReason',
            align: 'center',
            render: (text, record) => (
                <span>{text ? text : '--'}</span>
            )
        }, {
            title: '操作',
            dataIndex: 'option',
            align: 'center',
            render: (text, record) => {
                let options = [
                    {
                        name: "查看配置",
                        onChange: () => this.props.onChangeModal('seeVisible', true, record),
                        funcId: "007-000001-000001-000001-001",
                        subs: []
                    }
                ];
                return (
                    <Tableoption {...this.props} options={ options }/>
                )
            }
        }
    ]

    render() {
        const { data, loading } = this.props.list_reducer;
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listFetch } = this.props;
        const btnOptions = {
            left: [
                {
                    name: '返回词库',
                    type: 'link',
                    icon: 'arrow-left',
                    funcId: '007-000001-000001-000001-001',
                    url: '/compliance/database/sensitive/'
                }
            ],
            right: [
                {
                    name: '爬虫参数配置',
                    onChange: () => this.props.onChangeModal('reptilianVisible', true),
                    type: 'button',
                    icon: 'tool',
                    funcId: '007-000001-000001-000001-002',
                }
            ],
        }
        return (
            <Spin spinning={loading} delay={500}>
                <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                    <BtnOperation
                        btnOptions={btnOptions}
                        {...this.props}
                    />
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={data}
                        rowKey={(record, index) => (index)}
                        pagination={false}
                    />
                    <Pagination
                        className="pull-right"
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={page.pageSizeOptions}      // 指定每页可以显示多少条
                        showSizeChanger                             // 是否可以改变 pageSize
                        defaultCurrent={page.defaultCurrent}        // 默认的当前页数
                        current={current}
                        showQuickJumper                             // 是否可以快速跳转至某页
                        total={total}                               // 数据总数
                        pageSize={pageSize}                         // 每页条数
                        onChange={listFetch}                        // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={listFetch}                // pageSize 变化的回调
                    />
                </div>
            </Spin>
        );
    }
}

export default App;
