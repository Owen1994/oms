import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Table, Pagination, Spin, message } from 'antd';

import { page } from '../../../../constants';

import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';
import { timestampFromat } from '../../../../utils';
import Tableitem from '../../../components/Tableitem';

class App extends Component {
    static contextTypes = {
        router: PropTypes.object,
    }

    columns = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            align: 'center',
            width: 120
        }, {
            title: 'SPU',
            dataIndex: 'spu',
            width: 120
        }, {
            title: '产品中文名称',
            dataIndex: 'productChinessName',
            width: 120
        }, {
            title: '审核次数',
            dataIndex: 'reviewTimes',
            width: 120
        }, {
            title: '审核状态',
            dataIndex: 'reviewStatus',
            width: 120
        }, {
            title: '审核人员',
            dataIndex: 'reviewers',
            width: 120
        }, {
            title: '审核时间',
            dataIndex: 'reviewTime',
            width: 120,
            render: text => timestampFromat(text, 'yyyy-mm-dd hh:MM:ss')
        }, {
            title: '操作',
            width: 120,
            render: (text, record) => {
                let options = [
                    {
                        name: '日志',
                        onChange: () => { this.props.onChangeModal('logVisible', '日志', record) },
                        funcId: '007-000004-000002-004',
                        subs: []
                    }
                ]
                if (record.reviewStatus === '待审核') {
                    const obj = {
                        name: "审核",
                        onChange: () => {
                            this.context.router.history.push({
                                pathname: '/compliance/handle/baseInfo/detail/',
                                search: `?id=${record.id}`,
                            })
                        },
                        funcId: '007-000004-000002-002',
                        subs: []
                    }
                    options.splice(0, 0, obj);
                }
                return (
                    <Tableoption {...this.props} options={options} isRender/>
                )
            }
        }
    ]

    render() {
        const { data, loading } = this.props.list_reducer;
        const { total, current, pageSize } = this.props.paginationReducer;
        const { onSelectChange,selectedIds, selectedRowKeys, listFetch } = this.props;
        const btnOptions = {
            left: [
            ],
            right: [{
                name: '导出',
                type: 'button',
                icon: 'plus',
                funcId: '007-000004-000002-003',
                onChange: () => {
                    this.props.export(selectedIds)
                },
            }]
        }
        const rowSelection = {
            selectedRowKeys,
            onChange: onSelectChange,
        };
        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500}>
                    <div className="table">
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
                            rowSelection={rowSelection}
                        />
                    </div>
                    <div className="pagination">
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
            </div>
        );
    }
}

export default App;
