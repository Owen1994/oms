import React, { Component } from 'react';
import { Table, Pagination, Spin } from 'antd';

import { page } from '../../../../constants';
import { getStateName } from '../../../../utils';
import { bindingState } from '../constants';

import Tableitem from '../../../../components/Tableitem';
import Tableoption from '../../../../components/Tableoption';


class App extends Component {
    columns = [
        {
            title: '卖家账号',
            dataIndex: 'sellerAccount',
            width: 100,
        }, {
            title: '平台',
            dataIndex: 'platform',
            width: 100,
        }, {
            title: '绑定邮箱',
            dataIndex: 'binding',
            width: 200,
            render: (text, record) => (
                <div>
                    <Tableitem
                        title="主"
                        content={
                            record.emailBinding[0].status
                                ? `${record.emailBinding[0].email}（${getStateName(record.emailBinding[0].status, bindingState, 'code')}）`
                                : '（未绑定）'
                        }
                        left={30}
                        right={250}
                    />
                    <Tableitem
                        title="辅"
                        content={
                            record.emailBinding[1].status
                                ? `${record.emailBinding[1].email}（${getStateName(record.emailBinding[1].status, bindingState, 'code')}）`
                                : '（未绑定）'
                        }
                        left={30}
                        right={250}
                    />
                </div>
            ),
        }, {
            title: '操作',
            width: 120,
            render: (text, record) => {
                const examineSubs = [
                    {
                        name: '主邮箱',
                        onChange: () => this.props.onChangeToExamine(record.emailBinding[0].bindingEmailId),
                    }, {
                        name: '辅邮箱',
                        onChange: () => this.props.onChangeToExamine(record.emailBinding[1].bindingEmailId),
                    },
                ];
                const editSubs = [
                    {
                        name: '主邮箱',
                        onChange: () => this.props.onChangeBinding(record, '编辑主邮箱', 1, 1),
                    }, {
                        name: '辅邮箱',
                        onChange: () => this.props.onChangeBinding(record, '编辑辅邮箱', 1, 2),
                    },
                ];
                const mainEmailStatus = record.emailBinding[0].status;
                const subEmailStatus = record.emailBinding[1].status;
                // 主邮箱未绑定
                if ((mainEmailStatus === 1 || mainEmailStatus === undefined) && (subEmailStatus !== 1 || subEmailStatus !== undefined)) {
                    editSubs.splice(0, 1);
                } else
                // 辅邮箱未绑定
                if ((mainEmailStatus !== 1 || mainEmailStatus !== undefined) && (subEmailStatus === 1 || subEmailStatus === undefined)) {
                    editSubs.splice(1, 1);
                }
                // 主邮箱是待审核状态
                if (mainEmailStatus === 2 && subEmailStatus !== 2) {
                    examineSubs.splice(1, 1);
                } else
                // 辅邮箱是待审核状态
                if (mainEmailStatus !== 2 && subEmailStatus === 2) {
                    examineSubs.splice(0, 1);
                }
                let options = [
                    {
                        name: '绑定',
                        onChange: () => this.props.onChangeBinding(record, '绑定邮箱', 2),
                        funcId: '009-000001-000001-003',
                        subs: [],
                    }, {
                        name: '编辑',
                        funcId: '009-000001-000001-002',
                        onChange: () => this.props.onChangeBinding(record, '编辑邮箱', 1),
                        subs: editSubs,
                    }, {
                        name: '审核',
                        onChange: null,
                        funcId: '009-000001-000001-004',
                        subs: examineSubs,
                    }, {
                        name: '新增绑定',
                        onChange: () => this.props.onChangeBinding(record, '新增绑定邮箱', 2),
                        funcId: '009-000001-000001-003',
                        subs: [],
                    }, {
                        name: '绑定记录',
                        onChange: () => this.props.onChangeBindingLog(record),
                        funcId: '009-000001-000001-005',
                        subs: [],
                    },
                ];
                // 主、辅邮箱都是未绑定状态
                if ((mainEmailStatus === 1 || mainEmailStatus === undefined) && (subEmailStatus === 1 || subEmailStatus === undefined)) {
                    options.splice(1, 4);
                } else
                // 主/辅是待审核状态
                if (mainEmailStatus === 2 || subEmailStatus === 2) {
                    options.splice(0, 1);
                } else
                // 主、辅邮箱都是非待审核状态
                if (mainEmailStatus !== 2 && subEmailStatus !== 2) {
                    options.splice(0, 1);
                    options.splice(1, 1);
                } else {
                    options = [];
                }
                return (
                    <Tableoption
                        {...this.props}
                        isRender
                        options={options}
                        visibleOptionsLength={3}
                    />
                );
            },
        },
    ]

    componentDidMount() {
        this.props.listFetch();
    }

    render() {
        const { data, loading } = this.props.listReducer;
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listFetch } = this.props;
        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500}>
                    <div className="table">
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data}
                            rowKey={(record, index) => (index)}
                            pagination={false}
                        />
                    </div>
                    <div className="pagination">
                        <Pagination
                            className="pull-right"
                            showTotal={totals => `共 ${totals} 条`}
                            pageSizeOptions={page.pageSizeOptions} // 指定每页可以显示多少条
                            showSizeChanger // 是否可以改变 pageSize
                            defaultCurrent={page.defaultCurrent} // 默认的当前页数
                            current={current}
                            showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                            total={total} // 数据总数
                            pageSize={pageSize} // 每页条数
                            onChange={listFetch} // 页码改变的回调，参数是改变后的页码及每页条数
                            onShowSizeChange={listFetch} // pageSize 变化的回调
                        />
                    </div>
                </Spin>
            </div>
        );
    }
}

export default App;
